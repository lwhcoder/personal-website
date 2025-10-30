import type { Route } from "./+types/newsletter";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Mail, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Newsletter | lwh" },
    { name: "description", content: "Subscribe to get updates on new projects and tech insights. Weekly or bi-weekly newsletter covering web development, tutorials, and behind-the-scenes content." },
    { name: "keywords", content: "newsletter, web development newsletter, programming tips, tech insights, developer newsletter" },
    { property: "og:title", content: "Newsletter | lwh" },
    { property: "og:description", content: "Subscribe to get updates on new projects and tech insights" },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://lwh.codes/newsletter" },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: "Newsletter | lwh" },
    { name: "twitter:description", content: "Subscribe to get updates on new projects and tech insights" },
  ];
}

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      toast.success("Successfully subscribed to the newsletter!", {
        description: "You'll receive updates on new projects and tech insights.",
      });
      setEmail("");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <main className="min-h-screen py-32">
      <div className="container mx-auto max-w-4xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-20">
          <p className="mb-4 text-xs uppercase tracking-wider text-muted-foreground">Stay updated</p>
          <h1 className="mb-6 text-5xl font-bold sm:text-6xl">Newsletter</h1>
          <p className="max-w-2xl text-xl text-muted-foreground">
            Get updates on new projects, tutorials, and tech insights delivered to your inbox
          </p>
        </div>

        {/* Main Content */}
        <div className="grid gap-16 lg:grid-cols-3">
          {/* Newsletter Form */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-6">
              <div className="space-y-3">
                <h2 className="text-2xl font-medium">Subscribe now</h2>
                <p className="text-muted-foreground">
                  Join the community and never miss an update. Unsubscribe anytime.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex gap-3">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 flex-1"
                  required
                />
                <Button 
                  type="submit" 
                  size="lg" 
                  variant="ghost"
                  disabled={isLoading}
                >
                  {isLoading ? "Subscribing..." : "Subscribe"}
                </Button>
              </form>

              <p className="text-xs text-muted-foreground">
                By subscribing, you agree to receive emails from me. You can unsubscribe at any time.
              </p>
            </div>

            {/* What to Expect */}
            <div className="space-y-6 border-t pt-12">
              <h3 className="text-xs uppercase tracking-wider text-muted-foreground">
                What to expect
              </h3>
              
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full border">
                    <Check className="h-3 w-3" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h4 className="font-medium">Project updates</h4>
                    <p className="text-sm text-muted-foreground">
                      Be the first to know about new projects and features
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full border">
                    <Check className="h-3 w-3" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h4 className="font-medium">Tutorials & guides</h4>
                    <p className="text-sm text-muted-foreground">
                      In-depth tutorials on web development and programming
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full border">
                    <Check className="h-3 w-3" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h4 className="font-medium">Tech insights</h4>
                    <p className="text-sm text-muted-foreground">
                      Thoughts on the latest technologies and best practices
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full border">
                    <Check className="h-3 w-3" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h4 className="font-medium">Behind the scenes</h4>
                    <p className="text-sm text-muted-foreground">
                      Development process and lessons learned from projects
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Info Sidebar */}
          <div className="space-y-12">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Frequency</p>
              <p className="text-sm text-foreground">Weekly or bi-weekly</p>
              <p className="text-sm text-muted-foreground">
                No spam, just quality content, unsubscribe anytime
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Subscribers</p>
              <p className="text-sm text-foreground">Join 1,000+ developers</p>
              <p className="text-sm text-muted-foreground">
                Growing community of tech enthusiasts
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Privacy</p>
              <p className="text-sm text-foreground">Your data is safe</p>
              <p className="text-sm text-muted-foreground">
                I'll never share your email with anyone
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Contact</p>
              <a
                href="mailto:contact@lwh.codes"
                className="group flex items-center gap-2 text-sm text-foreground transition-colors hover:text-muted-foreground"
              >
                <Mail className="h-4 w-4" />
                <span>contact@lwh.codes</span>
              </a>
            </div>
          </div>
        </div>

        {/* Archive */}
        <div className="mt-32 border-t pt-20">
          <div className="mb-12">
            <h2 className="mb-4 text-xs uppercase tracking-wider text-muted-foreground">
              Previous editions
            </h2>
            <p className="text-3xl font-medium sm:text-4xl">
              Newsletter archive
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between border-b pb-6">
              <div className="space-y-1">
                <h3 className="font-medium">Building Modern Web Apps with React Router</h3>
                <p className="text-sm text-muted-foreground">
                  Deep dive into file-based routing and server-side rendering
                </p>
              </div>
              <span className="text-sm text-muted-foreground">Dec 2024</span>
            </div>

            <div className="flex items-center justify-between border-b pb-6">
              <div className="space-y-1">
                <h3 className="font-medium">The State of TypeScript in 2024</h3>
                <p className="text-sm text-muted-foreground">
                  Latest features and best practices for type-safe development
                </p>
              </div>
              <span className="text-sm text-muted-foreground">Nov 2024</span>
            </div>

            <div className="flex items-center justify-between border-b pb-6">
              <div className="space-y-1">
                <h3 className="font-medium">Performance Optimization Techniques</h3>
                <p className="text-sm text-muted-foreground">
                  How to make your web apps blazingly fast
                </p>
              </div>
              <span className="text-sm text-muted-foreground">Oct 2024</span>
            </div>
          </div>

          <div className="mt-8">
            <Link to="/editions">
              <Button variant="ghost" size="lg">
                View all editions
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
