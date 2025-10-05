import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { Card, CardContent } from "~/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "~/components/ui/carousel"
import { ExternalLink, Github, MapPin, Calendar, Coffee, Code, Heart, Zap } from "lucide-react"
import { PageTransition, ScrollReveal, StaggeredList } from "~/components/page-transitions"
import { QuickComments } from "~/components/comment-utils"

export function meta() {
  return [
    { title: "About | lwh" },
    { name: "description", content: "Learn more about my background, skills, and experience as a full-stack developer." },
  ]
}

const skills = {
  frontend: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Vue.js", "Vite", "Framer Motion"],
  backend: ["Node.js", "Python", "PostgreSQL", "MongoDB", "Express.js", "FastAPI", "GraphQL"],
  tools: ["Git", "Docker", "AWS", "Vercel", "Linux", "VSCode", "Figma", "Postman"],
  languages: ["JavaScript", "TypeScript", "Python", "SQL", "HTML", "CSS", "Bash"]
}

const timeline = [
  {
    year: "2024",
    title: "Senior Full-Stack Developer",
    company: "Tech Corp",
    description: "Leading a team of 5 developers in building scalable web applications. Architected microservices handling 10M+ requests daily. Implemented advanced caching strategies that reduced response times by 60%. Mentored junior developers and established best practices for code quality and testing.",
    technologies: ["React", "Node.js", "AWS", "Docker", "PostgreSQL"],
    achievements: ["Team Leadership", "Performance Optimization", "Mentoring"]
  },
  {
    year: "2022",
    title: "Full-Stack Developer",
    company: "Startup Inc",
    description: "Built the entire customer-facing platform from scratch, serving 50K+ active users. Designed and implemented REST APIs with comprehensive documentation. Created automated testing suites achieving 90% code coverage. Deployed applications using CI/CD pipelines with zero-downtime deployments.",
    technologies: ["Vue.js", "Python", "MongoDB", "Kubernetes"],
    achievements: ["Full-Stack Architecture", "API Design", "DevOps Implementation"]
  },
  {
    year: "2020",
    title: "Frontend Developer",
    company: "Digital Agency",
    description: "Developed responsive web interfaces for 20+ client projects. Collaborated closely with UX/UI designers to create pixel-perfect implementations. Optimized website performance achieving 95+ Lighthouse scores. Integrated third-party services and payment gateways.",
    technologies: ["React", "SCSS", "Webpack", "Firebase"],
    achievements: ["Client Management", "Performance Optimization", "Design Implementation"]
  },
  {
    year: "2019",
    title: "Computer Science Graduate",
    company: "University",
    description: "Graduated Magna Cum Laude with a focus on software engineering and web technologies. Completed capstone project: a real-time collaborative code editor. Active member of the programming club and hackathon participant. Teaching assistant for web development courses.",
    technologies: ["Java", "C++", "JavaScript", "MySQL"],
    achievements: ["Academic Excellence", "Teaching", "Research"]
  }
]

const stats = [
  { label: "Years of Experience", value: "5+", icon: Calendar },
  { label: "Projects Completed", value: "50+", icon: Code },
  { label: "Happy Clients", value: "30+", icon: Heart },
  { label: "Cups of Coffee", value: "∞", icon: Coffee }
]

const interests = [
  { name: "Open Source", description: "Contributing to projects that make a difference" },
  { name: "Photography", description: "Capturing moments and beautiful landscapes" },
  { name: "Tech Blogging", description: "Sharing knowledge and learning experiences" },
  { name: "Mentoring", description: "Helping others grow in their development journey" },
  { name: "Travel", description: "Exploring new cultures and gaining perspectives" },
  { name: "Gaming", description: "Strategy games and indie titles enthusiast" }
]

