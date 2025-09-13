import type { Route } from "./+types/home";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { 
  Code, 
  Laptop, 
  Zap, 
  Globe, 
  Github, 
  Mail, 
  ArrowRight, 
  Download,
  Coffee,
  Sparkles,
  Terminal,
  Brackets
} from "lucide-react";
import { PageTransition, ScrollReveal, StaggeredList } from "~/components/page-transitions";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "lwh - Full Stack Developer" },
    { name: "description", content: "Full Stack Developer specializing in modern web technologies. Building digital experiences that matter." },
  ];
}

const skills = [
  "React", "TypeScript", "Node.js", "Next.js", "Tailwind CSS", 
  "MongoDB", "PostgreSQL", "Python", "WebRTC", "REST APIs"
];

const projects = [
  {
    title: "Jelli Media Platform",
    description: "Streaming platform with real-time media player and playlist management",
    tech: ["Next.js", "WebRTC", "MongoDB"],
    status: "Live"
  },
  {
    title: "Documentation System",
    description: "Modern documentation platform with search and navigation",
    tech: ["Next.js", "MDX", "TypeScript"],
    status: "In Progress"
  },
  {
    title: "Personal Portfolio",
    description: "This website! Built with React Router 7 and modern tooling",
    tech: ["React Router", "Tailwind", "Vite"],
    status: "Live"
  }
];

export default function Home() {
  return (
    <PageTransition>
      <div className="min-h-screen">
        {/* Hero Section */}
        <ScrollReveal direction="up" delay={0}>
          <section className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center space-y-8">
                {/* Terminal-style greeting */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-muted font-mono text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Currently available for new projects</span>
                </div>

                {/* Main heading */}
                <div className="space-y-4">
                  <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
                    <span className="text-foreground">Building </span>
                    <span className="text-primary">Digital</span>
                    <br />
                    <span className="text-foreground">Experiences</span>
                  </h1>
                  <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    Full Stack Developer crafting modern web applications with clean code, 
                    thoughtful design, and seamless user experiences.
                  </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button asChild size="lg" className="font-medium">
                    <a href="/portfolio" className="flex items-center gap-2">
                      View My Work
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="font-medium">
                    <a href="/contact" className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Get In Touch
                    </a>
                  </Button>
                </div>

                {/* Stats/Quick Info */}
                <div className="grid grid-cols-3 gap-8 max-w-md mx-auto pt-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">7+</div>
                    <div className="text-sm text-muted-foreground">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">3+</div>
                    <div className="text-sm text-muted-foreground">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">∞</div>
                    <div className="text-sm text-muted-foreground">Coffee Cups</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* What I Do Section */}
        <ScrollReveal direction="up" delay={200}>
          <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
            <div className="max-w-6xl mx-auto">
              <div className="text-center space-y-4 mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold">What I Do</h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  I specialize in creating modern web applications that solve real problems
                </p>
              </div>

              <StaggeredList 
                staggerDelay={100}
                className="grid md:grid-cols-3 gap-8"
              >
                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Code className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">Full Stack Development</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Building complete web applications from frontend interfaces to backend APIs, 
                      databases, and deployment.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Laptop className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">Modern Web Apps</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Creating responsive, fast, and interactive web applications using the latest 
                      technologies and best practices.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Zap className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">Performance Optimization</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Optimizing applications for speed, SEO, and user experience with modern 
                      tooling and techniques.
                    </p>
                  </CardContent>
                </Card>
              </StaggeredList>
            </div>
          </section>
        </ScrollReveal>

        {/* Skills Section */}
        <ScrollReveal direction="up" delay={400}>
          <section className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center space-y-4 mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold">Technologies I Work With</h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  A curated selection of tools and technologies I use to bring ideas to life
                </p>
              </div>

              <StaggeredList 
                staggerDelay={50}
                className="flex flex-wrap justify-center gap-3"
              >
                {skills.map((skill) => (
                  <Badge 
                    key={skill}
                    variant="secondary" 
                    className="px-4 py-2 text-sm hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                  >
                    {skill}
                  </Badge>
                ))}
              </StaggeredList>
            </div>
          </section>
        </ScrollReveal>

        {/* Featured Projects */}
        <ScrollReveal direction="up" delay={600}>
          <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
            <div className="max-w-6xl mx-auto">
              <div className="text-center space-y-4 mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold">Featured Projects</h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  A glimpse into some of the work I've been building
                </p>
              </div>

              <StaggeredList 
                staggerDelay={100}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
              >
                {projects.map((project, index) => (
                  <Card key={project.title} className="hover:shadow-lg transition-all hover:scale-[1.02]">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <CardTitle className="text-lg">{project.title}</CardTitle>
                        <Badge variant={project.status === "Live" ? "default" : "secondary"}>
                          {project.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {project.description}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <Badge key={tech} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </StaggeredList>

              <div className="text-center">
                <Button asChild variant="outline" className="font-medium">
                  <a href="/portfolio" className="flex items-center gap-2">
                    View All Projects
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* About Preview */}
        <ScrollReveal direction="up" delay={800}>
          <section className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h2 className="text-3xl sm:text-4xl font-bold">About Me</h2>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      I'm a passionate full stack developer who loves turning complex problems into 
                      simple, beautiful solutions. When I'm not coding, you'll find me exploring new 
                      technologies or contributing to open source projects.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      I believe in writing clean, maintainable code and creating user experiences 
                      that are not just functional, but delightful.
                    </p>
                  </div>
                  <Button asChild className="font-medium">
                    <a href="/about" className="flex items-center gap-2">
                      Learn More About Me
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </Button>
                </div>

                <div className="relative">
                  {/* Code-style decorative element */}
                  <div className="bg-black border rounded-lg p-6 font-mono text-sm">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="space-y-2 text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <span className="text-blue-500">const</span>
                        <span className="text-white">developer</span>
                        <span>=</span>
                        <span>&#123;</span>
                      </div>
                      <div className="ml-4 text-white">
                        <div>name: <span className="text-green-600">'lwh'</span>,</div>
                        <div>role: <span className="text-green-600">'Full Stack Developer'</span>,</div>
                        <div>passions: <span className="text-blue-600">['coding', 'learning', 'coffee']</span>,</div>
                        <div>currentlyBuilding: <span className="text-green-600">'amazing things'</span></div>
                      </div>
                      <div>&#125;;</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* CTA Section */}
        <ScrollReveal direction="up" delay={1000}>
          <section className="py-20 px-4 sm:px-6 lg:px-8 ">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl sm:text-4xl font-bold">Let's Build Something Amazing</h2>
                <p className=" text-lg max-w-2xl mx-auto leading-relaxed">
                  Have a project in mind? I'd love to hear about it and discuss how we can bring your ideas to life.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button asChild size="lg" variant="secondary" className="font-medium">
                  <a href="/contact" className="flex items-center gap-2">
                    <Mail className="w-4 h-4 "/>
                    Start a Conversation
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="font-medium hover:bg-muted ">
                  <a href="/portfolio" className="flex items-center gap-2">
                    View My Portfolio
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </Button>
              </div>

              {/* Quick contact info */}
              <div className="pt-8 border-t border-primary-foreground/20">
                <p className="text-primary-foreground/80 text-sm">
                  Or reach out directly at <a href="mailto:hello@lwh.dev" className="underline hover:no-underline">hello@lwh.dev</a>
                </p>
              </div>
            </div>
          </section>
        </ScrollReveal>
      </div>
    </PageTransition>
  );
}
