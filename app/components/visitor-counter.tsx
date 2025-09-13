"use client";

import { useState, useEffect } from "react";

export function VisitorCounter() {
  const [count, setCount] = useState<number>(0);
  const [isClient, setIsClient] = useState(false);
        
  useEffect(() => {
    setIsClient(true);
    
    // Get current count from localStorage
    const currentCount = localStorage.getItem('visitor-count');
    const parsedCount = currentCount ? parseInt(currentCount, 10) : 0;
    
    // Increment and save
    const newCount = parsedCount + 1;
    localStorage.setItem('visitor-count', newCount.toString());
    setCount(newCount);
  }, []);

  if (!isClient) {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1 border border-border rounded font-mono text-xs bg-muted/20">
        <span className="text-muted-foreground">Visitors:</span>
        <span className="text-primary font-bold">---</span>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 border border-border rounded font-mono text-xs bg-muted/20">
      <div className="flex items-center gap-1">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <span className="text-muted-foreground">Visitors:</span>
      </div>
      <div className="flex items-center">
        <span className="text-primary font-bold tabular-nums">
          {count.toString().padStart(6, '0')}
        </span>
      </div>
    </div>
  );
}

export function RetroVisitorCounter() {
  const [count, setCount] = useState<number>(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Get current count from localStorage
    const currentCount = localStorage.getItem('visitor-count');
    const parsedCount = currentCount ? parseInt(currentCount, 10) : 1337; // Start with a fun number
    
    // Increment and save (but only on actual page loads, not every component render)
    const sessionKey = `visitor-session-${Date.now()}`;
    const hasVisitedThisSession = sessionStorage.getItem(sessionKey);
    
    if (!hasVisitedThisSession) {
      const newCount = parsedCount + 1;
      localStorage.setItem('visitor-count', newCount.toString());
      sessionStorage.setItem(sessionKey, 'true');
      setCount(newCount);
    } else {
      setCount(parsedCount);
    }
  }, []);

  if (!isClient) {
    return (
      <div className="retro-counter">
        <div className="bg-black text-green-400 font-mono text-xs px-2 py-1 border-2 border-green-400 inline-block">
          <div className="flex items-center gap-1">
            <span>VISITORS:</span>
            <span className="bg-green-400 text-black px-1">------</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="retro-counter">
      <div className="bg-black text-green-400 font-mono text-xs px-2 py-1 border-2 border-green-400 inline-block shadow-[0_0_10px_rgba(34,197,94,0.3)]">
        <div className="flex items-center gap-1">
          <span>VISITORS:</span>
          <span className="bg-green-400 text-black px-1 font-bold tabular-nums">
            {count.toString().padStart(6, '0')}
          </span>
        </div>
      </div>
    </div>
  );
}