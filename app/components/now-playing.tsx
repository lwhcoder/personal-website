"use client";

import { useState, useEffect } from "react";
import { Badge } from "~/components/ui/badge";

interface NowPlayingData {
  isPlaying: boolean;
  service: "spotify" | "discord" | "idle";
  track?: {
    name: string;
    artist: string;
    album?: string;
    image?: string;
    duration?: number;
    progress?: number;
    url?: string;
  };
  activity?: {
    name: string;
    details?: string;
    state?: string;
    image?: string;
  };
}

// Mock data for demonstration
const mockData: NowPlayingData[] = [
  {
    isPlaying: true,
    service: "spotify",
    track: {
      name: "Bohemian Rhapsody",
      artist: "Queen",
      album: "A Night at the Opera",
      duration: 355,
      progress: 120,
      url: "https://open.spotify.com/track/4u7EnebtmKWzUH433cf5Qv"
    }
  },
  {
    isPlaying: true,
    service: "discord",
    activity: {
      name: "Visual Studio Code",
      details: "Editing personal-website",
      state: "Working on components",
      image: "vscode"
    }
  },
  {
    isPlaying: false,
    service: "idle"
  }
];

export function NowPlaying({ compact = false }: { compact?: boolean }) {
  const [currentData, setCurrentData] = useState<NowPlayingData>(mockData[2]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Cycle through mock data every 10 seconds for demo
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % mockData.length;
      setCurrentData(mockData[index]);
    }, 10000);

    // Start with random data
    setCurrentData(mockData[Math.floor(Math.random() * mockData.length)]);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = () => {
    if (!currentData.track?.duration || !currentData.track?.progress) return 0;
    return (currentData.track.progress / currentData.track.duration) * 100;
  };

  if (!isVisible) return null;

  if (compact) {
    return (
      <div className="now-playing-compact">
        <div className="inline-flex items-center gap-2 px-3 py-2 bg-background border border-border rounded-lg font-mono text-xs">
          <div className="flex items-center gap-2">
            {currentData.isPlaying ? (
              <div className="flex gap-1">
                <div className="w-1 h-3 bg-green-500 animate-pulse"></div>
                <div className="w-1 h-3 bg-green-500 animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-1 h-3 bg-green-500 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              </div>
            ) : (
              <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
            )}
            
            {currentData.isPlaying ? (
              <>
                {currentData.service === "spotify" && currentData.track && (
                  <span className="text-green-500">♪ {currentData.track.name} - {currentData.track.artist}</span>
                )}
                {currentData.service === "discord" && currentData.activity && (
                  <span className="text-blue-500">▶ {currentData.activity.name}</span>
                )}
              </>
            ) : (
              <span className="text-muted-foreground">Not playing</span>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="now-playing-widget">
      <div className="terminal-window bg-background border border-border rounded-lg overflow-hidden shadow-lg max-w-sm">
        {/* Terminal Header */}
        <div className="terminal-header bg-muted border-b border-border px-4 py-3 flex items-center justify-between">
          <div className="terminal-dots flex gap-2">
            <div className="terminal-dot terminal-dot-red"></div>
            <div className="terminal-dot terminal-dot-yellow"></div>
            <div className="terminal-dot terminal-dot-green"></div>
          </div>
          <div className="text-xs font-mono text-muted-foreground">
            now-playing.sh
          </div>
          <button 
            onClick={() => setIsVisible(false)}
            className="text-muted-foreground hover:text-foreground text-xs"
          >
            ×
          </button>
        </div>
        
        {/* Content */}
        <div className="p-4 font-mono">
          {currentData.isPlaying ? (
            <div className="space-y-3">
              {/* Service Badge */}
              <div className="flex items-center gap-2">
                <Badge 
                  variant={currentData.service === "spotify" ? "default" : "secondary"} 
                  className="font-mono text-xs"
                >
                  {currentData.service === "spotify" && "🎵 SPOTIFY"}
                  {currentData.service === "discord" && "🎮 DISCORD"}
                </Badge>
                <div className="flex gap-1 ml-auto">
                  <div className="w-1 h-3 bg-primary animate-pulse"></div>
                  <div className="w-1 h-3 bg-primary animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-1 h-3 bg-primary animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>

              {/* Track Info */}
              {currentData.track && (
                <div className="space-y-2">
                  <div>
                    <div className="text-sm font-bold text-foreground truncate">
                      {currentData.track.name}
                    </div>
                    <div className="text-xs text-muted-foreground truncate">
                      {currentData.track.artist}
                    </div>
                    {currentData.track.album && (
                      <div className="text-xs text-muted-foreground truncate">
                        {currentData.track.album}
                      </div>
                    )}
                  </div>
                  
                  {/* Progress Bar */}
                  {currentData.track.duration && currentData.track.progress && (
                    <div className="space-y-1">
                      <div className="w-full bg-muted rounded-full h-1">
                        <div
                          className="bg-primary h-1 rounded-full transition-all duration-1000"
                          style={{ width: `${getProgressPercentage()}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{formatTime(currentData.track.progress)}</span>
                        <span>{formatTime(currentData.track.duration)}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Discord Activity */}
              {currentData.activity && (
                <div className="space-y-1">
                  <div className="text-sm font-bold text-foreground">
                    {currentData.activity.name}
                  </div>
                  {currentData.activity.details && (
                    <div className="text-xs text-muted-foreground">
                      {currentData.activity.details}
                    </div>
                  )}
                  {currentData.activity.state && (
                    <div className="text-xs text-muted-foreground">
                      {currentData.activity.state}
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-4">
              <div className="text-2xl mb-2">🎵</div>
              <div className="text-sm text-muted-foreground">Nothing playing</div>
              <div className="text-xs text-muted-foreground mt-1">Waiting for audio...</div>
            </div>
          )}
          
          {/* Terminal Command Line */}
          <div className="mt-4 pt-3 border-t border-border">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="text-primary">$</span>
              <span>./watch_status</span>
              <div className="ml-auto">
                <span className="terminal-cursor inline-block"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function NowPlayingBar() {
  const [currentData, setCurrentData] = useState<NowPlayingData>(mockData[0]);
  
  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * mockData.length);
      setCurrentData(mockData[randomIndex]);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const getProgressPercentage = () => {
    if (!currentData.track?.duration || !currentData.track?.progress) return 0;
    return (currentData.track.progress / currentData.track.duration) * 100;
  };

  if (!currentData.isPlaying) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-background border border-border rounded-lg shadow-2xl p-4 font-mono max-w-xs">
        <div className="flex items-center gap-3">
          <div className="flex flex-col flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Badge 
                variant={currentData.service === "spotify" ? "default" : "secondary"} 
                className="font-mono text-xs"
              >
                {currentData.service === "spotify" && "🎵"}
                {currentData.service === "discord" && "🎮"}
              </Badge>
              <div className="flex gap-1">
                <div className="w-1 h-2 bg-green-500 animate-pulse"></div>
                <div className="w-1 h-2 bg-green-500 animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-1 h-2 bg-green-500 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
            
            {currentData.track && (
              <div className="text-xs">
                <div className="font-bold text-foreground truncate">
                  {currentData.track.name}
                </div>
                <div className="text-muted-foreground truncate">
                  {currentData.track.artist}
                </div>
              </div>
            )}
            
            {currentData.activity && (
              <div className="text-xs">
                <div className="font-bold text-foreground truncate">
                  {currentData.activity.name}
                </div>
                {currentData.activity.details && (
                  <div className="text-muted-foreground truncate">
                    {currentData.activity.details}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Mini Progress Bar */}
        {currentData.track?.duration && currentData.track?.progress && (
          <div className="mt-2">
            <div className="w-full bg-muted rounded-full h-1">
              <div
                className="bg-primary h-1 rounded-full transition-all duration-1000"
                style={{ width: `${getProgressPercentage()}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}