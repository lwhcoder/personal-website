import { Button } from "~/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Textarea } from "~/components/ui/textarea"
import { Badge } from "~/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { useState, useEffect } from "react"
import { Bug, AlertTriangle, Info, Zap, CheckCircle2, ArrowLeft } from "lucide-react"

export function meta() {
  return [
    { title: "Report Bug | lwh" },
    { name: "description", content: "Report bugs and issues across all lwh projects" },
  ]
}

const projects = [
  { id: "personal-website", name: "Personal Website", description: "This portfolio site" },
  { id: "blog-portfolio", name: "Blog Portfolio", description: "Blog management system" },
  { id: "cosmic-link-profile", name: "Cosmic Link Profile", description: "Profile link aggregator" },
  { id: "documentation-system", name: "Documentation System", description: "Next.js docs platform" },
  { id: "jelli", name: "Jelli", description: "Media streaming platform" },
  { id: "mongodb-rest", name: "MongoDB REST", description: "REST API with MongoDB" },
  { id: "webrtc-app", name: "WebRTC App", description: "Real-time communication app" },
  { id: "other", name: "Other", description: "Not listed above" }
]

const severityLevels = [
  { value: "critical", label: "Critical", icon: AlertTriangle, color: "text-red-500", description: "System crashes, data loss" },
  { value: "high", label: "High", icon: Bug, color: "text-orange-500", description: "Major functionality broken" },
  { value: "medium", label: "Medium", icon: Info, color: "text-yellow-500", description: "Minor functionality issues" },
  { value: "low", label: "Low", icon: Zap, color: "text-blue-500", description: "Enhancement requests" }
]

const bugTypes = [
  "Frontend/UI Issue",
  "Backend/API Issue", 
  "Performance Issue",
  "Security Vulnerability",
  "Data/Database Issue",
  "Mobile Responsiveness",
  "Cross-browser Compatibility",
  "Accessibility Issue",
  "Documentation Error",
  "Feature Request",
  "Other"
]

