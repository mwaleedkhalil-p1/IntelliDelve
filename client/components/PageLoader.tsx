import React, { memo, useRef, useEffect } from "react";

const PageLoader = memo(() => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Set video volume to 10% (0.1) for loading animation
      video.volume = 0.1;
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="flex flex-col items-center gap-4">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={false}
          playsInline
          className="h-32 w-32"
        >
          <source src="/loading animation.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
        <p className="text-sm text-muted-foreground animate-pulse">Loading...</p>
      </div>
    </div>
  );
});

PageLoader.displayName = "PageLoader";

export { PageLoader };
export default PageLoader;