export default function About() {
  return (
    <PageTransition>
      <div className="min-h-screen">
        {/* Hero Section */}
        <ScrollReveal direction="up" delay={0}>
          <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
            {/* Background Pattern */}

            <div className="relative max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
                    Hi, I'm <span className="text-primary">lwh</span>
                  </h1>
                  <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                    A passionate full-stack developer with 5+ years of experience crafting digital experiences
                    that matter. I specialize in building scalable web applications using modern technologies
                    and best practices.
                  </p>
                  <div className="flex items-center gap-4 mb-8 text-muted-foreground">
                    <MapPin className="w-5 h-5" />
                    <span>San Francisco, CA</span>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <Button size="lg" asChild>
                      <a href="/contact">Let's Collaborate</a>
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                      <a href="#timeline">View Experience</a>
                    </Button>
                  </div>
                </div>

                <div className="relative aspect-square">
                    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Stats Section */}
        <ScrollReveal direction="up" delay={200}>
          <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                <StaggeredList staggerDelay={100} className="contents">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                        <stat.icon className="w-8 h-8 text-primary" />
                      </div>
                      <div className="text-3xl font-bold mb-2">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </StaggeredList>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* About Content */}
        <ScrollReveal direction="up" delay={300}>
          <section className="py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-6">My Journey</h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  From a curious computer science student to a seasoned developer,
                  my path has been shaped by continuous learning and a passion for creating meaningful digital experiences.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-12 mb-16">
                <Card className="p-8 border-none">
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                    <Code className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">The Beginning</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    My journey into programming started during my university years when I stumbled upon web development
                    during a computer science course. The ability to create interactive experiences that could reach
                    anyone with an internet connection fascinated me. I spent countless nights learning HTML, CSS,
                    and JavaScript, building small projects and gradually falling in love with the craft.
                  </p>
                </Card>

                <Card className="p-8 border-none">
                  <div className="w-16 h-16 bg-secondary/10 rounded-lg flex items-center justify-center mb-6">
                    <Zap className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">The Evolution</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    As I progressed in my career, I evolved from focusing solely on frontend development to becoming
                    a full-stack developer. I learned that understanding both client and server-side technologies
                    allows me to build more cohesive and efficient applications. Each project taught me something
                    new, from database optimization to user experience design.
                  </p>
                </Card>
              </div>

              <Card className="p-8 mb-16 border-none">
                <h3 className="text-2xl font-semibold mb-6 text-center">What Drives Me</h3>
                <div className="prose prose-lg max-w-none text-center">
                  <p className="text-muted-foreground leading-relaxed">
                    I believe that great software is not just about clean code—it's about solving real problems
                    for real people. Every line of code I write is guided by empathy for the end user and a
                    commitment to creating experiences that are not only functional but delightful. I'm constantly
                    learning new technologies and methodologies, staying current with industry trends, and
                    contributing to the developer community through open source projects and knowledge sharing.
                  </p>
                </div>
              </Card>

              {/* Skills Section */}
              <div className="space-y-12">
                <h3 className="text-3xl font-bold text-center">Skills & Technologies</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  {Object.entries(skills).map(([category, skillList]) => (
                    <Card key={category} className="p-6 border-none">
                      <h4 className="text-lg font-semibold mb-4 capitalize">{category}</h4>
                      <StaggeredList staggerDelay={50} className="flex flex-wrap gap-2">
                        {skillList.map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-sm">
                            {skill}
                          </Badge>
                        ))}
                      </StaggeredList>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Timeline - Borderless */}
        <ScrollReveal direction="up" delay={400}>
          <section id="timeline" className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/20">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-6">Professional Timeline</h2>
                <p className="text-xl text-muted-foreground">
                  A detailed look at my professional journey and key achievements
                </p>
              </div>

              <div className="space-y-16">
                <StaggeredList staggerDelay={200} className="space-y-16">
                  {timeline.map((item, index) => (
                    <div key={index} className="relative">
                      <div className="grid lg:grid-cols-3 gap-8 items-start">
                        {/* Year */}
                        <div className="lg:text-right">
                          <div className="inline-block lg:block">
                            <div className="text-4xl font-bold text-primary mb-2">{item.year}</div>
                            <div className="text-sm text-muted-foreground uppercase tracking-wide">
                              {item.company}
                            </div>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="lg:col-span-2">
                          <div className="bg-background rounded-2xl p-8 shadow-lg">
                            <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
                            <p className="text-muted-foreground leading-relaxed mb-6">
                              {item.description}
                            </p>

                            {/* Technologies */}
                            <div className="mb-6">
                              <h4 className="text-sm font-semibold mb-3 text-muted-foreground">Technologies Used</h4>
                              <div className="flex flex-wrap gap-2">
                                {item.technologies.map((tech) => (
                                  <Badge key={tech} variant="outline" className="text-xs">
                                    {tech}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            {/* Achievements */}
                            <div>
                              <h4 className="text-sm font-semibold mb-3 text-muted-foreground">Key Achievements</h4>
                              <div className="flex flex-wrap gap-2">
                                {item.achievements.map((achievement) => (
                                  <Badge key={achievement} className="text-xs">
                                    {achievement}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Connector line (optional visual element) */}
                      {index < timeline.length - 1 && (
                        <div className="hidden lg:block absolute left-1/3 transform -translate-x-1/2 mt-8">
                          <div className="w-px h-16 bg-gradient-to-b from-primary/50 to-transparent"></div>
                        </div>
                      )}
                    </div>
                  ))}
                </StaggeredList>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Interests & Hobbies */}
        <ScrollReveal direction="up" delay={500}>
          <section className="py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-6">Beyond Code</h2>
                <p className="text-xl text-muted-foreground">
                  When I'm not coding, you'll find me exploring these interests
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
              {interests.map((interest, index) => (
                      <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                        <h3 className="font-semibold mb-2">{interest.name}</h3>
                        <p className="text-sm text-muted-foreground">{interest.description}</p>
                      </Card>
                    ))}
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Discussion Section */}
        <ScrollReveal direction="up" delay={600}>
          <section className="py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <QuickComments
                repo="lwhcoder/personal-website"
                title="Questions or feedback about my background?"
              />
            </div>
          </section>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal direction="up" delay={700}>
          <section className="py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6">Ready to Build Something Amazing?</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                I'm always excited to work on new projects and collaborate with fellow creators.
                Whether you have a specific project in mind or just want to chat about technology,
                I'd love to hear from you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button size="lg" asChild>
                  <a href="/contact">Start a Conversation</a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="/portfolio" className="inline-flex items-center">
                    Explore My Work
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