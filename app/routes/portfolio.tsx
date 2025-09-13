import { Button } from "~/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import { ExternalLink, Github, ArrowRight } from "lucide-react"
import { PageTransition, ScrollReveal, StaggeredList } from "~/components/page-transitions"

export function meta() {
  return [
    { title: "Portfolio | lwh" },
    { name: "description", content: "Explore my portfolio of web development projects, from full-stack applications to modern frontend experiences." },
  ]
}

const projects = [
  {
    id: "ecommerce-platform",
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution with advanced features like inventory management, payment processing, and analytics dashboard. Built with modern technologies for optimal performance.",
    image: "/api/placeholder/600/400",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Stripe", "Tailwind CSS", "Prisma"],
    category: "Full-Stack",
    status: "Live",
    links: {
      demo: "#",
      github: "#",
      case_study: "#"
    },
    highlights: [
      "Handles 10K+ daily active users",
      "99.9% uptime with automatic scaling",
      "Advanced analytics and reporting",
      "Multi-vendor marketplace support"
    ]
  },
  {
    id: "saas-dashboard",
    title: "SaaS Analytics Dashboard",
    description: "A comprehensive analytics platform for SaaS companies to track user engagement, revenue metrics, and business KPIs with real-time data visualization.",
    image: "/api/placeholder/600/400",
    technologies: ["React", "D3.js", "Node.js", "MongoDB", "Express", "WebSocket"],
    category: "Dashboard",
    status: "Live",
    links: {
      demo: "#",
      github: "#"
    },
    highlights: [
      "Real-time data processing",
      "Interactive charts and graphs",
      "Custom reporting features",
      "Multi-tenant architecture"
    ]
  },
  {
    id: "mobile-app",
    title: "React Native Mobile App",
    description: "A cross-platform mobile application for fitness tracking with social features, workout planning, and progress analytics.",
    image: "/api/placeholder/600/400",
    technologies: ["React Native", "Expo", "Firebase", "Redux", "TypeScript"],
    category: "Mobile",
    status: "Beta",
    links: {
      github: "#"
    },
    highlights: [
      "Cross-platform compatibility",
      "Offline-first architecture",
      "Social sharing features",
      "Real-time notifications"
    ]
  },
  {
    id: "ai-content-generator",
    title: "AI Content Generator",
    description: "An intelligent content creation platform that uses OpenAI's API to generate high-quality blog posts, social media content, and marketing copy.",
    image: "/api/placeholder/600/400",
    technologies: ["Next.js", "OpenAI API", "Prisma", "PostgreSQL", "Stripe"],
    category: "AI/ML",
    status: "Live",
    links: {
      demo: "#",
      github: "#"
    },
    highlights: [
      "GPT-4 integration",
      "Custom prompt templates",
      "Content scheduling",
      "Team collaboration tools"
    ]
  },
  {
    id: "blockchain-explorer",
    title: "Blockchain Explorer",
    description: "A modern blockchain explorer for viewing transactions, blocks, and network statistics with an intuitive user interface.",
    image: "/api/placeholder/600/400",
    technologies: ["Vue.js", "Web3.js", "Ethereum", "Chart.js", "Vuetify"],
    category: "Blockchain",
    status: "Live",
    links: {
      demo: "#",
      github: "#"
    },
    highlights: [
      "Real-time blockchain data",
      "Advanced search capabilities",
      "Network analytics",
      "Mobile-responsive design"
    ]
  },
  {
    id: "developer-portfolio",
    title: "Developer Portfolio Template",
    description: "A modern, fully customizable portfolio template for developers built with React Router and Tailwind CSS.",
    image: "/api/placeholder/600/400",
    technologies: ["React Router", "Tailwind CSS", "TypeScript", "Vite", "MDX"],
    category: "Template",
    status: "Open Source",
    links: {
      demo: "#",
      github: "#"
    },
    highlights: [
      "Fully responsive design",
      "Dark/light mode support",
      "Blog integration with MDX",
      "Easy customization"
    ]
  }
]

const categories = ["All", "Full-Stack", "Dashboard", "Mobile", "AI/ML", "Blockchain", "Template"]

