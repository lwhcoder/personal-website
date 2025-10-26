import type { Route } from "./+types/sitemap[.]xml";

export async function loader() {
  const { getAllPosts } = await import("~/lib/blog.server");
  const posts = getAllPosts();
  
  const baseUrl = "https://lwh.codes";
  const currentDate = new Date().toISOString();
  
  const staticPages = [
    { url: "", priority: "1.0", changefreq: "weekly", lastmod: currentDate },
    { url: "/about", priority: "0.8", changefreq: "monthly", lastmod: currentDate },
    { url: "/projects", priority: "0.8", changefreq: "weekly", lastmod: currentDate },
    { url: "/blog", priority: "0.9", changefreq: "daily", lastmod: currentDate },
    { url: "/contact", priority: "0.7", changefreq: "monthly", lastmod: currentDate },
    { url: "/newsletter", priority: "0.7", changefreq: "monthly", lastmod: currentDate },
    { url: "/editions", priority: "0.7", changefreq: "weekly", lastmod: currentDate },
    { url: "/changelog", priority: "0.6", changefreq: "monthly", lastmod: currentDate },
    { url: "/privacy", priority: "0.5", changefreq: "yearly", lastmod: currentDate },
  ];
  
  const blogPosts = posts.map(post => ({
    url: `/blog/${post.slug}`,
    priority: "0.6",
    changefreq: "monthly",
    lastmod: post.date,
  }));
  
  const allPages = [...staticPages, ...blogPosts];
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
