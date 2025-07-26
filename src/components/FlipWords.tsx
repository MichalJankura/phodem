import React, { useEffect, useRef, useState } from "react";

// Zoznam viet o reštaurácii - každá skupina má 3 riadky
const words = [
    { 
        text: [
            "Vitajte v našej ázijskej reštaurácii",
            "v srdci Starej Ľubovne,",
            "kde tradícia stretáva modernosť."
        ], 
        color: "text-white" 
    },
    { 
        text: [
            "Špecializujeme sa na ázijské jedlá",
            "pripravované podľa receptúr",
            "z čerstvých surovín."
        ], 
        color: "text-white" 
    },
    { 
        text: [
            "Naša kuchyňa kombinuje tradície",
            "s modernými technikami,",
            "pre dokonalý zážitok."
        ], 
        color: "text-white" 
    },
    { 
        text: [
            "Okrem jedla ponúkame prostredie",
            "inšpirované kultúrou,",
            "pre pokojnú atmosféru."
        ], 
        color: "text-white" 
    },
    { 
        text: [
            "Príďte nás navštíviť a vydajte",
            "sa na chuťovú cestu",
            "naprieč Áziou."
        ], 
        color: "text-white" 
    },
];

const DISPLAY_TIME = 4000; // Čas zobrazenia textu
const FADE_DURATION = 500; // Trvanie fade efektu

const FlipWords: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [animating, setAnimating] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const cycle = () => {
      // Počkaj DISPLAY_TIME, potom začni animáciu
      timeoutRef.current = setTimeout(() => {
        setAnimating(true);
        setIsVisible(false); // Začni fade-out
        
        // Po fade-out, zmeň text a začni fade-in
        setTimeout(() => {
          setCurrent((prev) => (prev + 1) % words.length);
          setIsVisible(true); // Začni fade-in
          setAnimating(false);
        }, FADE_DURATION);
      }, DISPLAY_TIME);
    };

    if (!animating) {
      cycle();
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [current, animating]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Render the three lines with responsive design
  const renderLines = () => {
    const currentWords = words[current];
    
    return currentWords.text.map((line: string, lineIndex: number) => {
      const lineLetters = line.split("").map((char: string, charIndex: number) => {
        return (
          <span
            key={`${current}-${lineIndex}-${charIndex}`}
            className="inline-block"
            style={{ 
              marginRight: char === " " ? "0.1rem" : "0",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        );
      });
      
      return (
        <div 
          key={`${current}-${lineIndex}`} 
          className="flex justify-center mb-1 sm:mb-2 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-medium text-center px-1"
        >
          {lineLetters}
        </div>
      );
    });
  };

  // Render s jednoduchou fade animáciou
  return (
    <div className="w-full flex flex-col items-center justify-center py-4 sm:py-6 md:py-10 select-none">
      <div className="flex flex-col items-center justify-center px-2 sm:px-4 md:px-6 lg:px-8 w-full">
        <div 
          className={`relative ${words[current].color} min-h-[100px] sm:min-h-[110px] md:min-h-[120px] flex flex-col items-center justify-center leading-tight sm:leading-relaxed transition-all duration-500 ease-in-out w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl ${
            isVisible 
              ? 'opacity-100 transform translate-y-0' 
              : 'opacity-0 transform translate-y-4'
          }`}
        >
          {renderLines()}
        </div>
      </div>
    </div>
  );
};

export default FlipWords;
