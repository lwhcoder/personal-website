"use client";

import { useState, useEffect } from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function LoadingSpinner({ size = 'md', className = "" }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8', 
    lg: 'w-12 h-12'
  };

  return (
    <div className={`inline-block animate-spin rounded-full border-2 border-solid border-primary border-r-transparent ${sizeClasses[size]} ${className}`} />
  );
}

interface TerminalLoadingProps {
  message?: string;
  className?: string;
}

export function TerminalLoading({ message = "Loading", className = "" }: TerminalLoadingProps) {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`font-mono text-primary ${className}`}>
      <div className="flex items-center gap-2">
        <span className="text-primary">$</span>
        <span>{message}{dots}</span>
        <div className="terminal-cursor inline-block"></div>
      </div>
    </div>
  );
}

export function BlogPostSkeleton() {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Terminal Header Skeleton */}
        <div className="terminal-window bg-background border border-border rounded-lg overflow-hidden shadow-2xl mb-8 animate-pulse">
          <div className="terminal-header bg-muted border-b border-border px-4 py-3 flex items-center justify-between">
            <div className="terminal-dots flex gap-2">
              <div className="terminal-dot bg-muted-foreground/30"></div>
              <div className="terminal-dot bg-muted-foreground/30"></div>
              <div className="terminal-dot bg-muted-foreground/30"></div>
            </div>
            <div className="w-32 h-4 bg-muted-foreground/30 rounded"></div>
            <div className="w-16"></div>
          </div>
          
          <div className="p-8">
            <div className="space-y-4">
              <div className="w-3/4 h-8 bg-muted-foreground/30 rounded"></div>
              <div className="w-1/2 h-4 bg-muted-foreground/20 rounded"></div>
              <div className="w-1/3 h-4 bg-muted-foreground/20 rounded"></div>
            </div>
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="space-y-6">
          <div className="bg-background border border-border rounded-lg p-8 animate-pulse">
            <div className="space-y-4">
              {/* Title */}
              <div className="w-2/3 h-8 bg-muted-foreground/30 rounded"></div>
              
              {/* Meta info */}
              <div className="flex gap-4">
                <div className="w-24 h-4 bg-muted-foreground/20 rounded"></div>
                <div className="w-32 h-4 bg-muted-foreground/20 rounded"></div>
                <div className="w-20 h-4 bg-muted-foreground/20 rounded"></div>
              </div>
              
              {/* Content lines */}
              <div className="space-y-3 pt-6">
                <div className="w-full h-4 bg-muted-foreground/20 rounded"></div>
                <div className="w-5/6 h-4 bg-muted-foreground/20 rounded"></div>
                <div className="w-4/5 h-4 bg-muted-foreground/20 rounded"></div>
                <div className="w-full h-4 bg-muted-foreground/20 rounded"></div>
                <div className="w-3/4 h-4 bg-muted-foreground/20 rounded"></div>
              </div>
              
              {/* Code block placeholder */}
              <div className="mt-6 p-4 bg-muted/30 rounded border">
                <div className="space-y-2">
                  <div className="w-1/2 h-4 bg-muted-foreground/20 rounded"></div>
                  <div className="w-3/4 h-4 bg-muted-foreground/20 rounded"></div>
                  <div className="w-2/3 h-4 bg-muted-foreground/20 rounded"></div>
                </div>
              </div>
              
              {/* More content lines */}
              <div className="space-y-3 pt-4">
                <div className="w-full h-4 bg-muted-foreground/20 rounded"></div>
                <div className="w-4/5 h-4 bg-muted-foreground/20 rounded"></div>
                <div className="w-5/6 h-4 bg-muted-foreground/20 rounded"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Terminal Loading Footer */}
        <div className="terminal-window bg-background border border-border rounded-lg overflow-hidden shadow-lg mt-8">
          <div className="p-6">
            <TerminalLoading message="Loading blog post" />
          </div>
        </div>
      </div>
    </div>
  );
}

interface PageLoadingProps {
  title?: string;
  subtitle?: string;
}

export function PageLoading({ title = "Loading", subtitle = "Please wait..." }: PageLoadingProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="terminal-window bg-background border border-border rounded-lg overflow-hidden shadow-2xl max-w-md w-full mx-4">
        <div className="terminal-header bg-muted border-b border-border px-4 py-3 flex items-center justify-between">
          <div className="terminal-dots flex gap-2">
            <div className="terminal-dot terminal-dot-red"></div>
            <div className="terminal-dot terminal-dot-yellow"></div>
            <div className="terminal-dot terminal-dot-green"></div>
          </div>
          <div className="text-sm font-mono text-muted-foreground">
            lwh@terminal:~/loading$
          </div>
          <div className="w-16"></div>
        </div>
        
        <div className="p-8 font-mono text-center">
          <div className="space-y-6">
            <LoadingSpinner size="lg" />
            
            <div className="space-y-2">
              <div className="text-lg font-bold text-primary">{title}</div>
              <div className="text-sm text-muted-foreground">{subtitle}</div>
            </div>
            
            <div className="space-y-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2 justify-center">
                <span className="text-primary">$</span>
                <span>Initializing components...</span>
              </div>
              <TerminalLoading message="Fetching data" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}