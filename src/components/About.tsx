import igvideo from '../assets/igvideo.mp4';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import FlipWords from './FlipWords';
import bgabout from '/about-bg-optimized.webp';
import { useEffect, useRef, useState } from 'react';

const About = () => {
    const { elementRef: sectionRef } = useScrollAnimation({
        threshold: 0.1,
        animationClass: 'animate-fade-in-up'
    });

    const videoRef = useRef<HTMLVideoElement | null>(null);
    const placeholderRef = useRef<HTMLDivElement | null>(null);
    const [canLoadVideo, setCanLoadVideo] = useState(false);

    useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setCanLoadVideo(true);
            observer.disconnect();
          }
        });
      }, { threshold: 0.15 });

      if (placeholderRef.current) observer.observe(placeholderRef.current);
      return () => observer.disconnect();
    }, []);

    return (
        <section 
            id="about" 
            className="bg-neutral-800 font-sans scroll-fade-in"
            ref={sectionRef}
        >
            <div className="flex flex-col md:flex-row w-full">
                {/* Left side - Video */}
                <div className="w-full md:w-1/2 md:pl-0">
                  <div className="overflow-hidden shadow-lg">
                    <div className="relative w-full h-screen" style={{ aspectRatio: '9/16' }}>
                      {canLoadVideo ? (
                        <video 
                          className="absolute inset-0 w-full h-full object-cover"
                          src={igvideo}
                          title="O našej reštaurácii"
                          muted
                          loop
                          playsInline
                          autoPlay
                          controls={false}
                          preload="none"
                          poster="/restaurant-optimized.webp"
                          ref={videoRef}
                        />
                      ) : (
                        <div ref={placeholderRef} className="absolute inset-0 w-full h-full bg-neutral-900 flex items-center justify-center text-white text-sm">Načítavam...</div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Right side - FlipWords */}
                <div 
                    className="w-full md:w-1/2 px-2 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12 md:py-16 flex flex-col items-center justify-center min-h-[400px] sm:min-h-[500px] md:min-h-[600px]"
                    style={{ backgroundImage: `url(${bgabout})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
                  <h2 className="text-xl sm:text-2xl md:text-3xl text-white mb-4 sm:mb-6 md:mb-8 font-extrabold text-center">O nás</h2>
                  <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl">
                    <FlipWords />
                  </div>
                </div>
            </div>
        </section>
    );
};

export default About;