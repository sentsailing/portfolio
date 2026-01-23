import { projects } from "../config/site.config";
import { ProjectCard } from "../components/ProjectCard";

export function ProjectsSection() {
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="scroll-mt-24">
      {/* Section header */}
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-fg">Projects</h2>
        <div className="w-12 h-1 bg-accent rounded-full mt-3" />
        <p className="text-fg-muted mt-4">
          A selection of projects I've built and contributed to.
        </p>
      </header>

      {/* Featured projects */}
      {featuredProjects.length > 0 && (
        <div className="space-y-6 mb-8">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} variant="featured" />
          ))}
        </div>
      )}

      {/* Other projects grid */}
      {otherProjects.length > 0 && (
        <>
          {featuredProjects.length > 0 && (
            <h3 className="text-sm font-semibold text-fg-muted uppercase tracking-wider mb-4">
              More Projects
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
