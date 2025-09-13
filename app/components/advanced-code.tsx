'use client'

import { useState } from 'react'
import { ClipboardCopy, Check } from 'lucide-react'
import { Highlight, type Language } from 'prism-react-renderer'
import clsx from 'clsx'

type Command = {
  label: string
  code: string
}

interface AdvancedCodeProps {
  type: 'code' | 'command'
  language?: Language
  code?: string
  commands?: Command[]
}

export function AdvancedCode({
  type,
  language = 'tsx',
  code = '',
  commands = [],
}: AdvancedCodeProps) {
  const [copied, setCopied] = useState(false)
  const [selectedCmd, setSelectedCmd] = useState(commands[0]?.label || 'npm')

  const toCopy =
    type === 'command'
      ? commands.find(c => c.label === selectedCmd)?.code || ''
      : code

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(toCopy)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch (err) {
      // Fallback for browsers that don't support clipboard API
      console.warn('Clipboard API not available')
    }
  }

  return (
    <div className="bg-black border-2 rounded-md overflow-hidden font-mono text-sm my-6">
      {/* Top bar: Language/Command selector + Copy button */}
      <div className="flex items-center justify-between px-4 pt-3">
        {/* Show either tabs for commands OR just the language label */}
        {type === 'command' ? (
          <div className="flex space-x-2">
            {commands.map(({ label }) => (
              <button
                key={label}
                onClick={() => setSelectedCmd(label)}
                className={clsx(
                  'text-xs px-2 py-1 rounded transition-colors',
                  selectedCmd === label
                    ? 'bg-white text-black'
                    : 'text-white/50 hover:text-white'
                )}
              >
                {label}
              </button>
            ))}
          </div>
        ) : (
          <span className="text-xs uppercase tracking-wide font-semibold bg-white text-black p-1 rounded px-2">
            {language}
          </span>
        )}

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="ml-auto text-muted-foreground hover:text-foreground transition"
          title="Copy to clipboard"
        >
          {copied ? <Check size={16} /> : <ClipboardCopy size={16} />}
        </button>
      </div>

      {/* Code / Command Content */}
      <div className="px-4 py-3 overflow-x-auto">
        <Highlight code={toCopy.trim()} language={type === 'command' ? 'bash' : language}>
          {({ tokens, getLineProps, getTokenProps }) => (
            <pre className="text-sm text-white">
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  {line.map((token, key) => (
                    <span
                      key={key}
                      {...getTokenProps({ token })}
                      className={clsx(
                        token.types.includes('keyword') && 'text-muted-foreground',
                        token.types.includes('string') && 'text-foreground',
                        token.types.includes('function') && 'text-foreground',
                        token.types.includes('punctuation') && 'text-muted-foreground',
                        token.types.includes('comment') && 'text-muted-foreground',
                        token.types.includes('plain') && 'text-foreground'
                      )}
                    >
                      {token.content}
                    </span>
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  )
}