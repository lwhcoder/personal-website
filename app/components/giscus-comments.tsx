import { useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'

export function GiscusComments() {
  const { theme, resolvedTheme } = useTheme()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    // Clear any existing giscus
    ref.current.innerHTML = ''

    // Determine the current theme
    const currentTheme = theme === 'system' ? resolvedTheme : theme
    const giscusTheme = currentTheme === 'dark' ? '/giscus-dark.css' : '/giscus-light.css'

    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.setAttribute('data-repo', 'lwhcoder/personal-website')
    script.setAttribute('data-repo-id', 'R_kgDOPu94rA')
    script.setAttribute('data-category', 'Comments')
    script.setAttribute('data-category-id', 'DIC_kwDOPu94rM4CvYqg')
    script.setAttribute('data-mapping', 'pathname')
    script.setAttribute('data-strict', '0')
    script.setAttribute('data-reactions-enabled', '1')
    script.setAttribute('data-emit-metadata', '0')
    script.setAttribute('data-input-position', 'bottom')
    script.setAttribute('data-theme', giscusTheme)
    script.setAttribute('data-lang', 'en')
    script.setAttribute('crossorigin', 'anonymous')
    script.async = true

    ref.current.appendChild(script)

    return () => {
      if (ref.current) {
        // Clean up
        const iframe = ref.current.querySelector('iframe.giscus-frame')
        if (iframe) {
          iframe.remove()
        }
      }
    }
  }, [theme, resolvedTheme])

  // Send theme change message to existing giscus iframe
  useEffect(() => {
    const currentTheme = theme === 'system' ? resolvedTheme : theme
    const giscusTheme = currentTheme === 'dark' ? '/giscus-dark.css' : '/giscus-dark.css'

    const sendMessage = () => {
      const iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame')
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage(
          {
            giscus: {
              setConfig: {
                theme: giscusTheme
              }
            }
          },
          'https://giscus.app'
        )
      }
    }

    // Send message after a short delay to ensure iframe is loaded
    const timeoutId = setTimeout(sendMessage, 500)
    
    return () => clearTimeout(timeoutId)
  }, [theme, resolvedTheme])

  return <div ref={ref} className="giscus-container" />
}