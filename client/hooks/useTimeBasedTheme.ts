import { useState, useEffect } from 'react';

// TypeScript declarations for debug functions
declare global {
  interface Window {
    debugTimeTheme: () => void;
    resetTimeTheme: () => void;
  }
}

// Debug function for testing (available in browser console)
window.debugTimeTheme = () => {
  const now = new Date();
  const hour = now.getHours();
  console.log('🔧 Debug Time Theme:', {
    currentTime: now.toLocaleString(),
    hour: hour,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    isDarkTime: (hour >= 18 || hour < 6),
    calculatedTheme: (hour >= 18 || hour < 6) ? 'dark' : 'light',
    localStorage_theme: localStorage.getItem('theme'),
    localStorage_preference: localStorage.getItem('themePreference')
  });
};

// Reset function for testing
window.resetTimeTheme = () => {
  localStorage.removeItem('theme');
  localStorage.removeItem('themePreference');
  localStorage.removeItem('lastSunsetCheck');
  console.log('🔄 Theme preferences cleared. Please refresh the page.');
};

export const useTimeBasedTheme = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const getTimeBasedTheme = (): 'light' | 'dark' => {
    const now = new Date();
    const hour = now.getHours();
    
    // Debug logging
    console.log('🕐 Time-based theme debug:', {
      currentTime: now.toLocaleString(),
      hour: hour,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      isDarkTime: (hour >= 18 || hour < 6),
      calculatedTheme: (hour >= 18 || hour < 6) ? 'dark' : 'light'
    });
    
    // Dark mode between 6 PM (18:00) and 6 AM (06:00)
    return (hour >= 18 || hour < 6) ? 'dark' : 'light';
  };

  const updateTheme = () => {
    // Check if user has manual preference set - if so, don't override
    const savedPreference = localStorage.getItem('themePreference');
    
    console.log('🔍 Theme preference check:', {
      savedPreference,
      localStorage_theme: localStorage.getItem('theme')
    });
    
    // Only apply time-based theme if no manual preference is set
    if (savedPreference && savedPreference !== 'time-based') {
      console.log('⏭️ Skipping time-based theme - user has manual/system preference');
      return;
    }
    
    const newTheme = getTimeBasedTheme();
    console.log('🎨 Theme update:', {
      previousTheme: theme,
      newTheme: newTheme,
      documentClasses: document.documentElement.className
    });
    
    setTheme(newTheme);
    
    // Set localStorage to indicate time-based preference
    localStorage.setItem('themePreference', 'time-based');
    localStorage.setItem('theme', newTheme);
    
    // Apply theme to document
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    console.log('✅ Theme applied:', {
      theme: newTheme,
      documentClasses: document.documentElement.className
    });
  };

  useEffect(() => {
    // Set initial theme
    updateTheme();

    // Update theme every minute to catch time changes
    const interval = setInterval(updateTheme, 60000);

    // Also listen for visibility change to update when user returns to tab
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        updateTheme();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup
    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return {
    theme,
    isDark: theme === 'dark',
    isLight: theme === 'light',
    updateTheme // Allow manual theme update if needed
  };
};