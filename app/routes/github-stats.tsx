import { useState, useEffect } from "react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export function meta() {
  return [
    { title: "GitHub Stats - LWH" },
    { name: "description", content: "Developer metrics and GitHub statistics" },
  ];
}

// Mock data for demonstration - replace with actual GitHub API calls
const mockGitHubData = {
  user: {
    login: "lwh",
    name: "LWH",
    bio: "Full-stack developer | Open source enthusiast",
    public_repos: 47,
    followers: 234,
    following: 156,
    created_at: "2019-03-15T10:30:00Z",
    location: "San Francisco, CA",
    company: "@tech-company"
  },
  repos: [
    {
      name: "personal-website",
      description: "My personal portfolio and blog built with React Router",
      language: "TypeScript",
      stars: 23,
      forks: 7,
      updated_at: "2025-09-01T09:00:00Z",
      topics: ["react", "typescript", "portfolio"]
    },
    {
      name: "terminal-ui-kit",
      description: "A collection of terminal-inspired React components",
      language: "TypeScript",
      stars: 156,
      forks: 34,
      updated_at: "2025-08-28T14:30:00Z",
      topics: ["react", "ui", "terminal", "components"]
    },
    {
      name: "api-gateway-service",
      description: "Microservice API gateway with rate limiting and auth",
      language: "Go",
      stars: 89,
      forks: 21,
      updated_at: "2025-08-25T11:15:00Z",
      topics: ["go", "api", "microservices", "docker"]
    },
    {
      name: "data-pipeline-tools",
      description: "ETL tools and utilities for data processing workflows",
      language: "Python",
      stars: 67,
      forks: 15,
      updated_at: "2025-08-20T16:45:00Z",
      topics: ["python", "data", "etl", "pipeline"]
    }
  ],
  languages: {
    "TypeScript": 45.8,
    "JavaScript": 23.2,
    "Python": 15.4,
    "Go": 8.9,
    "CSS": 4.2,
    "HTML": 2.5
  },
  contribution_stats: {
    total_commits_this_year: 342,
    longest_streak: 28,
    current_streak: 7,
    contributions_last_year: 289
  }
};

function getLanguageColor(language: string): string {
  const colors: { [key: string]: string } = {
    "TypeScript": "#3178c6",
    "JavaScript": "#f7df1e",
    "Python": "#3776ab",
    "Go": "#00add8",
    "CSS": "#1572b6",
    "HTML": "#e34f26",
    "React": "#61dafb",
    "Vue": "#4fc08d"
  };
  return colors[language] || "#6b7280";
}

