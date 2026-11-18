'use client';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function registerGSAP() {
  if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }
}

export function animateFadeUp(targets: string | Element | Element[], delay = 0) {
  if (typeof window === 'undefined') return;
  return gsap.fromTo(
    targets,
    { opacity: 0, y: 35 },
    { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.08, delay }
  );
}

export function animateScrollEntrance(targets: string, trigger?: string | Element) {
  if (typeof window === 'undefined') return;
  registerGSAP();
  return gsap.fromTo(
    targets,
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 0.65,
      ease: 'power2.out',
      stagger: 0.08,
      scrollTrigger: trigger
        ? { trigger, start: 'top 85%', toggleActions: 'play none none reverse' }
        : undefined,
    }
  );
}

export { gsap, ScrollTrigger };
