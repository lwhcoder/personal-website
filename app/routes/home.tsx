import type { Route } from "./+types/home";
import { Globe } from "~/components/globe";
import { Button } from "~/components/ui/button";
import { getAllPosts } from "~/lib/blog.server";
import projectsData from "~/content/projects/projects.json";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "lwh | Full Stack Developer" },
    { name: "description", content: "Full stack developer specializing in React, Next.js, TypeScript, and Node.js. Building modern web applications with clean code and thoughtful design." },
    { name: "keywords", content: "full stack developer, web development, React, Next.js, TypeScript, Node.js, JavaScript, portfolio" },
    { property: "og:title", content: "lwh | Full Stack Developer" },
    { property: "og:description", content: "Full stack developer building digital experiences with clean code and thoughtful design" },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://lwh.codes" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "lwh | Full Stack Developer" },
    { name: "twitter:description", content: "Full stack developer building digital experiences with clean code and thoughtful design" },
  ];
}

export async function loader() {
  const allPosts = getAllPosts();
  const recentPosts = allPosts.slice(0, 3);
  const recentProjects = projectsData.slice(0, 2);
  
  return {
    recentPosts: recentPosts.map(post => ({
      slug: post.slug,
      title: post.title,
      description: post.description,
      date: post.date,
      tags: post.tags,
      readingTime: post.readingTime,
    })),
    recentProjects,
  };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { recentPosts, recentProjects } = loaderData;

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative flex min-h-[calc(100vh-3.5rem)] items-center overflow-hidden border-b bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
        <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* Left side - Content */}
            <div className="flex flex-col space-y-8">
              <div className="space-y-4">
                <h1 className="text-6xl font-extrabold italic tracking-tight sm:text-7xl lg:text-8xl" style={ { fontFamily: "Times New Roman"}}>
                  hey, im lwh
                </h1>
                <p className="max-w-lg text-xl">
                  Full stack developer building digital experiences with clean code and thoughtful design
                </p>
              </div>

              <div className="flex gap-4">
                <a href="/projects">
                <Button size="lg" variant="ghost">
                  View work
                </Button>
                </a>
                <a href="/contact">
                <Button size="lg" variant="ghost">
                  Contact
                </Button>
                </a>
              </div>
            </div>

            {/* Right side - Globe */}
            <div className="flex items-center justify-center lg:justify-end">
              <div className="w-full max-w-[500px]">
                <Globe />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="border-b py-32">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Services
            </h2>
            <p className="max-w-2xl text-3xl font-medium sm:text-4xl">
              Building full-stack applications from concept to deployment
            </p>
          </div>

          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-3">
              <h3 className="text-xl font-medium">Web Development</h3>
              <p className="text-muted-foreground">
                Full-stack applications with modern frameworks and architecture
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-medium">UI/UX Design</h3>
              <p className="text-muted-foreground">
                Interface design focused on minimalism and visual appeal
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-medium">API Development</h3>
              <p className="text-muted-foreground">
                RESTful APIs and backend systems built for performance and scalability
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-medium">Database Design</h3>
              <p className="text-muted-foreground">
                Optimized scalable database architecture and optimization
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-medium">DevOps</h3>
              <p className="text-muted-foreground">
                CI/CD pipelines, containerization, and cloud or local deployment
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-medium">Consulting/Mentoring</h3>
              <p className="text-muted-foreground">
                Technical guidance and code reviews for your projects
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="border-b py-32">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-16 text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Tech Stack
          </h2>

          <div className="grid gap-16 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <h3 className="font-medium">Frontend</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>React</p>
                <p>Next.js</p>
                <p>TypeScript</p>
                <p>Tailwind CSS</p>
                <p>React Router</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Backend</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Node.js</p>
                <p>Hono</p>
                <p>Python</p>
                <p>REST APIs</p>
                <p>WebSockets</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Database</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>MongoDB</p>
                <p>PostgreSQL</p>
                <p>MySQL</p>
                <p>Redis</p>
                <p>Drizzle ORM</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Tools</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Git</p>
                <p>Docker</p>
                <p>Linux</p>
                <p>VS Code</p>
                <p>CI/CD Pipelines</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Work Teaser */}
      <section className="border-b py-32">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 flex items-end justify-between">
            <div>
              <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                Selected Work
              </h2>
              <p className="max-w-2xl text-3xl font-medium sm:text-4xl">
                Recent projects that showcase my capabilities
              </p>
            </div>
            <a href="/projects">
              <Button variant="ghost" className="hidden sm:flex">
                <span className="group inline-flex items-center gap-2">
                  View all
                  <span className="transition-transform group-hover:translate-x-1 group-hover:cursor-pointer">→</span>
                </span>
              </Button>
            </a>

          </div>

          <div className="space-y-24">
            {recentProjects.map((project, index) => (
              <article
                key={index}
                className="group grid gap-8 border-t pt-8 md:grid-cols-3"
              >
                {/* Project Preview */}
                <div className="md:col-span-2">
                  <div className="mb-6 aspect-video overflow-hidden rounded-lg border bg-muted transition-all group-hover:border-foreground/20">
                    {project.coverImage ? (
                      <img 
                        src={project.coverImage} 
                        alt={project.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-muted-foreground">
                        Project Preview
                      </div>
                    )}
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
                        <span
                          key={tag}
                          className="text-xs text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="ghost" size="sm" asChild>
                      <a href={`https://${project.repo}`}>View project <span className="transition-transform group-hover:translate-x-1 group-hover:cursor-pointer">→</span></a>
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-16">
            <a href="/projects">
              <Button variant="ghost" className="w-full sm:w-auto">
                <span className="group inline-flex items-center gap-2">
                  View all projects
                  <span className="transition-transform group-hover:translate-x-1 group-hover:cursor-pointer">→</span>
                </span>
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Recent Posts Section */}
      <section className="border-b py-32">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 flex items-end justify-between">
            <div>
              <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                Recent Posts
              </h2>
              <p className="max-w-2xl text-3xl font-medium sm:text-4xl">
                Latest thoughts and tutorials
              </p>
            </div>
            <Button variant="ghost" className="hidden sm:flex" asChild>
              <a href="/blog" className="group inline-flex items-center gap-2">
                View all
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </Button>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {recentPosts.map((post) => (
              <a
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </time>
                    <span>·</span>
                    <span>{post.readingTime}</span>
                  </div>
                  
                  <h3 className="text-xl font-medium transition-colors group-hover:text-muted-foreground">
                    {post.title}
                  </h3>
                  
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {post.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-muted-foreground ml-2 mr-2"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-8 sm:hidden">
            <Button variant="ghost" className="w-full" asChild>
              <a href="/blog" className="group inline-flex items-center gap-2">
                View all posts
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
