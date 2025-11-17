import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';

// Test component that uses the theme context
function TestComponent() {
  const { theme, toggleTheme, mounted } = useTheme();

  if (!mounted) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <span data-testid="current-theme">{theme}</span>
      <button onClick={toggleTheme} data-testid="toggle-button">
        Toggle Theme
      </button>
    </div>
  );
}

describe('ThemeContext', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    // Reset document classes
    document.documentElement.classList.remove('dark');
  });

  it('renders with default light theme', async () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    expect(screen.getByTestId('current-theme')).toHaveTextContent('light');
  });

  it('toggles theme when button is clicked', async () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    const toggleButton = screen.getByTestId('toggle-button');

    // Initially light
    expect(screen.getByTestId('current-theme')).toHaveTextContent('light');

    // Toggle to dark
    fireEvent.click(toggleButton);
    await waitFor(() => {
      expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
    });

    // Toggle back to light
    fireEvent.click(toggleButton);
    await waitFor(() => {
      expect(screen.getByTestId('current-theme')).toHaveTextContent('light');
    });
  });

  it('persists theme to localStorage', async () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    const toggleButton = screen.getByTestId('toggle-button');

    // Toggle to dark
    fireEvent.click(toggleButton);

    await waitFor(() => {
      expect(localStorage.getItem('theme')).toBe('dark');
    });

    // Toggle to light
    fireEvent.click(toggleButton);

    await waitFor(() => {
      expect(localStorage.getItem('theme')).toBe('light');
    });
  });

  it('applies dark class to document element when dark theme is active', async () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    const toggleButton = screen.getByTestId('toggle-button');

    // Toggle to dark
    fireEvent.click(toggleButton);

    await waitFor(() => {
      expect(document.documentElement.classList.contains('dark')).toBe(true);
    });

    // Toggle to light
    fireEvent.click(toggleButton);

    await waitFor(() => {
      expect(document.documentElement.classList.contains('dark')).toBe(false);
    });
  });

  it('loads theme from localStorage on mount', async () => {
    // Set localStorage to dark theme before rendering
    localStorage.setItem('theme', 'dark');

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('falls back to system preference when localStorage fails', async () => {
    // Mock localStorage to throw an error
    const originalGetItem = Storage.prototype.getItem;
    Storage.prototype.getItem = jest.fn(() => {
      throw new Error('localStorage disabled');
    });

    // Mock system preference to dark
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: true, // prefers dark
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    // Restore
    Storage.prototype.getItem = originalGetItem;
  });

  it('falls back to light theme when both localStorage and matchMedia fail', async () => {
    // Mock localStorage to throw
    const originalGetItem = Storage.prototype.getItem;
    Storage.prototype.getItem = jest.fn(() => {
      throw new Error('localStorage disabled');
    });

    // Mock matchMedia to throw
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn(() => {
        throw new Error('matchMedia not supported');
      }),
    });

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    // Should fall back to light theme
    expect(screen.getByTestId('current-theme')).toHaveTextContent('light');

    // Restore
    Storage.prototype.getItem = originalGetItem;
  });

  it('handles localStorage failure when toggling theme', async () => {
    // Mock localStorage.setItem to throw
    const originalSetItem = Storage.prototype.setItem;
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();

    Storage.prototype.setItem = jest.fn(() => {
      throw new Error('localStorage is full');
    });

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    const toggleButton = screen.getByTestId('toggle-button');

    // Toggle theme - should still work even if localStorage fails
    fireEvent.click(toggleButton);

    await waitFor(() => {
      expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
    });

    // Dark class should still be applied
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    // Restore
    Storage.prototype.setItem = originalSetItem;
    consoleWarnSpy.mockRestore();
  });

  it('uses system preference when localStorage has no stored theme', async () => {
    // Clear localStorage
    localStorage.clear();

    // Mock system preference to dark
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: true, // prefers dark
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('ignores invalid theme values from localStorage', async () => {
    // Set an invalid theme value
    localStorage.setItem('theme', 'invalid-theme');

    // Mock system preference to light
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false, // prefers light
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    // Should fall back to system preference (light)
    expect(screen.getByTestId('current-theme')).toHaveTextContent('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });
});
