import { research } from "../config/site.config";
import { ResearchCard } from "../components/ResearchCard";

export function ResearchSection() {
  if (research.length === 0) {
    return null;
  }

  return (
    <section id="research" className="scroll-mt-24">
      {/* Section header */}
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-fg">Research</h2>
        <div className="w-12 h-1 bg-accent rounded-full mt-3" />
        <p className="text-fg-muted mt-4">
          Exploring the theoretical foundations of computation and learning.
        </p>
      </header>

      {/* Research cards - single column for readability */}
      <div className="space-y-8">
        {research.map((item) => (
          <ResearchCard key={item.id} research={item} />
        ))}
      </div>
    </section>
  );
}
