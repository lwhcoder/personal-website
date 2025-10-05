import { Button } from "~/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import { Input } from "~/components/ui/input"
import { Calendar, Clock, Search, ArrowRight, BookOpen } from "lucide-react"
import type { LoaderFunctionArgs } from "react-router"
import { useLoaderData, useSearchParams, useNavigation } from "react-router"
import { useState, useMemo, Suspense } from "react"
import { PageTransition, ScrollReveal, StaggeredList } from "~/components/page-transitions"
import { PageLoading } from "~/components/loading"
import fs from "fs"
import path from "path"
import matter from "gray-matter"

export function meta() {
  return [
    { title: "Blog | lwh" },
    { name: "description", content: "Read my thoughts on web development, programming, and technology trends." },
  ]
}

interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  coverImageSrc?: string
  readTime?: string
}

export async function loader({ request }: LoaderFunctionArgs) {
  const postsDirectory = path.join(process.cwd(), "app", "posts")
  
  try {
    const filenames = fs.readdirSync(postsDirectory)
    const posts: BlogPost[] = []
    
    for (const filename of filenames) {
      if (filename.endsWith('.mdx')) {
        const filePath = path.join(postsDirectory, filename)
        const fileContents = fs.readFileSync(filePath, 'utf8')
        const { data } = matter(fileContents)
        
        // Calculate read time (rough estimate: 200 words per minute)
        const wordCount = fileContents.split(/\s+/).length
        const readTime = Math.ceil(wordCount / 200)
        
        posts.push({
          slug: data.slug || filename.replace('.mdx', ''),
          title: data.title || 'Untitled',
          description: data.description || '',
          date: data.date || new Date().toISOString().split('T')[0],
          tags: data.tags || [],
          coverImageSrc: data.coverImageSrc || 'https://placehold.co/1280x720.png',
          readTime: `${readTime} min read`
        })
      }
    }
    
    // Sort posts by date (newest first)
    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    
    // Get all unique tags
    const allTags = Array.from(new Set(posts.flatMap(post => post.tags)))
    
    return { posts, allTags }
  } catch (error) {
    console.error('Error loading blog posts:', error)
    return { posts: [], allTags: [] }
  }
}

export default function Blog() {
  const { posts, allTags } = useLoaderData<typeof loader>()
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchQuery, setSearchQuery] = useState("")
  const navigation = useNavigation()
  console.log(posts)
  // Get selected tag from URL or state
  const selectedTag = searchParams.get("tag") || "all"
  
  // Show loading state during navigation
  if (navigation.state === "loading") {
    return <PageLoading title="Loading Blog" subtitle="Fetching articles..." />
  }
  
  // Filter posts based on search and tag
  const filteredPosts = useMemo(() => {
    let filtered = posts
    
    // Filter by tag
    if (selectedTag !== "all") {
      filtered = filtered.filter((post: BlogPost) => 
        post.tags.some((tag: string) => tag.toLowerCase() === selectedTag.toLowerCase())
      )
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter((post: BlogPost) => 
        post.title.toLowerCase().includes(query) ||
        post.description.toLowerCase().includes(query) ||
        post.tags.some((tag: string) => tag.toLowerCase().includes(query))
      )
    }
    
    return filtered
  }, [posts, selectedTag, searchQuery])
  
  const handleTagClick = (tag: string) => {
    const newParams = new URLSearchParams(searchParams)
    if (tag === "all") {
      newParams.delete("tag")
    } else {
      newParams.set("tag", tag)
    }
    setSearchParams(newParams)
  }

  return (
    <PageTransition>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Blog
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Thoughts, tutorials, and insights on web development, programming, and the ever-evolving world of technology.
            </p>
            
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input 
                  placeholder="Search articles..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" className="shrink-0">
                <BookOpen className="w-4 h-4 mr-2" />
                {selectedTag === "all" ? "All Topics" : selectedTag}
              </Button>
            </div>
          </ScrollReveal>

          {/* Tags */}
          <ScrollReveal delay={200} className="max-w-7xl mx-auto mb-16">
            <div className="flex flex-wrap justify-center gap-2">
              <Badge 
                variant={selectedTag === "all" ? "default" : "outline"} 
                className="cursor-pointer border-none transition-all duration-200 hover:scale-105"
                onClick={() => handleTagClick("all")}
              >
                All
              </Badge>
              {allTags.map((tag: string, index: number) => (
                <Badge 
                  key={tag} 
                  variant={selectedTag === tag ? "default" : "outline"} 
                  className="cursor-pointer hover:bg-foreground border-none transition-all duration-200 hover:scale-105"
                  onClick={() => handleTagClick(tag)}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </ScrollReveal>

          {/* All Articles */}
          <div className="max-w-7xl mx-auto">
            <ScrollReveal delay={400} className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                {selectedTag === "all" ? "All Articles" : `Articles tagged "${selectedTag}"`}
              </h2>
              <p className="text-muted-foreground">
                {filteredPosts.length === 0 
                  ? "No articles found matching your criteria" 
                  : selectedTag === "all"
                    ? "Explore all my posts"
                    : `${filteredPosts.length} article${filteredPosts.length === 1 ? '' : 's'} found`
                }
              </p>
            </ScrollReveal>
            
            <StaggeredList staggerDelay={150} className="space-y-8 px-4 sm:px-6 lg:px-8">
              {filteredPosts.map((post: BlogPost) => (
                <article key={post.slug} className="group py-8 border-b border-border/40 last:border-b-0 text-xl">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/3 aspect-video overflow-hidden flex-shrink-0">
                      <img 
                        src={post.coverImageSrc || 'https://placehold.co/1280x720.png'}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    
                    <div className="md:w-2/3 space-y-4">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(post.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.readTime}
                        </div>
                      </div>
                      
                      <h3 className="text-xl sm:text-2xl font-bold group-hover:text-foreground transition-colors">
                        {post.title}
                      </h3>
                      
                      <p className="text-muted-foreground leading-relaxed">
                        {post.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map((tag: string) => (
                          <Badge 
                            key={tag} 
                            variant="secondary" 
                            className="text-xs cursor-pointer hover:bg-muted-foreground/20 transition-colors duration-200"
                            onClick={() => handleTagClick(tag)}
                          >
                            {tag}
                          </Badge>
                        ))}
                        {post.tags.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{post.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                      
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="p-0 h-auto font-medium text-foreground group/button" 
                        asChild
                      >
                        <a href={`/blog/${post.slug}`} className="flex items-center gap-1">
                          Read more
                          <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover/button:translate-x-1" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </StaggeredList>
          </div>
        </section>

        {/* Newsletter CTA */}
        <ScrollReveal>
          <section className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">
                Stay Updated
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Subscribe to my newsletter to get the latest articles and insights delivered directly to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1"
                />
                <Button className="shrink-0 transition-all duration-200 hover:scale-105">
                  Subscribe
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                No spam, unsubscribe at any time.
              </p>
            </div>
          </section>
        </ScrollReveal>
      </div>
    </PageTransition>
  )
}