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
  criticalImages?: string[];
}

export const PreloadProvider: React.FC<PreloadProviderProps> = ({
  children,
  criticalImages = [
    '/assets/hero-bg-2-converted.webp',
    '/assets/hero-bg-phone-converted.webp',
  ],
}) => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  // Preload critical images
  useEffect(() => {
    const imagePromises = criticalImages.map(src => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = reject;
      });
    });

    Promise.all(imagePromises)
      .then(() => setImagesLoaded(true))
      .catch(error => {
        console.error('Error preloading images:', error);
        // Still set as loaded to avoid blocking rendering
        setImagesLoaded(true);
      });
  }, [criticalImages]);

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
