import type { Route } from "./+types/editions";
import { Button } from "~/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router";

export async function loader() {
  const { getAllEditions } = await import("~/lib/editions.server");
  const editions = getAllEditions();
  return { editions };
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Newsletter Editions | lwh" },
    { name: "description", content: "Browse all newsletter editions. Weekly insights on web development, design, and technology. Get the latest updates on React, TypeScript, and modern web development." },
    { name: "keywords", content: "newsletter, web development newsletter, tech newsletter, programming insights, developer newsletter, coding tips" },
    { property: "og:title", content: "Newsletter Editions | lwh" },
    { property: "og:description", content: "Browse all newsletter editions - Weekly insights on web development" },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://lwh.codes/editions" },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: "Newsletter Editions | lwh" },
    { name: "twitter:description", content: "Browse all newsletter editions" },
  ];
}

export default function Editions({ loaderData }: Route.ComponentProps) {
  const { editions } = loaderData;
  return (
    <main className="min-h-screen py-32">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-20">
          <h1 className="mb-6 text-5xl font-bold sm:text-6xl">Newsletter Editions</h1>
          <p className="max-w-2xl text-xl text-muted-foreground">
            Weekly insights on web development, design, and technology. 
            Subscribe to get new editions in your inbox.
          </p>
          <div className="mt-8">
            <Button asChild>
              <a href="/newsletter">
                Subscribe to newsletter
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>

        {/* Editions List */}
        <div className="space-y-12">
          {editions.map((edition) => (
            <article 
              key={edition.number} 
              className="group border-t pt-8 first:border-t-0 first:pt-0"
            >
              <Link to={`/editions/${edition.slug}`} className="block">
                <div className="mb-3 flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="font-mono">#{edition.number.toString().padStart(2, '0')}</span>
                  <span>•</span>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5" />
                    <time>{new Date(edition.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</time>
                  </div>
                </div>

                <h2 className="mb-3 text-2xl font-medium transition-colors group-hover:text-primary">
                  {edition.title}
                </h2>

                <p className="text-muted-foreground">
                  {edition.description}
                </p>

                <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground transition-colors group-hover:text-foreground">
                  <span>Read edition</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* CTA Footer */}
        <div className="mt-20 border-t pt-12 text-center">
          <h3 className="mb-4 text-2xl font-medium">Don't miss the next edition</h3>
          <p className="mb-6 text-muted-foreground">
            Join thousands of developers getting weekly insights
          </p>
          <Button asChild>
            <a href="/newsletter">Subscribe now</a>
          </Button>
        </div>
      </div>
    </main>
  );
}
