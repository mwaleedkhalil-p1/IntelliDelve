import React, { useState, useRef, useCallback } from 'react';

/**
 * Test component to verify mega menu auto-close behavior
 */
export const MegaMenuAutoCloseTest: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev.slice(-9), `${timestamp}: ${message}`]);
  };

  const handleMouseEnter = useCallback((area: string) => {
    addLog(`Mouse entered ${area}`);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
      addLog('Timeout cleared');
    }
    if (area === 'trigger') {
      setIsOpen(true);
      addLog('Menu opened');
    }
  }, []);

  const handleMouseLeave = useCallback((area: string, event: React.MouseEvent) => {
    const relatedTarget = event.relatedTarget as Element;
    addLog(`Mouse left ${area} (going to: ${relatedTarget?.tagName || 'unknown'})`);
    
    // Check if moving to related elements
    if (relatedTarget) {
      if (navRef.current?.contains(relatedTarget) || 
          megaMenuRef.current?.contains(relatedTarget)) {
        addLog('Moving to related element - not closing');
        return;
      }
    }
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
      addLog('Menu closed by timeout');
    }, 150);
    addLog('Close timeout set (150ms)');
  }, []);

  const handleGlobalMouseMove = useCallback((event: React.MouseEvent) => {
    setMousePos({ x: event.clientX, y: event.clientY });
    
    if (!isOpen) return;

    const nav = navRef.current;
    const megaMenu = megaMenuRef.current;
    
    if (!nav || !megaMenu) return;

    const navRect = nav.getBoundingClientRect();
    const megaRect = megaMenu.getBoundingClientRect();
    const buffer = 30;

    const isInsideNav = (
      event.clientX >= navRect.left - buffer &&
      event.clientX <= navRect.right + buffer &&
      event.clientY >= navRect.top - buffer &&
      event.clientY <= navRect.bottom + buffer
    );

    const isInsideMega = (
      event.clientX >= megaRect.left - buffer &&
      event.clientX <= megaRect.right + buffer &&
      event.clientY >= megaRect.top - buffer &&
      event.clientY <= megaRect.bottom + buffer
    );

    if (!isInsideNav && !isInsideMega) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        setIsOpen(false);
        addLog('Menu closed by global mouse tracking');
      }, 200);
    } else {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }
  }, [isOpen]);

  return (
    <div 
      className="min-h-screen bg-gray-50 p-8"
      onMouseMove={handleGlobalMouseMove}
    >
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Mega Menu Auto-Close Test</h1>
        
        {/* Status Panel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-2">Menu Status</h3>
            <p className={`text-lg font-bold ${isOpen ? 'text-green-600' : 'text-red-600'}`}>
              {isOpen ? 'OPEN' : 'CLOSED'}
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-2">Mouse Position</h3>
            <p className="text-sm">X: {mousePos.x}, Y: {mousePos.y}</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-2">Timeout Status</h3>
            <p className={`text-sm ${timeoutRef.current ? 'text-orange-600' : 'text-gray-600'}`}>
              {timeoutRef.current ? 'Timeout Active' : 'No Timeout'}
            </p>
          </div>
        </div>

        {/* Event Log */}
        <div className="bg-white p-4 rounded-lg shadow mb-8">
          <h3 className="font-semibold mb-3">Event Log</h3>
          <div className="space-y-1 text-sm font-mono max-h-40 overflow-y-auto">
            {logs.map((log, index) => (
              <div key={index} className="text-gray-700">{log}</div>
            ))}
          </div>
        </div>

        {/* Test Navigation */}
        <div 
          ref={navRef}
          className="bg-blue-600 text-white p-4 rounded-lg shadow-lg relative mb-4"
          data-mega-menu-area
        >
          <div className="flex space-x-6">
            <button className="hover:text-blue-200 px-2 py-1">Home</button>
            <button className="hover:text-blue-200 px-2 py-1">About</button>
            <div className="relative">
              <button 
                className="hover:text-blue-200 flex items-center px-2 py-1"
                onMouseEnter={() => handleMouseEnter('trigger')}
                onMouseLeave={(e) => handleMouseLeave('nav', e)}
              >
                Services ▼
              </button>
            </div>
            <button className="hover:text-blue-200 px-2 py-1">Contact</button>
          </div>
        </div>

        {/* Mega Menu */}
        {isOpen && (
          <div 
            ref={megaMenuRef}
            className="bg-white rounded-lg shadow-xl p-6 relative z-10"
            data-mega-menu-content
            onMouseEnter={() => handleMouseEnter('mega-menu')}
            onMouseLeave={(e) => handleMouseLeave('mega-menu', e)}
          >
            <div className="grid grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-blue-600">Web Development</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="block hover:text-blue-600 p-2 rounded hover:bg-blue-50">Frontend</a></li>
                  <li><a href="#" className="block hover:text-blue-600 p-2 rounded hover:bg-blue-50">Backend</a></li>
                  <li><a href="#" className="block hover:text-blue-600 p-2 rounded hover:bg-blue-50">Full Stack</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-blue-600">Mobile Apps</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="block hover:text-blue-600 p-2 rounded hover:bg-blue-50">iOS</a></li>
                  <li><a href="#" className="block hover:text-blue-600 p-2 rounded hover:bg-blue-50">Android</a></li>
                  <li><a href="#" className="block hover:text-blue-600 p-2 rounded hover:bg-blue-50">Cross-Platform</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-blue-600">Consulting</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="block hover:text-blue-600 p-2 rounded hover:bg-blue-50">Technical</a></li>
                  <li><a href="#" className="block hover:text-blue-600 p-2 rounded hover:bg-blue-50">Architecture</a></li>
                  <li><a href="#" className="block hover:text-blue-600 p-2 rounded hover:bg-blue-50">Performance</a></li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Test Instructions */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mt-8">
          <h3 className="font-semibold text-yellow-800 mb-3">Test Scenarios</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-yellow-700 text-sm">
            <div>
              <h4 className="font-medium mb-2">✅ Should Stay Open:</h4>
              <ul className="space-y-1">
                <li>• Hover over "Services" button</li>
                <li>• Move mouse inside mega menu</li>
                <li>• Hover over menu items</li>
                <li>• Move between nav and mega menu</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">✅ Should Auto-Close:</h4>
              <ul className="space-y-1">
                <li>• Move mouse far from menu area</li>
                <li>• Move to other parts of the page</li>
                <li>• Move mouse outside buffer zones</li>
                <li>• Wait for timeout after leaving</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
