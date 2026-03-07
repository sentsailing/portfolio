import { research } from "../config/site.config";
import { ResearchCard } from "../components/ResearchCard";

export function ResearchSection() {
  if (research.length === 0) {
    return null;
  }

  return (
    <section id="research" className="scroll-mt-24">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-fg flex items-center gap-3">
          <svg className="w-7 h-7 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          Research
        </h2>
        <p className="text-fg-muted mt-4">
          Exploring the theoretical foundations of computation and learning.
        </p>
      </header>

      <div className="space-y-8">
        {research.map((item) => (
          <ResearchCard key={item.id} research={item} />
        ))}
      </div>
    </section>
  );
}
