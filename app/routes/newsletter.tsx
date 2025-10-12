import { Button } from "~/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Badge } from "~/components/ui/badge"
import { Mail, CheckCircle, Sparkles, TrendingUp, BookOpen, Code, Zap, Bell, Users, Calendar, AlertCircle, Loader2 } from "lucide-react"
import { PageTransition, ScrollReveal, StaggeredList } from "~/components/page-transitions"
import { Form, useActionData, useNavigation, redirect } from "react-router"
import type { Route } from "./+types/newsletter"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Newsletter | lwh" },
    { name: "description", content: "Subscribe to my newsletter for weekly insights on web development, programming tips, and tech trends delivered to your inbox." },
  ]
}

export async function action({ request }: Route.ActionArgs) {
  try {
    const formData = await request.formData();
    
    const subscribeData = {
      email: formData.get("email")?.toString() || "",
      firstName: formData.get("firstName")?.toString() || "",
    };

    // Basic validation
    if (!subscribeData.email) {
      return {
        success: false,
        message: "Please enter your email address.",
        errors: {
          email: "Email is required"
        }
      };
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(subscribeData.email)) {
      return {
        success: false,
        message: "Please enter a valid email address.",
        errors: {
          email: "Please enter a valid email address"
        }
      };
    }

    

    return {
      success: true,
      message: "Thanks for subscribing! Check your email to confirm your subscription."
    };
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later."
    };
  }
}

const features = [
  {
    icon: Code,
    title: "Weekly Coding Tips",
    description: "Get practical programming tips and tricks to improve your development skills"
  },
  {
    icon: BookOpen,
    title: "In-Depth Tutorials",
    description: "Comprehensive guides on web development, frameworks, and best practices"
  },
  {
    icon: TrendingUp,
    title: "Industry Insights",
    description: "Stay ahead with the latest trends and technologies in the tech world"
  },
  {
    icon: Zap,
    title: "Project Updates",
    description: "Behind-the-scenes looks at my latest projects and experiments"
  }
]

const stats = [
  { value: "5K+", label: "Subscribers" },
  { value: "Weekly", label: "Frequency" },
  { value: "95%", label: "Open Rate" },
  { value: "0", label: "Spam" }
]

const recentTopics = [
  "Building Scalable React Applications",
  "Modern TypeScript Patterns",
  "Optimizing Web Performance",
  "API Design Best Practices",
  "Serverless Architecture Guide",
  "CSS-in-JS Deep Dive"
]

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Frontend Developer",
    content: "One of the best tech newsletters I've subscribed to. The content is always relevant and actionable.",
    avatar: "SJ"
  },
  {
    name: "Michael Chen",
    role: "Full Stack Engineer",
    content: "lwh's newsletter has helped me level up my skills significantly. Highly recommend!",
    avatar: "MC"
  },
  {
    name: "Emily Rodriguez",
    role: "Software Architect",
    content: "Clear, concise, and packed with value. I look forward to every issue.",
    avatar: "ER"
  }
]

