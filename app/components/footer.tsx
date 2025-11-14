"use client"

import { Github, Twitter, Linkedin, Mail } from "lucide-react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { useState } from "react"
import { toast } from "sonner"
export function Footer() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      toast.success("Successfully subscribed!", {
        description: "Check your inbox for confirmation.",
      });
      setEmail("");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <footer className="border-t">
      <div className="container mx-auto max-w-7xl px-6 py-16 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">lwh</p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Full-stack developer crafting modern web experiences
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-wider text-muted-foreground">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="text-sm text-foreground/60 transition-colors hover:text-foreground"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-sm text-foreground/60 transition-colors hover:text-foreground"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/projects"
                  className="text-sm text-foreground/60 transition-colors hover:text-foreground"
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="/blog"
                  className="text-sm text-foreground/60 transition-colors hover:text-foreground"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-sm text-foreground/60 transition-colors hover:text-foreground"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-wider text-muted-foreground">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/newsletter"
                  className="text-sm text-foreground/60 transition-colors hover:text-foreground"
                >
                  Newsletter
                </a>
              </li>
              <li>
                <a
                  href="/editions"
                  className="text-sm text-foreground/60 transition-colors hover:text-foreground"
                >
                  Editions
                </a>
              </li>
              <li>
                <a
                  href="/changelog"
                  className="text-sm text-foreground/60 transition-colors hover:text-foreground"
                >
                  Changelog
                </a>
              </li>
              <li>
                <a
                  href="https://bio.lwh.codes"
                  className="text-sm text-foreground/60 transition-colors hover:text-foreground"
                >
                  Links
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-wider text-muted-foreground">Newsletter</h3>
            <form className="space-y-2" onSubmit={handleSubmit}>
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-9 w-full text-sm"
                disabled={isLoading}
              />
              <Button type="submit" size="sm" disabled={isLoading} className="w-full">
                {isLoading ? "..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t pt-8 sm:flex-row">
          <div className="flex items-center gap-5">
            <a
              href="https://github.com/lwhcoder"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </a>
            <a
              href="https://x.com/@lwhhhh_"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              placehold
              <span className="sr-only">Twitter</span>
            </a>
            <a
              href="https://discord.gg/lwhcoder"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Linkedin className="h-4 w-4" />
              <span className="sr-only">Discord</span>
            </a>
            <a
              href="mailto:contact@lwh.codes"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Mail className="h-4 w-4" />
              <span className="sr-only">Email</span>
            </a>
          </div>

          <div className="flex flex-col items-center gap-3 text-xs text-muted-foreground sm:flex-row sm:gap-6">
            <p>© 2025 lwh.codes</p>
            <a
              href="/privacy"
              className="transition-colors hover:text-foreground"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
