import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface PreloadContextProps {
  imagesLoaded: boolean;
  fontsLoaded: boolean;
  assetsLoaded: boolean;
}

const initialState: PreloadContextProps = {
  imagesLoaded: false,
  fontsLoaded: false,
  assetsLoaded: false,
};

const PreloadContext = createContext<PreloadContextProps>(initialState);

export const usePreload = () => useContext(PreloadContext);

interface PreloadProviderProps {
  children: ReactNode;
  // criticalImages removed as it's no longer needed
}

export const PreloadProvider: React.FC<PreloadProviderProps> = ({
  children,
  // criticalImages param removed as we're not using it anymore
}) => {
  // Images are considered loaded by default since we're not preloading them
  const imagesLoaded = true;
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  // We're skipping image preloading since the images are already optimized
  // and being loaded efficiently through the HTML with proper attributes

  // Check if fonts are loaded
  useEffect(() => {
    if ('fonts' in document) {
      // Use the Font Loading API if available
      document.fonts.ready.then(() => {
        setFontsLoaded(true);
      });
    } else {
      // Fallback: assume fonts are loaded after a timeout
      const timeoutId = setTimeout(() => {
        setFontsLoaded(true);
      }, 1000);
      
      return () => clearTimeout(timeoutId);
    }
  }, []);

  // Combine all loaded states
  useEffect(() => {
    if (imagesLoaded && fontsLoaded) {
      setAssetsLoaded(true);
    }
  }, [imagesLoaded, fontsLoaded]);

  return (
    <PreloadContext.Provider value={{ imagesLoaded, fontsLoaded, assetsLoaded }}>
      {children}
    </PreloadContext.Provider>
  );
};
