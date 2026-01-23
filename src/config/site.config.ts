/**
 * Site Configuration
 *
 * This single file controls ALL customization for the portfolio:
 * - Personal info and content
 * - Colors and theming
 * - Typography
 * - Layout and spacing
 * - Motion and animations
 *
 * Edit the values below to customize your portfolio.
 */

// ============================================================================
// PERSONAL INFO & CONTENT
// ============================================================================

export const personalInfo = {
  name: "David Y. Wang",
  tagline: "Lifelong learner",

  // Path to your photo - place your image in /public/images/
  // Recommended: 400x400px square image
  photo: "/images/profile.jpg",

  // Fallback initials if photo fails to load
  initials: "DW",

  bio: `I'm a software engineer passionate about building elegant,
performant web experiences. I combine strong engineering fundamentals
with an eye for design to create products that are both technically
solid and delightful to use.`,

  // Focus areas / interests displayed in About section
  interests: [
    "Full-stack Development",
    "System Design",
    "UI/UX Engineering",
    "Open Source",
  ],

  // Social links - set to null or remove to hide
  links: {
    email: "hello@davidwang.dev",
    github: "https://github.com/davidwang",
    linkedin: "https://linkedin.com/in/davidwang",
    twitter: null, // Set to URL string to enable
    website: null, // Additional website link
  },
};

// ============================================================================
// PROJECTS
// ============================================================================

export interface Project {
  id: string;
  title: string;
  pitch: string; // One-line description
  description?: string; // Longer description for featured
  tags: string[];
  links: {
    live?: string;
    github?: string;
    article?: string;
  };
  image?: string; // Path to project image in /public/images/projects/
  featured?: boolean; // Featured projects get larger cards
}

export const projects: Project[] = [
  {
    id: "project-alpha",
    title: "Project Alpha",
    pitch: "A next-gen developer toolkit for rapid prototyping",
    description: "Built a comprehensive developer toolkit that streamlines the prototyping process. Features include real-time collaboration, component library integration, and automated deployment pipelines.",
    tags: ["React", "TypeScript", "Node.js", "WebSocket"],
    links: {
      live: "https://project-alpha.dev",
      github: "https://github.com/davidwang/project-alpha",
    },
    image: "/images/projects/alpha.png",
    featured: true,
  },
  {
    id: "data-viz",
    title: "DataViz Studio",
    pitch: "Interactive data visualization platform for analysts",
    description: "An intuitive platform for creating stunning data visualizations without code. Supports real-time data streams and custom chart builders.",
    tags: ["D3.js", "Python", "PostgreSQL", "AWS"],
    links: {
      live: "https://dataviz.studio",
      github: "https://github.com/davidwang/dataviz",
    },
    image: "/images/projects/dataviz.png",
    featured: true,
  },
  {
    id: "cli-tools",
    title: "DevCLI",
    pitch: "Collection of productivity CLI tools for developers",
    tags: ["Rust", "CLI", "Open Source"],
    links: {
      github: "https://github.com/davidwang/devcli",
    },
  },
  {
    id: "design-system",
    title: "Horizon UI",
    pitch: "Accessible component library with dark mode support",
    tags: ["React", "Storybook", "A11y"],
    links: {
      live: "https://horizon-ui.dev",
      github: "https://github.com/davidwang/horizon-ui",
    },
  },
  {
    id: "ml-pipeline",
    title: "MLPipe",
    pitch: "Simplified ML pipeline orchestration for small teams",
    tags: ["Python", "Docker", "Kubernetes"],
    links: {
      github: "https://github.com/davidwang/mlpipe",
      article: "https://blog.davidwang.dev/mlpipe-deep-dive",
    },
  },
  {
    id: "api-gateway",
    title: "Gateway Pro",
    pitch: "Lightweight API gateway with built-in rate limiting",
    tags: ["Go", "Redis", "gRPC"],
    links: {
      github: "https://github.com/davidwang/gateway-pro",
    },
  },
];

