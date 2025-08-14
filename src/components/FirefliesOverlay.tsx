import React, { useEffect, useState, useMemo } from 'react';
import './fireflies.css';

const baseCount = 10;
const getRandom = (min: number, max: number) => Math.random() * (max - min) + min;
const lowEnd = () => typeof navigator !== 'undefined' && navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
const prefersReducedMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const generateKeyframes = (count: number): string => {
  let css = '';
  for (let i = 0; i < count; i++) {
    const tx = getRandom(-35, 35);
    const ty = getRandom(-30, 30);
    const scale = getRandom(0.7, 1.3);
    const duration = getRandom(10, 24).toFixed(2);
    const delay = getRandom(0, 12).toFixed(0);
    css += `@keyframes firefly-move-${i} { from { transform: translate(0,0) scale(1); opacity:.6;} to { transform: translate(${tx}vw, ${ty}vh) scale(${scale}); opacity:1;} }\n`;
    css += `.firefly-${i} { animation: firefly-move-${i} ${duration}s ease-in-out ${delay}s infinite alternate; }\n`;
  }
  return css;
};

const FirefliesOverlay: React.FC = () => {
  const effectiveCount = prefersReducedMotion() ? 0 : lowEnd() ? 4 : baseCount;
  const [injected, setInjected] = useState(false);
  const keyframes = useMemo(() => generateKeyframes(effectiveCount), [effectiveCount]);

  useEffect(() => {
    if (!injected && effectiveCount > 0) {
      const style = document.createElement('style');
      style.textContent = keyframes;
      document.head.appendChild(style);
      setInjected(true);
    }
  }, [injected, keyframes, effectiveCount]);

  if (effectiveCount === 0) return null;

  return (
    <div className="fireflies-overlay" aria-hidden="true">
      {Array.from({ length: effectiveCount }).map((_, i) => (
        <div
          key={i}
          className={`firefly firefly-${i}`}
          style={{ left: `${getRandom(10, 90)}%`, top: `${getRandom(10, 90)}%` }}
        />
      ))}
    </div>
  );
};

export default FirefliesOverlay;
