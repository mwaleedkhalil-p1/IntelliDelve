import React, { useState, useEffect } from 'react';
import { imagePreloader } from '../services/imagePreloader';

interface ImagePreloadStatusProps {
  showInDevelopment?: boolean;
}

export const ImagePreloadStatus: React.FC<ImagePreloadStatusProps> = ({
  showInDevelopment = true
}) => {
  const [stats, setStats] = useState(imagePreloader.getStats());
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {

    if (process.env.NODE_ENV === 'development' && showInDevelopment) {
      setIsVisible(true);
    }

    const interval = setInterval(() => {
      setStats(imagePreloader.getStats());
    }, 1000);

    return () => clearInterval(interval);
  }, [showInDevelopment]);

  if (!isVisible || stats.progress === 100) return null;

  return (
    <div className="fixed top-4 right-4 z-50 bg-black/80 text-white p-3 rounded-lg text-sm font-mono">
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
        <span>Preloading Images</span>
      </div>
      <div className="mt-2">
        <div className="flex justify-between text-xs">
          <span>Progress</span>
          <span>{Math.round(stats.progress)}%</span>
        </div>
        <div className="w-32 h-1 bg-gray-600 rounded-full mt-1">
          <div
            className="h-full bg-blue-400 rounded-full transition-all duration-300"
            style={{ width: `${stats.progress}%` }}
          />
        </div>
        <div className="text-xs mt-1 text-gray-300">
          {stats.preloaded}/{stats.total} loaded
          {stats.failed > 0 && `, ${stats.failed} failed`}
        </div>
      </div>
    </div>
  );
};
