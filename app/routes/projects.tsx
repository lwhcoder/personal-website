import type { Route } from "./+types/projects";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { useState, useMemo } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Projects | lwh" },
    { name: "description", content: "A collection of full-stack web development projects featuring React, Next.js, Node.js, and modern web technologies. View my portfolio of web applications and APIs." },
    { name: "keywords", content: "portfolio, projects, web development, React projects, Next.js, full stack applications, web apps" },
    { property: "og:title", content: "Projects | lwh" },
    { property: "og:description", content: "A collection of my recent work and projects" },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://lwh.codes/projects" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Projects | lwh" },
    { name: "twitter:description", content: "A collection of my recent work and projects" },
  ];
}

const projects = [
  {
    title: "E-Commerce Platform",
    description: "Full-stack online store with payment integration, inventory management, and admin dashboard",
    year: "2024",
    tags: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
    status: "Live",
    link: "#",
  },
  {
    title: "Real-time Chat Application",
    description: "WebSocket-based messaging platform with end-to-end encryption and media sharing",
    year: "2024",
    tags: ["React", "Node.js", "WebSockets", "MongoDB"],
    status: "Live",
    link: "#",
  },
  {
    title: "Project Management Tool",
    description: "Collaborative workspace with task tracking, team management, and timeline visualization",
    year: "2024",
    tags: ["React", "Express", "PostgreSQL", "Redis"],
    status: "In Progress",
    link: "#",
  },
  {
    title: "Analytics Dashboard",
    description: "Real-time data visualization platform with custom reporting and export capabilities",
    year: "2023",
    tags: ["Next.js", "Python", "D3.js", "MongoDB"],
    status: "Live",
    link: "#",
  },
  {
    title: "Social Media Platform",
    description: "Modern social network with posts, stories, real-time notifications, and user profiles",
    year: "2023",
    tags: ["React", "Node.js", "MongoDB", "Redis"],
    status: "Live",
    link: "#",
  },
  {
    title: "API Gateway Service",
    description: "Microservices architecture with rate limiting, authentication, and request routing",
    year: "2023",
    tags: ["Node.js", "Docker", "Redis", "PostgreSQL"],
    status: "Live",
    link: "#",
  },
  {
    title: "E-Commerce Platform",
    description: "Full-stack online store with payment integration, inventory management, and admin dashboard",
    year: "2024",
    tags: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
    status: "Live",
    link: "#",
  },
  {
    title: "Real-time Chat Application",
    description: "WebSocket-based messaging platform with end-to-end encryption and media sharing",
    year: "2024",
    tags: ["React", "Node.js", "WebSockets", "MongoDB"],
    status: "Live",
    link: "#",
  },
  {
    title: "Project Management Tool",
    description: "Collaborative workspace with task tracking, team management, and timeline visualization",
    year: "2024",
    tags: ["React", "Express", "PostgreSQL", "Redis"],
    status: "In Progress",
    link: "#",
  },
  {
    title: "Analytics Dashboard",
    description: "Real-time data visualization platform with custom reporting and export capabilities",
    year: "2023",
    tags: ["Next.js", "Python", "D3.js", "MongoDB"],
    status: "Live",
    link: "#",
  },
  {
    title: "Social Media Platform",
    description: "Modern social network with posts, stories, real-time notifications, and user profiles",
    year: "2023",
    tags: ["React", "Node.js", "MongoDB", "Redis"],
    status: "Live",
    link: "#",
  },
  {
    title: "API Gateway Service",
    description: "Microservices architecture with rate limiting, authentication, and request routing",
    year: "2023",
    tags: ["Node.js", "Docker", "Redis", "PostgreSQL"],
    status: "Live",
    link: "#",
  },
];

export default function Projects() {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [limit, setLimit] = useState<number>(5);

  // Get all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach(project => {
      project.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, []);

  // Filter projects by active tag
  const filteredProjects = useMemo(() => {
    if (!activeTag) return projects;
    return projects.filter(project => project.tags.includes(activeTag));
  }, [activeTag]);

  return (
    <main className="min-h-screen py-32">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-20">
          <h1 className="mb-6 text-5xl font-bold sm:text-6xl">Projects</h1>
          <p className="max-w-2xl text-xl text-muted-foreground">
            {activeTag 
              ? `Projects using ${activeTag}` 
              : "A selection of recent work showcasing full-stack development, system architecture, and modern web technologies"
            }
          </p>
        </div>

        {/* Filters */}
        <div className="mb-16 flex flex-wrap gap-3">
          <Button 
            variant="ghost" 
            size="sm" 
            className={activeTag === null ? "text-sm" : "text-sm text-muted-foreground"}
            onClick={() => setActiveTag(null)}
          >
            All
          </Button>
          {allTags.map((tag) => (
            <Button 
              key={tag}
              variant="ghost" 
              size="sm" 
              className={activeTag === tag ? "text-sm" : "text-sm text-muted-foreground"}
              onClick={() => setActiveTag(tag)}
            >
              {tag}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="space-y-24">
          {filteredProjects.slice(0, limit).map((project, index) => (
            <article
              key={index}
              className="group grid gap-8 border-t pt-8 md:grid-cols-3"
            >
              {/* Project Preview */}
              <div className="md:col-span-2">
                <div className="mb-6 aspect-video overflow-hidden rounded-lg border bg-muted transition-all group-hover:border-foreground/20">
                  <div className="flex h-full items-center justify-center text-muted-foreground">
                    Project Preview
                  </div>
                </div>
              </div>

              {/* Project Info */}
              <div className="flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{project.year}</span>
                    <span className="text-sm text-muted-foreground">{project.status}</span>
                  </div>
                  
                  <div>
                    <h2 className="mb-3 text-2xl font-medium">{project.title}</h2>
                    <p className="text-muted-foreground">{project.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setActiveTag(tag)}
                        className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="ghost" size="sm" asChild>
                    <a href={project.link}>View project <span className="transition-transform group-hover:translate-x-1 group-hover:cursor-pointer">→</span></a>
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-20 text-center">
          <Button onClick={() => setLimit(limit + 5)} variant="ghost" size="lg">
            Load more projects
          </Button>
        </div>

        {/* CTA Section */}
        <div className="mt-32 border-t pt-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-6 text-3xl font-medium sm:text-4xl">
              Interested in working together?
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              I'm currently available for freelance projects and collaborations
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button size="lg" variant="ghost">
                Get in touch
              </Button>
              <Button size="lg" variant="ghost">
                View resume
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
