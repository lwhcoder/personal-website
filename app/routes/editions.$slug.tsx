import type { Route } from "./+types/editions.$slug";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Calendar, Clock, ArrowRight, Mail } from "lucide-react";
import { compile, run } from "@mdx-js/mdx";
import { mdxComponents } from "~/components/mdx-components";
import * as runtime from "react/jsx-runtime";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import python from "highlight.js/lib/languages/python";
import bash from "highlight.js/lib/languages/bash";
import css from "highlight.js/lib/languages/css";
import json from "highlight.js/lib/languages/json";
import xml from "highlight.js/lib/languages/xml";
import { useEffect, useState } from "react";
import { Link } from "react-router";

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
  const { getEditionBySlug, getAllEditions } = await import("~/lib/editions.server");
  const edition = getEditionBySlug(params.slug);
  
  if (!edition || edition.published === false) {
    throw new Response("Not Found", { status: 404 });
  }

  const allEditions = getAllEditions();
  
  return { 
    edition,
    allEditions
  };
}

export function meta({ data }: Route.MetaArgs) {
  if (!data || !data.edition) {
    return [{ title: "Not Found" }];
  }

  const { edition } = data;

  return [
    { title: `Edition #${edition.number}: ${edition.title} | lwh` },
    { name: "description", content: edition.description },
    { name: "keywords", content: edition.topics.join(", ") },
    { property: "og:title", content: `Edition #${edition.number}: ${edition.title}` },
    { property: "og:description", content: edition.description },
    { property: "og:type", content: "article" },
    { property: "og:url", content: `https://lwh.codes/editions/${edition.slug}` },
    { property: "article:published_time", content: edition.date },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: `Edition #${edition.number}: ${edition.title}` },
    { name: "twitter:description", content: edition.description },
  ];
}

export default function EditionPost({ loaderData }: Route.ComponentProps) {
  const { edition, allEditions } = loaderData;
  const [MDXContent, setMDXContent] = useState<any>(null);

  useEffect(() => {
    async function compileMDX() {
      try {
        const compiled = await compile(edition.content, {
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
  }, [edition.content]);

  // Apply syntax highlighting after content is rendered
  useEffect(() => {
    if (MDXContent) {
      document.querySelectorAll("pre code").forEach((block) => {
        hljs.highlightElement(block as HTMLElement);
      });
    }
  }, [MDXContent]);

  // Find current edition index
  const currentIndex = allEditions.findIndex((e: any) => e.slug === edition.slug);
  const previousEdition = currentIndex < allEditions.length - 1 ? allEditions[currentIndex + 1] : null;
  const nextEdition = currentIndex > 0 ? allEditions[currentIndex - 1] : null;

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
                name: "Newsletter",
                item: "https://lwh.codes/newsletter",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Editions",
                item: "https://lwh.codes/editions",
              },
              {
                "@type": "ListItem",
                position: 4,
                name: `Edition #${edition.number}`,
                item: `https://lwh.codes/editions/${edition.slug}`,
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
            "@type": "NewsArticle",
            headline: edition.title,
            description: edition.description,
            author: {
              "@type": "Person",
              name: "lwh",
            },
            datePublished: edition.date,
            keywords: edition.topics.join(", "),
            url: `https://lwh.codes/editions/${edition.slug}`,
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
            <Link to="/editions">← Back to all editions</Link>
          </Button>
        </div>

        {/* Header */}
        <header className="mb-12 border-b pb-12">
          <div className="mb-4">
            <Badge variant="secondary" className="font-mono">
              Edition #{edition.number.toString().padStart(2, '0')}
            </Badge>
          </div>
          
          <h1 className="mb-6 text-4xl font-bold sm:text-5xl">
            {edition.title}
          </h1>
          
          <p className="mb-8 text-xl text-muted-foreground">
            {edition.description}
          </p>

          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <time>
                {new Date(edition.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{edition.readingTime} read</span>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {edition.topics.map((topic: string) => (
              <Badge key={topic} variant="outline">
                {topic}
              </Badge>
            ))}
          </div>
        </header>

        {/* Content */}
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          {MDXContent ? <MDXContent components={mdxComponents} /> : (
            <div className="flex items-center justify-center py-20">
              <p className="text-muted-foreground">Loading...</p>
            </div>
          )}
        </div>

        {/* Footer CTA */}
        <footer className="mt-16 border-t pt-12">
          <div className="rounded-lg border bg-muted/50 p-8 text-center">
            <Mail className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="mb-2 text-xl font-medium">
              Enjoyed this edition?
            </h3>
            <p className="mb-6 text-muted-foreground">
              Subscribe to get weekly insights on web development, design, and technology.
            </p>
            <Button asChild>
              <Link to="/newsletter">
                Subscribe to newsletter
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Navigation to other editions */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {previousEdition && (
              <div>
                <p className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">
                  Previous Edition
                </p>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to={`/editions/${previousEdition.slug}`}>
                    ← Edition #{previousEdition.number}
                  </Link>
                </Button>
              </div>
            )}
            {nextEdition && (
              <div className={!previousEdition ? 'sm:col-start-2' : ''}>
                <p className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">
                  Next Edition
                </p>
                <Button variant="outline" className="w-full justify-end" asChild>
                  <Link to={`/editions/${nextEdition.slug}`}>
                    Edition #{nextEdition.number} →
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </footer>
      </article>
    </main>
  );
}
