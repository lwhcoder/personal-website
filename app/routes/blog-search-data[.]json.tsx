export async function loader() {
  const { getAllPosts, formatDate } = await import("~/lib/blog.server");
  const posts = getAllPosts();
  
  const postsData = posts.map(post => ({
    slug: post.slug,
    title: post.title,
    description: post.description,
    date: formatDate(post.date),
    tags: post.tags,
    cover: post.cover,
    readingTime: post.readingTime,
  }));

  return new Response(JSON.stringify(postsData), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=300", // Cache for 5 minutes
    },
  });
}
