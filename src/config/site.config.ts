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
    id: "glicko",
    title: "GLICKGLICK",
    pitch: "Adaptive practice problems using the Glicko-2 rating system. This rates both players and problems so difficulty quickly converges to your true skill level.",
    tags: ["Next.js", "PostgreSQL", "Prisma", "TypeScript"],
    links: {
      live: "https://glickglick.com",
    },
    featured: true,
  },
  {
    id: "robomixer",
    title: "Robomixer",
    pitch: "AI-powered mixing engine that analyzes audio features to stitch songs. Features: beat detection, key detection, source separation, and harmonic mixing via the Camelot wheel.",
    tags: ["PyTorch", "FastAPI", "librosa"],
    links: {
      github: "https://github.com/sentsailing/robomixer",
    },
    featured: true,
  },
  {
    id: "natural-poker",
    title: "Natural Poker",
    pitch: "Voice based 6-max no-limit hold'em. Play hands and review them with a voice agent using TTS/STT.",
    tags: ["TTS", "STT", "Voice AI"],
    links: {
      github: "https://github.com/sentsailing/natural-poker",
    },
    featured: true,
  },
  {
    id: "bastion",
    title: "Bastion",
    pitch: "Airtight content filter hardening with time-delayed cryptographic puzzles for unlocking.",
    tags: ["Rust"],
    links: {
      github: "https://github.com/sentsailing/bastion",
    },
  },
  {
    id: "leadbase",
    title: "Leadbase",
    pitch: "Lead management and CRM dashboard with analytics.",
    tags: ["Next.js", "React", "SQLite", "TypeScript"],
    links: {},
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
    id: "visibility-graphs",
    title: "On General Visibility Graph Recognition",
    problem: "Given a graph G in adjacency matrix form, determine whether G is the visibility graph of a simple polygon or polytope. These are central open problems in computational geometry (first proposed by Ghosh & Goswami).",
    approach: "Proposed an iterative poset construction that builds classes of graphs inductively from the base case of Vis(3).",
    tags: ["Graph Theory", "Computational Geometry", "Combinatorics"],
    links: {
      paper: "/docs/dimacs_reu_slides_dyw.pdf",
    },
    year: "2023",
    institution: "DIMACS REU (Rutgers University)",
  },
  {
    id: "cross-layer-transcoders",
    title: "Mapping Reasoning Circuits with Cross-Layer Transcoders",
    problem: "Language models compose features across layers to perform multi-step reasoning, but the intermediate computations are opaque. Is it possible to trace how associations chain together across multiple layers?",
    approach: "Applied cross-layer transcoders to decompose MLP activations into interpretable feature circuits spanning multiple layers. Identified causally relevant pathways that mediate multi-hop factual recall (e.g., 'The capital of the country that invented X is...').",
    tags: ["Mechanistic Interpretability", "Sparse Autoencoders", "NLP"],
    links: {},
    year: "2025",
    institution: "UNC Chapel Hill, advised by Prof. Shashank Srivastava",
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
    { id: "projects", label: "Creations" },
    { id: "research", label: "Research" },
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
