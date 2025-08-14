import heroBg from '../assets/hero-bg-2-converted.webp';
import pohneBg from '../assets/hero-bg-phone-converted.webp';
import { useState, useEffect } from 'react';
import FirefliesOverlay from "../components/FirefliesOverlay";

const Mainhero = () => {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [showFireflies, setShowFireflies] = useState(false);
  
  // Load fireflies after background and buttons are ready
  useEffect(() => {
    // Wait for images to load and then delay showing fireflies
    const timer = setTimeout(() => {
      setShowFireflies(true);
    }, 400); // Delay showing fireflies by 400ms after component mount
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="absolute inset-0 flex items-center justify-center" role="banner">
      {/* Decorative background images */}
      <img
        src={heroBg}
        alt="Interiér vietnamskej reštaurácie PHỞ ĐÊM"
        className="hidden sm:block w-full h-full object-cover object-center"
        width={1920}
        height={1080}
        loading="eager"
        fetchPriority="high"
      />
      <img
        src={pohneBg}
        alt="Interiér PHỞ ĐÊM pre mobilné zariadenia"
        className="block sm:hidden w-full h-full object-cover object-center"
        width={800}
        height={1200}
        loading="eager"
        fetchPriority="high"
      />
      <div className="sr-only">
        <h1>PHỞ ĐÊM – Vietnamská & Ázijská reštaurácia v Starej Ľubovni</h1>
      </div>
      {/* Call to action buttons */}
      <div className="absolute bottom-16 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex z-10" aria-label="Navigácia k menu">
        <button 
          className={`px-6 py-3 rounded-l-lg transition-colors duration-300 border-r border-gray-400 ${
            hoveredButton === 'main' 
              ? 'bg-white text-gray-900' 
              : hoveredButton === 'daily'
              ? 'bg-gray-900 text-white'
              : 'bg-gray-900 text-white hover:bg-white hover:text-gray-900'
          } active:bg-white active:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80`}
          aria-label="Otvoriť hlavné menu (PDF)"
          onClick={() => window.open('/phodem_menu.pdf', '_blank')}
          onMouseEnter={() => setHoveredButton('main')}
          onMouseLeave={() => setHoveredButton(null)}
        >
          Hlavné menu
        </button>
        <button 
          className={`px-6 py-3 rounded-r-lg transition-colors duration-300 ${
            hoveredButton === 'daily' 
              ? 'bg-white text-gray-900' 
              : hoveredButton === 'main'
              ? 'bg-gray-900 text-white'
              : 'bg-white text-gray-900 hover:bg-white hover:text-gray-900'
          } active:bg-gray-900 active:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80`}
          aria-label="Otvoriť denné menu (PDF)"
          onClick={() => window.open('/denne_menu.pdf', '_blank')}
          onMouseEnter={() => setHoveredButton('denne_menu')}
          onMouseLeave={() => setHoveredButton(null)}
        >
          Denné menu
        </button>
      </div>
      {showFireflies && <FirefliesOverlay />}
    </div>
  );
}

export default Mainhero;
