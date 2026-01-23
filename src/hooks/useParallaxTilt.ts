import { useRef, useEffect, useCallback } from "react";
import { motion } from "../config/site.config";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

interface UseParallaxTiltOptions {
  /**
   * Maximum rotation angle in degrees
   * Scales with motion.intensity
   */
  maxAngle?: number;

  /**
   * Scale factor on hover (1 = no scale)
   */
  scale?: number;

  /**
   * Whether this specific element should have the effect
   */
  enabled?: boolean;
}

/**
 * Hook that creates a parallax tilt effect on an element.
 * The element tilts based on cursor position when hovered.
 */
export function useParallaxTilt<T extends HTMLElement>({
  maxAngle = 8,
  scale = 1.02,
  enabled = true,
}: UseParallaxTiltOptions = {}) {
  const elementRef = useRef<T>(null);
  const rafRef = useRef<number | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Calculate actual values based on intensity
  const intensityMultiplier = motion.intensity / 2; // 0-3 becomes 0-1.5
  const actualMaxAngle = maxAngle * intensityMultiplier;
  const actualScale = 1 + (scale - 1) * intensityMultiplier;

  const isEnabled =
    motion.enabled &&
    motion.effects.parallaxTilt &&
    motion.intensity > 0 &&
    enabled &&
    !prefersReducedMotion;

  const resetTransform = useCallback(() => {
    if (!elementRef.current) return;
    elementRef.current.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!elementRef.current || !isEnabled) return;

      const rect = elementRef.current.getBoundingClientRect();

      // Calculate position relative to element center (-0.5 to 0.5)
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      // Calculate rotation (inverted for natural feel)
      const rotateX = y * actualMaxAngle * -1;
      const rotateY = x * actualMaxAngle;

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        if (elementRef.current) {
          elementRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${actualScale})`;
        }
      });
    },
    [isEnabled, actualMaxAngle, actualScale]
  );

  const handleMouseEnter = useCallback(() => {
    if (!elementRef.current || !isEnabled) return;
    elementRef.current.style.transition = `transform ${motion.duration.fast}ms ${motion.easing.easeOut}`;
  }, [isEnabled]);

  const handleMouseLeave = useCallback(() => {
    if (!elementRef.current) return;
    elementRef.current.style.transition = `transform ${motion.duration.normal}ms ${motion.easing.easeOut}`;
    resetTransform();
  }, [resetTransform]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || !isEnabled) return;

    // Set initial styles
    element.style.transformStyle = "preserve-3d";
    element.style.willChange = "transform";

    element.addEventListener("mousemove", handleMouseMove, { passive: true });
    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isEnabled, handleMouseMove, handleMouseEnter, handleMouseLeave]);

  return elementRef;
}
