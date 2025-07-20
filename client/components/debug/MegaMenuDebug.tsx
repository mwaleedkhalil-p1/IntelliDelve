import React, { useState, useRef } from 'react';

/**
 * Debug component to test mega menu mouse behavior
 * This component helps identify mouse event issues
 */
export const MegaMenuDebug: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mouseEvents, setMouseEvents] = useState<string[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const addEvent = (event: string) => {
    setMouseEvents(prev => [...prev.slice(-9), `${new Date().toLocaleTimeString()}: ${event}`]);
  };

  const handleMouseEnter = (area: string) => {
    addEvent(`Mouse entered ${area}`);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
      addEvent('Timeout cleared');
    }
    if (area === 'trigger') {
      setIsOpen(true);
    }
  };

  const handleMouseLeave = (area: string, relatedTarget?: EventTarget | null) => {
    addEvent(`Mouse left ${area} (related: ${relatedTarget ? 'yes' : 'no'})`);
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
      addEvent('Menu closed by timeout');
    }, 200);
  };

  const handleGlobalMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div 
      className="p-8 bg-gray-100 min-h-screen"
      onMouseMove={handleGlobalMouseMove}
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Mega Menu Debug Tool</h1>
        
        {/* Mouse Position */}
        <div className="bg-white p-4 rounded-lg shadow mb-4">
          <h2 className="font-semibold mb-2">Mouse Position</h2>
          <p>X: {mousePosition.x}, Y: {mousePosition.y}</p>
        </div>

        {/* Event Log */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <h2 className="font-semibold mb-2">Event Log</h2>
          <div className="space-y-1 text-sm font-mono">
            {mouseEvents.map((event, index) => (
              <div key={index} className="text-gray-700">{event}</div>
            ))}
          </div>
        </div>

        {/* Navigation Simulation */}
        <nav className="bg-blue-600 text-white p-4 rounded-lg shadow-lg relative">
          <div className="flex space-x-6">
            <button className="hover:text-blue-200">Home</button>
            <button className="hover:text-blue-200">About</button>
            <div 
              className="relative"
              onMouseEnter={() => handleMouseEnter('trigger')}
              onMouseLeave={(e) => handleMouseLeave('trigger', e.relatedTarget)}
            >
              <button className="hover:text-blue-200 flex items-center">
                Services ▼
              </button>
            </div>
            <button className="hover:text-blue-200">Contact</button>
          </div>

          {/* Mega Menu */}
          {isOpen && (
            <div 
              className="absolute top-full left-0 right-0 mt-2 bg-white text-gray-800 rounded-lg shadow-xl p-6 z-50"
              onMouseEnter={() => handleMouseEnter('mega-menu')}
              onMouseLeave={(e) => handleMouseLeave('mega-menu', e.relatedTarget)}
            >
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold mb-3 text-blue-600">Web Development</h3>
                  <ul className="space-y-2">
                    <li>
                      <a 
                        href="#" 
                        className="block hover:text-blue-600 p-2 rounded hover:bg-blue-50"
                        onMouseEnter={() => addEvent('Hovered menu item')}
                      >
                        Frontend Development
                      </a>
                    </li>
                    <li>
                      <a 
                        href="#" 
                        className="block hover:text-blue-600 p-2 rounded hover:bg-blue-50"
                        onMouseEnter={() => addEvent('Hovered menu item')}
                      >
                        Backend Development
                      </a>
                    </li>
                    <li>
                      <a 
                        href="#" 
                        className="block hover:text-blue-600 p-2 rounded hover:bg-blue-50"
                        onMouseEnter={() => addEvent('Hovered menu item')}
                      >
                        Full Stack Solutions
                      </a>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3 text-blue-600">Mobile Apps</h3>
                  <ul className="space-y-2">
                    <li>
                      <a 
                        href="#" 
                        className="block hover:text-blue-600 p-2 rounded hover:bg-blue-50"
                        onMouseEnter={() => addEvent('Hovered menu item')}
                      >
                        iOS Development
                      </a>
                    </li>
                    <li>
                      <a 
                        href="#" 
                        className="block hover:text-blue-600 p-2 rounded hover:bg-blue-50"
                        onMouseEnter={() => addEvent('Hovered menu item')}
                      >
                        Android Development
                      </a>
                    </li>
                    <li>
                      <a 
                        href="#" 
                        className="block hover:text-blue-600 p-2 rounded hover:bg-blue-50"
                        onMouseEnter={() => addEvent('Hovered menu item')}
                      >
                        Cross-Platform Apps
                      </a>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3 text-blue-600">Consulting</h3>
                  <ul className="space-y-2">
                    <li>
                      <a 
                        href="#" 
                        className="block hover:text-blue-600 p-2 rounded hover:bg-blue-50"
                        onMouseEnter={() => addEvent('Hovered menu item')}
                      >
                        Technical Consulting
                      </a>
                    </li>
                    <li>
                      <a 
                        href="#" 
                        className="block hover:text-blue-600 p-2 rounded hover:bg-blue-50"
                        onMouseEnter={() => addEvent('Hovered menu item')}
                      >
                        Architecture Review
                      </a>
                    </li>
                    <li>
                      <a 
                        href="#" 
                        className="block hover:text-blue-600 p-2 rounded hover:bg-blue-50"
                        onMouseEnter={() => addEvent('Hovered menu item')}
                      >
                        Performance Optimization
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </nav>

        {/* Instructions */}
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-semibold text-yellow-800 mb-2">Test Instructions</h3>
          <ul className="text-yellow-700 space-y-1 text-sm">
            <li>• Hover over "Services" to open the mega menu</li>
            <li>• Move mouse around inside the mega menu - it should stay open</li>
            <li>• Move mouse outside the menu area - it should close after 200ms</li>
            <li>• Watch the event log to see what's happening</li>
            <li>• Check if menu items are hoverable without closing the menu</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
