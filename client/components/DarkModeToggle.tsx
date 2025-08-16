import { Moon, Sun } from "lucide-react";
import React from "react";
import { useEffect, useState } from "react";

interface SunsetPromptProps {
  onAccept: () => void;
  onDecline: () => void;
  onAlwaysSystem: () => void;
}

const SunsetPrompt: React.FC<SunsetPromptProps> = ({ onAccept, onDecline, onAlwaysSystem }) => (
  <div className="fixed top-20 right-4 z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 max-w-sm animate-in slide-in-from-right-5">
    <div className="flex items-start space-x-3">
      <Moon className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">
          Sunset has occurred in your location. Would you like to switch to dark mode for a more comfortable viewing experience?
        </p>
        <div className="flex flex-col space-y-2">
          <button
            onClick={onAccept}
            className="text-xs bg-blue-500 text-white px-3 py-1.5 rounded hover:bg-blue-600 transition-colors"
          >
            Yes, switch to dark mode
          </button>
          <button
            onClick={onDecline}
            className="text-xs text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
          >
            Not now
          </button>
          <button
            onClick={onAlwaysSystem}
            className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
          >
            Always follow system preference
          </button>
        </div>
      </div>
    </div>
  </div>
);

export function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [showSunsetPrompt, setShowSunsetPrompt] = useState(false);
  const [userPreference, setUserPreference] = useState<'manual' | 'system' | 'time-based'>('system');

  const isNightTime = () => {
    const now = new Date();
    const hour = now.getHours();

    // Auto dark mode between 18:00 (6 PM) and 06:00 (6 AM) - matches useTimeBasedTheme
    return hour >= 18 || hour < 6;
  };

  const checkForSunset = () => {
    const now = new Date();
    const hour = now.getHours();
    const lastCheck = localStorage.getItem('lastSunsetCheck');
    const today = now.toDateString();

    // Trigger sunset prompt at 18:00 (6 PM)
    if (hour === 18 && lastCheck !== today) {
      localStorage.setItem('lastSunsetCheck', today);
      return true;
    }
    return false;
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const savedPreference = localStorage.getItem("themePreference") as 'manual' | 'system' | 'time-based' || 'system';

    setUserPreference(savedPreference);

    if (savedPreference === 'manual' && savedTheme) {

      const isDarkMode = savedTheme === "dark";
      setIsDark(isDarkMode);
      if (isDarkMode) {
        document.documentElement.classList.add("dark");
      }
    } else if (savedPreference === 'system') {

      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDark(prefersDark);
      if (prefersDark) {
        document.documentElement.classList.add("dark");
      }
    } else if (savedPreference === 'time-based') {

      const shouldBeDark = isNightTime();
      setIsDark(shouldBeDark);
      if (shouldBeDark) {
        document.documentElement.classList.add("dark");
      }

      if (checkForSunset() && !shouldBeDark) {
        setTimeout(() => setShowSunsetPrompt(true), 2000);
      }
    } else {

      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDark(prefersDark);
      if (prefersDark) {
        document.documentElement.classList.add("dark");
      }
    }

    const interval = setInterval(() => {
      if (savedPreference === 'time-based') {
        const shouldBeDark = isNightTime();
        if (shouldBeDark !== isDark) {
          setIsDark(shouldBeDark);
          document.documentElement.classList.add("theme-transition");
          if (shouldBeDark) {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }
          setTimeout(() => {
            document.documentElement.classList.remove("theme-transition");
          }, 200);
        }

        if (checkForSunset() && !shouldBeDark) {
          setShowSunsetPrompt(true);
        }
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [isDark]);

  const toggleDarkMode = () => {
    const newDarkMode = !isDark;
    setIsDark(newDarkMode);
    setUserPreference('manual');

    document.documentElement.classList.add("theme-transition");

    if (newDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }

    localStorage.setItem("themePreference", "manual");

    setTimeout(() => {
      document.documentElement.classList.remove("theme-transition");
    }, 200);
  };

  const handleSunsetAccept = () => {
    setIsDark(true);
    document.documentElement.classList.add("theme-transition");
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
    localStorage.setItem("themePreference", "manual");
    setUserPreference('manual');
    setShowSunsetPrompt(false);

    setTimeout(() => {
      document.documentElement.classList.remove("theme-transition");
    }, 200);
  };

  const handleSunsetDecline = () => {
    setShowSunsetPrompt(false);
  };

  const handleAlwaysSystem = () => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDark(prefersDark);
    setUserPreference('system');

    document.documentElement.classList.add("theme-transition");
    if (prefersDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }

    localStorage.setItem("themePreference", "system");
    setShowSunsetPrompt(false);

    setTimeout(() => {
      document.documentElement.classList.remove("theme-transition");
    }, 200);
  };

  return (
    <>
      <button
        onClick={toggleDarkMode}
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors border border-transparent hover:border-gray-200 dark:hover:border-slate-600"
        aria-label="Toggle dark mode"
        title={`Current mode: ${userPreference === 'time-based' ? 'Time-based' : userPreference === 'system' ? 'System' : 'Manual'}`}
      >
        {isDark ? (
          <Sun className="h-5 w-5 text-yellow-400 dark:text-yellow-300" />
        ) : (
          <Moon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
        )}
      </button>

      {showSunsetPrompt && (
        <SunsetPrompt
          onAccept={handleSunsetAccept}
          onDecline={handleSunsetDecline}
          onAlwaysSystem={handleAlwaysSystem}
        />
      )}
    </>
  );
}
