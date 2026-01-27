import { useState } from "react";
import { Research, theme } from "../config/site.config";

interface ResearchCardProps {
  research: Research;
}

export function ResearchCard({ research }: ResearchCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <article className="group relative">
      {/* Main card with left accent border */}
      <div className="relative rounded-xl overflow-hidden bg-card-bg border border-card-border transition-all duration-300 hover:shadow-lg">
        {/* Accent border on left */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent" />

        <div className="flex flex-col">
          {/* Image section - full width, prominent */}
          {research.image && !imageError && (
            <div className="relative bg-bg-tertiary overflow-hidden border-b border-border">
              <div className="aspect-[2/1] relative">
                <img
                  src={research.image}
                  alt={`Diagram for ${research.title}`}
                  className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-[1.02]"
                  onError={() => setImageError(true)}
                />
              </div>
            </div>
          )}

          {/* Content section */}
          <div className="p-6 pl-7">
            {/* Header: Year & Institution badge */}
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-accent/10 text-accent">
                {research.year}
              </span>
              {research.institution && (
                <span className="text-xs text-fg-muted">
                  {research.institution}
                </span>
              )}
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-fg leading-tight">
              {research.title}
            </h3>

            {/* Problem & Approach sections */}
            <div className="mt-5 space-y-4">
              <div>
                <h4 className="text-xs font-semibold text-fg-muted uppercase tracking-wider mb-1.5">
                  Problem
                </h4>
                <p className="text-sm text-fg-secondary leading-relaxed">
                  {research.problem}
                </p>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-fg-muted uppercase tracking-wider mb-1.5">
                  Approach
                </h4>
                <p className="text-sm text-fg-secondary leading-relaxed">
                  {research.approach}
                </p>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-5">
              {research.tags.map((tag) => (
                <ResearchTag key={tag} label={tag} />
              ))}
            </div>

            {/* Links */}
            <div className="flex items-center gap-4 mt-5 pt-4 border-t border-border">
              {research.links.blog && (
                <ResearchLink href={research.links.blog} type="blog" />
              )}
              {research.links.paper && (
                <ResearchLink href={research.links.paper} type="paper" />
              )}
              {research.links.code && (
                <ResearchLink href={research.links.code} type="code" />
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

interface ResearchTagProps {
  label: string;
}

function ResearchTag({ label }: ResearchTagProps) {
  const normalizedLabel = label.toLowerCase().replace(/[^a-z]/g, "");
  const colors =
    theme.tagColors[normalizedLabel as keyof typeof theme.tagColors] ||
    theme.tagColors.default;

  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium"
      style={{ backgroundColor: colors.bg, color: colors.text }}
    >
      {label}
    </span>
  );
}

interface ResearchLinkProps {
  href: string;
  type: "paper" | "blog" | "code";
}

function ResearchLink({ href, type }: ResearchLinkProps) {
  const config = {
    paper: {
      label: "Read Paper",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
    blog: {
      label: "Deep Dive",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    code: {
      label: "View Code",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
      ),
    },
  };

  const { label, icon } = config[type];
  const isExternal = href.startsWith("http") || href.endsWith(".pdf");

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="inline-flex items-center gap-1.5 text-sm text-fg-muted hover:text-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
    >
      {icon}
      <span>{label}</span>
    </a>
  );
}
