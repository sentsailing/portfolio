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
  tagline: "Generalizing out of distribution",

  // Path to your photo - place your image in /public/images/
  // Recommended: 400x400px square image
  photo: "/images/profile.jpg",

  // Fallback initials if photo fails to load
  initials: "DYW",

  bio: `Builder with a foundation in theoretical math research. I love using technology to optimize things and improve quality of life. Currently, I'm based in SF looking to join an startup where I can ship quickly, wear multiple hats, and learn more about how the world works.`,

  // Focus areas / interests displayed in About section
  interests: [
    "Agentic Systems",
    "Full-stack Development",
    "Applied ML",
    "Graph Algorithms",
  ],

  // Social links - set to null or remove to hide
  links: {
    email: "dyw.ventures@gmail.com",
    github: "https://github.com/sentsailing",
    linkedin: "https://linkedin.com/in/sentsailing",
    twitter: null, // Set to URL string to enable
    website: null, // Additional website link
    calendly: "https://calendly.com/dyw-ventures/30min",
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
// RESEARCH
// ============================================================================

export interface Research {
  id: string;
  title: string;
  problem: string;
  approach: string;
  tags: string[];
  image?: string;
  links: {
    paper?: string;
    blog?: string;
    code?: string;
  };
  year: string;
  institution?: string;
}

export const research: Research[] = [
  {
    id: "research-1",
    title: "Example: Graph Neural Networks for Combinatorial Optimization",
    problem: "Traditional algorithms for NP-hard combinatorial problems scale poorly. Can we leverage graph structure to learn better heuristics?",
    approach: "Developed a message-passing neural network that learns to predict optimal solutions by exploiting problem symmetries and local graph structure.",
    tags: ["Graph Theory", "Machine Learning", "Optimization"],
    image: "/images/research/gnn-example.png",
    links: {
      paper: "/papers/example-paper.pdf",
      blog: "#research-1-blog",
    },
    year: "2024",
    institution: "University",
  },
];

// ============================================================================
// THEME & COLORS
// ============================================================================

export const theme = {
  mode: "light" as const,

  colors: {
    light: {
      bg: "#ffffff",
      bgSecondary: "#fafafa",
      bgTertiary: "#f2f2f2",

      fg: "#0a0a0a",
      fgSecondary: "#333333",
      fgMuted: "#666666",

      accent: "#e30613",
      accentHover: "#c00511",
      accentMuted: "#e3061380",

      border: "#d4d4d4",
      borderHover: "#a3a3a3",

      hoverBg: "#f2f2f2",
      activeBg: "#e5e5e5",

      cardBg: "#ffffff",
      cardBorder: "#d4d4d4",
      cardShadow: "none",

      glowGradient: "none",
    },

    dark: {
      bg: "#0a0a0a",
      bgSecondary: "#141414",
      bgTertiary: "#1f1f1f",

      fg: "#fafafa",
      fgSecondary: "#d4d4d4",
      fgMuted: "#a3a3a3",

      accent: "#e30613",
      accentHover: "#ff2d3b",
      accentMuted: "#e3061380",

      border: "#2d2d2d",
      borderHover: "#404040",

      hoverBg: "#1f1f1f",
      activeBg: "#2d2d2d",

      cardBg: "#141414",
      cardBorder: "#2d2d2d",
      cardShadow: "none",

      glowGradient: "none",
    },
  },

  // Unified grey tags — no per-category colors
  tagColors: {
    default: { bg: "#f2f2f2", text: "#666666" },
  },
};

// ============================================================================
// TYPOGRAPHY
// ============================================================================

export const typography = {
  // Single font family — Akzidenz-Grotesk (Albert Sans interim)
  fontFamily: {
    sans: '"Akzidenz-Grotesk", "Albert Sans", "Helvetica Neue", Helvetica, Arial, sans-serif',
    serif: '"Akzidenz-Grotesk", "Albert Sans", "Helvetica Neue", Helvetica, Arial, sans-serif',
    mono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
  },

  // Perfect Fourth (1.333) type scale
  fontSize: {
    xs: "0.75rem",     // 12px
    sm: "0.875rem",    // 14px
    base: "1rem",      // 16px
    lg: "1.125rem",    // 18px
    xl: "1.313rem",    // 21px
    "2xl": "1.75rem",  // 28px
    "3xl": "2.375rem", // 38px
    "4xl": "3.125rem", // 50px
  },

  fontWeight: {
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },

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
  maxWidth: "1120px",
  contentWidth: "66.667%",
  sidebarWidth: "25%",
  sidebarMaxWidth: "280px",

  density: "airy" as const,

  spacing: {
    airy: {
      sectionGap: "5rem",
      cardGap: "1.5rem",
      itemGap: "0.75rem",
    },
    compact: {
      sectionGap: "3rem",
      cardGap: "1rem",
      itemGap: "0.5rem",
    },
  },

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
  borderRadius: {
    sm: "0",
    md: "0",
    lg: "0",
    xl: "0",
    full: "0",
  },

  card: {
    default: {
      borderWidth: "1px",
      shadow: "none" as const,
    },
    featured: {
      borderWidth: "1px",
      shadow: "none" as const,
    },
  },

  button: {
    borderRadius: "0",
    padding: "0.5rem 1rem",
  },

  photo: {
    size: "96px",
    borderWidth: "0px",
    borderColor: "border",
  },
};

// ============================================================================
// MOTION & ANIMATION
// ============================================================================

export const motion = {
  enabled: true,

  intensity: 1,

  effects: {
    cursorGlow: false,
    magneticHover: false,
    parallaxTilt: false,
    smoothScroll: true,
    scrollReveal: false,
  },

  duration: {
    fast: 100,
    normal: 200,
    slow: 300,
  },

  easing: {
    default: "cubic-bezier(0.4, 0, 0.2, 1)",
    easeOut: "cubic-bezier(0, 0, 0.2, 1)",
    easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  },
};

// ============================================================================
// NAVIGATION
// ============================================================================

export const navigation = {
  sections: [
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "research", label: "Research" },
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
