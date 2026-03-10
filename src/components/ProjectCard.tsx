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
    <article>
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
          <h3 className={`font-bold text-fg flex items-center gap-2 ${isFeatured ? "text-2xl" : "text-lg"}`}>
            {project.title}
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="text-fg-muted hover:text-fg transition-colors"
                aria-label={`${project.title} live site`}
              >
                <svg className={isFeatured ? "w-5 h-5" : "w-4 h-4"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </a>
            )}
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-fg-muted hover:text-fg transition-colors"
                aria-label={`${project.title} on GitHub`}
              >
                <svg className={isFeatured ? "w-5 h-5" : "w-4 h-4"} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
            )}
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
