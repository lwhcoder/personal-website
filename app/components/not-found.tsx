"use client"

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Link } from "react-router";

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  cover?: string;
  readingTime: string;
}

export function NotFound() {
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [displayedCount, setDisplayedCount] = useState(5);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch blog posts on mount
  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('/blog-search-data.json');
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        }
      } catch (error) {
        console.error('Failed to fetch blog posts:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPosts();
  }, []);

  // Filter posts based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredPosts([]);
      setDisplayedCount(5);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = posts.filter(post => 
      post.title.toLowerCase().includes(query) ||
      post.description.toLowerCase().includes(query) ||
      post.tags.some(tag => tag.toLowerCase().includes(query))
    );
    setFilteredPosts(filtered);
    setDisplayedCount(5);
  }, [searchQuery, posts]);

  const visiblePosts = filteredPosts.slice(0, displayedCount);
  const hasMore = displayedCount < filteredPosts.length;

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="container mx-auto max-w-2xl px-6 text-center">
        <div className="space-y-8">
          {/* 404 Number */}
          <div>
            <h1 className="text-9xl font-bold tracking-tighter sm:text-[12rem]">
              404
            </h1>
          </div>

          {/* Message */}
          <div className="space-y-4">
            <h2 className="text-3xl font-medium sm:text-4xl">
              Page not found
            </h2>
            <p className="text-lg text-muted-foreground">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mx-auto max-w-4xl">
            <div className="space-y-6">
              <p className="text-sm text-muted-foreground">
                Search my blog instead?
              </p>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search blog posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-11 pl-10"
                />
              </div>

              {/* Search Results */}
              {searchQuery && (
                <div className="text-left">
                  {isLoading ? (
                    <p className="text-sm text-muted-foreground text-center py-8">Loading...</p>
                  ) : filteredPosts.length > 0 ? (
                    <div className="space-y-6">
                      <p className="text-sm text-muted-foreground">
                        Found {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'}
                      </p>
                      
                      <div className="space-y-12 mt-4 mb-8">
                        {visiblePosts.map((post) => (
            <article key={post.slug} className="group border-t pt-8 ">
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

                      {/* Load More Button */}
                      {hasMore && (
                        <div className="flex justify-center pt-8">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setDisplayedCount(prev => prev + 5)}
                            className="text-sm"
                          >
                            Load 5 more posts
                          </Button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-8">
                      No posts found matching "{searchQuery}"
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Actions - Only show when no search results */}
          {!searchQuery && (
            <>
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                <a
                  href="/"
                  className="inline-flex items-center justify-center rounded-md px-6 py-3 text-sm transition-colors hover:bg-muted"
                >
                  Go home
                </a>
                <a
                  href="/blog"
                  className="inline-flex items-center justify-center rounded-md px-6 py-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  View blog
                </a>
              </div>

              {/* Additional Links */}
              <div className="border-t pt-8 mt-8">
                <p className="mb-4 text-sm text-muted-foreground">
                  Looking for something specific?
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-sm">
                  <a href="/about" className="text-muted-foreground hover:text-foreground">
                    About
                  </a>
                  <a href="/projects" className="text-muted-foreground hover:text-foreground">
                    Projects
                  </a>
                  <a href="/contact" className="text-muted-foreground hover:text-foreground">
                    Contact
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
