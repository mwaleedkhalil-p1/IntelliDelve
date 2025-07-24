import React, { useState, useEffect, useRef } from 'react';
import {
  Eye,
  Plus,
  Minus,
  Palette,
  Settings,
  X
} from 'lucide-react';
import { useAccessibility } from '../hooks/useAccessibility';

const AccessibilityMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const {
    settings,
    isLoaded,
    increaseFontSize,
    decreaseFontSize,
    toggleColorBlindMode,
    resetSettings,
  } = useAccessibility();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {

      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
        buttonRef.current?.focus();
      }

      if (event.altKey && event.key === 'a') {
        event.preventDefault();
        setIsOpen(!isOpen);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && menuRef.current) {

      const focusableElements = menuRef.current.querySelectorAll(
        'button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements.length > 0) {
        (focusableElements[0] as HTMLElement).focus();
      }
    }
  }, [isOpen]);

  if (!isLoaded) {
    return null;
  }

  return (
    <>

      <div className="fixed bottom-44 right-6 z-50">
        <button
          ref={buttonRef}
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group accessibility-pulse"
          aria-label="Accessibility Menu (Alt + A)"
          title="Accessibility Options (Alt + A)"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Eye className="h-6 w-6 group-hover:scale-110 transition-transform" />
          )}
        </button>

        {isOpen && (
          <div
            ref={menuRef}
            className="absolute bottom-16 right-0 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 p-4 animate-in slide-in-from-bottom-2 duration-200"
            role="dialog"
            aria-labelledby="accessibility-menu-title"
          >

            <div className="flex items-center justify-between mb-4">
              <h3 id="accessibility-menu-title" className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Accessibility
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Font Size ({settings.fontSize}%)
              </label>
              <div className="flex items-center space-x-2">
                <button
                  onClick={decreaseFontSize}
                  disabled={settings.fontSize <= 80}
                  className="flex items-center justify-center w-10 h-10 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-label="Decrease font size"
                >
                  <Minus className="h-4 w-4" />
                </button>

                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((settings.fontSize - 80) / 70) * 100}%` }}
                  />
                </div>

                <button
                  onClick={increaseFontSize}
                  disabled={settings.fontSize >= 150}
                  className="flex items-center justify-center w-10 h-10 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-label="Increase font size"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                  <Palette className="h-4 w-4 mr-2" />
                  Color Blind-Beta
                </span>
                <button
                  onClick={toggleColorBlindMode}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.colorBlindMode
                      ? 'bg-blue-600'
                      : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                  aria-label="Toggle color blind mode"
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.colorBlindMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </label>
            </div>

            <button
              onClick={resetSettings}
              className="w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg text-sm font-medium transition-colors"
            >
              Reset to Default
            </button>

            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-center">
              Settings are saved automatically
            </p>
          </div>
        )}
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default AccessibilityMenu;