export default function ReportBug() {
  const [selectedProject, setSelectedProject] = useState("")
  const [selectedSeverity, setSeverity] = useState("")
  const [selectedType, setSelectedType] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    // Here you would normally send the form data to your backend
  }

  if (submitted) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="terminal-window bg-background border border-border rounded-lg overflow-hidden shadow-2xl">
            <div className="terminal-header bg-muted border-b border-border px-4 py-3 flex items-center justify-between">
              <div className="terminal-dots flex gap-2">
                <div className="terminal-dot terminal-dot-red"></div>
                <div className="terminal-dot terminal-dot-yellow"></div>
                <div className="terminal-dot terminal-dot-green"></div>
              </div>
              <div className="text-sm  text-muted-foreground">
                lwh@bug-tracker:~/reports$
              </div>
              <div className="w-16"></div>
            </div>
            
            <div className="p-8  text-center">
              <CheckCircle2 className="w-16 h-16 mx-auto mb-4 text-primary" />
              <div className="space-y-4 text-sm">
                <div className="text-primary text-lg">Bug report submitted successfully!</div>
                {isClient && (
                  <>
                    <div className="text-muted-foreground">
                      $ git commit -m "Bug report #BR-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')} created"
                    </div>
                    <div className="text-muted-foreground">
                      [main {Math.random().toString(36).substr(2, 7)}] Bug report #BR-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')} created
                    </div>
                  </>
                )}
                {!isClient && (
                  <>
                    <div className="text-muted-foreground">
                      $ git commit -m "Bug report created"
                    </div>
                    <div className="text-muted-foreground">
                      [main abcd123] Bug report created
                    </div>
                  </>
                )}
                <div className="text-muted-foreground">
                  1 file changed, 1 insertion(+)
                </div>
                <div className="mt-6">
                  <Button asChild className="">
                    <a href="/contact">
                      ./track_status
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Terminal Header */}
          <div className="terminal-window bg-background border border-border rounded-lg overflow-hidden shadow-2xl mb-8">
            <div className="terminal-header bg-muted border-b border-border px-4 py-3 flex items-center justify-between">
              <div className="terminal-dots flex gap-2">
                <div className="terminal-dot terminal-dot-red"></div>
                <div className="terminal-dot terminal-dot-yellow"></div>
                <div className="terminal-dot terminal-dot-green"></div>
              </div>
              <div className="text-sm  text-muted-foreground">
                lwh@bug-tracker:~/new-issue$
              </div>
              <div className="w-16"></div>
            </div>
            
            <div className="p-6 ">
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-primary">lwh@bug-tracker</span>
                  <span className="text-muted-foreground">:</span>
                  <span className="text-foreground">~/issues</span>
                  <span className="text-primary">$</span>
                  <span className="text-foreground">./create_bug_report --interactive</span>
                </div>
                <div className="text-muted-foreground ml-4">
                  Initializing bug reporting system...
                </div>
                <div className="text-muted-foreground ml-4">
                  Loading project repositories...
                </div>
                <div className="text-primary ml-4">
                  Ready! Please fill out the form below.
                </div>
              </div>
            </div>
          </div>

          {/* Back Button */}
          <div className="mb-6">
            <Button variant="ghost" asChild className="">
              <a href="/" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                cd ../
              </a>
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Bug Report Form */}
            <div className="lg:col-span-2">
              <Card className="rounded-none">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 ">
                    <Bug className="w-5 h-5" />
                    ./submit_bug_report
                  </CardTitle>
                  <p className="text-muted-foreground  text-sm">
                    Help me squash bugs by providing detailed information about the issue.
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Project Selection */}
                    <div className="space-y-2">
                      <Label htmlFor="project" className="">Project Repository *</Label>
                      <Select onValueChange={setSelectedProject} required>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select affected project..." />
                        </SelectTrigger>
                        <SelectContent className="">
                          {projects.map((project) => (
                            <SelectItem key={project.id} value={project.id} className="">
                              {project.name} - {project.description}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      {/* Bug Type */}
                      <div className="space-y-2 ">
                        <Label htmlFor="bugType" className="">Bug Category *</Label>
                        <Select onValueChange={setSelectedType} required >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select type..." />
                          </SelectTrigger>
                          <SelectContent className="">
                            {bugTypes.map((type) => (
                              <SelectItem key={type} value={type} className="">
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Severity */}
                      <div className="space-y-2">
                        <Label htmlFor="severity" className="">Severity Level *</Label>
                        <Select onValueChange={setSeverity} required>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select severity..." />
                          </SelectTrigger>
                          <SelectContent className="">
                            {severityLevels.map((level) => (
                              <SelectItem key={level.value} value={level.value} className="">
                                {level.label} - {level.description}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Environment Info */}
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="browser" className="">Browser</Label>
                        <Input id="browser" placeholder="Chrome 118.0" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="os" className="">OS</Label>
                        <Input id="os" placeholder="macOS 14.0" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="device" className="">Device</Label>
                        <Input id="device" placeholder="Desktop/Mobile" />
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="">Email (Optional)</Label>
                        <Input id="email" type="email" placeholder="your@email.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="github" className="">GitHub Username (Optional)</Label>
                        <Input id="github" placeholder="@yourusername" />
                      </div>
                    </div>

                    {/* Bug Description */}
                    <div className="space-y-2">
                      <Label htmlFor="title" className="">Bug Title *</Label>
                      <Input 
                        id="title" 
                        placeholder="Brief description of the issue..."
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description" className="">Detailed Description *</Label>
                      <Textarea 
                        id="description" 
                        placeholder="Steps to reproduce:&#10;1. Go to...&#10;2. Click on...&#10;3. See error&#10;&#10;Expected behavior:&#10;What should happen...&#10;&#10;Actual behavior:&#10;What actually happens..."
                        className="min-h-32  text-sm"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="additional" className="">Additional Info</Label>
                      <Textarea 
                        id="additional" 
                        placeholder="Error messages, console logs, screenshots URLs, etc..."
                        className="min-h-24  text-sm"
                      />
                    </div>

                    <Button type="submit" className="rounded-none w-full ">
                      git commit -m "Bug report submitted"
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-6">
              {/* Severity Guide */}
              <Card className="rounded-none">
                <CardHeader>
                  <CardTitle className=" text-sm">./severity_guide</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {severityLevels.map((level) => {
                      const Icon = level.icon
                      return (
                        <div key={level.value} className="flex items-start gap-2">
                          <Icon className={`w-4 h-4 mt-0.5 ${level.color}`} />
                          <div>
                            <div className="text-sm font-medium">{level.label}</div>
                            <div className="text-xs text-muted-foreground">{level.description}</div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Projects Info */}
              <Card className="rounded-none">
                <CardHeader>
                  <CardTitle className=" text-sm">./list_repositories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    {projects.slice(0, 5).map((project) => (
                      <div key={project.id} className="">
                        <div className="text-foreground">{project.name}</div>
                        <div className="text-xs text-muted-foreground ml-2">↳ {project.description}</div>
                      </div>
                    ))}
                    <div className="text-muted-foreground ">...</div>
                  </div>
                </CardContent>
              </Card>

              {/* Tips */}
              <Card className="rounded-none">
                <CardHeader>
                  <CardTitle className=" text-sm">./bug_report_tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="text-muted-foreground">
                      • Be specific and detailed
                    </div>
                    <div className="text-muted-foreground">
                      • Include reproduction steps
                    </div>
                    <div className="text-muted-foreground">
                      • Share error messages
                    </div>
                    <div className="text-muted-foreground">
                      • Mention browser/device info
                    </div>
                    <div className="text-muted-foreground">
                      • Add screenshots if helpful
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Response Time */}
              <Card className="rounded-none">
                <CardHeader>
                  <CardTitle className=" text-sm">./response_sla</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <Badge variant="outline" className="text-red-500 border-red-500">Critical</Badge>
                      <span className="text-muted-foreground">~24h</span>
                    </div>
                    <div className="flex justify-between">
                      <Badge variant="outline" className="text-orange-500 border-orange-500">High</Badge>
                      <span className="text-muted-foreground">~48h</span>
                    </div>
                    <div className="flex justify-between">
                      <Badge variant="outline" className="text-yellow-500 border-yellow-500">Medium</Badge>
                      <span className="text-muted-foreground">~1 week</span>
                    </div>
                    <div className="flex justify-between">
                      <Badge variant="outline" className="text-blue-500 border-blue-500">Low</Badge>
                      <span className="text-muted-foreground">~2 weeks</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}