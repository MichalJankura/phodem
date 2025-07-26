import heroBg from '../assets/hero-bg-2.png';
import pohneBg from '../assets/hero-bg-phone.png';
import FirefliesOverlay from "../components/FirefliesOverlay";
import { useState, useMemo } from 'react';

const Mainhero = () => {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  
  // Memoize the FirefliesOverlay to prevent re-rendering on state changes
  const memoizedFireflies = useMemo(() => <FirefliesOverlay/>, []);
  
  return (
    <div 
      className="absolute inset-0 flex items-center justify-center"
    >
      {memoizedFireflies}
      {/* Desktop/Tablet background */}
      <img
        src={heroBg}
        alt="Hero Image"
        className="hidden sm:block w-full h-full object-cover object-center"
      />
      {/* Phone background */}
      <img
        src={pohneBg}
        alt="Hero Image"
        className="block sm:hidden w-full h-full object-cover object-center"
      />
      {/* Call to action buttons */}
      
      <div className="absolute bottom-16 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex">
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
          onClick={() => window.open('/daily01.pdf', '_blank')}
          onMouseEnter={() => setHoveredButton('daily')}y
          onMouseLeave={() => setHoveredButton(null)}
        >
          Denné menu
        </button>
      </div>

    </div>
  );
}

export default Mainhero;
