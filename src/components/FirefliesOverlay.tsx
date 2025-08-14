import React, { useEffect, useState, useMemo } from 'react';
import './fireflies.css';

const FIREFLY_COUNT = 10;
const getRandom = (min: number, max: number) => Math.random() * (max - min) + min;

const generateKeyframes = (): string => {
  let css = '';
  for (let i = 0; i < FIREFLY_COUNT; i++) {
    const tx = getRandom(-45, 45);
    const ty = getRandom(-40, 40);
    const scale = getRandom(0.7, 1.6);
    const duration = getRandom(8, 22).toFixed(2);
    const delay = getRandom(0, 15).toFixed(0.2);
    css += `@keyframes firefly-move-${i} { from { transform: translate(0,0) scale(1); } to { transform: translate(${tx}vw, ${ty}vh) scale(${scale}); } }\n`;
    css += `.firefly-${i} { animation: firefly-move-${i} ${duration}s ease-in-out ${delay}s infinite alternate; }\n`;
  }
  return css;
};

const FirefliesOverlay: React.FC = () => {
  const [injected, setInjected] = useState(false);
  const keyframes = useMemo(generateKeyframes, []);

  useEffect(() => {
    if (!injected) {
      const style = document.createElement('style');
      style.textContent = keyframes;
      document.head.appendChild(style);
      setInjected(true);
    }
  }, [injected, keyframes]);

  return (
    <div className="fireflies-overlay">
      {Array.from({ length: FIREFLY_COUNT }).map((_, i) => (
        <div
          key={i}
          className={`firefly firefly-${i}`}
          style={{ left: `${getRandom(20, 80)}%`, top: `${getRandom(20, 80)}%` }}
        />
      ))}
    </div>
  );
};

export default FirefliesOverlay;
