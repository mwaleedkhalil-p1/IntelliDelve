import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface UseAnimatedContainerOptions {
  duration?: number;
  delay?: number;
  ease?: string;
  y?: number;
  opacity?: number;
}

export const useAnimatedContainer = (
  options: UseAnimatedContainerOptions = {},
) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    duration = 0.6,
    delay = 0,
    ease = "power2.out",
    y = 50,
    opacity = 0,
  } = options;

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity, y },
        { opacity: 1, y: 0, duration, delay, ease },
      );
    }
  }, [duration, delay, ease, y, opacity]);

  return containerRef;
};
