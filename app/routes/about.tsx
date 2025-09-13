import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Separator } from "~/components/ui/separator"
import { Download, ExternalLink, Github, Mail } from "lucide-react"
import { PageTransition, ScrollReveal, StaggeredList } from "~/components/page-transitions"

export function meta() {
  return [
    { title: "About | lwh" },
    { name: "description", content: "Learn more about my background, skills, and experience as a full-stack developer." },
  ]
}

const skills = {
  frontend: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Vue.js", "Vite"],
  backend: ["Node.js", "Python", "PostgreSQL", "MongoDB", "Express.js", "FastAPI"],
  tools: ["Git", "Docker", "AWS", "Vercel", "Linux", "VSCode"]
}

const timeline = [
  {
    year: "2024",
    title: "Senior Full-Stack Developer",
    company: "Tech Corp",
    description: "Led development of multiple high-traffic web applications using React, Next.js, and Node.js. Mentored junior developers and improved deployment processes."
  },
  {
    year: "2022",
    title: "Full-Stack Developer",
    company: "Startup Inc",
    description: "Built and maintained customer-facing applications. Implemented CI/CD pipelines and improved application performance by 40%."
  },
  {
    year: "2020",
    title: "Frontend Developer",
    company: "Digital Agency",
    description: "Created responsive web interfaces and collaborated with designers to deliver pixel-perfect implementations."
  },
  {
    year: "2019",
    title: "Computer Science Graduate",
    company: "University",
    description: "Graduated with honors, specializing in software engineering and web development."
  }
]

export default function About() {
  return (
    <PageTransition>
      <div className="min-h-screen">
        {/* Hero Section */}
        <ScrollReveal direction="up" delay={0}>
          <section className="py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                  About Me
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  I'm a passionate full-stack developer with 5+ years of experience building modern web applications. I love creating elegant solutions to complex problems.
                </p>
              </div>

              <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-start">
                {/* Profile */}
                <ScrollReveal direction="up" delay={200}>
                  <div className="lg:col-span-1">
                    <Card>
                      <CardHeader>
                        <div className="w-32 h-32 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                          <span className="text-4xl font-bold text-white">LW</span>
                        </div>
                        <CardTitle className="text-center">lwh</CardTitle>
                        <p className="text-center text-muted-foreground">Full-Stack Developer</p>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex flex-col gap-2">
                          <Button variant="outline" className="w-full" asChild>
                            <a href="mailto:contact@lwh.dev">
                              <Mail className="w-4 h-4 mr-2" />
                              Contact Me
                            </a>
                          </Button>
                          <Button variant="outline" className="w-full" asChild>
                            <a href="#" target="_blank" rel="noopener noreferrer">
                              <Github className="w-4 h-4 mr-2" />
                              GitHub
                            </a>
                          </Button>
                          <Button variant="outline" className="w-full" asChild>
                            <a href="#" target="_blank" rel="noopener noreferrer">
                              <Download className="w-4 h-4 mr-2" />
                              Resume
                            </a>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </ScrollReveal>

                {/* Content */}
                <ScrollReveal direction="up" delay={400}>
                  <div className="lg:col-span-2 space-y-6 lg:space-y-8">
                    {/* Bio */}
                    <Card>
                      <CardHeader>
                        <CardTitle>My Story</CardTitle>
                      </CardHeader>
                      <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                        <p>
                          I discovered my passion for programming during university when I built my first web application. 
                          What started as curiosity quickly became an obsession with creating digital experiences that make a difference.
                        </p>
                        <p>
                          Over the years, I've worked with startups and established companies, contributing to projects that 
                          serve millions of users. I believe in writing clean, maintainable code and building products that 
                          users love to interact with.
                        </p>
                        <p>
                          When I'm not coding, you'll find me exploring new technologies, contributing to open source projects, 
                          or sharing knowledge through blog posts and mentoring.
                        </p>
                      </CardContent>
                    </Card>

                    {/* Skills */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Skills & Technologies</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-4">
                          <div>
                            <h3 className="font-semibold mb-3">Frontend</h3>
                            <StaggeredList 
                              staggerDelay={50}
                              className="flex flex-wrap gap-2"
                            >
                              {skills.frontend.map((skill) => (
                                <Badge key={skill} variant="secondary">
                                  {skill}
                                </Badge>
                              ))}
                            </StaggeredList>
                          </div>
                          <div>
                            <h3 className="font-semibold mb-3">Backend</h3>
                            <StaggeredList 
                              staggerDelay={50}
                              className="flex flex-wrap gap-2"
                            >
                              {skills.backend.map((skill) => (
                                <Badge key={skill} variant="secondary">
                                  {skill}
                                </Badge>
                              ))}
                            </StaggeredList>
                          </div>
                          <div>
                            <h3 className="font-semibold mb-3">Tools & Others</h3>
                            <StaggeredList 
                              staggerDelay={50}
                              className="flex flex-wrap gap-2"
                            >
                              {skills.tools.map((skill) => (
                                <Badge key={skill} variant="secondary">
                                  {skill}
                                </Badge>
                              ))}
                            </StaggeredList>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Timeline */}
        <ScrollReveal direction="up" delay={600}>
          <section className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                  Experience Timeline
                </h2>
                <p className="text-lg text-muted-foreground">
                  My professional journey over the years
                </p>
              </div>

              <div className="relative max-w-4xl mx-auto">
                {/* Timeline line */}
                <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-border"></div>
                
                <div className="space-y-8 sm:space-y-12">
                  <StaggeredList
                    staggerDelay={150}
                    className="space-y-8 sm:space-y-12"
                  >
                    {timeline.map((item, index) => (
                      <div key={index} className="relative flex items-start gap-4 sm:gap-8">
                        {/* Timeline dot */}
                        <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-background border-4 border-primary flex items-center justify-center">
                          <span className="text-xs sm:text-sm font-bold text-primary">{item.year}</span>
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <Card className="w-full">
                            <CardHeader>
                              <CardTitle className="text-lg sm:text-xl">{item.title}</CardTitle>
                              <p className="text-muted-foreground font-medium">{item.company}</p>
                            </CardHeader>
                            <CardContent>
                              <p className="text-muted-foreground text-sm sm:text-base">{item.description}</p>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    ))}
                  </StaggeredList>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal direction="up" delay={800}>
          <section className="py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">
                Let's Work Together
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                I'm always interested in hearing about new opportunities and exciting projects. 
                Let's discuss how we can bring your ideas to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button size="lg" asChild>
                  <a href="/contact">Get In Touch</a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="/portfolio" className="inline-flex items-center">
                    View My Work
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </div>
            </div>
          </section>
        </ScrollReveal>
      </div>
    </PageTransition>
  )
}