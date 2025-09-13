import { useState, useEffect } from "react";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export function meta() {
  return [
    { title: "Color Generator - LWH" },
    { name: "description", content: "Generate beautiful color schemes for developers" },
  ];
}

interface ColorScheme {
  name: string;
  colors: string[];
  type: "monochrome" | "complementary" | "triadic" | "analogous" | "random";
}

// Utility functions for color manipulation
const hexToHsl = (hex: string): [number, number, number] => {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h: number, s: number, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
      default: h = 0;
    }
    h /= 6;
  }

  return [h * 360, s * 100, l * 100];
};

const hslToHex = (h: number, s: number, l: number): string => {
  h /= 360;
  s /= 100;
  l /= 100;

  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  };

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;

  const r = Math.round(hue2rgb(p, q, h + 1/3) * 255);
  const g = Math.round(hue2rgb(p, q, h) * 255);
  const b = Math.round(hue2rgb(p, q, h - 1/3) * 255);

  const toHex = (c: number) => {
    const hex = c.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

const generateRandomHex = (): string => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
};

const generateColorScheme = (type: string, baseColor?: string): ColorScheme => {
  const base = baseColor || generateRandomHex();
  const [h, s, l] = hexToHsl(base);
  
  switch (type) {
    case "monochrome":
      return {
        name: "Monochrome Harmony",
        type: "monochrome",
        colors: [
          base,
          hslToHex(h, s, Math.max(10, l - 30)),
          hslToHex(h, s, Math.min(90, l + 30)),
          hslToHex(h, Math.max(10, s - 20), l),
          hslToHex(h, Math.min(90, s + 20), l)
        ]
      };
    
    case "complementary":
      return {
        name: "Complementary Colors",
        type: "complementary",
        colors: [
          base,
          hslToHex((h + 180) % 360, s, l),
          hslToHex(h, s, Math.max(10, l - 20)),
          hslToHex((h + 180) % 360, s, Math.max(10, l - 20)),
          hslToHex(h, Math.max(20, s - 30), Math.min(80, l + 20))
        ]
      };
    
    case "triadic":
      return {
        name: "Triadic Harmony",
        type: "triadic",
        colors: [
          base,
          hslToHex((h + 120) % 360, s, l),
          hslToHex((h + 240) % 360, s, l),
          hslToHex(h, Math.max(20, s - 20), Math.max(20, l - 20)),
          hslToHex((h + 120) % 360, Math.max(20, s - 20), Math.max(20, l - 20))
        ]
      };
    
    case "analogous":
      return {
        name: "Analogous Colors",
        type: "analogous",
        colors: [
          base,
          hslToHex((h + 30) % 360, s, l),
          hslToHex((h - 30 + 360) % 360, s, l),
          hslToHex((h + 60) % 360, s, l),
          hslToHex((h - 60 + 360) % 360, s, l)
        ]
      };
    
    default: // random
      return {
        name: "Random Palette",
        type: "random",
        colors: [
          generateRandomHex(),
          generateRandomHex(),
          generateRandomHex(),
          generateRandomHex(),
          generateRandomHex()
        ]
      };
  }
};

