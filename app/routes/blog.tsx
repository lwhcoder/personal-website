import type { Route } from "./+types/blog";
import { Link, useSearchParams } from "react-router";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Search } from "lucide-react";
import { useState, useMemo } from "react";

export async function loader({ request }: Route.LoaderArgs) {
  const { getAllPosts, getAllTags, getPostsByTag, formatDate } = await import("~/lib/blog.server");
  
  // Get tag from query params
  const url = new URL(request.url);
  const tag = url.searchParams.get("tag");
  
  const allPosts = tag ? getPostsByTag(tag) : getAllPosts();
  const tags = getAllTags();
  
  // Serialize data for client
  return { 
    posts: allPosts.map(post => ({
      slug: post.slug,
      title: post.title,
      description: post.description,
      date: formatDate(post.date),
      tags: post.tags,
      cover: post.cover,
      readingTime: post.readingTime,
    })),
    tags,
    activeTag: tag,
  };
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Blog | lwh" },
    { name: "description", content: "Thoughts on web development, design, and technology. Tutorials and insights on React, TypeScript, Node.js, and modern web development practices." },
    { name: "keywords", content: "web development blog, programming tutorials, React tutorials, TypeScript, Node.js, web design" },
    { property: "og:title", content: "Blog | lwh" },
    { property: "og:description", content: "Thoughts on web development, design, and technology" },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://lwh.codes/blog" },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: "Blog | lwh" },
    { name: "twitter:description", content: "Thoughts on web development, design, and technology" },
  ];
}

export default function Blog({ loaderData }: Route.ComponentProps) {
  const { posts, tags, activeTag } = loaderData;
  const [searchQuery, setSearchQuery] = useState("");

  // Filter posts based on search query
  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return posts;
    
    const query = searchQuery.toLowerCase();
    return posts.filter(post => 
      post.title.toLowerCase().includes(query) ||
      post.description.toLowerCase().includes(query) ||
      post.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }, [posts, searchQuery]);

  return (
    <main className="min-h-screen py-32">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-20">
          <h1 className="mb-6 text-5xl font-bold sm:text-6xl">Blog</h1>
          <p className="max-w-2xl text-xl text-muted-foreground">
            {activeTag 
              ? `Posts tagged with "${activeTag}"`
              : "Thoughts on web development, design, and technology"
            }
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-11 pl-10"
            />
          </div>
          {searchQuery && (
            <p className="mt-3 text-sm text-muted-foreground">
              Found {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'}
            </p>
          )}
        </div>

        {/* Tags Filter */}
        <div className="mb-16 flex flex-wrap gap-3">
          <Button 
            variant="ghost" 
            size="sm" 
            className={activeTag ? "text-sm text-muted-foreground" : "text-sm"}
            asChild
          >
            <Link to="/blog">All</Link>
          </Button>
          {tags.map((tag) => (
            <Button
              key={tag}
              variant="ghost"
              size="sm"
              className={activeTag === tag ? "text-sm" : "text-sm text-muted-foreground"}
              asChild
            >
              <Link to={`/blog?tag=${tag}`}>{tag}</Link>
            </Button>
          ))}
        </div>

        {/* Posts Grid */}
        <div className="space-y-16">
          {filteredPosts.map((post) => (
            <article key={post.slug} className="group border-t pt-8">
              <Link to={`/blog/${post.slug}`}>
                <div className="grid gap-8 md:grid-cols-3">
                  {/* Cover Image */}
                  {post.cover && (
                    <div className="md:col-span-1">
                      <div className="aspect-video overflow-hidden rounded-lg border bg-muted transition-all group-hover:border-foreground/20">
                        <img 
                          src={post.cover} 
                          alt={post.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                  )}

                  {/* Post Info */}
                  <div className={post.cover ? "md:col-span-2" : "md:col-span-3"}>
                    <div className="mb-3 flex items-center gap-4 text-sm text-muted-foreground">
                      <time>{post.date}</time>
                      <span>•</span>
                      <span>{post.readingTime}</span>
                    </div>

                    <h2 className="mb-3 text-2xl font-medium transition-colors group-hover:text-primary">
                      {post.title}
                    </h2>

                    <p className="mb-4 text-muted-foreground">{post.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span key={tag} className="text-xs text-muted-foreground">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-muted-foreground">
              {searchQuery 
                ? `No posts found matching "${searchQuery}"`
                : "No posts found."
              }
            </p>
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                className="mt-4"
                onClick={() => setSearchQuery("")}
              >
                Clear search
              </Button>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
