import { projects } from "../config/site.config";
import { ProjectCard } from "../components/ProjectCard";

export function ProjectsSection() {
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="scroll-mt-24">
      <header className="mb-4">
        <h2 className="text-4xl font-bold text-fg flex items-center gap-3">
          <svg className="w-7 h-7 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
          Creations
        </h2>
      </header>
      <hr className="border-border mb-2" />

      {/* Featured projects */}
      {featuredProjects.length > 0 && (
        <div className="space-y-3 mb-8">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} variant="featured" />
          ))}
        </div>
      )}

      {/* Other projects grid */}
      {otherProjects.length > 0 && (
        <>
          {featuredProjects.length > 0 && (
            <h3 className="text-xs font-semibold text-fg-muted uppercase tracking-wider mb-4">
              More Creations
            </h3>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherProjects.map((project) => (
              <ProjectCard key={project.id} project={project} variant="grid" />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
