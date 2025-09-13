import { useState, useEffect } from "react";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";

export function meta() {
  return [
    { title: "Quote Generator - LWH" },
    { name: "description", content: "Programming quotes and personal favorites in terminal style" },
  ];
}

const quotes = [
  {
    text: "Talk is cheap. Show me the code.",
    author: "Linus Torvalds",
    category: "programming",
    year: "2000"
  },
  {
    text: "The best way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
    category: "motivation",
    year: "1960"
  },
  {
    text: "Programs must be written for people to read, and only incidentally for machines to execute.",
    author: "Harold Abelson",
    category: "programming",
    year: "1985"
  },
  {
    text: "First, solve the problem. Then, write the code.",
    author: "John Johnson",
    category: "programming",
    year: "1990"
  },
  {
    text: "Code is like humor. When you have to explain it, it's bad.",
    author: "Cory House",
    category: "programming",
    year: "2015"
  },
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    category: "motivation",
    year: "2005"
  },
  {
    text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    author: "Martin Fowler",
    category: "programming",
    year: "1999"
  },
  {
    text: "Experience is the name everyone gives to their mistakes.",
    author: "Oscar Wilde",
    category: "wisdom",
    year: "1890"
  },
  {
    text: "The best error message is the one that never shows up.",
    author: "Thomas Fuchs",
    category: "programming",
    year: "2008"
  },
  {
    text: "Debugging is twice as hard as writing the code in the first place.",
    author: "Brian Kernighan",
    category: "programming",
    year: "1976"
  },
  {
    text: "It's not a bug – it's an undocumented feature.",
    author: "Anonymous",
    category: "humor",
    year: "1980"
  },
  {
    text: "The most important property of a program is whether it accomplishes the intention of its user.",
    author: "C.A.R. Hoare",
    category: "programming",
    year: "1973"
  },
  {
    text: "Premature optimization is the root of all evil.",
    author: "Donald Knuth",
    category: "programming",
    year: "1974"
  },
  {
    text: "Simplicity is the ultimate sophistication.",
    author: "Leonardo da Vinci",
    category: "wisdom",
    year: "1500"
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
    category: "motivation",
    year: "1945"
  }
];

function getCategoryBadge(category: string) {
  switch (category) {
    case 'programming':
      return <Badge variant="default" className="font-mono text-xs">CODE</Badge>;
    case 'motivation':
      return <Badge variant="secondary" className="font-mono text-xs">INSPIRE</Badge>;
    case 'wisdom':
      return <Badge variant="outline" className="font-mono text-xs">WISDOM</Badge>;
    case 'humor':
      return <Badge className="bg-yellow-500 hover:bg-yellow-600 font-mono text-xs">HUMOR</Badge>;
    default:
      return <Badge variant="outline" className="font-mono text-xs">MISC</Badge>;
  }
}

export default function QuoteGenerator() {
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [filter, setFilter] = useState<string>("all");

  const getFilteredQuotes = () => {
    if (filter === "all") return quotes;
    return quotes.filter(quote => quote.category === filter);
  };

  const generateRandomQuote = () => {
    setIsAnimating(true);
    
    setTimeout(() => {
      const filteredQuotes = getFilteredQuotes();
      const availableQuotes = filteredQuotes.filter(quote => quote !== currentQuote);
      if (availableQuotes.length === 0) {
        setIsAnimating(false);
        return;
      }
      
      const randomIndex = Math.floor(Math.random() * availableQuotes.length);
      setCurrentQuote(availableQuotes[randomIndex]);
      setIsAnimating(false);
    }, 300);
  };

  const categories = ["all", "programming", "motivation", "wisdom", "humor"];

  useEffect(() => {
    // Auto-generate first quote based on filter
    const filteredQuotes = getFilteredQuotes();
    if (filteredQuotes.length > 0 && !filteredQuotes.includes(currentQuote)) {
      const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
      setCurrentQuote(filteredQuotes[randomIndex]);
    }
  }, [filter]);

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
              lwh@terminal:~/quotes$
            </div>
            <div className="w-16"></div>
          </div>
          
          <div className="p-8 font-mono">
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-primary">lwh@terminal</span>
                <span className="text-muted-foreground">:</span>
                <span className="text-foreground">~/quotes</span>
                <span className="text-primary">$</span>
                <span className="text-foreground">cat random_wisdom.txt</span>
              </div>
              
              <div className="text-primary text-2xl font-bold mt-6">
                # Quote Generator
              </div>
              
              <div className="text-muted-foreground">
                Programming quotes, wisdom, and inspiration from great minds.
              </div>
            </div>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="terminal-window bg-background border border-border rounded-lg overflow-hidden shadow-lg mb-6">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm font-mono text-muted-foreground">Filter by category:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => setFilter(category)}
                  variant={filter === category ? "default" : "outline"}
                  size="sm"
                  className="font-mono text-xs"
                >
                  {category.toUpperCase()}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Quote Display */}
        <div className="terminal-window bg-background border border-border rounded-lg overflow-hidden shadow-2xl mb-6">
          <div className="terminal-header bg-muted/50 border-b border-border px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-sm font-mono text-muted-foreground">Quote #{Math.floor(Math.random() * 9999).toString().padStart(4, '0')}</span>
                {getCategoryBadge(currentQuote.category)}
              </div>
              <div className="text-xs font-mono text-muted-foreground">
                Est. {currentQuote.year}
              </div>
            </div>
          </div>
          
          <div className="p-8">
            <div className={`transition-all duration-300 ${isAnimating ? 'opacity-30 scale-95' : 'opacity-100 scale-100'}`}>
              <blockquote className="text-lg md:text-xl font-mono leading-relaxed text-foreground mb-6 italic">
                "{currentQuote.text}"
              </blockquote>
              
              <div className="flex items-center justify-between">
                <div className="font-mono text-sm">
                  <span className="text-muted-foreground">— </span>
                  <span className="text-primary font-medium">{currentQuote.author}</span>
                </div>
                
                <Button
                  onClick={generateRandomQuote}
                  disabled={isAnimating}
                  className="font-mono"
                >
                  {isAnimating ? "Loading..." : "./random_quote"}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Quote Stats */}
        <div className="terminal-window bg-background border border-border rounded-lg overflow-hidden shadow-lg">
          <div className="p-6 font-mono">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">{quotes.length}</div>
                <div className="text-xs text-muted-foreground">Total Quotes</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">{quotes.filter(q => q.category === 'programming').length}</div>
                <div className="text-xs text-muted-foreground">Programming</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">{quotes.filter(q => q.category === 'motivation').length}</div>
                <div className="text-xs text-muted-foreground">Motivation</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">{new Set(quotes.map(q => q.author)).size}</div>
                <div className="text-xs text-muted-foreground">Authors</div>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-border">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="text-primary">lwh@terminal</span>
                <span>:</span>
                <span>~/quotes</span>
                <span className="text-primary">$</span>
                <span>echo "Wisdom never goes out of style"</span>
              </div>
              <div className="ml-4 mt-1 text-xs text-muted-foreground">
                Wisdom never goes out of style
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}