// ============================================================================
// BLOG POSTS
// ============================================================================

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string; // ISO date string
  readingTime: string; // e.g., "5 min read"
  category: string;
  tags: string[];
  slug: string; // URL-friendly identifier
  featured?: boolean;
  // For future MDX integration, add: content?: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "post-1",
    title: "Building Performant React Applications at Scale",
    excerpt: "Lessons learned from optimizing a React application serving millions of users. Covers code splitting, memoization strategies, and avoiding common pitfalls.",
    date: "2025-04-15",
    readingTime: "8 min read",
    category: "Engineering",
    tags: ["React", "Performance", "Architecture"],
    slug: "performant-react-at-scale",
    featured: true,
  },
  {
    id: "post-2",
    title: "The Case for TypeScript in 2025",
    excerpt: "Why TypeScript adoption continues to grow and how it fundamentally changes the way we think about JavaScript development.",
    date: "2025-03-22",
    readingTime: "6 min read",
    category: "Opinion",
    tags: ["TypeScript", "JavaScript", "DX"],
    slug: "case-for-typescript-2025",
  },
  {
    id: "post-3",
    title: "Designing APIs That Developers Love",
    excerpt: "A deep dive into API design principles, from naming conventions to error handling, that make APIs intuitive and pleasant to use.",
    date: "2025-02-10",
    readingTime: "10 min read",
    category: "Engineering",
    tags: ["API Design", "DX", "Backend"],
    slug: "designing-apis-developers-love",
  },
  {
    id: "post-4",
    title: "My Development Setup in 2025",
    excerpt: "A tour of the tools, extensions, and workflows that power my daily development. From terminal to editor to deployment.",
    date: "2025-01-05",
    readingTime: "5 min read",
    category: "Productivity",
    tags: ["Tools", "Workflow", "Setup"],
    slug: "dev-setup-2025",
  },
  {
    id: "post-5",
    title: "Understanding the Event Loop",
    excerpt: "A visual and practical guide to understanding JavaScript's event loop, microtasks, and how async operations really work.",
    date: "2024-12-18",
    readingTime: "12 min read",
    category: "Engineering",
    tags: ["JavaScript", "Fundamentals", "Async"],
    slug: "understanding-event-loop",
  },
];

// ============================================================================
// THEME & COLORS
// ============================================================================

export const theme = {
  // Color mode: 'light' | 'dark'
  // The site respects this setting for initial load
  mode: "light" as const,

  colors: {
    // Light mode palette - Cream & Regal Red
    light: {
      // Backgrounds
      bg: "#faf8f3",
      bgSecondary: "#fffdf8",
      bgTertiary: "#f5f0e6",

      // Foregrounds
      fg: "#1a1a1a",
      fgSecondary: "#3d3d3d",
      fgMuted: "#6b6b6b",

      // Accent colors - Regal Red
      accent: "#8b1538",
      accentHover: "#6d1029",
      accentMuted: "#a62048",

      // Borders and dividers
      border: "#e8e2d6",
      borderHover: "#d4cdc0",

      // Interactive states
      hoverBg: "#f5f0e6",
      activeBg: "#ebe4d6",

      // Special
      cardBg: "#fffdf8",
      cardBorder: "#e8e2d6",
      cardShadow: "0 1px 3px 0 rgb(0 0 0 / 0.08), 0 1px 2px -1px rgb(0 0 0 / 0.08)",

      // Gradient for cursor glow (if enabled)
      glowGradient: "radial-gradient(600px circle, rgba(139, 21, 56, 0.08), transparent 40%)",
    },

    // Dark mode palette (for future dark mode toggle)
    dark: {
      bg: "#0f0d0b",
      bgSecondary: "#1a1816",
      bgTertiary: "#252220",

      fg: "#faf8f3",
      fgSecondary: "#d4d0c8",
      fgMuted: "#a19d95",

      accent: "#c4324f",
      accentHover: "#d4526b",
      accentMuted: "#a62048",

      border: "#2d2a27",
      borderHover: "#3d3936",

      hoverBg: "#252220",
      activeBg: "#2d2a27",

      cardBg: "#1a1816",
      cardBorder: "#2d2a27",
      cardShadow: "0 1px 3px 0 rgb(0 0 0 / 0.3), 0 1px 2px -1px rgb(0 0 0 / 0.3)",

      glowGradient: "radial-gradient(600px circle, rgba(196, 50, 79, 0.1), transparent 40%)",
    },
  },

  // Tag colors for categorization - warm tones with red accents
  tagColors: {
    default: { bg: "#f5f0e6", text: "#4a4a4a" },
    react: { bg: "#fde8ec", text: "#8b1538" },
    typescript: { bg: "#e8f0f8", text: "#1e4a7a" },
    python: { bg: "#fef6e6", text: "#8a5a00" },
    rust: { bg: "#fde8ec", text: "#8b1538" },
    go: { bg: "#e8f5ed", text: "#1a5f3a" },
    engineering: { bg: "#f5eef8", text: "#5a2a7a" },
    opinion: { bg: "#fde8ec", text: "#8b1538" },
    productivity: { bg: "#e8f5ed", text: "#1a5f3a" },
  },
};

