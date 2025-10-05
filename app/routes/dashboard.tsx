import { useState, useEffect, type FormEvent } from "react";

export default function DashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState("");
  const [authError, setAuthError] = useState("");
  
  // Blog post state
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [coverImageSrc, setCoverImageSrc] = useState("https://placehold.co/1280x720.png");
  const [content, setContent] = useState("**Start writing your blog post here...**");
  
  const [saveStatus, setSaveStatus] = useState("");
  
  // Valid tokens (in a real app, this would be server-side)
  const validTokens = ["13RE1^fe4yY+x&Uj5`MISVMZZS':?g"];
  
  const handleAuth = (e: FormEvent) => {
    e.preventDefault();
    if (validTokens.includes(token.trim())) {
      setIsAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Invalid token. Please check your credentials.");
    }
  };
  
  const handleLogout = () => {
    setIsAuthenticated(false);
    setToken("");
    setAuthError("");
  };
  
  // Auto-generate slug from title
  useEffect(() => {
    if (title) {
      const generatedSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setSlug(generatedSlug);
    }
  }, [title]);
  
  const generateYAMLFrontmatter = () => {
    const tagsArray = tags.split(',').map(tag => `"${tag.trim()}"`).join(', ');
    return `---
title: "${title}"
slug: "${slug}"
date: "${date}"
description: "${description}"
tags: [${tagsArray}]
coverImageSrc: "${coverImageSrc}"
---

${content}`;
  };
  
  const handleSave = () => {
    const fullContent = generateYAMLFrontmatter();
    const filename = `${slug || 'untitled'}.md`;
    
    try {
      // Create a blob and download (simulating file write)
      const blob = new Blob([fullContent], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
      
      setSaveStatus(`✅ Successfully saved as ${filename}`);
      setTimeout(() => setSaveStatus(""), 3000);
    } catch (error) {
      setSaveStatus("❌ Error saving file");
      setTimeout(() => setSaveStatus(""), 3000);
    }
  };
  
  const handlePreview = () => {
    const fullContent = generateYAMLFrontmatter();
    const previewWindow = window.open('', '_blank');
    previewWindow?.document.write(`
      <html>
        <head>
          <title>Preview: ${title}</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.6; }
            pre { background: #f5f5f5; padding: 15px; border-radius: 5px; overflow-x: auto; }
            .frontmatter { background: #e8f4fd; padding: 15px; border-left: 4px solid #0066cc; margin-bottom: 20px; }
          </style>
        </head>
        <body>
          <div class="frontmatter">
            <h3>YAML Frontmatter</h3>
            <pre>${fullContent.split('---\n\n')[0]}---</pre>
          </div>
          <div>
            <h3>Content Preview</h3>
            <pre>${content}</pre>
          </div>
        </body>
      </html>
    `);
  };
  
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen  flex items-center justify-center p-4">
        <div className="max-w-md w-full  rounded-lg shadow-md p-6">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold  mb-2">Blog Dashboard</h1>
            <p className="">Enter your access token to continue</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="token" className="block text-sm font-medium  mb-2">
                Access Token
              </label>
              <input
                id="token"
                type="password"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Enter your token"
                className="w-full px-3 py-2 border  rounded-md focus:outline-none focus:ring-2  "
                onKeyPress={(e) => e.key === 'Enter' && handleAuth(e)}
              />
            </div>
            
            {authError && (
              <div className=" text-sm  p-3 rounded-md">
                {authError}
              </div>
            )}
            
            <button
              onClick={handleAuth}
              className="w-full   py-2 px-4 rounded-md  focus:outline-none focus:ring-2  focus:ring-offset-2 transition-colors"
            >
              Access Dashboard
            </button>
          </div>
          
          <div className="mt-6 text-xs  text-center">
            <p>Enter it right</p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen ">
      <div className=" shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold ">Blog Dashboard</h1>
            <button
              onClick={handleLogout}
              className="  font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Metadata Panel */}
          <div className="lg:col-span-1">
            <div className=" rounded-lg shadow-sm p-6 space-y-4">
              <h2 className="text-lg font-semibold  mb-4">Post Metadata</h2>
              
              <div>
                <label className="block text-sm font-medium  mb-1">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter post title"
                  className="w-full px-3 py-2 border  rounded-md focus:outline-none focus:ring-2 "
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium  mb-1">Slug</label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="post-url-slug"
                  className="w-full px-3 py-2 border  rounded-md focus:outline-none focus:ring-2 "
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium  mb-1">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 border  rounded-md focus:outline-none focus:ring-2 "
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium  mb-1">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief description of the post"
                  rows={3}
                  className="w-full px-3 py-2 border  rounded-md focus:outline-none focus:ring-2 "
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium  mb-1">Tags</label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="docker, containers, devops"
                  className="w-full px-3 py-2 border  rounded-md focus:outline-none focus:ring-2 "
                />
                <p className="text-xs  mt-1">Separate tags with commas</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium  mb-1">Cover Image URL</label>
                <input
                  type="url"
                  value={coverImageSrc}
                  onChange={(e) => setCoverImageSrc(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-3 py-2 border  rounded-md focus:outline-none focus:ring-2 "
                />
              </div>
              
              <div className="flex flex-col space-y-2 pt-4">
                <button
                  onClick={handleSave}
                  className="w-full   py-2 px-4 rounded-md  focus:outline-none focus:ring-2  transition-colors"
                >
                  Save Post
                </button>
                
                <button
                  onClick={handlePreview}
                  className="w-full   py-2 px-4 rounded-md  focus:outline-none focus:ring-2  transition-colors"
                >
                  Preview
                </button>
                
                {saveStatus && (
                  <div className="text-sm p-2 rounded-md  text-center">
                    {saveStatus}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Content Editor */}
          <div className="lg:col-span-2">
            <div className=" rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 border-b ">
                <h2 className="text-lg font-semibold ">Content Editor</h2>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your blog post content in Markdown..."
                    className="w-full h-96 px-3 py-2 border  rounded-md focus:outline-none focus:ring-2  font-mono text-sm resize-none"
                    style={{ minHeight: '400px' }}
                  />
                  
                  <div className="border-t pt-4">
                    <h3 className="text-sm font-medium  mb-2">Live Preview:</h3>
                    <div 
                      className="border border-gray-200 rounded-md p-4  prose max-w-none"
                      style={{ 
                        minHeight: '200px',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                      }}
                    >
                      <div 
                        dangerouslySetInnerHTML={{ 
                          __html: content
                            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                            .replace(/\*(.*?)\*/g, '<em>$1</em>')
                            .replace(/^# (.*$)/gm, '<h1>$1</h1>')
                            .replace(/^## (.*$)/gm, '<h2>$1</h2>')
                            .replace(/^### (.*$)/gm, '<h3>$1</h3>')
                            .replace(/\n/g, '<br>')
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}