export default function ColorGenerator() {
  const [currentScheme, setCurrentScheme] = useState<ColorScheme>(
    generateColorScheme("random")
  );
  const [copiedColor, setCopiedColor] = useState<string>("");

  const generateNewScheme = (type: string) => {
    setCurrentScheme(generateColorScheme(type));
  };

  const copyToClipboard = (color: string) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setTimeout(() => setCopiedColor(""), 2000);
  };

  const exportCSS = () => {
    const cssVars = currentScheme.colors.map((color, index) => 
      `  --color-${index + 1}: ${color};`
    ).join('\n');
    
    const css = `:root {\n${cssVars}\n}`;
    navigator.clipboard.writeText(css);
    setCopiedColor("CSS exported!");
    setTimeout(() => setCopiedColor(""), 2000);
  };

  const exportJSON = () => {
    const json = JSON.stringify({
      name: currentScheme.name,
      colors: currentScheme.colors
    }, null, 2);
    
    navigator.clipboard.writeText(json);
    setCopiedColor("JSON exported!");
    setTimeout(() => setCopiedColor(""), 2000);
  };

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
              lwh@terminal:~/color-generator$
            </div>
            <div className="w-16"></div>
          </div>
          
          <div className="p-8 font-mono">
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-primary">lwh@terminal</span>
                <span className="text-muted-foreground">:</span>
                <span className="text-foreground">~/color-generator</span>
                <span className="text-primary">$</span>
                <span className="text-foreground">./generate_palette --type=harmony</span>
              </div>
              
              <div className="text-primary text-2xl font-bold mt-6">
                # Color Scheme Generator
              </div>
              
              <div className="text-muted-foreground">
                Generate beautiful, harmonious color palettes for your next project.
              </div>
            </div>
          </div>
        </div>

        {/* Generation Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="font-mono text-sm">Color Harmony Types</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {[
                    { type: "monochrome", label: "Monochrome" },
                    { type: "complementary", label: "Complementary" },
                    { type: "triadic", label: "Triadic" },
                    { type: "analogous", label: "Analogous" },
                    { type: "random", label: "Random" }
                  ].map(({ type, label }) => (
                    <Button
                      key={type}
                      onClick={() => generateNewScheme(type)}
                      variant={currentScheme.type === type ? "default" : "outline"}
                      size="sm"
                      className="font-mono text-xs"
                    >
                      {label}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="font-mono text-sm">Export Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button onClick={exportCSS} variant="outline" size="sm" className="w-full font-mono text-xs">
                  Export CSS Variables
                </Button>
                <Button onClick={exportJSON} variant="outline" size="sm" className="w-full font-mono text-xs">
                  Export JSON
                </Button>
                {copiedColor && (
                  <div className="text-xs text-green-600 font-mono mt-2">
                    {copiedColor}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Current Scheme Display */}
        <div className="terminal-window bg-background border border-border rounded-lg overflow-hidden shadow-2xl mb-8">
          <div className="terminal-header bg-muted/50 border-b border-border px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-mono text-lg font-bold">{currentScheme.name}</span>
                <Badge variant="secondary" className="font-mono text-xs">
                  {currentScheme.type.toUpperCase()}
                </Badge>
              </div>
              <Button
                onClick={() => generateNewScheme(currentScheme.type)}
                size="sm"
                className="font-mono text-xs"
              >
                ./regenerate
              </Button>
            </div>
          </div>
          
          <div className="p-8">
            {/* Color Grid */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
              {currentScheme.colors.map((color, index) => (
                <div key={index} className="space-y-3">
                  <div
                    className="aspect-square rounded-lg border-2 border-border cursor-pointer hover:scale-105 transition-transform duration-200"
                    style={{ backgroundColor: color }}
                    onClick={() => copyToClipboard(color)}
                  />
                  <div className="text-center space-y-1">
                    <div className="font-mono text-sm font-bold">{color}</div>
                    <div className="text-xs text-muted-foreground">
                      {copiedColor === color ? "Copied!" : "Click to copy"}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Color Usage Preview */}
            <div className="space-y-6">
              <h3 className="font-mono text-lg font-bold">Preview</h3>
              
              {/* Website Preview */}
              <div className="border border-border rounded-lg overflow-hidden">
                <div 
                  className="px-6 py-4 border-b border-border"
                  style={{ backgroundColor: currentScheme.colors[0] }}
                >
                  <h4 className="font-mono font-bold text-white">Website Header</h4>
                </div>
                <div 
                  className="p-6"
                  style={{ backgroundColor: currentScheme.colors[4] }}
                >
                  <div className="space-y-4">
                    <div 
                      className="p-4 rounded"
                      style={{ backgroundColor: currentScheme.colors[1] }}
                    >
                      <h5 className="font-mono text-white font-medium">Card Component</h5>
                    </div>
                    <div className="flex gap-2">
                      {currentScheme.colors.slice(2, 4).map((color, index) => (
                        <div
                          key={index}
                          className="px-4 py-2 rounded font-mono text-white text-sm"
                          style={{ backgroundColor: color }}
                        >
                          Button {index + 1}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Terminal Preview */}
              <div className="terminal-window bg-black border border-border rounded-lg overflow-hidden">
                <div className="terminal-header bg-gray-800 border-b border-gray-600 px-4 py-3">
                  <div className="terminal-dots flex gap-2">
                    <div style={{ backgroundColor: currentScheme.colors[0] }} className="w-3 h-3 rounded-full"></div>
                    <div style={{ backgroundColor: currentScheme.colors[1] }} className="w-3 h-3 rounded-full"></div>
                    <div style={{ backgroundColor: currentScheme.colors[2] }} className="w-3 h-3 rounded-full"></div>
                  </div>
                </div>
                <div className="p-4 font-mono text-sm">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span style={{ color: currentScheme.colors[0] }}>user@terminal</span>
                      <span className="text-gray-400">:</span>
                      <span style={{ color: currentScheme.colors[1] }}>~/project</span>
                      <span style={{ color: currentScheme.colors[0] }}>$</span>
                      <span style={{ color: currentScheme.colors[2] }}>npm run build</span>
                    </div>
                    <div style={{ color: currentScheme.colors[3] }} className="ml-4">
                      Build completed successfully!
                    </div>
                    <div style={{ color: currentScheme.colors[4] }} className="ml-4">
                      Files: 42 | Time: 2.3s | Size: 1.2MB
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="terminal-window bg-background border border-border rounded-lg overflow-hidden shadow-lg">
          <div className="p-6">
            <h3 className="font-mono text-lg font-bold mb-4">Color Theory Tips</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-mono font-medium text-primary mb-2">Monochrome</h4>
                <p className="text-muted-foreground">Uses variations of a single hue. Great for minimalist designs.</p>
              </div>
              <div>
                <h4 className="font-mono font-medium text-primary mb-2">Complementary</h4>
                <p className="text-muted-foreground">Uses opposite colors on the color wheel. High contrast and vibrant.</p>
              </div>
              <div>
                <h4 className="font-mono font-medium text-primary mb-2">Triadic</h4>
                <p className="text-muted-foreground">Uses three evenly spaced colors. Balanced and harmonious.</p>
              </div>
              <div>
                <h4 className="font-mono font-medium text-primary mb-2">Analogous</h4>
                <p className="text-muted-foreground">Uses adjacent colors on the wheel. Natural and pleasing.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}