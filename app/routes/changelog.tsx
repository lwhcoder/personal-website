import type { Route } from "./+types/changelog";
import { Badge } from "~/components/ui/badge";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Changelog | lwh" },
    { name: "description", content: "Track updates, new features, and improvements to this website. See the latest changes and enhancements to lwh.codes." },
    { name: "keywords", content: "changelog, updates, website updates, new features, improvements" },
    { property: "og:title", content: "Changelog | lwh" },
    { property: "og:description", content: "Track updates, new features, and improvements" },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://lwh.codes/changelog" },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: "Changelog | lwh" },
    { name: "twitter:description", content: "Track updates and improvements" },
  ];
}

interface ChangelogEntry {
  version: string;
  date: string;
  changes: {
    type: "feature" | "improvement" | "fix" | "design";
    description: string;
  }[];
}

const changelogData: ChangelogEntry[] = [
  {
    version: "2.3.0",
    date: "2025-07-25",
    changes: [
      { type: "feature", description: "Added newsletter editions archive page" },
      { type: "feature", description: "Added changelog page to track site updates" },
      { type: "improvement", description: "Enhanced 404 page with live blog search" },
      { type: "design", description: "Improved mobile navigation with hamburger menu" },
    ],
  },
  {
    version: "2.2.0",
    date: "2025-07-15",
    changes: [
      { type: "feature", description: "Implemented blog search with real-time filtering" },
      { type: "feature", description: "Added tag-based filtering for blog posts" },
      { type: "improvement", description: "Optimized blog post loading with pagination" },
      { type: "fix", description: "Fixed clipboard copy functionality with fallback" },
    ],
  },
  {
    version: "2.1.0",
    date: "2025-07-01",
    changes: [
      { type: "feature", description: "Added interactive draggable globe to hero section" },
      { type: "feature", description: "Implemented advanced code blocks with syntax highlighting" },
      { type: "feature", description: "Added multi-language code tab support" },
      { type: "design", description: "Redesigned footer with minimalist aesthetic" },
    ],
  },
  {
    version: "2.0.0",
    date: "2025-06-18",
    changes: [
      { type: "feature", description: "Complete site redesign with minimalist aesthetic" },
      { type: "feature", description: "Built MDX-based blog system with cover images" },
      { type: "feature", description: "Added dark/light theme toggle" },
      { type: "feature", description: "Implemented contact and newsletter pages" },
      { type: "improvement", description: "Enhanced SEO with meta tags and structured data" },
    ],
  },
  {
    version: "1.5.0",
    date: "2025-06-05",
    changes: [
      { type: "feature", description: "Added projects showcase page" },
      { type: "feature", description: "Implemented project filtering by technology" },
      { type: "improvement", description: "Improved responsive design across all pages" },
      { type: "fix", description: "Fixed navigation links on mobile devices" },
    ],
  },
  {
    version: "1.4.0",
    date: "2025-05-20",
    changes: [
      { type: "feature", description: "Created privacy policy page" },
      { type: "feature", description: "Added sitemap.xml and robots.txt" },
      { type: "improvement", description: "Optimized images for faster loading" },
      { type: "fix", description: "Fixed theme persistence across page reloads" },
    ],
  },
  {
    version: "1.3.0",
    date: "2025-05-10",
    changes: [
      { type: "feature", description: "Launched newsletter subscription" },
      { type: "feature", description: "Added toast notifications for user feedback" },
      { type: "improvement", description: "Enhanced form validation across the site" },
      { type: "design", description: "Refined typography and spacing" },
    ],
  },
  {
    version: "1.2.0",
    date: "2025-04-25",
    changes: [
      { type: "feature", description: "Added about page with bio and skills" },
      { type: "improvement", description: "Improved accessibility with ARIA labels" },
      { type: "fix", description: "Fixed footer link alignments" },
    ],
  },
  {
    version: "1.1.0",
    date: "2025-04-10",
    changes: [
      { type: "feature", description: "Added recent blog posts section to homepage" },
      { type: "improvement", description: "Enhanced hover animations on buttons" },
      { type: "design", description: "Updated color scheme for better contrast" },
    ],
  },
  {
    version: "1.0.0",
    date: "2025-04-01",
    changes: [
      { type: "feature", description: "Initial website launch" },
      { type: "feature", description: "Hero section with introduction" },
      { type: "feature", description: "Basic navigation and routing" },
      { type: "design", description: "Established design system and components" },
    ],
  },
];

const typeConfig = {
  feature: {
    label: "Feature",
    className: "bg-green-500/10 text-green-500 border-green-500/20",
  },
  improvement: {
    label: "Improvement",
    className: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  },
  fix: {
    label: "Fix",
    className: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  },
  design: {
    label: "Design",
    className: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  },
};

export default function Changelog({ loaderData }: Route.ComponentProps) {
  return (
    <main className="min-h-screen py-32">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-20">
          <h1 className="mb-6 text-5xl font-bold sm:text-6xl">Changelog</h1>
          <p className="max-w-2xl text-xl text-muted-foreground">
            Track updates, new features, and improvements to this website.
            Following semantic versioning for transparency.
          </p>
        </div>

        {/* Changelog Timeline */}
        <div className="relative space-y-16">
          {/* Timeline line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-border hidden sm:block" />

          {changelogData.map((entry, index) => (
            <div key={entry.version} className="relative">
              {/* Timeline dot */}
              <div className="absolute left-0 top-2 h-2 w-2 -translate-x-[3.5px] rounded-full bg-foreground hidden sm:block" />

              {/* Content */}
              <div className="sm:pl-8">
                <div className="mb-4 flex flex-wrap items-center gap-4">
                  <h2 className="text-2xl font-mono font-bold">
                    v{entry.version}
                  </h2>
                  <time className="text-sm text-muted-foreground">
                    {new Date(entry.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </div>

                <ul className="space-y-3">
                  {entry.changes.map((change, changeIndex) => (
                    <li key={changeIndex} className="flex items-start gap-3">
                      <Badge
                        variant="outline"
                        className={`mt-0.5 shrink-0 ${typeConfig[change.type].className}`}
                      >
                        {typeConfig[change.type].label}
                      </Badge>
                      <span className="text-muted-foreground">
                        {change.description}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-20 border-t pt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Have a suggestion or found a bug?{" "}
            <a href="/contact" className="text-foreground hover:underline">
              Let me know
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
