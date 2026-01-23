import { useRef, useEffect, useCallback } from "react";
import { motion } from "../config/site.config";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

interface UseMagneticHoverOptions {
  /**
   * Strength of the magnetic effect (pixels of max displacement)
   * Scales with motion.intensity
   */
  strength?: number;

  /**
   * Whether this specific element should have the effect
   */
  enabled?: boolean;
}

/**
 * Hook that creates a magnetic hover effect on an element.
 * The element subtly moves toward the cursor when hovered.
 */
export function useMagneticHover<T extends HTMLElement>({
  strength = 10,
  enabled = true,
}: UseMagneticHoverOptions = {}) {
  const elementRef = useRef<T>(null);
  const rafRef = useRef<number | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Calculate actual strength based on intensity
  const intensityMultiplier = motion.intensity / 2; // 0-3 becomes 0-1.5
  const actualStrength = strength * intensityMultiplier;

  const isEnabled =
    motion.enabled &&
    motion.effects.magneticHover &&
    motion.intensity > 0 &&
    enabled &&
    !prefersReducedMotion;

  const resetTransform = useCallback(() => {
    if (!elementRef.current) return;
    elementRef.current.style.transform = "translate(0, 0)";
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!elementRef.current || !isEnabled) return;

      const rect = elementRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate distance from center
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      // Calculate displacement (stronger when closer to center)
      const maxDistance = Math.max(rect.width, rect.height);
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const factor = Math.max(0, 1 - distance / maxDistance);

      const moveX = (deltaX / maxDistance) * actualStrength * factor;
      const moveY = (deltaY / maxDistance) * actualStrength * factor;

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        if (elementRef.current) {
          elementRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
      });
    },
    [isEnabled, actualStrength]
  );

  useEffect(() => {
    const element = elementRef.current;
    if (!element || !isEnabled) return;

    element.addEventListener("mousemove", handleMouseMove, { passive: true });
    element.addEventListener("mouseleave", resetTransform);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", resetTransform);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isEnabled, handleMouseMove, resetTransform]);

  return elementRef;
}
