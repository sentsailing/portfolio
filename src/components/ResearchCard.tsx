import { useState } from "react";
import { Research, theme } from "../config/site.config";

interface ResearchCardProps {
  research: Research;
}

export function ResearchCard({ research }: ResearchCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <article className="border-t border-border pt-6">
      {/* Year & Institution */}
      <div className="flex items-center gap-3 mb-2">
        <span className="text-xs text-fg-muted">{research.year}</span>
        {research.institution && (
          <span className="text-xs text-fg-muted">{research.institution}</span>
        )}
      </div>

      <h3 className="text-xl font-bold text-fg leading-tight">
        {research.title}
      </h3>

      {/* Image */}
      {research.image && !imageError && (
        <div className="relative bg-bg-tertiary overflow-hidden aspect-[2/1] mt-4">
          <img
            src={research.image}
            alt={`Diagram for ${research.title}`}
            className="w-full h-full object-contain p-4"
            onError={() => setImageError(true)}
          />
        </div>
      )}

      {/* Problem & Approach */}
      <div className="mt-4 space-y-3">
        <div>
          <h4 className="text-xs font-semibold text-fg-muted uppercase tracking-wider mb-1">
            Problem
          </h4>
          <p className="text-sm text-fg-secondary leading-relaxed">
            {research.problem}
          </p>
        </div>
        <div>
          <h4 className="text-xs font-semibold text-fg-muted uppercase tracking-wider mb-1">
            Approach
          </h4>
          <p className="text-sm text-fg-secondary leading-relaxed">
            {research.approach}
          </p>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-4">
        {research.tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center px-2 py-0.5 text-xs font-medium"
            style={{
              backgroundColor: theme.tagColors.default.bg,
              color: theme.tagColors.default.text,
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border">
        {research.links.blog && (
          <ResearchLink href={research.links.blog} label="Deep Dive" />
        )}
        {research.links.paper && (
          <ResearchLink href={research.links.paper} label="Read Paper" />
        )}
        {research.links.code && (
          <ResearchLink href={research.links.code} label="View Code" />
        )}
      </div>
    </article>
  );
}

function ResearchLink({ href, label }: { href: string; label: string }) {
  const isExternal = href.startsWith("http") || href.endsWith(".pdf");

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="text-sm text-fg-muted hover:text-accent transition-colors"
    >
      {label}
    </a>
  );
}
