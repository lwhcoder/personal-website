import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { Card, CardContent } from "~/components/ui/card"
import { Separator } from "~/components/ui/separator"
import { Calendar, Clock, ArrowLeft, Share2, Twitter, Linkedin } from "lucide-react"
import { MDXContent } from "~/components/mdx-content"
import { PageTransition, ScrollReveal } from "~/components/page-transitions"
import { BlogPostSkeleton } from "~/components/loading"
import { useNavigation } from "react-router"
import { promises as fs } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

export async function loader({ params }: { params: { slug: string } }) {
  try {
    const postsDirectory = join(process.cwd(), 'app/posts')
    const filePath = join(postsDirectory, `${params.slug}.mdx`)
    const fileContents = await fs.readFile(filePath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      frontMatter: data,
      content: content,
      slug: params.slug
    }
  } catch (error) {
    throw new Response("Post not found", { status: 404 })
  }
}

export function meta({ data }: { data: any }) {
  if (!data) {
    return [{ title: "Post Not Found" }]
  }
  
  return [
    { title: `${data.frontMatter.title} | lwh` },
    { name: "description", content: data.frontMatter.description },
    { property: "og:title", content: data.frontMatter.title },
    { property: "og:description", content: data.frontMatter.description },
    { property: "og:image", content: data.frontMatter.coverImageSrc },
  ]
}

export default function BlogPost({ loaderData }: { loaderData: any }) {
  const navigation = useNavigation()
  
  // Show loading skeleton during navigation
  if (navigation.state === "loading") {
    return <BlogPostSkeleton />
  }
  
  const { frontMatter, content, slug } = loaderData
  
  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''

  return (
    <PageTransition>
      <div className="min-h-screen">
        {/* Header */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 border-b">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <Button variant="ghost" asChild className="mb-8 transition-all duration-200 hover:translate-x-1">
                <a href="/blog" className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Blog
                </a>
              </Button>
            </ScrollReveal>

            <div className="space-y-6">
              {/* Meta info */}
              <ScrollReveal delay={100}>
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(frontMatter.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {Math.ceil(content.length / 1500)} min read
                  </div>
                </div>
              </ScrollReveal>

              {/* Title */}
              <ScrollReveal delay={200}>
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
                  {frontMatter.title}
                </h1>
              </ScrollReveal>

              {/* Description */}
              <ScrollReveal delay={300}>
                <p className="text-xl leading-relaxed">
                  {frontMatter.description}
                </p>
              </ScrollReveal>

              {/* Tags */}
              <ScrollReveal delay={400}>
                <div className="flex flex-wrap gap-2">
                  {frontMatter.tags?.map((tag: string, index: number) => (
                    <Badge 
                      key={tag} 
                      variant="secondary"
                      className="transition-all duration-200 hover:scale-105"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Cover Image */}
        {frontMatter.coverImageSrc && (
          <ScrollReveal>
            <section className="px-4 sm:px-6 lg:px-8 py-8">
              <div className="max-w-5xl mx-auto">
                <div className="aspect-video rounded-lg overflow-hidden group">
                  <img 
                    src={frontMatter.coverImageSrc}
                    alt={frontMatter.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </div>
            </section>
          </ScrollReveal>
        )}

        {/* Content */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-4 gap-12">
              {/* Main Content */}
              <ScrollReveal className="lg:col-span-3">
                <article className="prose prose-lg max-w-none">
                  <MDXContent source={content} />
                </article>
              </ScrollReveal>

              {/* Sidebar */}
              <aside className="lg:col-span-1">
                <div className="sticky top-8 space-y-8">
                  {/* Share */}
                  <ScrollReveal delay={500}>
                    <Card className="transition-all duration-300 hover:shadow-lg">
                      <CardContent className="p-6">
                        <h3 className="font-semibold mb-4 flex items-center gap-2">
                          <Share2 className="w-4 h-4" />
                          Share this article
                        </h3>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" asChild className="transition-all duration-200 hover:scale-105">
                            <a 
                              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(frontMatter.title)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Twitter className="w-4 h-4" />
                            </a>
                          </Button>
                          <Button size="sm" variant="outline" asChild className="transition-all duration-200 hover:scale-105">
                            <a 
                              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Linkedin className="w-4 h-4" />
                            </a>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </ScrollReveal>

                  {/* Author */}
                  <ScrollReveal delay={600}>
                    <Card className="transition-all duration-300 hover:shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center transition-colors duration-200">
                            <span className="text-lg font-bold">LW</span>
                          </div>
                          <div>
                            <h3 className="font-semibold">lwh</h3>
                            <p className="text-sm">Full-Stack Developer</p>
                          </div>
                        </div>
                        <p className="text-sm mb-4">
                          Passionate about creating modern web experiences and sharing knowledge with the developer community.
                        </p>
                        <Button size="sm" variant="outline" className="w-full transition-all duration-200 hover:scale-105" asChild>
                          <a href="/about">Learn More</a>
                        </Button>
                      </CardContent>
                    </Card>
                  </ScrollReveal>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <Separator />

        {/* Related Articles / CTA */}
        <ScrollReveal>
          <section className="py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold tracking-tight mb-6">
                Enjoyed this article?
              </h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto">
                Check out more of my writing or get in touch if you'd like to discuss web development, 
                collaboration opportunities, or just say hello.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild className="transition-all duration-200 hover:scale-105">
                  <a href="/blog">Read More Articles</a>
                </Button>
                <Button variant="outline" size="lg" asChild className="transition-all duration-200 hover:scale-105">
                  <a href="/contact">Get in Touch</a>
                </Button>
              </div>
            </div>
          </section>
        </ScrollReveal>
      </div>
    </PageTransition>
  )
}