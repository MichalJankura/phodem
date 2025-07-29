import React from 'react';
import type { ImgHTMLAttributes } from 'react';
import { useLazyImage } from '../hooks/useLazyImage';

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  placeholder?: string;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2YxZjFmMSIvPgo8L3N2Zz4=',
  ...rest
}) => {
  const { imgRef, isVisible, isLoaded, handleLoad } = useLazyImage();

  return (
    <div 
      className={`image-container ${className}`} 
      style={{ 
        position: 'relative',
        width: width ? `${width}px` : '100%', 
        height: height ? `${height}px` : 'auto',
        overflow: 'hidden',
      }}
    >
      {!isLoaded && (
        <div 
          className="placeholder"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(${placeholder})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(10px)',
            transform: 'scale(1.1)',
          }}
        />
      )}
      <img
        ref={imgRef}
        src={isVisible ? src : placeholder}
        alt={alt}
        width={width}
        height={height}
        onLoad={handleLoad}
        loading="lazy"
        decoding="async"
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
        }}
        {...rest}
      />
    </div>
  );
};