export default function GitHubStats() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("overview");

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="terminal-window bg-background border border-border rounded-lg overflow-hidden shadow-2xl">
            <div className="terminal-header bg-muted border-b border-border px-4 py-3 flex items-center justify-between">
              <div className="terminal-dots flex gap-2">
                <div className="terminal-dot terminal-dot-red"></div>
                <div className="terminal-dot terminal-dot-yellow"></div>
                <div className="terminal-dot terminal-dot-green"></div>
              </div>
              <div className="text-sm font-mono text-muted-foreground">
                lwh@terminal:~/github-stats$
              </div>
              <div className="w-16"></div>
            </div>
            
            <div className="p-8 font-mono text-center">
              <div className="space-y-4">
                <div className="text-primary text-lg">Fetching GitHub data...</div>
                <div className="text-muted-foreground text-sm">
                  curl -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/user
                </div>
                <div className="flex justify-center">
                  <div className="terminal-cursor inline-block"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Terminal Header */}
        <div className="terminal-window bg-background border border-border rounded-lg overflow-hidden shadow-2xl mb-8">
          <div className="terminal-header bg-muted border-b border-border px-4 py-3 flex items-center justify-between">
            <div className="terminal-dots flex gap-2">
              <div className="terminal-dot terminal-dot-red"></div>
              <div className="terminal-dot terminal-dot-yellow"></div>
              <div className="terminal-dot terminal-dot-green"></div>
            </div>
            <div className="text-sm font-mono text-muted-foreground">
              lwh@terminal:~/github-stats$
            </div>
            <div className="w-16"></div>
          </div>
          
          <div className="p-8 font-mono">
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-primary">lwh@terminal</span>
                <span className="text-muted-foreground">:</span>
                <span className="text-foreground">~/github-stats</span>
                <span className="text-primary">$</span>
                <span className="text-foreground">gh api user --jq '.login'</span>
              </div>
              
              <div className="text-primary text-2xl font-bold mt-6">
                # GitHub Statistics Dashboard
              </div>
              
              <div className="text-muted-foreground">
                Real-time developer metrics and repository analytics
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {[
            { id: "overview", label: "Overview" },
            { id: "repos", label: "Repositories" },
            { id: "languages", label: "Languages" },
            { id: "activity", label: "Activity" }
          ].map((tab) => (
            <Button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              variant={selectedTab === tab.id ? "default" : "outline"}
              size="sm"
              className="font-mono text-xs whitespace-nowrap"
            >
              {tab.label}
            </Button>
          ))}
        </div>

        {selectedTab === "overview" && (
          <div className="space-y-6">
            {/* Profile Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-mono flex items-center gap-2">
                      <span>@{mockGitHubData.user.login}</span>
                      <Badge variant="secondary" className="font-mono text-xs">
                        DEVELOPER
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-mono font-bold text-lg">{mockGitHubData.user.name}</h3>
                      <p className="text-muted-foreground text-sm">{mockGitHubData.user.bio}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Location:</span>
                        <span className="ml-2 font-mono">{mockGitHubData.user.location}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Company:</span>
                        <span className="ml-2 font-mono">{mockGitHubData.user.company}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Joined:</span>
                        <span className="ml-2 font-mono">{formatDate(mockGitHubData.user.created_at)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="font-mono text-sm">GitHub Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-primary">{mockGitHubData.user.public_repos}</div>
                        <div className="text-xs text-muted-foreground">Repositories</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-primary">{mockGitHubData.user.followers}</div>
                        <div className="text-xs text-muted-foreground">Followers</div>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-primary">{mockGitHubData.contribution_stats.total_commits_this_year}</div>
                      <div className="text-xs text-muted-foreground">Contributions this year</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Contribution Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="font-mono text-sm">Contribution Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-xl font-bold text-primary">{mockGitHubData.contribution_stats.current_streak}</div>
                    <div className="text-xs text-muted-foreground">Current Streak</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-primary">{mockGitHubData.contribution_stats.longest_streak}</div>
                    <div className="text-xs text-muted-foreground">Longest Streak</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-primary">{mockGitHubData.contribution_stats.total_commits_this_year}</div>
                    <div className="text-xs text-muted-foreground">This Year</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-primary">{mockGitHubData.contribution_stats.contributions_last_year}</div>
                    <div className="text-xs text-muted-foreground">Last Year</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {selectedTab === "repos" && (
          <div className="space-y-4">
            {mockGitHubData.repos.map((repo) => (
              <Card key={repo.name}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-mono font-bold text-lg text-primary">{repo.name}</h3>
                      <p className="text-muted-foreground text-sm">{repo.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="font-mono text-xs">
                        ⭐ {repo.stars}
                      </Badge>
                      <Badge variant="outline" className="font-mono text-xs">
                        🍴 {repo.forks}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: getLanguageColor(repo.language) }}
                        />
                        <span className="font-mono text-sm">{repo.language}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Updated {formatDate(repo.updated_at)}
                      </div>
                    </div>
                    
                    <div className="flex gap-1">
                      {repo.topics.map((topic) => (
                        <Badge key={topic} variant="secondary" className="font-mono text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {selectedTab === "languages" && (
          <Card>
            <CardHeader>
              <CardTitle className="font-mono text-sm">Language Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(mockGitHubData.languages).map(([language, percentage]) => (
                  <div key={language}>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: getLanguageColor(language) }}
                        />
                        <span className="font-mono text-sm">{language}</span>
                      </div>
                      <span className="font-mono text-sm font-bold">{percentage}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all duration-500"
                        style={{ 
                          backgroundColor: getLanguageColor(language),
                          width: `${percentage}%` 
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {selectedTab === "activity" && (
          <Card>
            <CardHeader>
              <CardTitle className="font-mono text-sm">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 font-mono text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-muted-foreground">2 hours ago</span>
                  <span>Pushed to <span className="text-primary">personal-website</span></span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-muted-foreground">1 day ago</span>
                  <span>Opened pull request in <span className="text-primary">terminal-ui-kit</span></span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-muted-foreground">3 days ago</span>
                  <span>Created repository <span className="text-primary">api-gateway-service</span></span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-muted-foreground">5 days ago</span>
                  <span>Starred <span className="text-primary">awesome-react-components</span></span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Terminal Footer */}
        <div className="terminal-window bg-background border border-border rounded-lg overflow-hidden shadow-lg mt-8">
          <div className="p-6 font-mono">
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-primary">lwh@terminal</span>
                <span className="text-muted-foreground">:</span>
                <span className="text-foreground">~/github-stats</span>
                <span className="text-primary">$</span>
                <span className="text-foreground">echo "Keep coding! 🚀"</span>
              </div>
              
              <div className="text-muted-foreground ml-4">
                Keep coding! 🚀
              </div>
              
              <div className="flex items-center gap-2 pt-2">
                <span className="text-primary">lwh@terminal</span>
                <span className="text-muted-foreground">:</span>
                <span className="text-foreground">~/github-stats</span>
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