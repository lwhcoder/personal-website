import { Button } from "~/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import { Input } from "~/components/ui/input"
import { ExternalLink, Github, ArrowRight, Search, Folder, Star } from "lucide-react"
import { PageTransition, ScrollReveal, StaggeredList } from "~/components/page-transitions"
import { useState, useMemo } from "react"
import { useSearchParams } from "react-router"

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
    featured: true,
    year: "2024",
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
    featured: false,
    year: "2024",
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
    featured: false,
    year: "2023",
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
    featured: true,
    year: "2024",
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
    featured: false,
    year: "2023",
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
    featured: false,
    year: "2023",
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
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchQuery, setSearchQuery] = useState("")
  
  // Get selected category from URL
  const selectedCategory = searchParams.get("category") || "All"
  
  // Filter projects based on search and category
  const filteredProjects = useMemo(() => {
    let filtered = projects
    
    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(project => 
        project.category.toLowerCase() === selectedCategory.toLowerCase()
      )
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(project => 
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.technologies.some(tech => tech.toLowerCase().includes(query)) ||
        project.category.toLowerCase().includes(query)
      )
    }
    
    return filtered
  }, [selectedCategory, searchQuery])
  
  const featuredProjects = filteredProjects.filter(project => project.featured)
  const otherProjects = filteredProjects.filter(project => !project.featured)
  
  const handleCategoryClick = (category: string) => {
    const newParams = new URLSearchParams(searchParams)
    if (category === "All") {
      newParams.delete("category")
    } else {
      newParams.set("category", category)
    }
    setSearchParams(newParams)
  }
  return (
    <PageTransition>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Portfolio
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              A collection of projects that showcase my skills in full-stack development, 
              modern web technologies, and creative problem-solving.
            </p>
            
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input 
                  placeholder="Search projects..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" className="shrink-0">
                <Folder className="w-4 h-4 mr-2" />
                {selectedCategory === "All" ? "All Categories" : selectedCategory}
              </Button>
            </div>
          </ScrollReveal>

          {/* Category Filter */}
          <ScrollReveal delay={200} className="max-w-7xl mx-auto mb-16">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category, index) => (
                <Badge 
                  key={category} 
                  variant={selectedCategory === category ? "default" : "outline"} 
                  className="cursor-pointer border-none transition-all duration-200 hover:scale-105"
                  onClick={() => handleCategoryClick(category)}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </ScrollReveal>

          {/* Results Summary */}
          <ScrollReveal delay={300} className="max-w-7xl mx-auto text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              {selectedCategory === "All" ? "All Projects" : `${selectedCategory} Projects`}
            </h2>
            <p className="text-muted-foreground">
              {filteredProjects.length === 0 
                ? "No projects found matching your criteria" 
                : selectedCategory === "All"
                  ? "Explore all my work"
                  : `${filteredProjects.length} project${filteredProjects.length === 1 ? '' : 's'} found`
              }
            </p>
          </ScrollReveal>

          

          {/* Other Projects */}
          {otherProjects.length > 0 && (
            <div className="max-w-7xl mx-auto">
              <ScrollReveal delay={600} className="text-center mb-12">
                <h3 className="text-xl sm:text-2xl font-bold mb-4">
                  {featuredProjects.length > 0 ? "More Projects" : "All Projects"}
                </h3>
                <p className="text-muted-foreground">
                  {featuredProjects.length > 0 ? "Additional work and experiments" : "Explore my complete portfolio"}
                </p>
              </ScrollReveal>
              
              <StaggeredList staggerDelay={150} className="space-y-16">
                {otherProjects.map((project, index) => {
                  const isEven = index % 2 === 0
                  const layoutVariant = index % 3
                  
                  if (layoutVariant === 0) {
                    // Layout 1: Image left, content right
                    return (
                      <article key={project.id} className="group">
                        <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-12 items-center`}>
                          <div className="lg:w-1/2">
                            <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 p-1">
                              <div className="w-full h-full overflow-hidden rounded-xl">
                                <img 
                                  src={project.image}
                                  alt={project.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                  loading="lazy"
                                />
                              </div>
                            </div>
                          </div>
                          
                          <div className="lg:w-1/2 space-y-6">
                            <div className="flex items-center gap-3">
                              <Badge className="text-xs font-medium">{project.category}</Badge>
                              <Badge 
                                variant={project.status === "Live" ? "default" : "secondary"}
                                className={`text-xs ${project.status === "Live" ? "bg-green-600 hover:bg-green-700" : ""}`}
                              >
                                {project.status}
                              </Badge>
                              <span className="text-sm text-muted-foreground font-mono">{project.year}</span>
                            </div>
                            
                            <div className="space-y-4">
                              <h4 className="text-2xl lg:text-3xl font-bold group-hover:text-primary transition-colors">
                                {project.title}
                              </h4>
                              
                              <p className="text-muted-foreground leading-relaxed text-lg">
                                {project.description}
                              </p>
                            </div>
                            
                            <div className="space-y-4">
                              <div className="flex flex-wrap gap-2">
                                {project.technologies.map((tech) => (
                                  <span 
                                    key={tech} 
                                    className="px-3 py-1 text-xs font-medium bg-muted rounded-full hover:bg-muted-foreground/20 transition-colors duration-200"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                              
                              <div className="flex gap-4">
                                {project.links.demo && (
                                  <Button className="group/btn" asChild>
                                    <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                                      View Live
                                      <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                    </a>
                                  </Button>
                                )}
                                {project.links.github && (
                                  <Button variant="outline" className="group/btn" asChild>
                                    <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                                      <Github className="w-4 h-4 mr-2" />
                                      Code
                                    </a>
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </article>
                    )
                  } else if (layoutVariant === 1) {
                    // Layout 2: Vertical stack with larger image
                    return (
                      <article key={project.id} className="group">
                        <div className="max-w-4xl mx-auto">
                          <div className="space-y-8">
                            <div className="text-center space-y-4">
                              <div className="flex items-center justify-center gap-3">
                                <Badge variant="outline" className="text-xs border-2">{project.category}</Badge>
                                <Badge 
                                  variant={project.status === "Live" ? "default" : "secondary"}
                                  className={`text-xs ${project.status === "Live" ? "bg-green-600 hover:bg-green-700" : ""}`}
                                >
                                  {project.status}
                                </Badge>
                                <span className="text-sm text-muted-foreground font-mono">{project.year}</span>
                              </div>
                              
                              <h4 className="text-3xl lg:text-4xl font-bold group-hover:text-primary transition-colors">
                                {project.title}
                              </h4>
                              
                              <p className="text-muted-foreground leading-relaxed text-lg max-w-2xl mx-auto">
                                {project.description}
                              </p>
                            </div>
                            
                            <div className="aspect-[16/10] overflow-hidden rounded-3xl bg-gradient-to-br from-secondary/20 to-primary/20 p-2">
                              <div className="w-full h-full overflow-hidden rounded-2xl">
                                <img 
                                  src={project.image}
                                  alt={project.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                  loading="lazy"
                                />
                              </div>
                            </div>
                            
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                                {project.technologies.map((tech) => (
                                  <span 
                                    key={tech} 
                                    className="px-4 py-2 text-sm font-medium bg-muted rounded-full hover:bg-primary/10 transition-colors duration-200"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                              
                              <div className="flex gap-4">
                                {project.links.demo && (
                                  <Button size="lg" className="group/btn" asChild>
                                    <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                                      Explore Project
                                      <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                    </a>
                                  </Button>
                                )}
                                {project.links.github && (
                                  <Button variant="outline" size="lg" className="group/btn" asChild>
                                    <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                                      <Github className="w-4 h-4 mr-2" />
                                      View Code
                                    </a>
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </article>
                    )
                  } else {
                    // Layout 3: Asymmetric grid layout
                    return (
                      <article key={project.id} className="group">
                        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
                          <div className={`lg:col-span-2 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                            <div className="space-y-6">
                              <div className="flex items-start justify-between">
                                <div className="space-y-3">
                                  <div className="flex items-center gap-3">
                                    <Badge variant="secondary" className="text-xs">{project.category}</Badge>
                                    <Badge 
                                      variant={project.status === "Live" ? "default" : "secondary"}
                                      className={`text-xs ${project.status === "Live" ? "bg-green-600 hover:bg-green-700" : ""}`}
                                    >
                                      {project.status}
                                    </Badge>
                                  </div>
                                  
                                  <h4 className="text-2xl lg:text-3xl font-bold group-hover:text-primary transition-colors">
                                    {project.title}
                                  </h4>
                                </div>
                                
                                <span className="text-sm text-muted-foreground font-mono whitespace-nowrap">
                                  {project.year}
                                </span>
                              </div>
                              
                              <p className="text-muted-foreground leading-relaxed">
                                {project.description}
                              </p>
                              
                              <div className="space-y-4">
                                <div>
                                  <h5 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">
                                    Key Features
                                  </h5>
                                  <ul className="space-y-2">
                                    {project.highlights.slice(0, 3).map((highlight, idx) => (
                                      <li key={idx} className="flex items-start gap-2 text-sm">
                                        <ArrowRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                        <span className="text-muted-foreground">{highlight}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                
                                <div className="flex flex-wrap gap-2">
                                  {project.technologies.slice(0, 4).map((tech) => (
                                    <span 
                                      key={tech} 
                                      className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-md font-medium"
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                  {project.technologies.length > 4 && (
                                    <span className="px-3 py-1 text-xs bg-muted rounded-md font-medium">
                                      +{project.technologies.length - 4} more
                                    </span>
                                  )}
                                </div>
                                
                                <div className="flex gap-3 pt-2">
                                  {project.links.demo && (
                                    <Button variant="default" className="group/btn" asChild>
                                      <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                                        Launch
                                        <ExternalLink className="w-3 h-3 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                      </a>
                                    </Button>
                                  )}
                                  {project.links.github && (
                                    <Button variant="ghost" className="group/btn" asChild>
                                      <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                                        <Github className="w-4 h-4 mr-2" />
                                        Source
                                      </a>
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className={`lg:col-span-1 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                            <div className="aspect-[3/4] overflow-hidden rounded-xl bg-gradient-to-br from-muted/50 to-primary/10">
                              <img 
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                loading="lazy"
                              />
                            </div>
                          </div>
                        </div>
                      </article>
                    )
                  }
                })}
              </StaggeredList>
            </div>
          )}
          {/* Featured Projects */}
          {featuredProjects.length > 0 && (
            <div className="max-w-7xl mx-auto mb-20">
              <ScrollReveal delay={400} className="text-center mb-8">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <h3 className="text-xl sm:text-2xl font-bold">Featured Projects</h3>
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                </div>
                <p className="text-muted-foreground">My most impactful and recent work</p>
              </ScrollReveal>
              
              <StaggeredList staggerDelay={150} className="space-y-8">
                {featuredProjects.map((project) => (
                  <article key={project.id} className="group py-8 border-b border-border/40 last:border-b-0">
                    <div className="flex flex-col lg:flex-row gap-8">
                      <div className="lg:w-1/2 aspect-video overflow-hidden rounded-lg">
                        <img 
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                      
                      <div className="lg:w-1/2 space-y-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Badge>{project.category}</Badge>
                          <Badge 
                            variant={project.status === "Live" ? "default" : "secondary"}
                            className={project.status === "Live" ? "bg-green-600 hover:bg-green-700" : ""}
                          >
                            {project.status}
                          </Badge>
                          <span className="text-muted-foreground">{project.year}</span>
                        </div>
                        
                        <h4 className="text-2xl lg:text-3xl font-bold group-hover:text-primary transition-colors">
                          {project.title}
                        </h4>
                        
                        <p className="text-muted-foreground leading-relaxed">
                          {project.description}
                        </p>
                        
                        <div className="space-y-3">
                          <h5 className="font-semibold text-sm uppercase tracking-wide">Key Highlights:</h5>
                          <ul className="grid sm:grid-cols-2 gap-2">
                            {project.highlights.map((highlight, index) => (
                              <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                                <ArrowRight className="w-3 h-3 text-primary flex-shrink-0" />
                                {highlight}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.map((tech) => (
                            <Badge key={tech} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex flex-wrap gap-3 pt-2">
                          {project.links.demo && (
                            <Button asChild>
                              <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-4 h-4 mr-2" />
                                Live Demo
                              </a>
                            </Button>
                          )}
                          {project.links.github && (
                            <Button variant="outline" asChild>
                              <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                                <Github className="w-4 h-4 mr-2" />
                                Source Code
                              </a>
                            </Button>
                          )}
                          {project.links.case_study && (
                            <Button variant="outline" asChild>
                              <a href={project.links.case_study}>
                                Read Case Study
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </StaggeredList>
            </div>
          )}

          {/* No Results */}
          {filteredProjects.length === 0 && (
            <ScrollReveal delay={400} className="max-w-2xl mx-auto text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">No projects found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search terms or category filter to find what you're looking for.
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery("")
                  handleCategoryClick("All")
                }}
              >
                Clear Filters
              </Button>
            </ScrollReveal>
          )}
        </section>

        {/* CTA Section */}
        <ScrollReveal>
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