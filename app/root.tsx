import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "./components/ui/sonner";
import type { Route } from "./+types/root";
import "./app.css";
import "./styles/syntax-highlight.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="lwh" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <link rel="canonical" href="https://lwh.codes" />
        <Meta />
        <Links />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "lwh",
              url: "https://lwh.codes",
              jobTitle: "Full Stack Developer",
              description: "Full stack developer building digital experiences with clean code and thoughtful design",
              sameAs: [
                "https://github.com/lwhcoder",
                "https://x.com/@lwhhhh_",
                "https://discord.gg/lwhcoder"
              ],
              knowsAbout: ["React", "Next.js", "TypeScript", "Node.js", "Web Development", "Full Stack Development"],
            }),
          }}
        />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          {children}
          <Footer />
          <Toaster />
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;
  let is404 = false;

  if (isRouteErrorResponse(error)) {
    is404 = error.status === 404;
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  // Custom 404 page
  if (is404) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div className="container mx-auto max-w-2xl px-6 text-center">
          <div className="space-y-8">
            {/* 404 Number */}
            <div>
              <h1 className="text-9xl font-bold tracking-tighter sm:text-[12rem]">
                404
              </h1>
            </div>

            {/* Message */}
            <div className="space-y-4">
              <h2 className="text-3xl font-medium sm:text-4xl">
                Page not found
              </h2>
              <p className="text-lg text-muted-foreground">
                The page you're looking for doesn't exist or has been moved.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <a
                href="/"
                className="inline-flex items-center justify-center rounded-md px-6 py-3 text-sm transition-colors hover:bg-muted"
              >
                Go home
              </a>
              <a
                href="/blog"
                className="inline-flex items-center justify-center rounded-md px-6 py-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                View blog
              </a>
            </div>

            {/* Additional Links */}
            <div className="border-t pt-8">
              <p className="mb-4 text-sm text-muted-foreground">
                Looking for something specific?
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <a href="/about" className="text-muted-foreground hover:text-foreground">
                  About
                </a>
                <a href="/projects" className="text-muted-foreground hover:text-foreground">
                  Projects
                </a>
                <a href="/contact" className="text-muted-foreground hover:text-foreground">
                  Contact
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Generic error page for non-404 errors
  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
