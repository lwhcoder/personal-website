import type { Route } from "./+types/about";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About | lwh" },
    { name: "description", content: "Learn more about lwh - Full Stack Developer specializing in React, Next.js, TypeScript, and Node.js. Passionate about building scalable web applications." },
    { name: "keywords", content: "about, full stack developer, web developer, React developer, TypeScript, Node.js" },
    { property: "og:title", content: "About | lwh" },
    { property: "og:description", content: "Learn more about lwh - Full Stack Developer" },
    { property: "og:type", content: "profile" },
    { property: "og:url", content: "https://lwh.codes/about" },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: "About | lwh" },
    { name: "twitter:description", content: "Learn more about lwh - Full Stack Developer" },
  ];
}

export default function About() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-32 sm:py-40">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h1 className="mb-6 text-6xl font-bold tracking-tight sm:text-7xl md:text-8xl">
              I'm{" "}
              <span className="">lwh</span>
            </h1>
            <p className="mb-10 text-xl text-muted-foreground sm:text-2xl">
              Full stack developer crafting digital experiences
            </p>
            <div className="flex gap-4">
              <a href="/contact">
              <Button size="lg" variant="ghost" className="text-base">
                Contact
              </Button>
              </a>
              <a href="/projects">
              <Button size="lg" variant="ghost" className="text-base">
                Work
              </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="border-t py-32">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                About
              </h2>
              <div className="space-y-6 text-lg leading-relaxed">
                <p>
                  I build web applications that combine thoughtful design with robust functionality. 
                  My focus is on creating experiences that feel natural and work seamlessly.
                </p>
                <p>
                  With expertise across the full stack, I handle everything from interface design 
                  to database architecture, ensuring every piece works together perfectly.
                </p>
              </div>
            </div>
            
            <div>
              <h2 className="mb-6 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                Approach
              </h2>
              <div className="space-y-8">
                <div>
                  <h3 className="mb-2 font-medium">Design</h3>
                  <p className="text-muted-foreground">
                    Clean interfaces that prioritize usability
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 font-medium">Performance</h3>
                  <p className="text-muted-foreground">
                    Fast, efficient applications built to scale
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 font-medium">Quality</h3>
                  <p className="text-muted-foreground">
                    Maintainable code with attention to detail
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="border-t py-32">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Technologies
          </h2>
          
          <div className="grid gap-16 sm:grid-cols-3">
            <div className="space-y-3">
              <h3 className="font-medium">Frontend</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>React</p>
                <p>Next.js</p>
                <p>TypeScript</p>
                <p>Tailwind CSS</p>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-medium">Backend</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Node.js</p>
                <p>Python</p>
                <p>REST APIs</p>
                <p>WebSockets</p>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-medium">Tools</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>MongoDB</p>
                <p>PostgreSQL</p>
                <p>Docker</p>
                <p>Git</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="border-t py-32">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-sm font-medium uppercase tracking-wider text-muted-foreground">
            What I Do
          </h2>

          <div className="grid gap-12 md:grid-cols-2">
            <div className="space-y-3">
              <h3 className="text-xl font-medium">Web Development</h3>
              <p className="text-muted-foreground">
                Full-stack applications built with modern frameworks and best practices
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-medium">Interface Design</h3>
              <p className="text-muted-foreground">
                Responsive, accessible interfaces that work across all devices
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-medium">API Development</h3>
              <p className="text-muted-foreground">
                Secure, scalable backend systems and REST APIs
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-medium">Optimization</h3>
              <p className="text-muted-foreground">
                Performance tuning for faster, more efficient applications
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t py-32">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-6 text-3xl font-medium sm:text-4xl">
              Let's work together
            </h2>
            <p className="mb-10 text-lg text-muted-foreground">
              Available for new projects and collaborations
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" variant="ghost" className="text-base">
                Get in touch
              </Button>
              <Button size="lg" variant="ghost" className="text-base">
                View portfolio
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
