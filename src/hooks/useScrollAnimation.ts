import { useEffect, useRef, useState } from 'react';

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  animationClass?: string;
  delay?: number;
}

// Helper function to detect mobile/tablet devices
const isMobileOrTablet = (): boolean => {
  // Check if window exists (for SSR compatibility)
  if (typeof window === 'undefined') return false;
  
  // Check screen width - common breakpoint for tablets is 1024px
  return window.innerWidth < 1024;
};

// Helper function to detect low-end devices
const isLowEnd = () => typeof navigator !== 'undefined' && navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;

export const useScrollAnimation = <T extends HTMLElement>(options: UseScrollAnimationOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    animationClass = 'animate-fade-in-up',
    delay = 0
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<T>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Set mobile state on component mount
  useEffect(() => {
    setIsMobile(isMobileOrTablet());
    
    // Update on resize for orientation changes
    const handleResize = () => {
      setIsMobile(isMobileOrTablet());
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    if (isMobile || isLowEnd()) {
      setIsVisible(true);
      return; // skip observer entirely on low-end/mobile
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
            element.classList.add(animationClass);
          }, delay);
          observer.unobserve(element);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, rootMargin, animationClass, delay, isMobile]);

  return { elementRef, isVisible };
};

// Hook for continuous scroll animations (fade in/out on scroll)
export const useContinuousScrollAnimation = <T extends HTMLElement>(options: UseScrollAnimationOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -100px 0px',
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, rootMargin]);

  return { elementRef, isVisible };
};
