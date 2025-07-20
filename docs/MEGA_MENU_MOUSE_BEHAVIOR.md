# Mega Menu Mouse Behavior Implementation

## Overview

This document describes the enhanced mouse behavior implementation for the IntelliDelve mega menu system. The implementation provides smooth, intuitive user interactions while preventing common issues like flickering, premature closing, and poor user experience.

## Key Features

### ✅ Implemented Features

1. **Smooth Menu Opening**
   - Menus open immediately on `mouseenter` for mega menu items
   - Automatic switching between different mega menus
   - Clear timeout cancellation to prevent conflicts

2. **Intelligent Menu Closing**
   - Delayed closing with configurable timeout (200ms default)
   - Smart related target detection to prevent premature closing
   - Graceful handling of mouse movement between nav and dropdown

3. **Enhanced Boundary Detection**
   - Global mouse movement tracking with buffer zones
   - Precise boundary calculations for nav and mega menu areas
   - Gap tolerance between navigation and dropdown elements

4. **Robust Event Handling**
   - Comprehensive `mouseleave` and `mouseenter` event management
   - Prevention of event bubbling interference
   - Null safety for edge cases

## Technical Implementation

### Core Components

#### 1. Mouse Event Handlers

```typescript
/**
 * Enhanced menu hover handler with improved state management
 */
const handleMenuHover = useCallback((menuType: string) => {
  if (window.innerWidth >= 1024) {
    // Clear any pending close timeout immediately
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveMenu(menuType);
  }
}, []);

/**
 * Enhanced mouse leave handler with comprehensive related target checking
 */
const handleMouseLeave = useCallback((event: React.MouseEvent) => {
  // Clear any existing timeout first
  if (closeTimeoutRef.current) {
    clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = null;
  }

  const relatedTarget = event.relatedTarget as Element;
  const currentTarget = event.currentTarget as Element;

  // Enhanced related target checking to prevent flickering
  if (relatedTarget) {
    // Multiple checks for different scenarios
    if (currentTarget.contains(relatedTarget) ||
        relatedTarget.closest('[data-mega-menu-area]') ||
        (megaMenuRef.current && megaMenuRef.current.contains(relatedTarget)) ||
        (navRef.current && navRef.current.contains(relatedTarget))) {
      return;
    }
  }

  // Set delayed close with appropriate timeout
  closeTimeoutRef.current = setTimeout(() => {
    setActiveMenu(null);
  }, 200);
}, []);
```

#### 2. Global Mouse Movement Tracking

```typescript
/**
 * Enhanced global mouse move listener for precise boundary detection
 */
useEffect(() => {
  const handleGlobalMouseMove = (event: MouseEvent) => {
    if (!activeMenu) return;

    const nav = navRef.current;
    const megaMenu = megaMenuRef.current;
    if (!nav) return;

    const navRect = nav.getBoundingClientRect();
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // Define buffer zones for smoother interaction
    const horizontalBuffer = 20;
    const verticalBuffer = 10;

    // Check boundaries using utility function
    const isInsideNav = isMouseWithinBounds(mouseX, mouseY, navRect, horizontalBuffer, verticalBuffer);
    
    let isInsideMegaMenu = false;
    if (megaMenu && activeMenu) {
      const megaRect = megaMenu.getBoundingClientRect();
      isInsideMegaMenu = isMouseWithinBounds(mouseX, mouseY, megaRect, horizontalBuffer, verticalBuffer);
    }

    // Handle gap between nav and mega menu
    let isInGap = false;
    if (megaMenu && activeMenu) {
      const megaRect = megaMenu.getBoundingClientRect();
      const gapHeight = megaRect.top - navRect.bottom;
      
      if (gapHeight > 0 && gapHeight <= 20) {
        isInGap = (
          mouseX >= Math.min(navRect.left, megaRect.left) - horizontalBuffer &&
          mouseX <= Math.max(navRect.right, megaRect.right) + horizontalBuffer &&
          mouseY >= navRect.bottom &&
          mouseY <= megaRect.top
        );
      }
    }

    // Close menu if outside all areas
    if (!isInsideNav && !isInsideMegaMenu && !isInGap) {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
      closeTimeoutRef.current = setTimeout(() => {
        setActiveMenu(null);
      }, 150);
    } else {
      // Cancel pending close if re-entering valid area
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }
    }
  };

  document.addEventListener('mousemove', handleGlobalMouseMove);
  return () => document.removeEventListener('mousemove', handleGlobalMouseMove);
}, [activeMenu]);
```

#### 3. Utility Functions

```typescript
/**
 * Utility function to check if mouse coordinates are within element bounds with buffer
 */
const isMouseWithinBounds = (
  mouseX: number,
  mouseY: number,
  rect: DOMRect,
  horizontalBuffer = 0,
  verticalBuffer = 0
): boolean => {
  return (
    mouseX >= rect.left - horizontalBuffer &&
    mouseX <= rect.right + horizontalBuffer &&
    mouseY >= rect.top - verticalBuffer &&
    mouseY <= rect.bottom + verticalBuffer
  );
};
```

## Configuration Options

### Timeout Values

- **Menu Close Delay**: 200ms (balanced for UX)
- **Global Mouse Timeout**: 150ms (responsive but not jumpy)
- **Gap Tolerance**: 20px (allows for small gaps between elements)

### Buffer Zones

- **Horizontal Buffer**: 20px (prevents edge case issues)
- **Vertical Buffer**: 10px (accounts for cursor precision)

## User Experience Benefits

1. **No Flickering**: Comprehensive related target checking prevents menu from closing when moving between elements
2. **Smooth Transitions**: Appropriate timeouts allow for natural mouse movement
3. **Intuitive Behavior**: Menu stays open while user is clearly interacting with it
4. **Responsive Closing**: Menu closes promptly when user moves away
5. **Gap Tolerance**: Small gaps between navigation and dropdown don't cause premature closing

## Testing

The implementation includes comprehensive tests covering:

- Menu opening behavior
- Menu closing with various scenarios
- Related target handling
- Global mouse movement
- Edge cases and error conditions
- Rapid mouse movements
- Null safety

Run tests with:
```bash
npm test MegaMenuMouseBehavior.test.tsx
```

## Browser Compatibility

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+

## Performance Considerations

- Event listeners are properly cleaned up
- Timeouts are cleared to prevent memory leaks
- Global mouse tracking is only active when menu is open
- Efficient boundary calculations using utility functions

## Troubleshooting

### Common Issues

1. **Menu closes too quickly**: Increase timeout values
2. **Menu doesn't close**: Check related target logic
3. **Flickering**: Verify buffer zones and related target checking
4. **Performance issues**: Ensure event listeners are properly cleaned up

### Debug Mode

Add this to enable debug logging:
```typescript
const DEBUG_MEGA_MENU = process.env.NODE_ENV === 'development';

if (DEBUG_MEGA_MENU) {
  console.log('Menu state:', { activeMenu, mouseX, mouseY, isInsideNav, isInsideMegaMenu });
}
```
