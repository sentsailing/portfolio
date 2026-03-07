import { useState } from "react";
import { Project, theme } from "../config/site.config";

interface ProjectCardProps {
  project: Project;
  variant: "featured" | "grid";
}

export function ProjectCard({ project, variant }: ProjectCardProps) {
  const [imageError, setImageError] = useState(false);
  const isFeatured = variant === "featured";

  return (
    <article className="border-t border-border pt-6">
      <div className={isFeatured ? "flex flex-col md:flex-row md:gap-8" : "flex flex-col"}>
        {/* Image section */}
        {project.image && (
          <div
            className={`
              relative bg-bg-tertiary overflow-hidden
              ${isFeatured ? "md:w-1/2 aspect-[4/3]" : "aspect-[4/3]"}
            `}
          >
            {!imageError ? (
              <img
                src={project.image}
                alt={`Screenshot of ${project.title}`}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-fg-muted opacity-30">
                  <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className={`flex flex-col ${isFeatured && project.image ? "md:w-1/2 pt-4 md:pt-0" : "pt-4"}`}>
          <h3 className={`font-bold text-fg ${isFeatured ? "text-2xl" : "text-lg"}`}>
            {project.title}
          </h3>

          <p className={`text-fg-secondary mt-2 ${isFeatured ? "text-base" : "text-sm"}`}>
            {project.pitch}
          </p>

          {isFeatured && project.description && (
            <p className="text-fg-muted mt-3 text-sm leading-relaxed">
              {project.description}
            </p>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {project.tags.map((tag) => (
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
          <div className="flex items-center gap-4 mt-auto pt-4">
            {project.links.live && (
              <ProjectLink href={project.links.live} label="Live Demo" />
            )}
            {project.links.github && (
              <ProjectLink href={project.links.github} label="Source" />
            )}
            {project.links.article && (
              <ProjectLink href={project.links.article} label="Read More" />
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

function ProjectLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-sm text-fg-muted hover:text-accent transition-colors"
    >
      {label}
    </a>
  );
}
