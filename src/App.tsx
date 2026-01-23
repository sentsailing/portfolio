import { useEffect, useRef, useCallback } from "react";
import { navigation, motion as motionConfig, getSpacing } from "./config/site.config";
import { useScrollSpy, usePrefersReducedMotion } from "./hooks";
import { ProfilePanel } from "./components";
import { AboutSection, ProjectsSection, BlogSection } from "./sections";

function App() {
  const sectionIds = navigation.sections.map((s) => s.id);
  const activeSection = useScrollSpy({ sectionIds, offset: 100 });
  const prefersReducedMotion = usePrefersReducedMotion();
  const spacing = getSpacing();
  const rippleContainerRef = useRef<HTMLDivElement>(null);
  const lastRippleTime = useRef(0);

  const showRipple =
    motionConfig.enabled &&
    motionConfig.effects.cursorGlow &&
    motionConfig.intensity > 0 &&
    !prefersReducedMotion;

  // Create a ripple at cursor position
  const createRipple = useCallback((x: number, y: number) => {
    if (!rippleContainerRef.current || !showRipple) return;

    const container = rippleContainerRef.current;
    const intensity = motionConfig.intensity;

    // Create multiple concentric rings
    const ringCount = Math.min(3, intensity);

    for (let i = 0; i < ringCount; i++) {
      const ripple = document.createElement('div');
      ripple.className = 'ripple-ring';
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.style.animationDelay = `${i * 80}ms`;
      ripple.style.setProperty('--ring-index', i.toString());

      container.appendChild(ripple);

      // Remove after animation
      ripple.addEventListener('animationend', () => {
        ripple.remove();
      });
    }
  }, [showRipple]);

  useEffect(() => {
    if (!showRipple) return;

    const throttleMs = 120; // Limit ripple frequency

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastRippleTime.current < throttleMs) return;
      lastRippleTime.current = now;

      createRipple(e.clientX, e.clientY);
    };

    const handleClick = (e: MouseEvent) => {
      // Always create ripple on click, bypass throttle
      createRipple(e.clientX, e.clientY);
    };

    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("click", handleClick, { passive: true });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("click", handleClick);
    };
  }, [showRipple, createRipple]);

  return (
    <div className="min-h-screen relative">
      {/* Ripple container */}
      {showRipple && (
        <div
          ref={rippleContainerRef}
          className="ripple-container"
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
