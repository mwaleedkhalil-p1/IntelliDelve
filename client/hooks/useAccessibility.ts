import { useState, useEffect } from 'react';

export interface AccessibilitySettings {
  fontSize: number;
  colorBlindMode: boolean;
}

const DEFAULT_SETTINGS: AccessibilitySettings = {
  fontSize: 100,
  colorBlindMode: false,
};

const STORAGE_KEY = 'accessibility-settings';

export const useAccessibility = () => {
  const [settings, setSettings] = useState<AccessibilitySettings>(DEFAULT_SETTINGS);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem(STORAGE_KEY);
      if (savedSettings) {
        const parsed = JSON.parse(savedSettings);
        setSettings(parsed);
        applySettings(parsed);
      }
    } catch (error) {

    } finally {
      setIsLoaded(true);
    }
  }, []);

  const updateSettings = (newSettings: Partial<AccessibilitySettings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSettings));
      applySettings(updatedSettings);
    } catch (error) {

    }
  };

  const applySettings = (settingsToApply: AccessibilitySettings) => {

    document.documentElement.style.fontSize = `${settingsToApply.fontSize}%`;

    if (settingsToApply.colorBlindMode) {
      document.body.classList.add('color-blind-mode');
    } else {
      document.body.classList.remove('color-blind-mode');
    }
  };

  const increaseFontSize = () => {
    const newSize = Math.min(settings.fontSize + 10, 150);
    updateSettings({ fontSize: newSize });
  };

  const decreaseFontSize = () => {
    const newSize = Math.max(settings.fontSize - 10, 80);
    updateSettings({ fontSize: newSize });
  };

  const toggleColorBlindMode = () => {
    updateSettings({ colorBlindMode: !settings.colorBlindMode });
  };

  const resetSettings = () => {
    updateSettings(DEFAULT_SETTINGS);
  };

  return {
    settings,
    isLoaded,
    updateSettings,
    increaseFontSize,
    decreaseFontSize,
    toggleColorBlindMode,
    resetSettings,
  };
};
