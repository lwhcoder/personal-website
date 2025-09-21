import { useEffect, useState } from 'react'
import { MessageCircle } from 'lucide-react'

interface CommentCountProps {
  repo: string
  mapping: 'pathname' | 'url' | 'title' | 'og:title'
  term?: string
}

/**
 * Component to display comment count for a page
 * Useful for blog listings, cards, etc.
 */
export function CommentCount({ repo, mapping, term }: CommentCountProps) {
  const [count, setCount] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getCommentCount = async () => {
      try {
        // This would require GitHub API integration
        // For now, we'll use a placeholder
        setCount(0)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching comment count:', error)
        setCount(null)
        setLoading(false)
      }
    }

    getCommentCount()
  }, [repo, mapping, term])

  if (loading) {
    return (
      <div className="flex items-center gap-1 text-muted-foreground text-sm">
        <MessageCircle className="w-4 h-4" />
        <span>...</span>
      </div>
    )
  }

  if (count === null) return null

  return (
    <div className="flex items-center gap-1 text-muted-foreground text-sm hover:text-foreground transition-colors">
      <MessageCircle className="w-4 h-4" />
      <span>{count} {count === 1 ? 'comment' : 'comments'}</span>
    </div>
  )
}

/**
 * Lightweight comments component for pages that don't need full Giscus
 */
interface QuickCommentsProps {
  repo: string
  discussionUrl?: string
  title?: string
}

export function QuickComments({ repo, discussionUrl, title = "Join the discussion" }: QuickCommentsProps) {
  return (
    <div className="border border-border rounded-lg p-6 text-center bg-muted/50">
      <MessageCircle className="w-8 h-8 mx-auto mb-3 text-muted-foreground" />
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4 max-w-md mx-auto">
        Comments and discussions for this page are hosted on GitHub Discussions.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        {discussionUrl ? (
          <a
            href={discussionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            View Discussion
          </a>
        ) : (
          <a
            href={`https://github.com/${repo}/discussions`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Start Discussion
          </a>
        )}
      </div>
    </div>
  )
}

export default CommentCount