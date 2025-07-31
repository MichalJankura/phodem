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
    <div 
      className="absolute inset-0 flex items-center justify-center"
    >
      {/* Desktop/Tablet background */}
      <img
        src={heroBg}
        alt="Hero Image"
        className="hidden sm:block w-full h-full object-cover object-center"
        loading="eager"
        fetchPriority="high"
      />
      {/* Phone background */}
      <img
        src={pohneBg}
        alt="Hero Image"
        className="block sm:hidden w-full h-full object-cover object-center"
        loading="eager"
        fetchPriority="high"
      />
      
      {/* Call to action buttons - loaded second */}
      <div className="absolute bottom-16 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex z-10">
        <button 
          className={`px-6 py-3 rounded-l-lg transition-colors duration-300 border-r border-gray-400 ${
            hoveredButton === 'main' 
              ? 'bg-white text-gray-900' 
              : hoveredButton === 'daily'
              ? 'bg-gray-900 text-white'
              : 'bg-gray-900 text-white hover:bg-white hover:text-gray-900'
          } active:bg-white active:text-gray-900`}
          aria-label="Hlavné menu"
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
          } active:bg-gray-900 active:text-white`}
          aria-label="Denné menu"
          onClick={() => window.open('/denne_menu.pdf', '_blank')}
          onMouseEnter={() => setHoveredButton('denne_menu')}
          onMouseLeave={() => setHoveredButton(null)}
        >
          Denné menu
        </button>
      </div>
      
      {/* Fireflies overlay - loaded last */}
      {showFireflies && <FirefliesOverlay />}
      {/* Original Call to action buttons - removing as we moved them earlier */}

    </div>
  );
}

export default Mainhero;
