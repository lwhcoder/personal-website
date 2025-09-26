import { Button } from "~/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Textarea } from "~/components/ui/textarea"
import { Badge } from "~/components/ui/badge"
import { Mail, MessageCircle, Calendar, MapPin, Github, Twitter, Linkedin, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { PageTransition, ScrollReveal, StaggeredList } from "~/components/page-transitions"
import { Form, useActionData, useNavigation, redirect } from "react-router"
import type { Route } from "./+types/contact"
import { createMailgunService } from "~/lib/mailgun"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Contact | lwh" },
    { name: "description", content: "Get in touch with me for collaboration opportunities, questions, or just to say hello." },
  ]
}

export async function action({ request }: Route.ActionArgs) {
  try {
    const formData = await request.formData();
    
    const contactData = {
      firstName: formData.get("firstName")?.toString() || "",
      lastName: formData.get("lastName")?.toString() || "",
      email: formData.get("email")?.toString() || "",
      subject: formData.get("subject")?.toString() || "",
      message: formData.get("message")?.toString() || "",
    };

    // Basic validation
    if (!contactData.firstName || !contactData.lastName || !contactData.email || !contactData.message) {
      return {
        success: false,
        message: "Please fill in all required fields.",
        errors: {
          firstName: !contactData.firstName ? "First name is required" : null,
          lastName: !contactData.lastName ? "Last name is required" : null,
          email: !contactData.email ? "Email is required" : null,
          message: !contactData.message ? "Message is required" : null,
        }
      };
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactData.email)) {
      return {
        success: false,
        message: "Please enter a valid email address.",
        errors: {
          email: "Please enter a valid email address"
        }
      };
    }

    // Send email using Mailgun
    const mailgunService = createMailgunService();
    const result = await mailgunService.sendEmail(contactData);

    if (result.success) {
      // Redirect to home page with success message
      return redirect("/?message=success");
    }

    return result;
  } catch (error) {
    console.error("Contact form error:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later."
    };
  }
}

const contactMethods = [
  {
    icon: Mail,
    title: "Email",
    description: "Send me an email anytime",
    value: "contact@lwh.dev",
    href: "mailto:contact@lwh.dev"
  },
  {
    icon: MessageCircle,
    title: "Discord",
    description: "Chat with me on Discord",
    value: "devlwh",
    href: "#"
  },
  {
    icon: Calendar,
    title: "Schedule a Call",
    description: "Book a 30-minute consultation",
    value: "calendly.com/lwh",
    href: "#"
  }
]

const socialLinks = [
  { icon: Github, label: "GitHub", href: "#" },
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" }
]

