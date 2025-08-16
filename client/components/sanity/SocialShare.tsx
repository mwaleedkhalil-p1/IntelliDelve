import React, { useState } from 'react';
import { Share2, Twitter, Linkedin, Facebook, Link, Check, Download } from 'lucide-react';

interface SocialShareProps {
  url?: string;
  title: string;
  description?: string;
  image?: string;
  className?: string;
  showLabel?: boolean;
  variant?: 'horizontal' | 'vertical' | 'dropdown';
  size?: 'sm' | 'md' | 'lg';
}

const SocialShare: React.FC<SocialShareProps> = ({
  url,
  title,
  description = '',
  image,
  className = '',
  showLabel = true,
  variant = 'horizontal',
  size = 'md'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = url || window.location.href;
  const shareTitle = encodeURIComponent(title);
  const shareDescription = encodeURIComponent(description);
  const shareImage = image ? encodeURIComponent(image) : '';

  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const shareLinks = [
    {
      name: 'Twitter',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${shareTitle}&url=${encodeURIComponent(shareUrl)}`,
      color: 'hover:bg-blue-500 hover:text-white',
      bgColor: 'bg-blue-500'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      color: 'hover:bg-blue-700 hover:text-white',
      bgColor: 'bg-blue-700'
    },
    {
      name: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      color: 'hover:bg-blue-600 hover:text-white',
      bgColor: 'bg-blue-600'
    }
  ];

  const handleShare = (shareUrl: string) => {
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url: shareUrl
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      setIsOpen(!isOpen);
    }
  };

  if (variant === 'dropdown') {
    return (
      <div className={`relative ${className}`}>
        <button
          onClick={handleNativeShare}
          className={`${sizeClasses[size]} bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors`}
          title="Share"
        >
          <Share2 className={iconSizes[size]} />
        </button>

        {isOpen && !navigator.share && (
          <div className="absolute top-full right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-2 z-50 min-w-[200px]">
            <div className="space-y-1">
              {shareLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => {
                    handleShare(link.url);
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                >
                  <link.icon className="w-4 h-4" />
                  Share on {link.name}
                </button>
              ))}
              <button
                onClick={() => {
                  copyToClipboard();
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
              >
                {copied ? <Check className="w-4 h-4" /> : <Link className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy Link'}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  const containerClass = variant === 'vertical' ? 'flex flex-col gap-2' : 'flex items-center gap-2';

  return (
    <div className={`${containerClass} ${className}`}>
      {showLabel && (
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
          Share:
        </span>
      )}
      
      <div className={variant === 'vertical' ? 'flex flex-col gap-2' : 'flex items-center gap-2'}>
        {shareLinks.map((link) => (
          <button
            key={link.name}
            onClick={() => handleShare(link.url)}
            className={`${sizeClasses[size]} ${link.color} bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110`}
            title={`Share on ${link.name}`}
          >
            <link.icon className={iconSizes[size]} />
          </button>
        ))}
        
        <button
          onClick={copyToClipboard}
          className={`${sizeClasses[size]} bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 hover:scale-110`}
          title={copied ? 'Copied!' : 'Copy Link'}
        >
          {copied ? <Check className={iconSizes[size]} /> : <Link className={iconSizes[size]} />}
        </button>
      </div>
    </div>
  );
};

export default SocialShare;