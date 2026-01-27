import { useEffect, useRef } from "react";
import { navigation, motion as motionConfig, getSpacing } from "./config/site.config";
import { useScrollSpy, usePrefersReducedMotion } from "./hooks";
import { ProfilePanel } from "./components";
import { AboutSection, ProjectsSection, ResearchSection, BlogSection } from "./sections";

function App() {
  const sectionIds = navigation.sections.map((s) => s.id);
  const activeSection = useScrollSpy({ sectionIds, offset: 100 });
  const prefersReducedMotion = usePrefersReducedMotion();
  const spacing = getSpacing();
  const spotlightRef = useRef<HTMLDivElement>(null);

  const showSpotlight =
    motionConfig.enabled &&
    motionConfig.effects.cursorGlow &&
    motionConfig.intensity > 0 &&
    !prefersReducedMotion;

  useEffect(() => {
    if (!showSpotlight || !spotlightRef.current) return;

    const spotlight = spotlightRef.current;
    let animationId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    // Smooth interpolation factor (lower = smoother/slower)
    const smoothing = 0.12;

    const animate = () => {
      // Lerp toward target position
      currentX += (targetX - currentX) * smoothing;
      currentY += (targetY - currentY) * smoothing;

      spotlight.style.setProperty('--spotlight-x', `${currentX}px`);
      spotlight.style.setProperty('--spotlight-y', `${currentY}px`);

      animationId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    // Start animation loop
    animationId = requestAnimationFrame(animate);
    document.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      cancelAnimationFrame(animationId);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [showSpotlight]);

  return (
    <div className="min-h-screen relative">
      {/* Cursor spotlight */}
      {showSpotlight && (
        <div
          ref={spotlightRef}
          className="cursor-spotlight"
          aria-hidden="true"
        />
      )}

      {/* Mobile header spacer */}
      <div className="lg:hidden h-16" />

      {/* Main layout container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
        <div className="flex flex-col lg:flex-row lg:gap-16 relative">
          {/* Right column: Profile panel (fixed on desktop) */}
          <div className="hidden lg:block lg:w-[280px] lg:flex-shrink-0 lg:order-2">
            <div className="fixed top-16 w-[280px]">
              <ProfilePanel activeSection={activeSection} />
            </div>
          </div>

          {/* Mobile profile */}
          <div className="lg:hidden">
            <ProfilePanel activeSection={activeSection} />
          </div>

          {/* Left column: Main content */}
          <main
            className="flex-1 lg:order-1"
            style={{ gap: spacing.sectionGap }}
          >
            <div className="flex flex-col" style={{ gap: spacing.sectionGap }}>
              <AboutSection />
              <ProjectsSection />
              <ResearchSection />
              <BlogSection />
            </div>

            {/* Footer */}
            <footer className="mt-24 pt-8 border-t border-border text-center text-sm text-fg-muted">
              <p>
                Built with React & Tailwind CSS
              </p>
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
