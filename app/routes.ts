import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("about", "routes/about.tsx"),
  route("projects", "routes/projects.tsx"),
  route("blog", "routes/blog.tsx"),
  route("blog/:slug", "routes/blog.$slug.tsx"),
  route("contact", "routes/contact.tsx"),
  route("newsletter", "routes/newsletter.tsx"),
  route("editions", "routes/editions.tsx"),
  route("editions/:slug", "routes/editions.$slug.tsx"),
  route("changelog", "routes/changelog.tsx"),
  route("privacy", "routes/privacy.tsx"),
  route("sitemap.xml", "routes/sitemap[.]xml.tsx"),
  route("blog-search-data.json", "routes/blog-search-data[.]json.tsx"),
] satisfies RouteConfig;
