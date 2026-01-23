# Portfolio Customization Guide

This guide explains how to customize every aspect of your portfolio website.

## Quick Start

1. Install dependencies: `npm install`
2. Start development server: `npm run dev`
3. Edit `src/config/site.config.ts` for all customizations
4. Place your photo at `public/images/profile.jpg`

---

## File Structure

```
src/
├── config/
│   └── site.config.ts    # ALL customization happens here
├── components/           # Reusable UI components
├── sections/             # Page sections (About, Projects, Blog)
├── hooks/                # Custom React hooks
└── index.css             # Global styles and CSS variables

public/
└── images/
    ├── profile.jpg       # Your profile photo
    └── projects/         # Project screenshots
```

---

## Customization Reference

### 1. Personal Information

Edit `personalInfo` in `site.config.ts`:

```typescript
export const personalInfo = {
  name: "Your Name",
  tagline: "Your Title",
  photo: "/images/profile.jpg",  // Place image in public/images/
  initials: "YN",                // Fallback if photo fails
  bio: `Your bio text here...`,
  interests: [
    "Interest 1",
    "Interest 2",
  ],
  links: {
    email: "you@example.com",
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    twitter: null,  // Set to URL or null to hide
    website: null,
  },
};
```

### 2. Projects

Edit the `projects` array in `site.config.ts`:

```typescript
export const projects: Project[] = [
  {
    id: "unique-id",
    title: "Project Name",
    pitch: "One-line description",
    description: "Longer description (shown on featured cards)",
    tags: ["React", "TypeScript"],
    links: {
      live: "https://example.com",
      github: "https://github.com/...",
      article: "https://blog.example.com/...",
    },
    image: "/images/projects/project-name.png",
    featured: true,  // true = large card, false = grid card
  },
  // ... more projects
];
```

**Project images:** Place in `public/images/projects/`. Recommended size: 1200x630px.

### 3. Blog Posts

Edit the `blogPosts` array in `site.config.ts`:

```typescript
export const blogPosts: BlogPost[] = [
  {
    id: "unique-id",
    title: "Post Title",
    excerpt: "Short description...",
    date: "2025-04-15",  // ISO date format
    readingTime: "5 min read",
    category: "Engineering",
    tags: ["React", "Performance"],
    slug: "url-friendly-slug",
    featured: true,  // Shows in featured section
  },
  // ... more posts
];
```

---

## Theme Customization

### Colors

Edit `theme.colors` in `site.config.ts` or directly in `src/index.css`:

```typescript
export const theme = {
  mode: "light",  // "light" or "dark"
  colors: {
    light: {
      bg: "#fafafa",           // Main background
      bgSecondary: "#ffffff",  // Card backgrounds
      bgTertiary: "#f4f4f5",   // Subtle backgrounds
      fg: "#18181b",           // Main text
      fgSecondary: "#3f3f46",  // Secondary text
      fgMuted: "#71717a",      // Muted text
      accent: "#2563eb",       // Primary accent (links, buttons)
      // ... more colors
    },
  },
};
```

**Quick palette swap:** Edit the CSS variables directly in `src/index.css`:

```css
@theme {
  --color-bg: #fafafa;
  --color-accent: #2563eb;
  /* ... */
}
```

### Tag Colors

Customize tag colors by category:

```typescript
tagColors: {
  react: { bg: "#dbeafe", text: "#1e40af" },
  typescript: { bg: "#dbeafe", text: "#1e40af" },
  python: { bg: "#fef3c7", text: "#92400e" },
  // Add your own...
  mycategory: { bg: "#f0f0f0", text: "#333333" },
}
```

---

## Layout Customization

### Density

```typescript
export const layout = {
  density: "airy",  // "airy" = spacious, "compact" = dense
  // ...
};
```

### Spacing

Adjust spacing values in `layout.spacing`:

```typescript
spacing: {
  airy: {
    sectionGap: "6rem",
    cardGap: "1.5rem",
    cardPadding: "1.5rem",
  },
  compact: {
    sectionGap: "3rem",
    cardGap: "1rem",
    cardPadding: "1rem",
  },
},
```

---

## Motion & Animation

### Master Toggle

```typescript
export const motion = {
  enabled: true,        // false = disable ALL motion
  intensity: 2,         // 0-3 scale (0 = none, 3 = expressive)
  // ...
};
```

### Individual Effects

```typescript
effects: {
  cursorGlow: true,     // Subtle glow following cursor
  magneticHover: true,  // Elements pull toward cursor
  parallaxTilt: true,   // 3D tilt on project cards
  smoothScroll: true,   // Smooth scrolling
  scrollReveal: true,   // Fade-in on scroll
},
```

### Reduced Motion

The site automatically respects `prefers-reduced-motion`. When enabled:
- All animations are disabled
- Transitions use instant timing
- Cursor effects are hidden

---

## Profile Photo

1. Place your photo at `public/images/profile.jpg`
2. Recommended: Square image, at least 400x400px
3. Circular mask is applied automatically
4. If image fails, initials are shown as fallback

---

## Adding Navigation Sections

Edit `navigation.sections`:

```typescript
export const navigation = {
  sections: [
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "blog", label: "Blog" },
    // Add new sections here
  ],
};
```

Then create the corresponding section component in `src/sections/`.

---

## SEO & Metadata

Edit `index.html` for:
- Page title
- Meta description
- Open Graph tags (add if needed)

```html
<title>Your Name | Portfolio</title>
<meta name="description" content="Your description..." />
```

---

## Deployment

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

The `dist/` folder contains static files ready for any hosting:
- Vercel
- Netlify
- GitHub Pages
- Any static file server

---

## Tips

1. **Start with content**: Update `personalInfo`, `projects`, and `blogPosts` first
2. **Add your photo**: Place at `public/images/profile.jpg`
3. **Choose a palette**: Edit accent color first, then tweak other colors
4. **Adjust motion**: Lower `motion.intensity` for subtler effects
5. **Test on mobile**: The layout adapts, but verify it looks good

---

## Component Reference

| Component | Location | Purpose |
|-----------|----------|---------|
| ProfilePanel | `components/ProfilePanel.tsx` | Sticky sidebar with photo/menu |
| ScrollSpyMenu | `components/ScrollSpyMenu.tsx` | Navigation with scroll tracking |
| ProjectCard | `components/ProjectCard.tsx` | Project display (featured/grid) |
| BlogPostItem | `components/BlogPostItem.tsx` | Blog post display (featured/list) |
| AboutSection | `sections/AboutSection.tsx` | About content |
| ProjectsSection | `sections/ProjectsSection.tsx` | Projects grid |
| BlogSection | `sections/BlogSection.tsx` | Blog posts list |

---

## Hooks Reference

| Hook | Purpose |
|------|---------|
| `useScrollSpy` | Tracks active section via IntersectionObserver |
| `usePrefersReducedMotion` | Detects user motion preferences |
| `useCursorGlow` | Creates cursor-following gradient |
| `useMagneticHover` | Creates magnetic pull effect |
| `useParallaxTilt` | Creates 3D tilt on hover |

All motion hooks automatically respect `motion.enabled`, `motion.intensity`, and `prefers-reduced-motion`.
