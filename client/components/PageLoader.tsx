import React, { memo } from "react";

const PageLoader = memo(() => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="flex flex-col items-center gap-4">
      <video autoPlay loop muted playsInline className="h-32 w-32">
        <source src="/loading animation.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>
      <p className="text-sm text-muted-foreground animate-pulse">Loading...</p>
    </div>
  </div>
));

PageLoader.displayName = "PageLoader";

export { PageLoader };
