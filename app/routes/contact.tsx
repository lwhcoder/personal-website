import type { Route } from "./+types/contact";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Mail, Github, Twitter, Linkedin } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Contact | lwh" },
    { name: "description", content: "Get in touch for collaborations, projects, or just to say hi. Available for freelance work and consulting." },
    { name: "keywords", content: "contact, hire developer, freelance, collaboration, web development services" },
    { property: "og:title", content: "Contact | lwh" },
    { property: "og:description", content: "Get in touch for collaborations, projects, or just to say hi" },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://lwh.codes/contact" },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: "Contact | lwh" },
    { name: "twitter:description", content: "Get in touch for collaborations, projects, or just to say hi" },
  ];
}

export default function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted");
  };

  return (
    <main className="min-h-screen py-32">
      <div className="container mx-auto max-w-4xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-20">
          <p className="mb-4 text-xs uppercase tracking-wider text-muted-foreground">Get in touch</p>
          <h1 className="mb-6 text-5xl font-bold sm:text-6xl">Contact</h1>
          <p className="max-w-2xl text-xl text-muted-foreground">
            Have a project in mind or just want to chat? Feel free to reach out
          </p>
        </div>

        <div className="grid gap-16 lg:grid-cols-3">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm text-muted-foreground">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your name"
                    required
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm text-muted-foreground">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    required
                    className="h-11"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm text-muted-foreground">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="What's this about?"
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm text-muted-foreground">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Your message..."
                  required
                  rows={8}
                  className="resize-none"
                />
              </div>

              <Button type="submit" size="lg">
                Send message
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-12">
            {/* Email */}
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Email</p>
              <a
                href="mailto:contact@lwh.codes"
                className="group flex items-center gap-3 text-foreground transition-colors hover:text-muted-foreground"
              >
                <Mail className="h-4 w-4" />
                <span className="text-sm">contact@lwh.codes</span>
              </a>
            </div>

            {/* Social */}
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Social</p>
              <div className="space-y-3">
                <a
                  href="https://github.com/lwhcoder"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-foreground transition-colors hover:text-muted-foreground"
                >
                  <Github className="h-4 w-4" />
                  <span className="text-sm">GitHub</span>
                </a>
                <a
                  href="https://x.com/@lwhhhh_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-foreground transition-colors hover:text-muted-foreground"
                >
                  <Twitter className="h-4 w-4" />
                  <span className="text-sm">Twitter</span>
                </a>
                <a
                  href="https://discord.gg/lwhcoder"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-foreground transition-colors hover:text-muted-foreground"
                >
                  <Linkedin className="h-4 w-4" />
                  <span className="text-sm">Discord</span>
                </a>
              </div>
            </div>

            {/* Availability */}
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Availability</p>
              <div className="space-y-2">
                <p className="text-sm text-foreground">Currently available for:</p>
                <ul className="space-y-1 text-sm text-muted-foreground ml-2">
                  <li> • Freelance projects</li>
                  <li> • Consulting</li>
                  <li> • Collaborations</li>
                </ul>
              </div>
            </div>

            {/* Response Time */}
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Response time</p>
              <p className="text-sm text-muted-foreground">
                Usually within 24-48 hours
              </p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-32 border-t pt-20">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Location</p>
              <p className="text-sm text-foreground">Based remotely</p>
              <p className="text-sm text-muted-foreground">Working with clients worldwide</p>
            </div>

            <div className="space-y-3">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Languages</p>
              <p className="text-sm text-foreground">English, Arabic</p>
              <p className="text-sm text-muted-foreground">Professional proficiency</p>
            </div>

            <div className="space-y-3">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Timezone</p>
              <p className="text-sm text-foreground">UTC+0</p>
              <p className="text-sm text-muted-foreground">Flexible with schedules</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
