import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { useState, useEffect, useRef } from "react";
import Navbar from "./components/navbar";
import { Footer } from "./components/footer";
import { ThemeProvider } from "./components/theme-provider";
import { Button } from "./components/ui/button";
import type { Route } from "./+types/root";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap",
  },
  {
    rel: "icon",
    href: "/favicon.ico"
  }
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full flex flex-col bg-background text-foreground ">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-1 pt-14">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

// Snake Game Component
function NotFoundPageWithSnake() {
  const [gameActive, setGameActive] = useState(false);
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState({ x: 0, y: 1 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [secretInput, setSecretInput] = useState("");
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

  const BOARD_SIZE = 20;

  // Handle keypress for easter egg activation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Only trigger if no text is selected and not in an input
      if (window.getSelection()?.toString() === "" && 
          !(e.target as HTMLElement)?.tagName.match(/INPUT|TEXTAREA/)) {
        const newInput = (secretInput + e.key).slice(-3);
        setSecretInput(newInput);
        
        if (newInput === "404") {
          setGameActive(true);
          setSecretInput("");
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [secretInput]);

  // Game controls
  useEffect(() => {
    if (!gameActive) return;

    const handleGameKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
        case 'Escape':
          setGameActive(false);
          resetGame();
          break;
      }
    };

    window.addEventListener('keydown', handleGameKeyPress);
    return () => window.removeEventListener('keydown', handleGameKeyPress);
  }, [gameActive, direction]);

  // Game loop
  useEffect(() => {
    if (!gameActive || gameOver) return;

    gameLoopRef.current = setTimeout(() => {
      setSnake(currentSnake => {
        const newSnake = [...currentSnake];
        const head = { ...newSnake[0] };
        
        head.x += direction.x;
        head.y += direction.y;

        // Check boundaries
        if (head.x < 0 || head.x >= BOARD_SIZE || head.y < 0 || head.y >= BOARD_SIZE) {
          setGameOver(true);
          return currentSnake;
        }

        // Check self collision
        if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
          setGameOver(true);
          return currentSnake;
        }

        newSnake.unshift(head);

        // Check food collision
        if (head.x === food.x && head.y === food.y) {
          setScore(prev => prev + 1);
          setFood({
            x: Math.floor(Math.random() * BOARD_SIZE),
            y: Math.floor(Math.random() * BOARD_SIZE)
          });
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, 200);

    return () => {
      if (gameLoopRef.current) clearTimeout(gameLoopRef.current);
    };
  }, [gameActive, direction, food, gameOver]);

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 5, y: 5 });
    setDirection({ x: 0, y: 1 });
    setScore(0);
    setGameOver(false);
  };

  const startNewGame = () => {
    resetGame();
    setGameActive(true);
  };

  if (gameActive) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4 bg-background">
        <div className="max-w-2xl w-full">
          <div className="terminal-window bg-background border border-border rounded-lg overflow-hidden shadow-2xl">
            <div className="terminal-header bg-muted border-b border-border px-4 py-3 flex items-center justify-between">
              <div className="terminal-dots flex gap-2">
                <div className="terminal-dot terminal-dot-red"></div>
                <div className="terminal-dot terminal-dot-yellow"></div>
                <div className="terminal-dot terminal-dot-green"></div>
              </div>
              <div className="text-sm font-mono text-muted-foreground">
                lwh@terminal:~/games/snake$
              </div>
              <div className="w-16"></div>
            </div>
            
            <div className="p-6 font-mono text-center">
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <div className="text-primary">Score: {score}</div>
                  <div className="text-muted-foreground">ESC to exit</div>
                </div>
                
                {gameOver && (
                  <div className="text-red-500 text-lg">Game Over!</div>
                )}
                
                <div 
                  className="mx-auto border border-border bg-muted/20"
                  style={{ 
                    width: `${BOARD_SIZE * 12}px`, 
                    height: `${BOARD_SIZE * 12}px`,
                    display: 'grid',
                    gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)`
                  }}
                >
                  {Array.from({ length: BOARD_SIZE * BOARD_SIZE }).map((_, index) => {
                    const x = index % BOARD_SIZE;
                    const y = Math.floor(index / BOARD_SIZE);
                    const isSnake = snake.some(segment => segment.x === x && segment.y === y);
                    const isFood = food.x === x && food.y === y;
                    const isHead = snake[0]?.x === x && snake[0]?.y === y;
                    
                    return (
                      <div
                        key={index}
                        className={`border border-border/20 ${
                          isHead ? 'bg-primary' : 
                          isSnake ? 'bg-primary/70' : 
                          isFood ? 'bg-red-500' : 
                          'bg-transparent'
                        }`}
                        style={{ width: '12px', height: '12px' }}
                      />
                    );
                  })}
                </div>
                
                <div className="text-xs text-muted-foreground space-y-1">
                  <div>Use arrow keys to move</div>
                  <div>🟦 = Snake head, 🟩 = Snake body, 🟥 = Food</div>
                </div>
                
                {gameOver && (
                  <div className="space-y-2">
                    <Button onClick={startNewGame} className="font-mono">
                      ./restart_game
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Terminal Window */}
        <div className="terminal-window bg-background border border-border rounded-lg overflow-hidden shadow-2xl">
          {/* Terminal Header */}
          <div className="terminal-header bg-muted border-b border-border px-4 py-3 flex items-center justify-between">
            <div className="terminal-dots flex gap-2">
              <div className="terminal-dot terminal-dot-red"></div>
              <div className="terminal-dot terminal-dot-yellow"></div>
              <div className="terminal-dot terminal-dot-green"></div>
            </div>
            <div className="text-sm font-mono text-muted-foreground">
              lwh@terminal:~/$
            </div>
            <div className="w-16"></div>
          </div>
          
          {/* Terminal Content */}
          <div className="p-8 font-mono">
            <div className="space-y-4 text-sm">
              {/* Command prompt */}
              <div className="flex items-center gap-2">
                <span className="text-primary">lwh@terminal</span>
                <span className="text-muted-foreground">:</span>
                <span className="text-foreground">~</span>
                <span className="text-primary">$</span>
                <span className="text-foreground">find /page --name "{typeof window !== 'undefined' ? window.location?.pathname || '/unknown' : '/unknown'}"</span>
              </div>
              
              {/* Command output */}
              <div className="text-muted-foreground ml-4">
                find: '/page{typeof window !== 'undefined' ? window.location?.pathname || '/unknown' : '/unknown'}': No such file or directory
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-primary">lwh@terminal</span>
                <span className="text-muted-foreground">:</span>
                <span className="text-foreground">~</span>
                <span className="text-primary">$</span>
                <span className="text-foreground">echo "Page not found"</span>
              </div>
              
              <div className="text-muted-foreground ml-4">
                Page not found
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-primary">lwh@terminal</span>
                <span className="text-muted-foreground">:</span>
                <span className="text-foreground">~</span>
                <span className="text-primary">$</span>
                <span className="text-foreground">cat /dev/random | head -c 100</span>
              </div>
              
              {/* ASCII Art 404 */}
              <div className="ml-4 my-8 text-primary font-bold">
                <pre className="text-lg leading-tight">
{`  ██╗  ██╗ ██████╗ ██╗  ██╗
  ██║  ██║██╔═████╗██║  ██║
  ███████║██║██╔██║███████║
  ╚════██║████╔╝██║╚════██║
       ██║╚██████╔╝     ██║
       ╚═╝ ╚═════╝      ╚═╝`}
                </pre>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-primary">lwh@terminal</span>
                <span className="text-muted-foreground">:</span>
                <span className="text-foreground">~</span>
                <span className="text-primary">$</span>
                <span className="text-foreground">ls /available_routes</span>
              </div>
              
              <div className="ml-4 text-muted-foreground space-y-1">
                <div>total 6</div>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <a href="/" className="text-primary hover:underline">drwxr-xr-x home/</a>
                  <a href="/about" className="text-primary hover:underline">drwxr-xr-x about/</a>
                  <a href="/portfolio" className="text-primary hover:underline">drwxr-xr-x portfolio/</a>
                  <a href="/blog" className="text-primary hover:underline">drwxr-xr-x blog/</a>
                  <a href="/contact" className="text-primary hover:underline">drwxr-xr-x contact/</a>
                  <a href="/report-bug" className="text-primary hover:underline">drwxr-xr-x report-bug/</a>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-primary">lwh@terminal</span>
                <span className="text-muted-foreground">:</span>
                <span className="text-foreground">~</span>
                <span className="text-primary">$</span>
                <span className="text-foreground">cd /home && ./navigate</span>
              </div>
              
              <div className="ml-4 text-muted-foreground">
                Redirecting to safety...
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-primary">lwh@terminal</span>
                <span className="text-muted-foreground">:</span>
                <span className="text-foreground">~</span>
                <span className="text-primary">$</span>
                <span className="terminal-cursor"></span>
              </div>
              
              {/* Easter egg hint */}
              <div className="ml-4 text-muted-foreground/50 text-xs mt-8">
                Psst... try typing something interesting 👀
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <a 
                href="/" 
                className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded font-mono text-sm hover:bg-primary/90 transition-colors"
              >
                cd ~/home
              </a>
              <button 
                onClick={() => typeof window !== 'undefined' && window.history.back()} 
                className="inline-flex items-center px-4 py-2 border border-border rounded font-mono text-sm hover:bg-muted transition-colors"
              >
                cd ..
              </button>
              <a 
                href="/report-bug" 
                className="inline-flex items-center px-4 py-2 border border-border rounded font-mono text-sm hover:bg-muted transition-colors"
              >
                ./report_bug
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;
  let is404 = false;

  if (isRouteErrorResponse(error)) {
    is404 = error.status === 404;
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  // Special 404 page
  if (is404) {
    return <NotFoundPageWithSnake />;
  }

  // Regular error page for non-404 errors
  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
