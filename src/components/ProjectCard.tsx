import { useState } from "react";
import { Project, theme } from "../config/site.config";
import { useParallaxTilt } from "../hooks/useParallaxTilt";

interface ProjectCardProps {
  project: Project;
  variant: "featured" | "grid";
}

export function ProjectCard({ project, variant }: ProjectCardProps) {
  const [imageError, setImageError] = useState(false);
  const tiltRef = useParallaxTilt<HTMLDivElement>({
    maxAngle: variant === "featured" ? 4 : 6,
    scale: 1.02,
  });

  const isFeatured = variant === "featured";

  return (
    <article
      ref={tiltRef}
      className={`
        group relative rounded-xl overflow-hidden
        bg-card-bg border border-card-border
        transition-shadow duration-300
        hover:shadow-lg
        ${isFeatured ? "col-span-full" : ""}
      `}
    >
      <div className={`${isFeatured ? "flex flex-col md:flex-row" : "flex flex-col"}`}>
        {/* Image section */}
        {(project.image || isFeatured) && (
          <div
            className={`
              relative bg-bg-tertiary overflow-hidden
              ${isFeatured ? "md:w-1/2 aspect-video md:aspect-auto" : "aspect-video"}
            `}
          >
            {project.image && !imageError ? (
              <img
                src={project.image}
                alt={`Screenshot of ${project.title}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-fg-muted opacity-50">
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

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-card-bg/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        )}

        {/* Content section */}
        <div className={`flex flex-col p-6 ${isFeatured ? "md:w-1/2 md:p-8" : ""}`}>
          {/* Title */}
          <h3 className={`font-bold text-fg ${isFeatured ? "text-2xl" : "text-lg"}`}>
            {project.title}
          </h3>

          {/* Pitch */}
          <p className={`text-fg-secondary mt-2 ${isFeatured ? "text-base" : "text-sm"}`}>
            {project.pitch}
          </p>

          {/* Description (featured only) */}
          {isFeatured && project.description && (
            <p className="text-fg-muted mt-3 text-sm leading-relaxed">
              {project.description}
            </p>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {project.tags.map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>

          {/* Links */}
          <div className="flex items-center gap-4 mt-auto pt-4">
            {project.links.live && (
              <ProjectLink href={project.links.live} type="live" />
            )}
            {project.links.github && (
              <ProjectLink href={project.links.github} type="github" />
            )}
            {project.links.article && (
              <ProjectLink href={project.links.article} type="article" />
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

interface TagProps {
  label: string;
}

function Tag({ label }: TagProps) {
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

interface ProjectLinkProps {
  href: string;
  type: "live" | "github" | "article";
}

function ProjectLink({ href, type }: ProjectLinkProps) {
  const labels = {
    live: "Live Demo",
    github: "Source Code",
    article: "Read More",
  };

  const icons = {
    live: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
        />
      </svg>
    ),
    github: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"
        />
      </svg>
    ),
    article: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-sm text-fg-muted hover:text-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
    >
      {icons[type]}
      <span>{labels[type]}</span>
    </a>
  );
}
