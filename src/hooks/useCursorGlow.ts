import { useEffect, useRef, useCallback } from "react";
import { motion } from "../config/site.config";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

interface CursorPosition {
  x: number;
  y: number;
}

/**
 * Hook that creates a cursor-following glow effect.
 * Returns a ref to attach to the container element.
 */
export function useCursorGlow<T extends HTMLElement>() {
  const containerRef = useRef<T>(null);
  const positionRef = useRef<CursorPosition>({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const isEnabled =
    motion.enabled &&
    motion.effects.cursorGlow &&
    motion.intensity > 0 &&
    !prefersReducedMotion;

  const updateGlow = useCallback(() => {
    if (!containerRef.current || !isEnabled) return;

    const { x, y } = positionRef.current;
    containerRef.current.style.setProperty("--cursor-x", `${x}px`);
    containerRef.current.style.setProperty("--cursor-y", `${y}px`);
  }, [isEnabled]);

  useEffect(() => {
    if (!isEnabled) return;

    // Throttled mouse move handler
    let lastUpdate = 0;
    const throttleMs = 16; // ~60fps

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastUpdate < throttleMs) return;
      lastUpdate = now;

      positionRef.current = { x: e.clientX, y: e.clientY };

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(updateGlow);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isEnabled, updateGlow]);

  return containerRef;
}
