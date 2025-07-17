import { gsap } from "gsap";

export const createOptimizedTimeline = () => {
  return gsap.timeline({
    defaults: {
      ease: "power2.out",
      duration: 0.4,
    },
  });
};

export const fadeInUp = (
  element: HTMLElement | null,
  options?: gsap.TweenVars,
) => {
  if (!element) return;

  return gsap.fromTo(
    element,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: "power2.out",
      ...options,
    },
  );
};

export const staggerFadeIn = (
  elements: NodeListOf<Element> | Element[],
  options?: gsap.TweenVars,
) => {
  return gsap.fromTo(
    elements,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.3,
      stagger: 0.1,
      ease: "power2.out",
      ...options,
    },
  );
};

export const scaleIn = (
  element: HTMLElement | null,
  options?: gsap.TweenVars,
) => {
  if (!element) return;

  return gsap.fromTo(
    element,
    { scale: 0.8, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      duration: 0.3,
      ease: "back.out(1.7)",
      ...options,
    },
  );
};

export const slideInLeft = (
  element: HTMLElement | null,
  options?: gsap.TweenVars,
) => {
  if (!element) return;

  return gsap.fromTo(
    element,
    { x: -50, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 0.4,
      ease: "power2.out",
      ...options,
    },
  );
};

export const slideInRight = (
  element: HTMLElement | null,
  options?: gsap.TweenVars,
) => {
  if (!element) return;

  return gsap.fromTo(
    element,
    { x: 50, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 0.4,
      ease: "power2.out",
      ...options,
    },
  );
};

export const optimizedScrollTrigger = {
  start: "top 85%",
  end: "bottom 15%",
  toggleActions: "play none none reverse",
  fastScrollEnd: true,
  preventOverlaps: true,
};
