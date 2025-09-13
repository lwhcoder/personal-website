import { Badge } from "~/components/ui/badge";

export function meta() {
  return [
    { title: "Changelog - LWH" },
    { name: "description", content: "Track updates and changes to my website" },
  ];
}

const changelogData = [
  {
    version: "v2.3.0",
    date: "2025-09-01",
    changes: [
      { type: "feature", description: "Added terminal snake game easter egg on 404 page" },
      { type: "feature", description: "Implemented changelog tracking system" },
      { type: "feature", description: "Added visitor counter with retro terminal styling" },
      { type: "enhancement", description: "Enhanced 404 page with better terminal aesthetics" },
    ]
  },
  {
    version: "v2.2.0",
    date: "2025-08-28",
    changes: [
      { type: "feature", description: "Built comprehensive bug reporting system" },
      { type: "feature", description: "Added newsletter subscription to footer" },
      { type: "enhancement", description: "Upgraded select components to shadcn/ui" },
      { type: "fix", description: "Fixed navbar sticky positioning on scroll" },
    ]
  },
  {
    version: "v2.1.0",
    date: "2025-08-25",
    changes: [
      { type: "major", description: "Complete landing page redesign with developer aesthetics" },
      { type: "feature", description: "Added skills showcase with technology badges" },
      { type: "feature", description: "Implemented project cards with status indicators" },
      { type: "enhancement", description: "Enhanced mobile responsiveness across all components" },
    ]
  },
  {
    version: "v2.0.0",
    date: "2025-08-20",
    changes: [
      { type: "major", description: "Migrated to React Router 7 with file-based routing" },
      { type: "major", description: "Adopted terminal-inspired design system" },
      { type: "feature", description: "Implemented dark/light theme switching" },
      { type: "feature", description: "Added shadcn/ui component library integration" },
      { type: "enhancement", description: "Restructured project architecture" },
    ]
  },
  {
    version: "v1.2.0",
    date: "2025-08-15",
    changes: [
      { type: "feature", description: "Added contact form with validation" },
      { type: "feature", description: "Implemented portfolio project showcase" },
      { type: "enhancement", description: "Improved SEO meta tags" },
      { type: "fix", description: "Fixed mobile navigation drawer issues" },
    ]
  },
  {
    version: "v1.1.0",
    date: "2025-08-10",
    changes: [
      { type: "feature", description: "Added about page with professional timeline" },
      { type: "feature", description: "Implemented blog post system" },
      { type: "enhancement", description: "Enhanced loading states and animations" },
    ]
  },
  {
    version: "v1.0.0",
    date: "2025-08-01",
    changes: [
      { type: "major", description: "Initial website launch" },
      { type: "feature", description: "Basic navigation and routing" },
      { type: "feature", description: "Home page with introduction" },
      { type: "feature", description: "Responsive design foundation" },
    ]
  }
];

function getChangeTypeBadge(type: string) {
  switch (type) {
    case 'major':
      return <Badge variant="destructive" className="font-mono text-xs">MAJOR</Badge>;
    case 'feature':
      return <Badge variant="default" className="font-mono text-xs">FEAT</Badge>;
    case 'enhancement':
      return <Badge variant="secondary" className="font-mono text-xs">ENHANCE</Badge>;
    case 'fix':
      return <Badge variant="outline" className="font-mono text-xs">FIX</Badge>;
    default:
      return <Badge variant="outline" className="font-mono text-xs">MISC</Badge>;
  }
}

export default function Changelog() {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Terminal Header */}
        <div className="terminal-window bg-background border border-border rounded-lg overflow-hidden shadow-2xl mb-8">
          <div className="terminal-header bg-muted border-b border-border px-4 py-3 flex items-center justify-between">
            <div className="terminal-dots flex gap-2">
              <div className="terminal-dot terminal-dot-red"></div>
              <div className="terminal-dot terminal-dot-yellow"></div>
              <div className="terminal-dot terminal-dot-green"></div>
            </div>
            <div className="text-sm font-mono text-muted-foreground">
              lwh@terminal:~/changelog$
            </div>
            <div className="w-16"></div>
          </div>
          
          <div className="p-8 font-mono">
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-primary">lwh@terminal</span>
                <span className="text-muted-foreground">:</span>
                <span className="text-foreground">~/changelog</span>
                <span className="text-primary">$</span>
                <span className="text-foreground">git log --oneline --pretty=format:"%h %s"</span>
              </div>
              
              <div className="text-primary text-2xl font-bold mt-6">
                # Changelog
              </div>
              
              <div className="text-muted-foreground">
                Track all changes, updates, and improvements to this website.
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-primary">lwh@terminal</span>
                <span className="text-muted-foreground">:</span>
                <span className="text-foreground">~/changelog</span>
                <span className="text-primary">$</span>
                <span className="terminal-cursor"></span>
              </div>
            </div>
          </div>
        </div>

        {/* Changelog Entries */}
        <div className="space-y-8">
          {changelogData.map((release, index) => (
            <div
              key={release.version}
              className="terminal-window bg-background border border-border rounded-lg overflow-hidden shadow-lg"
            >
              {/* Release Header */}
              <div className="bg-muted/50 border-b border-border px-6 py-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-3">
                    <span className="text-primary font-mono font-bold text-lg">
                      {release.version}
                    </span>
                    <Badge 
                      variant={index === 0 ? "default" : "outline"} 
                      className="font-mono text-xs"
                    >
                      {index === 0 ? "LATEST" : "RELEASE"}
                    </Badge>
                  </div>
                  <div className="text-sm font-mono text-muted-foreground">
                    {new Date(release.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                </div>
              </div>
              
              {/* Changes List */}
              <div className="p-6">
                <div className="space-y-3">
                  {release.changes.map((change, changeIndex) => (
                    <div key={changeIndex} className="flex items-start gap-3">
                      {getChangeTypeBadge(change.type)}
                      <div className="flex-1 font-mono text-sm">
                        <span className="text-muted-foreground">•</span>
                        <span className="ml-2 text-foreground">{change.description}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Git-style commit hash */}
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                    <span>commit</span>
                    <span className="text-primary">
                      {Math.random().toString(36).substring(2, 9)}
                    </span>
                    <span>•</span>
                    <span>{release.changes.length} changes</span>
                    <span>•</span>
                    <span>{release.date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Terminal Footer */}
        <div className="terminal-window bg-background border border-border rounded-lg overflow-hidden shadow-lg mt-8">
          <div className="p-6 font-mono">
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-primary">lwh@terminal</span>
                <span className="text-muted-foreground">:</span>
                <span className="text-foreground">~/changelog</span>
                <span className="text-primary">$</span>
                <span className="text-foreground">echo "Stay tuned for more updates!"</span>
              </div>
              
              <div className="text-muted-foreground ml-4">
                Stay tuned for more updates!
              </div>
              
              <div className="flex items-center gap-2 pt-4">
                <span className="text-primary">lwh@terminal</span>
                <span className="text-muted-foreground">:</span>
                <span className="text-foreground">~/changelog</span>
                <span className="text-primary">$</span>
                <span className="terminal-cursor"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}