export default function Newsletter() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <PageTransition>
      <div className="min-h-screen">
        {/* Hero Section */}
        <ScrollReveal direction="up" delay={0}>
          <section className="py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted font-mono text-sm mb-6">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <span>Published Weekly</span>
                </div>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                  Join My Newsletter
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Get weekly insights on web development, programming tips, and the latest tech trends 
                  delivered straight to your inbox. No spam, ever.
                </p>
              </div>

              {/* Subscription Form */}
              <ScrollReveal direction="up" delay={200}>
                <Card className="max-w-2xl mx-auto border-none">
                  <CardContent className="p-8">
                    {/* Success Message */}
                    {actionData?.success && (
                      <div className="mb-6 p-4 rounded-lg flex items-center gap-2 bg-green-50 border border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-900/30 dark:text-green-400">
                        <CheckCircle className="w-5 h-5 flex-shrink-0" />
                        <span className="text-sm font-medium">{actionData.message}</span>
                      </div>
                    )}

                    {/* Error Message */}
                    {actionData && !actionData.success && (
                      <div className="mb-6 p-4 rounded-lg flex items-center gap-2 bg-red-50 border border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-900/30 dark:text-red-400">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <span className="text-sm font-medium">{actionData.message}</span>
                      </div>
                    )}

                    <Form method="post" className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name (Optional)</Label>
                        <Input 
                          id="firstName" 
                          name="firstName"
                          placeholder="John"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input 
                          id="email" 
                          name="email"
                          type="email" 
                          placeholder="john@example.com"
                          className={(actionData && 'errors' in actionData && actionData.errors?.email) ? 'border-red-500' : ''}
                          required
                        />
                        {actionData && 'errors' in actionData && actionData.errors?.email && (
                          <p className="text-sm text-red-600">{actionData.errors.email}</p>
                        )}
                      </div>
                      
                      <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Subscribing...
                          </>
                        ) : (
                          <>
                            <Mail className="w-4 h-4 mr-2" />
                            Subscribe to Newsletter
                          </>
                        )}
                      </Button>
                      
                      <p className="text-xs text-center text-muted-foreground">
                        By subscribing, you agree to receive emails from me. You can unsubscribe at any time.
                      </p>
                    </Form>
                  </CardContent>
                </Card>
              </ScrollReveal>

              {/* Stats */}
              <ScrollReveal direction="up" delay={400}>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">
                        {stat.value}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </section>
        </ScrollReveal>

        {/* What You'll Get */}
        <ScrollReveal direction="up" delay={600}>
          <section className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                  What You'll Get
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Each newsletter is packed with valuable content to help you grow as a developer
                </p>
              </div>

              <StaggeredList staggerDelay={100} className="grid md:grid-cols-2 gap-8">
                {features.map((feature, index) => {
                  const Icon = feature.icon
                  return (
                    <Card key={index} className="text-center hover:shadow-lg transition-shadow border-none">
                      <CardHeader>
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <CardTitle className="text-xl">{feature.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">
                          {feature.description}
                        </p>
                      </CardContent>
                    </Card>
                  )
                })}
              </StaggeredList>
            </div>
          </section>
        </ScrollReveal>

        {/* Recent Topics */}
        <ScrollReveal direction="up" delay={800}>
          <section className="py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                  Recent Topics
                </h2>
                <p className="text-lg text-muted-foreground">
                  Here's what we've been covering lately
                </p>
              </div>

              <StaggeredList staggerDelay={75} className="grid md:grid-cols-2 gap-4">
                {recentTopics.map((topic, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="font-medium">{topic}</span>
                  </div>
                ))}
              </StaggeredList>
            </div>
          </section>
        </ScrollReveal>

        {/* Testimonials */}
        <ScrollReveal direction="up" delay={1000}>
          <section className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                  What Subscribers Say
                </h2>
                <p className="text-lg text-muted-foreground">
                  Join thousands of developers who trust my newsletter
                </p>
              </div>

              <StaggeredList staggerDelay={150} className="grid md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <Card key={index} className="border-none">
                    <CardContent className="p-6">
                      <div className="mb-4">
                        <div className="flex items-center gap-1 text-yellow-500 mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Sparkles key={i} className="w-4 h-4 fill-current" />
                          ))}
                        </div>
                        <p className="text-muted-foreground italic">
                          "{testimonial.content}"
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary">
                          {testimonial.avatar}
                        </div>
                        <div>
                          <div className="font-semibold">{testimonial.name}</div>
                          <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </StaggeredList>
            </div>
          </section>
        </ScrollReveal>

        {/* FAQ */}
        <ScrollReveal direction="up" delay={1200}>
          <section className="py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                  Frequently Asked Questions
                </h2>
              </div>

              <StaggeredList staggerDelay={100} className="grid md:grid-cols-2 gap-8">
                <Card className="border-none">
                  <CardHeader>
                    <CardTitle className="text-lg">How often will I receive emails?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      I send one email per week, usually on Monday mornings. No spam or promotional content.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-none">
                  <CardHeader>
                    <CardTitle className="text-lg">Can I unsubscribe anytime?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Absolutely! Every email includes an unsubscribe link at the bottom. No questions asked.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-none">
                  <CardHeader>
                    <CardTitle className="text-lg">Is my email safe?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Your privacy is important. I never share, sell, or rent your email to third parties.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-none">
                  <CardHeader>
                    <CardTitle className="text-lg">What topics do you cover?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Web development, JavaScript, React, TypeScript, Node.js, career advice, and tech industry insights.
                    </p>
                  </CardContent>
                </Card>
              </StaggeredList>
            </div>
          </section>
        </ScrollReveal>

        {/* Final CTA */}
        <ScrollReveal direction="up" delay={1400}>
          <section className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
            <div className="max-w-4xl mx-auto text-center">
              <Bell className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Ready to Level Up Your Skills?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join 5,000+ developers who are already receiving weekly insights and growing their careers.
              </p>
              <Button size="lg" asChild>
                <a href="#subscribe" onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}>
                  Subscribe Now
                </a>
              </Button>
            </div>
          </section>
        </ScrollReveal>
      </div>
    </PageTransition>
  )
}
