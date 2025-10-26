import type { Route } from "./+types/editions";
import { Button } from "~/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Newsletter Editions | lwh" },
    { name: "description", content: "Browse all newsletter editions. Weekly insights on web development, design, and technology." },
    { name: "keywords", content: "newsletter, web development newsletter, tech newsletter, programming insights" },
    { property: "og:title", content: "Newsletter Editions | lwh" },
    { property: "og:description", content: "Browse all newsletter editions" },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ];
}

// Sample newsletter editions data
const editions = [
  {
    number: 12,
    title: "The Future of React: Server Components Deep Dive",
    description: "Exploring React Server Components, streaming, and the future of React development. Plus tips on optimizing your React apps.",
    date: "2025-07-20",
    slug: "future-of-react",
  },
  {
    number: 11,
    title: "TypeScript 5.5: What's New and Why It Matters",
    description: "Breaking down the latest TypeScript features, performance improvements, and how they impact your daily development workflow.",
    date: "2025-07-13",
    slug: "typescript-5-5",
  },
  {
    number: 10,
    title: "Building Scalable APIs: Lessons from Production",
    description: "Real-world strategies for building APIs that scale. From rate limiting to caching, and everything in between.",
    date: "2025-07-06",
    slug: "scalable-apis",
  },
  {
    number: 9,
    title: "Web Performance in 2025: The Complete Guide",
    description: "Modern techniques for blazing-fast websites. Core Web Vitals, image optimization, and performance monitoring.",
    date: "2025-06-29",
    slug: "web-performance-2025",
  },
  {
    number: 8,
    title: "Docker for Developers: Beyond the Basics",
    description: "Advanced Docker patterns, multi-stage builds, and production-ready containerization strategies.",
    date: "2025-06-22",
    slug: "docker-advanced",
  },
  {
    number: 7,
    title: "Git Workflows That Actually Work in Teams",
    description: "Practical Git strategies for team collaboration. From branching models to commit conventions.",
    date: "2025-06-15",
    slug: "git-workflows",
  },
  {
    number: 6,
    title: "Security Best Practices Every Developer Should Know",
    description: "Essential security practices: authentication, authorization, XSS, CSRF, and protecting your applications.",
    date: "2025-06-08",
    slug: "security-best-practices",
  },
  {
    number: 5,
    title: "Modern CSS: Grid, Flexbox, and Container Queries",
    description: "Master modern CSS layouts with practical examples and real-world use cases.",
    date: "2025-06-01",
    slug: "modern-css",
  },
  {
    number: 4,
    title: "Testing Strategies for Confident Deployments",
    description: "From unit tests to E2E: building a comprehensive testing strategy that catches bugs before production.",
    date: "2025-05-25",
    slug: "testing-strategies",
  },
  {
    number: 3,
    title: "Next.js App Router: Migration Guide",
    description: "Step-by-step guide to migrating from Pages Router to App Router with real examples.",
    date: "2025-05-18",
    slug: "nextjs-migration",
  },
];

export default function Editions({ loaderData }: Route.ComponentProps) {
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
              <a href={`/editions/${edition.slug}`} className="block">
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
              </a>
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
