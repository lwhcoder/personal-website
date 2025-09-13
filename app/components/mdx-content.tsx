'use client'

import * as React from 'react'
import { evaluate } from '@mdx-js/mdx'
import * as runtime from 'react/jsx-runtime'
import { AdvancedCode } from './advanced-code'

const components = {
  AdvancedCode,
  h1: (props: any) => (
    <h1 className="text-4xl font-bold mt-6 mb-4" {...props} />
  ),
  h2: (props: any) => (
    <h2 className="text-3xl font-semibold mt-6 mb-4" {...props} />
  ),
  h3: (props: any) => (
    <h3 className="text-2xl font-semibold mt-5 mb-3" {...props} />
  ),
  h4: (props: any) => (
    <h4 className="text-xl font-semibold mt-4 mb-2" {...props} />
  ),
  h5: (props: any) => (
    <h5 className="text-lg font-medium mt-3 mb-2" {...props} />
  ),
  h6: (props: any) => (
    <h6 className="text-base font-medium mt-2 mb-2" {...props} />
  ),
  p: (props: any) => (
    <p className="my-4 leading-relaxed text-base" {...props} />
  ),

  a: (props: any) => (
    <a
      className="text-foreground hover:text-muted-foreground hover:underline font-medium"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  br: (props: any) => {
    return <br {...props} />
  },
  ul: (props: any) => (
    <ul className="list-disc list-inside my-4 ml-6" {...props} />
  ),
  ol: (props: any) => (
    <ol className="list-decimal list-inside my-4 ml-6" {...props} />
  ),
  li: (props: any) => <li className="mb-1" {...props} />,

  blockquote: (props: any) => (
    <blockquote
      className="border-l-4 border-muted-foreground pl-4 italic text-muted-foreground my-6"
      {...props}
    />
  ),

  img: (props: any) => (
    <img className="rounded-md mx-auto my-6 shadow-md" {...props} />
  ),

  code: ({ className = "", children, ...props }: any) => {
    const match = /language-(\w+)/.exec(className || "");
    const language = match?.[1] ?? "";

    if (language) {
      return (
        <pre className="my-6 rounded-md overflow-x-auto text-sm bg-zinc-950 p-4 shadow-sm">
          <code className={`language-${language}`} {...props}>
            {children}
          </code>
        </pre>
      );
    }

    return (
      <code
        className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-foreground"
        {...props}
      >
        {children}
      </code>
    );
  },

  table: (props: any) => (
    <div className="overflow-x-auto my-6">
      <table
        className="w-full border border-border text-sm text-left"
        {...props}
      />
    </div>
  ),

  thead: (props: any) => <thead className="bg-muted" {...props} />,
  tbody: (props: any) => <tbody {...props} />,
  tr: (props: any) => <tr className="border-b border-border" {...props} />,
  th: (props: any) => (
    <th className="p-2 font-semibold text-foreground" {...props} />
  ),
  td: (props: any) => <td className="p-2 text-muted-foreground" {...props} />,

  hr: (props: any) => <hr className="my-8 border-muted" {...props} />,

  em: (props: any) => (
    <em className="italic text-muted-foreground" {...props} />
  ),
  strong: (props: any) => (
    <strong className="font-semibold text-foreground" {...props} />
  ),
}

interface MDXContentProps {
  source: string
}

export function MDXContent({ source }: MDXContentProps) {
  const [Content, setContent] = React.useState<React.ComponentType | null>(null)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    const renderMDX = async () => {
      try {
        const { default: MDXComponent } = await evaluate(source, {
          ...runtime,
          useMDXComponents: () => components,
        } as any)
        setContent(() => MDXComponent)
        setError(null)
      } catch (err) {
        console.error('MDX rendering error:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
      }
    }

    renderMDX()
  }, [source])

  if (error) {
    return (
      <div className="prose prose-gray dark:prose-invert max-w-none">
        <div className="bg-muted border rounded-md p-4">
          <h3 className="text-foreground font-semibold">MDX Rendering Error</h3>
          <p className="text-muted-foreground text-sm mt-2">
            {error}
          </p>
        </div>
      </div>
    )
  }

  if (!Content) {
    return (
      <div className="prose prose-gray dark:prose-invert max-w-none">
        <div className="animate-pulse">
          <div className="h-4 bg-muted rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-muted rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-muted rounded w-2/3 mb-4"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="prose prose-gray dark:prose-invert max-w-none">
      <Content />
    </div>
  )
}