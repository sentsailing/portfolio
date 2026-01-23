import { useState, useEffect, useRef } from "react";

interface UseScrollSpyOptions {
  /**
   * Array of section IDs to observe
   */
  sectionIds: string[];

  /**
   * Offset from top of viewport to trigger active state (in pixels)
   * Default: 100 (accounts for potential headers)
   */
  offset?: number;

  /**
   * Threshold for intersection (0-1)
   * Default: 0 (triggers as soon as any part is visible)
   */
  threshold?: number;
}

/**
 * Hook that uses IntersectionObserver to track which section is currently active.
 * Returns the ID of the currently active section.
 */
export function useScrollSpy({
  sectionIds,
  offset = 100,
  threshold = 0,
}: UseScrollSpyOptions): string | null {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Store visibility ratios for each section
    const visibilityMap = new Map<string, number>();

    // Create IntersectionObserver
    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Update visibility map
        entries.forEach((entry) => {
          visibilityMap.set(entry.target.id, entry.intersectionRatio);
        });

        // Find the section with highest visibility that's in the top portion of viewport
        let bestSection: string | null = null;
        let bestRatio = 0;

        sectionIds.forEach((id) => {
          const element = document.getElementById(id);
          if (!element) return;

          const rect = element.getBoundingClientRect();
          const ratio = visibilityMap.get(id) ?? 0;

          // Consider a section "active" if it's intersecting and its top is near/above the offset
          const isInActiveZone = rect.top <= offset + 50;

          if (ratio > 0 && isInActiveZone) {
            // Prefer sections closer to the top
            const topDistance = Math.abs(rect.top - offset);
            const score = ratio * 1000 - topDistance;

            if (score > bestRatio || bestSection === null) {
              bestRatio = score;
              bestSection = id;
            }
          }
        });

        // Fallback: if no section is in active zone, use the first visible one
        if (!bestSection) {
          sectionIds.forEach((id) => {
            const ratio = visibilityMap.get(id) ?? 0;
            if (ratio > bestRatio) {
              bestRatio = ratio;
              bestSection = id;
            }
          });
        }

        if (bestSection) {
          setActiveSection(bestSection);
        }
      },
      {
        // Root margin: negative top margin creates the offset
        rootMargin: `-${offset}px 0px -50% 0px`,
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      }
    );

    // Observe all sections
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element && observerRef.current) {
        observerRef.current.observe(element);
      }
    });

    // Set initial active section
    if (sectionIds.length > 0 && !activeSection) {
      setActiveSection(sectionIds[0]);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [sectionIds, offset, threshold]);

  return activeSection;
}

/**
 * Smoothly scroll to a section by ID
 */
export function scrollToSection(sectionId: string, offset = 0): void {
  const element = document.getElementById(sectionId);
  if (!element) return;

  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
}
