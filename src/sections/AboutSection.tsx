import { personalInfo } from "../config/site.config";

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-24">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-fg flex items-center gap-3">
          <svg className="w-7 h-7 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          About
        </h2>
      </header>

      {/* Bio — constrained width for readability */}
      <div className="max-w-[620px]">
        <p className="text-fg-secondary text-lg leading-relaxed whitespace-pre-line">
          {personalInfo.bio}
        </p>
      </div>

      {/* Focus areas */}
      {personalInfo.interests.length > 0 && (
        <div className="mt-10">
          <h3 className="text-xs font-semibold text-fg-muted uppercase tracking-wider mb-4">
            Focus Areas
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {personalInfo.interests.map((interest, index) => (
              <li key={index} className="flex items-center gap-3">
                <span className="flex-shrink-0 w-2 h-2 bg-fg" />
                <span className="text-fg-secondary">{interest}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

    </section>
  );
}
