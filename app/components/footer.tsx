import { Github, Twitter, Linkedin, Mail, Disc } from 'lucide-react'
import { VisitorCounter } from './visitor-counter'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-primary/20 bg-background/95 terminal-window">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4 lg:col-span-1">
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-primary text-background">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M6 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 18h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
              <span className="font-semibold text-lg text-primary">~/lwh</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              <span className="text-primary">$</span> Full-stack developer passionate about creating modern web experiences.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4 lg:col-span-1">
            <h3 className="text-sm font-semibold text-primary">[Navigation]</h3>
            <ul className="space-y-3">
              <li><a href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center"><span className="text-primary mr-2">{'>'}</span> Home</a></li>
              <li><a href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center"><span className="text-primary mr-2">{'>'}</span> About</a></li>
              <li><a href="/portfolio" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center"><span className="text-primary mr-2">{'>'}</span> Portfolio</a></li>
              <li><a href="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center"><span className="text-primary mr-2">{'>'}</span> Blog</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4 lg:col-span-1">
            <h3 className="text-sm font-semibold text-primary">[Resources]</h3>
            <ul className="space-y-3">
              <li><a href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center"><span className="text-primary mr-2">{'>'}</span> Contact</a></li>
              <li><a href="/report-bug" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center"><span className="text-primary mr-2">{'>'}</span> Report Bug</a></li>
              <li><a href="/changelog" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center"><span className="text-primary mr-2">{'>'}</span> Changelog</a></li>
              <li><a href="/quotes" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center"><span className="text-primary mr-2">{'>'}</span> Quotes</a></li>
            </ul>
          </div>

          {/* Connect & Newsletter */}
          <div className="space-y-6 lg:col-span-1">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-primary">[Connect]</h3>
              <div className="flex flex-wrap gap-3">
                <a href="https://github.com/lwhcoder" className="text-muted-foreground hover:text-primary transition-colors border border-primary/30 rounded p-2 hover:bg-primary/10" title="GitHub">
                  <Github size={18} />
                </a>
                <a href="https://x.com/@lwhhhh_" className="text-muted-foreground hover:text-primary transition-colors border border-primary/30 rounded p-2 hover:bg-primary/10" title="Twitter">
                  <Twitter size={18} />
                </a>
                <a href="https://discord.gg/lwhcoder" className="text-muted-foreground hover:text-primary transition-colors border border-primary/30 rounded p-2 hover:bg-primary/10" title="LinkedIn">
                  <Disc size={18} />
                </a>
                <a href="mailto:contact@lwh.codes" className="text-muted-foreground hover:text-primary transition-colors border border-primary/30 rounded p-2 hover:bg-primary/10" title="Email">
                  <Mail size={18} />
                </a>
              </div>
            </div>
            
            {/* Newsletter */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-primary">[Newsletter]</h3>
              <div className="space-y-3">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <span className="text-primary">$</span> Get updates on new projects and tech insights
                </p>
                <div className="space-y-2">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-3 py-2 text-sm bg-background border border-primary/30 rounded focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-mono"
                  />
                  <button className="w-full px-3 py-2 text-sm bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors font-mono flex items-center justify-center gap-1">
                    ./subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-primary/20">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <p className="text-sm text-muted-foreground">
                <span className="text-primary">©</span> {currentYear} lwh.dev <span className="text-primary">--all-rights-reserved</span>
              </p>
              <VisitorCounter />
            </div>
            <div className="flex space-x-6">
              <a href="/color-generator" className="text-sm text-muted-foreground hover:text-primary transition-colors">--colors</a>
              <a href="/github-stats" className="text-sm text-muted-foreground hover:text-primary transition-colors">--stats</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}