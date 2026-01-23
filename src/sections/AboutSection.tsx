import { personalInfo } from "../config/site.config";

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-24">
      {/* Section header */}
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-fg">About</h2>
        <div className="w-12 h-1 bg-accent rounded-full mt-3" />
      </header>

      {/* Bio */}
      <div className="prose prose-lg max-w-none">
        <p className="text-fg-secondary text-lg leading-relaxed whitespace-pre-line">
          {personalInfo.bio}
        </p>
      </div>

      {/* Interests / Focus areas */}
      {personalInfo.interests.length > 0 && (
        <div className="mt-10">
          <h3 className="text-sm font-semibold text-fg-muted uppercase tracking-wider mb-4">
            Focus Areas
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {personalInfo.interests.map((interest, index) => (
              <li key={index} className="flex items-center gap-3">
                <span className="flex-shrink-0 w-2 h-2 rounded-full bg-accent" />
                <span className="text-fg-secondary">{interest}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Contact CTA */}
      {personalInfo.links.email && (
        <div className="mt-12 p-6 rounded-xl bg-bg-tertiary border border-border">
          <p className="text-fg-secondary">
            Interested in working together or just want to say hello?
          </p>
          <a
            href={`mailto:${personalInfo.links.email}`}
            className="inline-flex items-center gap-2 mt-3 text-accent hover:underline font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span>Get in touch</span>
          </a>
        </div>
      )}
    </section>
  );
}
