"use client"

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({ 
  code, 
  language = "typescript", 
  filename,
  showLineNumbers = false 
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(code);
      } else {
        // Fallback for environments without clipboard API
        const textArea = document.createElement("textarea");
        textArea.value = code;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy code to clipboard:", error);
    }
  };

  const lines = code.split("\n");

  return (
    <div className="group relative my-6 overflow-hidden rounded-lg border bg-muted">
      {/* Header */}
      <div className="flex items-center justify-between border-b bg-muted/50 px-4 py-2">
        <div className="flex items-center gap-2">
          {filename && (
            <span className="text-sm font-mono text-muted-foreground">
              {filename}
            </span>
          )}
          <span className="text-xs text-muted-foreground">{language}</span>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={copyToClipboard}
          className="h-8 px-2 opacity-0 transition-opacity group-hover:opacity-100"
        >
          {copied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Code Content */}
      <div className="overflow-x-auto">
        <pre className="p-4">
          <code className="font-mono text-sm">
            {showLineNumbers ? (
              <div className="table">
                {lines.map((line, i) => (
                  <div key={i} className="table-row">
                    <span className="table-cell select-none pr-4 text-right text-muted-foreground/50">
                      {i + 1}
                    </span>
                    <span className="table-cell">{line}</span>
                  </div>
                ))}
              </div>
            ) : (
              code
            )}
          </code>
        </pre>
      </div>
    </div>
  );
}

interface MultiLanguageCodeProps {
  tabs: Array<{
    label: string;
    language: string;
    code: string;
  }>;
  filename?: string;
  showLineNumbers?: boolean;
}

export function MultiLanguageCode({ 
  tabs, 
  filename,
  showLineNumbers = false 
}: MultiLanguageCodeProps) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0]?.label || "");

  const currentCode = tabs.find(tab => tab.label === activeTab)?.code || "";

  const copyToClipboard = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(currentCode);
      } else {
        // Fallback for environments without clipboard API
        const textArea = document.createElement("textarea");
        textArea.value = currentCode;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy code to clipboard:", error);
    }
  };

  return (
    <div className="group relative my-6 overflow-hidden rounded-lg border bg-muted">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        {/* Header with Tabs */}
        <div className="flex items-center justify-between border-b bg-muted/50 px-4 py-2">
          <div className="flex items-center gap-4">
            {filename && (
              <span className="text-sm font-mono text-muted-foreground">
                {filename}
              </span>
            )}
            <TabsList className="h-8 bg-transparent p-0">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.label}
                  value={tab.label}
                  className="h-7 rounded-md px-3 text-xs data-[state=active]:bg-background"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={copyToClipboard}
            className="h-8 px-2 opacity-0 transition-opacity group-hover:opacity-100"
          >
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Code Content */}
        {tabs.map((tab) => (
          <TabsContent key={tab.label} value={tab.label} className="m-0">
            <div className="overflow-x-auto">
              <pre className="p-4">
                <code className="font-mono text-sm">
                  {showLineNumbers ? (
                    <div className="table">
                      {tab.code.split("\n").map((line, i) => (
                        <div key={i} className="table-row">
                          <span className="table-cell select-none pr-4 text-right text-muted-foreground/50">
                            {i + 1}
                          </span>
                          <span className="table-cell">{line}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    tab.code
                  )}
                </code>
              </pre>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