export default function Portfolio() {
  return (
    <PageTransition>
      <div className="min-h-screen">
        {/* Hero Section */}
        <ScrollReveal direction="up" delay={0}>
          <section className="py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                  My Portfolio
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                  A collection of projects that showcase my skills in full-stack development, 
                  modern web technologies, and creative problem-solving.
                </p>
                
                {/* Category Filter */}
                <StaggeredList 
                  staggerDelay={50}
                  className="flex flex-wrap justify-center gap-2 mb-8"
                >
                  {categories.map((category) => (
                    <Button 
                      key={category} 
                      variant={category === "All" ? "default" : "outline"} 
                      size="sm"
                      className="text-sm"
                    >
                      {category}
                    </Button>
                  ))}
                </StaggeredList>
              </div>

              {/* Featured Project */}
              <ScrollReveal direction="up" delay={200}>
                <div className="mb-20">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-4">Featured Project</h2>
                    <p className="text-muted-foreground">My most recent and impactful work</p>
                  </div>
                  
                  <Card className="overflow-hidden">
                    <div className="grid lg:grid-cols-2 gap-0">
                      <div className="aspect-video lg:aspect-auto">
                        <img 
                          src="/api/placeholder/800/600" 
                          alt={projects[0].title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-8 lg:p-12 flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-4">
                          <Badge>{projects[0].category}</Badge>
                          <Badge variant="outline" className="text-foreground border-foreground">
                            {projects[0].status}
                          </Badge>
                        </div>
                        
                        <h3 className="text-2xl lg:text-3xl font-bold mb-4">{projects[0].title}</h3>
                        <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                          {projects[0].description}
                        </p>
                        
                        <div className="mb-6">
                          <h4 className="font-semibold mb-3">Key Highlights:</h4>
                          <ul className="space-y-2">
                            {projects[0].highlights.map((highlight, index) => (
                              <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                                <ArrowRight className="w-4 h-4 text-primary" />
                                {highlight}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="mb-6">
                          <div className="flex flex-wrap gap-2">
                            {projects[0].technologies.map((tech) => (
                              <Badge key={tech} variant="secondary" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-3">
                          {projects[0].links.demo && (
                            <Button asChild>
                              <a href={projects[0].links.demo} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-4 h-4 mr-2" />
                                Live Demo
                              </a>
                            </Button>
                          )}
                          {projects[0].links.github && (
                            <Button variant="outline" asChild>
                              <a href={projects[0].links.github} target="_blank" rel="noopener noreferrer">
                                <Github className="w-4 h-4 mr-2" />
                                Source Code
                              </a>
                            </Button>
                          )}
                          {projects[0].links.case_study && (
                            <Button variant="outline" asChild>
                              <a href={projects[0].links.case_study}>
                                Read Case Study
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </ScrollReveal>

              {/* All Projects */}
              <ScrollReveal direction="up" delay={400}>
                <div>
                  <div className="text-center mb-12">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-4">All Projects</h2>
                    <p className="text-muted-foreground">Explore my complete portfolio</p>
                  </div>
                  
                  <StaggeredList
                    staggerDelay={100}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                  >
                    {projects.slice(1).map((project) => (
                      <Card key={project.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                        <div className="aspect-video overflow-hidden">
                          <img 
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        
                        <CardHeader>
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="outline">{project.category}</Badge>
                            <Badge 
                              variant={project.status === "Live" ? "default" : "secondary"}
                              className={project.status === "Live" ? "bg-foreground" : ""}
                            >
                              {project.status}
                            </Badge>
                          </div>
                          <CardTitle className="text-xl group-hover:text-primary transition-colors">
                            {project.title}
                          </CardTitle>
                        </CardHeader>
                        
                        <CardContent className="space-y-4">
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {project.description}
                          </p>
                          
                          <div className="flex flex-wrap gap-1">
                            {project.technologies.slice(0, 3).map((tech) => (
                              <Badge key={tech} variant="secondary" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                            {project.technologies.length > 3 && (
                              <Badge variant="secondary" className="text-xs">
                                +{project.technologies.length - 3} more
                              </Badge>
                            )}
                          </div>
                          
                          <div className="flex gap-2 pt-2">
                            {project.links.demo && (
                              <Button size="sm" asChild>
                                <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="w-3 h-3 mr-1" />
                                  Demo
                                </a>
                              </Button>
                            )}
                            {project.links.github && (
                              <Button variant="outline" size="sm" asChild>
                                <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                                  <Github className="w-3 h-3 mr-1" />
                                  Code
                                </a>
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </StaggeredList>
                </div>
              </ScrollReveal>
            </div>
          </section>
        </ScrollReveal>

        {/* CTA Section */}
        <ScrollReveal direction="up" delay={600}>
          <section className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">
                Interested in Working Together?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                I'm always excited to take on new challenges and create amazing digital experiences. 
                Let's discuss your project and see how I can help bring your vision to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <a href="/contact">Start a Project</a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="/about">Learn More About Me</a>
                </Button>
              </div>
            </div>
          </section>
        </ScrollReveal>
      </div>
    </PageTransition>
  )
}