// ============================================================================
// TYPOGRAPHY
// ============================================================================

export const typography = {
  // Font families - uses system fonts by default for performance
  // To use custom fonts, update these and add @font-face in index.css
  fontFamily: {
    sans: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    serif: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
    mono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
  },

  // Font sizes (rem values)
  fontSize: {
    xs: "0.75rem",    // 12px
    sm: "0.875rem",   // 14px
    base: "1rem",     // 16px
    lg: "1.125rem",   // 18px
    xl: "1.25rem",    // 20px
    "2xl": "1.5rem",  // 24px
    "3xl": "1.875rem", // 30px
    "4xl": "2.25rem", // 36px
    "5xl": "3rem",    // 48px
  },

  // Font weights
  fontWeight: {
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },

  // Line heights
  lineHeight: {
    tight: "1.25",
    normal: "1.5",
    relaxed: "1.75",
  },
};

// ============================================================================
// LAYOUT & SPACING
// ============================================================================

export const layout = {
  // Layout density: 'airy' | 'compact'
  density: "airy" as const,

  // Max width of main content area
  maxWidth: "1280px",

  // Column widths (desktop)
  contentWidth: "65%",
  sidebarWidth: "35%",

  // Sidebar max width (prevents it from getting too wide on large screens)
  sidebarMaxWidth: "320px",

  // Spacing values based on density
  spacing: {
    airy: {
      sectionGap: "6rem",      // Gap between sections
      cardGap: "1.5rem",       // Gap between cards
      cardPadding: "1.5rem",   // Padding inside cards
      sectionPadding: "3rem",  // Horizontal padding
      contentGap: "1rem",      // Gap between content elements
    },
    compact: {
      sectionGap: "3rem",
      cardGap: "1rem",
      cardPadding: "1rem",
      sectionPadding: "1.5rem",
      contentGap: "0.75rem",
    },
  },

  // Breakpoints
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
  },
};

// ============================================================================
// COMPONENT STYLING
// ============================================================================

export const components = {
  // Border radius
  borderRadius: {
    sm: "0.25rem",   // 4px
    md: "0.5rem",    // 8px
    lg: "0.75rem",   // 12px
    xl: "1rem",      // 16px
    full: "9999px",  // Circular
  },

  // Card styles
  card: {
    // Default card appearance
    default: {
      borderWidth: "1px",
      shadow: "sm", // 'none' | 'sm' | 'md' | 'lg'
    },
    // Featured card appearance (for featured projects/posts)
    featured: {
      borderWidth: "1px",
      shadow: "md",
    },
  },

  // Button styles
  button: {
    borderRadius: "md", // Key from borderRadius above
    padding: "0.5rem 1rem",
  },

  // Photo styling
  photo: {
    size: "120px",
    borderWidth: "3px",
    borderColor: "border", // Key from theme.colors
  },
};

// ============================================================================
// MOTION & ANIMATION
// ============================================================================

export const motion = {
  // Master toggle - set to false to disable ALL motion
  enabled: true,

  // Motion intensity scale (0-3)
  // 0 = No motion (respects prefers-reduced-motion)
  // 1 = Subtle (minimal, professional)
  // 2 = Moderate (noticeable but not distracting)
  // 3 = Expressive (more dramatic effects)
  intensity: 2,

  // Individual effect toggles
  effects: {
    // Cursor glow/gradient that follows mouse
    cursorGlow: true,

    // Magnetic effect on interactive elements
    magneticHover: true,

    // Parallax tilt on project cards
    parallaxTilt: true,

    // Smooth scroll behavior
    smoothScroll: true,

    // Fade-in animations on scroll
    scrollReveal: true,
  },

  // Duration values (in ms)
  duration: {
    fast: 150,
    normal: 300,
    slow: 500,
  },

  // Easing functions
  easing: {
    default: "cubic-bezier(0.4, 0, 0.2, 1)",
    easeOut: "cubic-bezier(0, 0, 0.2, 1)",
    easeIn: "cubic-bezier(0.4, 0, 1, 1)",
    spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  },
};

// ============================================================================
// NAVIGATION
// ============================================================================

export const navigation = {
  sections: [
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "blog", label: "Blog" },
  ],
};

// ============================================================================
// HELPER: Get current spacing based on density
// ============================================================================

export function getSpacing() {
  return layout.spacing[layout.density];
}

// ============================================================================
// HELPER: Get current color palette based on mode
// ============================================================================

export function getColors() {
  return theme.colors[theme.mode];
}