export default function Contact() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <PageTransition>
      <div className="min-h-screen border-none">
        {/* Hero Section */}
        <ScrollReveal direction="up" delay={0}>
          <section className="py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                  Let's Connect
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  I'm always excited to discuss new projects, creative ideas, or opportunities to collaborate. 
                  Drop me a line and let's start a conversation!
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-12">
                {/* Contact Form */ }
                <ScrollReveal direction="up" delay={200}>
                  <Card className="max-h-fit rounded-none border-none">
                    <CardHeader>
                      <CardTitle>Send me a message</CardTitle>
                      <p className="text-muted-foreground">
                        Fill out the form below and I'll get back to you as soon as possible.
                      </p>
                    </CardHeader>
                    <CardContent>
                      {/* Error Messages */}
                      {actionData && !actionData.success && (
                        <div className="mb-6 p-4 rounded-lg flex items-center gap-2 bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-900/30 dark:text-red-400">
                          <AlertCircle className="w-5 h-5 flex-shrink-0" />
                          <span className="text-sm font-medium">{actionData.message}</span>
                        </div>
                      )}

                      <Form method="post" className="space-y-6">
                        <div className="grid sm:grid-cols-2 gap-4 ">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input 
                              id="firstName" 
                              name="firstName"
                              placeholder="John"
                              className={(actionData && 'errors' in actionData && actionData.errors?.firstName) ? 'border-red-500' : ''}
                              required
                            />
                            {actionData && 'errors' in actionData && actionData.errors?.firstName && (
                              <p className="text-sm text-red-600">{actionData.errors.firstName}</p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input 
                              id="lastName" 
                              name="lastName"
                              placeholder="Doe"
                              className={(actionData && 'errors' in actionData && actionData.errors?.lastName) ? 'border-red-500' : ''}
                              required
                            />
                            {actionData && 'errors' in actionData && actionData.errors?.lastName && (
                              <p className="text-sm text-red-600">{actionData.errors.lastName}</p>
                            )}
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
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
                        
                        <div className="space-y-2">
                          <Label htmlFor="subject">Subject</Label>
                          <Input 
                            id="subject" 
                            name="subject"
                            placeholder="Project collaboration" 
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="message">Message</Label>
                          <Textarea 
                            id="message" 
                            name="message"
                            placeholder="Tell me about your project or idea..." 
                            className={`min-h-32 ${(actionData && 'errors' in actionData && actionData.errors?.message) ? 'border-red-500' : ''}`}
                            required
                          />
                          {actionData && 'errors' in actionData && actionData.errors?.message && (
                            <p className="text-sm text-red-600">{actionData.errors.message}</p>
                          )}
                        </div>
                        
                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Sending...
                            </>
                          ) : (
                            "Send Message"
                          )}
                        </Button>
                      </Form>
                    </CardContent>
                  </Card>
                </ScrollReveal>

                
                <ScrollReveal direction="up" delay={400}>
                  <div className="lg:order-first">
                    <Card className="transition-all border-none rounded-none duration-300 hover:shadow-lg">
                      <CardContent className="p-12">
                        <div className="text-9xl select-none">
                          <img src="https://placehold.co/1280x1780.png"/>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </ScrollReveal>
              </div>

              {/* Contact Info Section */}
              <ScrollReveal direction="up" delay={600}>
                <div className="mt-16 grid lg:grid-cols-2 gap-12">
                  <div className="lg:col-span-2">
                    <div className="space-y-8">
                      {/* Contact Methods */}
                      <div>
                        <h2 className="text-2xl font-bold mb-6">Other ways to reach me</h2>
                        <StaggeredList
                          staggerDelay={100}
                          className="space-y-4"
                        >
                          {contactMethods.map((method, index) => {
                            const Icon = method.icon
                            return (
                              <Card key={index} className="transition-colors rounded-none border-none hover:bg-muted/50">
                                <CardContent className="flex items-center gap-4 p-6">
                                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                    <Icon className="w-6 h-6 text-primary" />
                                  </div>
                                  <div className="flex-1">
                                    <h3 className="font-semibold">{method.title}</h3>
                                    <p className="text-sm text-muted-foreground mb-1">
                                      {method.description}
                                    </p>
                                    <a 
                                      href={method.href}
                                      className="text-sm font-medium text-primary hover:underline"
                                    >
                                      {method.value}
                                    </a>
                                  </div>
                                </CardContent>
                              </Card>
                            )
                          })}
                        </StaggeredList>
                      </div>

                      {/* Additional Info Cards */}
                      <StaggeredList
                        staggerDelay={150}
                        className="grid md:grid-cols-2 gap-8"
                      >
                        {/* Location */}
                        <Card className="rounded-none border-none">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <MapPin className="w-5 h-5" />
                              Location
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground mb-4">
                              Currently based in Dallas, TX. Available for remote work worldwide 
                              and open to occasional travel for the right projects.
                            </p>
                            <div className="flex gap-2">
                              <Badge variant="outline">🇺🇸 Dallas, Texas</Badge>
                              <Badge variant="outline">🌍 Remote Friendly</Badge>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Social Links */}
                        <Card className="rounded-none min-h-full border-none">
                          <CardHeader>
                            <CardTitle>Connect on social</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="flex gap-4">
                              {socialLinks.map((social, index) => {
                                const Icon = social.icon
                                return (
                                  <a
                                    key={index}
                                    href={social.href}
                                    className="flex items-center justify-center w-12 h-12 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                                    aria-label={social.label}
                                  >
                                    <Icon className="w-5 h-5" />
                                  </a>
                                )
                              })}
                            </div>
                          </CardContent>
                        </Card>
                      </StaggeredList>

                      {/* Availability */}
                      <ScrollReveal direction="up" delay={800}>
                        <Card className="rounded-none border-none">
                          <CardHeader>
                            <CardTitle>Availability</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Response time</span>
                                <Badge variant="secondary">Usually within 24h</Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Current status</span>
                                <Badge className="bg-muted text-foreground">
                                  ✨ Available for new projects
                                </Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Timezone</span>
                                <Badge variant="outline">CDT (GMT-8)</Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </ScrollReveal>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </section>
        </ScrollReveal>

        {/* FAQ */}
        <ScrollReveal direction="up" delay={1000}>
          <section className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-lg text-muted-foreground">
                  Quick answers to common questions
                </p>
              </div>

              <StaggeredList
                staggerDelay={100}
                className="grid md:grid-cols-2 gap-8"
              >
                <Card className="min-h-full rounded-none border-none">
                  <CardHeader>
                    <CardTitle className="text-lg">What's your typical response time?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      I usually respond to emails and messages within 24 hours during weekdays. 
                      For urgent matters, feel free to mention it in your message subject.
                    </p>
                  </CardContent>
                </Card>

                <Card className="min-h-full rounded-none border-none">
                  <CardHeader>
                    <CardTitle className="text-lg">Do you work with international clients?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Absolutely! I work with clients from around the world and am comfortable 
                      with different timezones and remote collaboration tools.
                    </p>
                  </CardContent>
                </Card>

                <Card className="min-h-full rounded-none border-none">
                  <CardHeader>
                    <CardTitle className="text-lg">What types of projects do you take on?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      I work on web applications, e-commerce sites, SaaS platforms, and custom 
                      software solutions. From startups to enterprise, I adapt to different scales.
                    </p>
                  </CardContent>
                </Card>

                <Card className="min-h-full rounded-none border-none">
                  <CardHeader>
                    <CardTitle className="text-lg">Do you offer consultation calls?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Yes! I offer free 30-minute consultation calls to discuss your project 
                      requirements and see how I can help bring your ideas to life.
                    </p>
                  </CardContent>
                </Card>
              </StaggeredList>
            </div>
          </section>
        </ScrollReveal>
      </div>
    </PageTransition>
  )
}