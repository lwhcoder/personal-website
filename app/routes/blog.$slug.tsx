import type { Route } from "./+types/blog.$slug";
import { Button } from "~/components/ui/button";
import { compile, run } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import { mdxComponents } from "~/components/mdx-components";
import { useEffect, useState } from "react";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import python from "highlight.js/lib/languages/python";
import bash from "highlight.js/lib/languages/bash";
import css from "highlight.js/lib/languages/css";
import json from "highlight.js/lib/languages/json";
import xml from "highlight.js/lib/languages/xml";

// Register languages
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("python", python);
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("shell", bash);
hljs.registerLanguage("sh", bash);
hljs.registerLanguage("zsh", bash);
hljs.registerLanguage("fish", bash);
hljs.registerLanguage("css", css);
hljs.registerLanguage("json", json);
hljs.registerLanguage("xml", xml);
hljs.registerLanguage("html", xml);

export async function loader({ params }: Route.LoaderArgs) {
  const { getPostBySlug, formatDate } = await import("~/lib/blog.server");
  const post = getPostBySlug(params.slug);
  
  if (!post || post.published === false) {
    throw new Response("Not Found", { status: 404 });
  }

  return { 
    post: {
      slug: params.slug,
      title: post.title,
      description: post.description,
      date: formatDate(post.date),
      rawDate: post.date,
      tags: post.tags,
      cover: post.cover,
      author: post.author,
      readingTime: post.readingTime,
      content: post.content,
    }
  };
}

export function meta({ data }: Route.MetaArgs) {
  if (!data || !data.post) {
    return [{ title: "Not Found" }];
  }

  return [
    { title: `${data.post.title} | lwh` },
    { name: "description", content: data.post.description },
    { name: "keywords", content: data.post.tags.join(", ") },
    { name: "author", content: data.post.author },
    { property: "og:title", content: data.post.title },
    { property: "og:description", content: data.post.description },
    { property: "og:type", content: "article" },
    { property: "og:url", content: `https://lwh.codes/blog/${data.post.slug}` },
    { property: "article:published_time", content: data.post.rawDate },
    { property: "article:author", content: data.post.author },
    { property: "article:tag", content: data.post.tags.join(", ") },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: data.post.title },
    { name: "twitter:description", content: data.post.description },
  ];
}

export default function BlogPost({ loaderData }: Route.ComponentProps) {
  const { post } = loaderData;
  const [MDXContent, setMDXContent] = useState<any>(null);

  useEffect(() => {
    async function compileMDX() {
      try {
        const compiled = await compile(post.content, {
          outputFormat: "function-body",
        });
        
        const { default: Content } = await run(String(compiled), {
          ...runtime,
          baseUrl: import.meta.url,
        } as any);
        
        setMDXContent(() => Content);
      } catch (error) {
        console.error("Error compiling MDX:", error);
      }
    }

    compileMDX();
  }, [post.content]);

  // Apply syntax highlighting after content is rendered
  useEffect(() => {
    if (MDXContent) {
      document.querySelectorAll("pre code").forEach((block) => {
        hljs.highlightElement(block as HTMLElement);
      });
    }
  }, [MDXContent]);

  return (
    <main className="min-h-screen py-20">
      {/* Breadcrumb Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://lwh.codes",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Blog",
                item: "https://lwh.codes/blog",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: post.title,
                item: `https://lwh.codes/blog/${post.slug}`,
              },
            ],
          }),
        }}
      />
      {/* Structured Data for Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.description,
            author: {
              "@type": "Person",
              name: post.author,
            },
            datePublished: post.rawDate,
            keywords: post.tags.join(", "),
            articleBody: post.content,
            url: `https://lwh.codes/blog/${post.slug}`,
            publisher: {
              "@type": "Person",
              name: "lwh",
            },
          }),
        }}
      />
      
      <article className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-12">
          <Button variant="ghost" size="sm" asChild>
            <a href="/blog">← Back to blog</a>
          </Button>
        </div>

        {/* Header */}
        <header className="mb-12">
          <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <time>{post.date}</time>
            <span>•</span>
            <span>{post.readingTime}</span>
            <span>•</span>
            <span>{post.author}</span>
          </div>

          <h1 className="mb-6 text-4xl font-bold sm:text-5xl">{post.title}</h1>
          
          <p className="text-xl text-muted-foreground">{post.description}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {post.tags.map((tag: string) => (
              <a href={`/blog?tag=${tag}`} className="text-sm hover:underline" key={tag}>
              {tag}
              </a>
            ))}
          </div>
        </header>

        {/* Cover Image */}
        {post.cover && (
          <div className="mb-12">
            <div className="aspect-video overflow-hidden rounded-lg border bg-muted">
              <img 
                src={post.cover} 
                alt={post.title}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          {MDXContent ? <MDXContent components={mdxComponents} /> : (
            <div className="flex items-center justify-center py-20">
              <p className="text-muted-foreground">Loading...</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-20 border-t pt-12">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="mb-2 text-sm font-medium">Share this post</p>
              <div className="flex gap-3">
                <Button variant="ghost" size="sm">
                  Twitter
                </Button>
                <Button variant="ghost" size="sm">
                  LinkedIn
                </Button>
                <Button variant="ghost" size="sm">
                  Copy link
                </Button>
              </div>
            </div>
            <Button variant="ghost" asChild>
              <a href="/blog">← All posts</a>
            </Button>
          </div>
        </footer>
      </article>
    </main>
  );
}
