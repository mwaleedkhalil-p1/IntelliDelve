import React, { memo, useState, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';
import { useVideoScrollControl } from '../hooks/useVideoScrollControl';

interface VideoPlayerWithControlsProps {
  src: string;
  poster?: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  volume?: number;
  autoPauseOnScroll?: boolean;
  visibilityThreshold?: number;
  onPlay?: () => void;
  onPause?: () => void;
}

const VideoPlayerWithControls = memo<VideoPlayerWithControlsProps>({
  src,
  poster,
  className = "w-full h-64 md:h-80",
  autoPlay = true,
  loop = false,
  muted = false,
  volume = 0.1,
  autoPauseOnScroll = true,
  visibilityThreshold = 0.3,
  onPlay,
  onPause
}) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [showControls, setShowControls] = useState(true);

  const { videoRef, containerRef } = useVideoScrollControl({
    volume,
    autoPauseOnScroll,
    visibilityThreshold,
    onVisibilityChange: (isVisible) => {
      if (!isVisible && isPlaying) {
        setIsPlaying(false);
        onPause?.();
      }
    }
  });

  const togglePlay = async () => {
    if (!videoRef.current) return;

    try {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
        onPause?.();
      } else {
        await videoRef.current.play();
        setIsPlaying(true);
        onPlay?.();
      }
    } catch (error) {
      console.warn('Video play failed:', error);
    }
  };

  // Auto-play video when component mounts and is visible
  useEffect(() => {
    const video = videoRef.current;
    if (video && autoPlay) {
      const playVideo = async () => {
        try {
          await video.play();
          setIsPlaying(true);
          onPlay?.();
        } catch (error) {
          console.warn('Autoplay failed:', error);
          // Autoplay might be blocked by browser policy
        }
      };
      
      // Small delay to ensure video is loaded
      const timer = setTimeout(playVideo, 100);
      return () => clearTimeout(timer);
    }
  }, [autoPlay, onPlay]);



  const handleMouseEnter = () => {
    setShowControls(true);
  };

  const handleMouseLeave = () => {
    setShowControls(false);
  };

  return (
    <div
      ref={containerRef}
      className={`relative bg-gray-900 rounded-2xl overflow-hidden shadow-2xl ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        poster={poster}
        loop={loop}
        autoPlay={autoPlay}
        muted={muted}
        preload="metadata"
        onPlay={() => {
          setIsPlaying(true);
          onPlay?.();
        }}
        onPause={() => {
          setIsPlaying(false);
          onPause?.();
        }}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Main Play/Pause Control */}
      <div 
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <button
          onClick={togglePlay}
          className="bg-primary/80 hover:bg-primary text-white p-4 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg"
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
        >
          {isPlaying ? (
            <Pause className="w-8 h-8" />
          ) : (
            <Play className="w-8 h-8 ml-1" />
          )}
        </button>
      </div>


    </div>
  );
});

VideoPlayerWithControls.displayName = 'VideoPlayerWithControls';

export { VideoPlayerWithControls };
export default VideoPlayerWithControls;
