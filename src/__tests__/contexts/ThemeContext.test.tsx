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
});
