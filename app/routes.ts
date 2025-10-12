import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/about", "routes/about.tsx"),
  route("/contact", "routes/contact.tsx"),
  route("/portfolio", "routes/portfolio.tsx"),
  route("/blog", "routes/blog.tsx"),
  route("/blog/:slug", "routes/blog.$slug.tsx"),
  route("/report-bug", "routes/report-bug.tsx"),
  route("/changelog", "routes/changelog.tsx"),
  route("/quotes", "routes/quotes.tsx"),
  route("/color-generator", "routes/color-generator.tsx"),
  route("/github-stats", "routes/github-stats.tsx"),
  route("/dashboard", "routes/dashboard.tsx"),
  route("/newsletter", "routes/newsletter.tsx"),
] satisfies RouteConfig;
