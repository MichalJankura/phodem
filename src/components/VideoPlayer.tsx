import React, { useEffect, useRef } from 'react';
import igVideoSrc from '../assets/videos/igvideo.mp4';

interface VideoPlayerProps {
  className?: string;
  style?: React.CSSProperties;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ className, style }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    // Force play for iOS devices with error handling
    const playVideo = () => {
      if (el.paused) {
        const playPromise = el.play();
        
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            // Only log real errors, not interruptions
            if (error.name !== 'AbortError') {
              console.log("Video play error:", error.name);
              
              // Ensure video is muted (helps with autoplay policies)
              el.muted = true;
              
              // Try again after a short delay
              setTimeout(() => {
                el.play().catch(e => console.log("Retry play error:", e));
              }, 300);
            }
          });
        }
      }
    };
    
    let isPlaying = false;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Add a debounce to prevent rapid play/pause cycles
          if (entry.isIntersecting) {
            if (!isPlaying) {
              isPlaying = true;
              setTimeout(playVideo, 200);
            }
          } else {
            isPlaying = false;
            // Don't immediately pause - let it play a bit when scrolling past
            setTimeout(() => {
              if (!isPlaying) el.pause();
            }, 500);
          }
        });
      },
      { threshold: 0.3 }
    );
    
    observer.observe(el);
    
    return () => {
      observer.disconnect();
    };
  }, []);

  console.log("Video source:", igVideoSrc); // Debugging the actual path

  return (
    <video 
      className={className}
      style={style}
      src={igVideoSrc}
      title="O našej reštaurácii"
      muted
      loop
      playsInline
      autoPlay
      controls={false}
      ref={videoRef}
    />
  );
};

export default VideoPlayer;
