export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-24">
      <header className="mb-4">
        <h2 className="text-4xl font-bold text-fg flex items-center gap-3">
          <svg className="w-7 h-7 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          About
        </h2>
      </header>
      <hr className="border-border mb-4" />

      {/* Bio — constrained width for readability */}
      <div>
        <p className="text-fg-secondary text-lg leading-relaxed">
          Mankind's noblest aspiration is to make the world more beautiful.
          <br /><br />
          This site is one of my attempts to do so. Inspired by{" "}
          <a
            href="https://en.wikipedia.org/wiki/Josef_M%C3%BCller-Brockmann"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent font-bold"
          >
            Rastersysteme für die visuelle Gestaltung
          </a>{""}: raster grid layout and Swiss design schema.
          <br /><br />
          I recently graduated from{" "}
          <a
            href="https://www.unc.edu"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold" style={{ color: "#4B9CD3" }}
          >
            UNC Chapel Hill
          </a>
          , where I studied math & statistics.<br />But I'm now based in San Francisco.
        </p>
      </div>
    </section>
  );
}
