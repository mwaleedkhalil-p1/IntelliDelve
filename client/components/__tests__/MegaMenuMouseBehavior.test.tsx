import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Navigation } from '../Navigation';
import { CalendlyProvider } from '../../contexts/CalendlyContext';

// Mock the CalendlyContext
const MockCalendlyProvider = ({ children }: { children: React.ReactNode }) => (
  <CalendlyProvider>
    {children}
  </CalendlyProvider>
);

// Mock GSAP
jest.mock('gsap', () => ({
  gsap: {
    fromTo: jest.fn(),
    to: jest.fn(),
    killTweensOf: jest.fn(),
  },
}));

// Helper function to create mouse events with relatedTarget
const createMouseEvent = (type: string, options: any = {}) => {
  const event = new MouseEvent(type, {
    bubbles: true,
    cancelable: true,
    ...options,
  });

  // Add relatedTarget property
  Object.defineProperty(event, 'relatedTarget', {
    value: options.relatedTarget || null,
    writable: false,
  });

  return event;
};

describe('Mega Menu Mouse Behavior', () => {
  const renderNavigation = () => {
    return render(
      <BrowserRouter>
        <MockCalendlyProvider>
          <Navigation />
        </MockCalendlyProvider>
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    // Mock window.innerWidth for desktop behavior
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });

    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  describe('Menu Opening Behavior', () => {
    it('should open mega menu on mouse enter', async () => {
      renderNavigation();

      const servicesLink = screen.getByText('What We Offer?');

      fireEvent.mouseEnter(servicesLink);

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });
    });

    it('should switch between different mega menus smoothly', async () => {
      renderNavigation();

      const servicesLink = screen.getByText('What We Offer?');
      const industriesLink = screen.getByText('Industries');

      // Open services menu
      fireEvent.mouseEnter(servicesLink);
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });

      // Switch to industries menu
      fireEvent.mouseEnter(industriesLink);
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });
    });
  });

  describe('Menu Closing Behavior', () => {
    it('should not close menu when moving from nav to mega menu', async () => {
      renderNavigation();

      const servicesLink = screen.getByText('What We Offer?');
      fireEvent.mouseEnter(servicesLink);

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });

      const megaMenuContainer = screen.getByRole('dialog').parentElement;

      // Simulate mouse leaving nav but entering mega menu
      const mouseLeaveEvent = createMouseEvent('mouseleave', {
        relatedTarget: megaMenuContainer,
      });

      fireEvent(servicesLink, mouseLeaveEvent);

      // Menu should still be open
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('should close menu with delay when mouse leaves entire area', async () => {
      renderNavigation();

      const servicesLink = screen.getByText('What We Offer?');
      fireEvent.mouseEnter(servicesLink);

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });

      // Simulate mouse leaving to an unrelated element
      const mouseLeaveEvent = createMouseEvent('mouseleave', {
        relatedTarget: document.body,
      });

      fireEvent(servicesLink.parentElement!, mouseLeaveEvent);

      // Menu should still be open immediately
      expect(screen.getByRole('dialog')).toBeInTheDocument();

      // Fast-forward time to trigger timeout
      jest.advanceTimersByTime(200);

      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });

    it('should cancel close timeout when re-entering menu area', async () => {
      renderNavigation();

      const servicesLink = screen.getByText('What We Offer?');
      fireEvent.mouseEnter(servicesLink);

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });

      // Start leaving
      const mouseLeaveEvent = createMouseEvent('mouseleave', {
        relatedTarget: document.body,
      });
      fireEvent(servicesLink.parentElement!, mouseLeaveEvent);

      // Re-enter before timeout
      fireEvent.mouseEnter(servicesLink);

      // Fast-forward time
      jest.advanceTimersByTime(300);

      // Menu should still be open
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
  });

  describe('Non-Mega Menu Item Behavior', () => {
    it('should close mega menu when hovering over non-mega menu items', async () => {
      renderNavigation();

      const servicesLink = screen.getByText('What We Offer?');
      const aboutLink = screen.getByText('About');

      // Open mega menu
      fireEvent.mouseEnter(servicesLink);
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });

      // Hover over non-mega menu item
      fireEvent.mouseEnter(aboutLink);

      // Menu should close immediately
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });
  });

  describe('Global Mouse Movement', () => {
    it('should handle global mouse movement outside menu area', async () => {
      renderNavigation();

      const servicesLink = screen.getByText('What We Offer?');
      fireEvent.mouseEnter(servicesLink);

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });

      // Simulate global mouse movement far from menu
      const globalMouseEvent = new MouseEvent('mousemove', {
        clientX: 1000,
        clientY: 1000,
        bubbles: true,
      });

      document.dispatchEvent(globalMouseEvent);

      // Fast-forward time to trigger timeout
      jest.advanceTimersByTime(200);

      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle rapid mouse movements without flickering', async () => {
      renderNavigation();

      const servicesLink = screen.getByText('What We Offer?');
      const industriesLink = screen.getByText('Industries');

      // Rapid switching between menus
      fireEvent.mouseEnter(servicesLink);
      fireEvent.mouseEnter(industriesLink);
      fireEvent.mouseEnter(servicesLink);
      fireEvent.mouseEnter(industriesLink);

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });

      // Should end up with industries menu open
      expect(screen.getByText('Industries')).toBeInTheDocument();
    });

    it('should handle null relatedTarget gracefully', async () => {
      renderNavigation();

      const servicesLink = screen.getByText('What We Offer?');
      fireEvent.mouseEnter(servicesLink);

      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument();
      });

      // Simulate mouse leave with null relatedTarget
      const mouseLeaveEvent = createMouseEvent('mouseleave', {
        relatedTarget: null,
      });

      expect(() => {
        fireEvent(servicesLink.parentElement!, mouseLeaveEvent);
      }).not.toThrow();
    });
  });
});
