# Giscus + GitHub Discussions Integration Guide

## Overview

This guide shows how to integrate **Giscus** (a comment system powered by GitHub Discussions) into your React Router v7 personal website. Comments will be stored as GitHub Discussions in your repository.

## Prerequisites

- GitHub repository: `https://github.com/lwhcoder/personal-website`
- Repository must be public (for Giscus to work)
- Admin access to the repository

## Setup Steps

### 1. Enable GitHub Discussions

1. Go to your repository: https://github.com/lwhcoder/personal-website
2. Click **Settings** tab
3. Scroll down to **Features** section  
4. Check ✅ **Discussions** checkbox
5. GitHub will create a **Discussions** tab in your repository

### 2. Install Giscus GitHub App

1. Visit: https://github.com/apps/giscus
2. Click **Install**
3. Choose your repository: `lwhcoder/personal-website`
4. Grant required permissions

### 3. Configure Giscus Settings

Visit https://giscus.app to configure:

#### Repository Configuration
- **Repository**: `lwhcoder/personal-website` 
- **Page ↔️ Discussions Mapping**: 
  - Choose **Discussion title contains page pathname** (recommended for blogs)
  - Alternative: **Discussion title contains page URL**

#### Discussion Category
- **Category**: `General` (or create a custom category like "Comments")
- This determines where comments appear in your Discussions tab

#### Features
- ✅ **Enable reactions** for the main post
- ✅ **Load comments lazily**

#### Theme
- **Theme**: Custom CSS theme (`/giscus-custom-theme.css`)
- Automatically matches your website's terminal-style black/white theme
- Includes terminal dots in comment headers
- Uses JetBrains Mono font for consistency

### 4. Get Repository Data

You'll need these values from https://giscus.app after configuration:

```javascript
// These will be auto-generated on giscus.app
data-repo="lwhcoder/personal-website"
data-repo-id="R_YOUR_REPO_ID" 
data-category="General"
data-category-id="YOUR_CATEGORY_ID"
```

## Integration in Your Code

### Component Structure

The integration includes:

```
app/components/
├── giscus-comments.tsx     # Main Giscus component
└── theme-provider.tsx      # Existing theme provider

app/routes/
└── blog.$slug.tsx          # Blog post page with comments
```

### Key Features

✨ **Custom terminal theme** - Comments styled to match your website's aesthetic
✨ **Automatic theme switching** - Seamlessly adapts to light/dark modes
✨ **JetBrains Mono font** - Consistent typography with your site
✨ **Terminal window styling** - Header includes terminal dots for authenticity
✨ **Lazy loading** - Comments load when user scrolls to them
✨ **Responsive design** - Works perfectly on all devices
✨ **TypeScript support** - Fully typed components
✨ **Highly configurable** - Easy to customize per page

### Usage Examples

#### Basic Usage
```tsx
import { GiscusComments } from "~/components/giscus-comments"

export default function BlogPost() {
  return (
    <article>
      {/* Your blog content */}
      
      <GiscusComments />
    </article>
  )
}
```

#### Advanced Configuration
```tsx
<GiscusComments
  repo="lwhcoder/personal-website"
  mapping="pathname"           // Use pathname for mapping
  category="Comments"          // Custom category
  reactionsEnabled="1"         // Enable reactions
  inputPosition="top"          // Comment box at top
  lang="en"                   // Language
  loading="lazy"              // Lazy load comments
/>
```

#### Multiple Categories
```tsx
// Blog posts
<GiscusComments 
  category="Blog Comments" 
  mapping="pathname" 
/>

// Project pages  
<GiscusComments 
  category="Project Discussion"
  mapping="title"
/>
```

## GitHub Repository Setup

### Discussion Categories

Consider creating specific categories:

1. Go to your repo **Discussions** tab
2. Click **Categories** 
3. Create categories like:
   - `📝 Blog Comments` - For blog post comments
   - `💬 General Discussion` - General conversation
   - `🙋 Q&A` - Questions and answers
   - `💡 Ideas` - Feature requests and ideas

### Moderation

As repository owner, you can:
- ✅ **Moderate comments** via GitHub Discussions interface
- 🗑️ **Delete inappropriate comments** 
- 👤 **Block users** if needed
- 📌 **Pin important discussions**
- 🏷️ **Label discussions** for organization

## Advanced Features

### Custom Styling

The component includes CSS classes for custom styling:

```css
/* Target the giscus container */
.giscus-container {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border);
}

/* Style the giscus iframe (limited) */
.giscus-frame {
  width: 100%;
  border: none;
  border-radius: 8px;
}
```

### Theme Integration

The component automatically syncs with your site's theme:

```tsx
// Automatically handled by the component
const { theme } = useTheme()
const giscusTheme = theme === 'dark' ? 'dark' : 'light'
```

### Performance Optimization

- **Lazy loading**: Comments only load when user scrolls to them
- **Conditional rendering**: Only renders on blog posts
- **Memory cleanup**: Properly removes event listeners

## Configuration Options

| Option | Values | Description |
|--------|---------|-------------|
| `mapping` | `pathname`, `url`, `title`, `og:title` | How to map pages to discussions |
| `category` | Your category name | Discussion category |
| `inputPosition` | `top`, `bottom` | Comment input location |
| `reactionsEnabled` | `0`, `1` | Enable emoji reactions |
| `loading` | `lazy`, `eager` | When to load comments |
| `lang` | Language codes | Interface language |

## Troubleshooting

### Comments Not Loading
1. ✅ Check repository is **public**
2. ✅ Verify **Discussions are enabled** 
3. ✅ Confirm **Giscus app is installed**
4. ✅ Check **category exists** in your repo

### Theme Issues
1. ✅ Ensure `next-themes` is properly configured
2. ✅ Check theme provider wraps your app
3. ✅ Verify theme switching works elsewhere

### Mapping Issues
1. ✅ Use consistent **mapping strategy** (`pathname` recommended)
2. ✅ Check **page paths** match your routing
3. ✅ Verify **URL structure** is stable

## Security & Privacy

### What GitHub Stores
- 💬 **Comments and reactions** 
- 👤 **Commenter's GitHub profile**
- 🕒 **Timestamps**
- 🔗 **Discussion metadata**

### Privacy Considerations
- Comments are **public** (tied to GitHub profiles)
- Users need **GitHub account** to comment
- **No tracking cookies** from Giscus itself
- Subject to **GitHub's privacy policy**

## Best Practices

### 1. Content Organization
```tsx
// Group related discussions
<GiscusComments 
  category="Blog Posts"
  mapping="pathname" 
/>
```

### 2. User Experience
- Add **loading states** while comments load
- Include **clear instructions** for first-time users
- Consider **comment count** indicators

### 3. Moderation Strategy
- Set **clear community guidelines**
- Monitor discussions **regularly**
- Use GitHub's **auto-moderation** features
- Consider **discussion templates**

### 4. SEO Benefits
- Comments **increase page content**
- **User engagement** signals
- **Fresh content** updates
- **Community building**

## Support & Links

- 📚 **Giscus Documentation**: https://giscus.app
- 🐙 **GitHub Discussions**: https://docs.github.com/discussions  
- 🛠️ **Component Source**: `app/components/giscus-comments.tsx`
- 🔧 **Configuration**: https://giscus.app

## Example Implementation

Check the implementation in:
- `app/routes/blog.$slug.tsx` - Blog post with comments
- `app/components/giscus-comments.tsx` - Reusable component

The comments will appear below each blog post, automatically themed to match your site, and fully integrated with your GitHub repository discussions! 

---

**Need help?** Open a discussion in your repository or check the Giscus documentation.