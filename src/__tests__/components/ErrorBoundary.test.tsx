import { render, screen, fireEvent } from '@testing-library/react';
import ErrorBoundary from '@/components/common/ErrorBoundary';

// Component that throws an error
function ThrowError({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div>No error</div>;
}

// Component for testing custom fallback
function CustomFallback({ error, resetError }: { error?: Error; resetError: () => void }) {
  return (
    <div>
      <h1>Custom Error Fallback</h1>
      <p>{error?.message}</p>
      <button onClick={resetError}>Custom Reset</button>
    </div>
  );
}

describe('ErrorBoundary', () => {
  // Suppress console.error for these tests
  const originalError = console.error;

  beforeAll(() => {
    console.error = jest.fn();
  });

  afterAll(() => {
    console.error = originalError;
  });

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>
    );

    expect(screen.getByText('No error')).toBeInTheDocument();
  });

  it('renders default error fallback when an error occurs', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText(/Oops! Something went wrong/i)).toBeInTheDocument();
    expect(screen.getByText(/We encountered an unexpected error/i)).toBeInTheDocument();
  });

  it('renders custom fallback when provided', () => {
    render(
      <ErrorBoundary fallback={CustomFallback}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Custom Error Fallback')).toBeInTheDocument();
    expect(screen.getByText('Test error')).toBeInTheDocument();
  });

  it('logs error to console when error is caught', () => {
    const consoleError = jest.fn();
    console.error = consoleError;

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(consoleError).toHaveBeenCalled();
  });

  it('resets error state when Try Again is clicked', () => {
    const { rerender } = render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    // Error fallback should be shown
    expect(screen.getByText(/Oops! Something went wrong/i)).toBeInTheDocument();

    // Get the Try Again button
    const tryAgainButton = screen.getByText('Try Again');

    // Rerender with no error before clicking reset
    rerender(
      <ErrorBoundary>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>
    );

    // Click reset
    fireEvent.click(tryAgainButton);

    // Should show children again
    expect(screen.getByText('No error')).toBeInTheDocument();
  });

  it('has a Go Home button that redirects to home page', () => {
    // Mock window.location.href
    delete (window as unknown as { location: unknown }).location;
    window.location = { href: '' } as unknown as Location;

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    const goHomeButton = screen.getByText('Go Home');
    fireEvent.click(goHomeButton);

    expect(window.location.href).toContain('/');
  });

  it('shows error details in development mode', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText(/Error Details \(Development\)/i)).toBeInTheDocument();

    process.env.NODE_ENV = originalEnv;
  });

  it('provides contact email for persistent issues', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    const contactLink = screen.getByText('contact me');
    expect(contactLink).toHaveAttribute('href', 'mailto:nivbuskila@icloud.com');
  });

  it('resets error with custom fallback', () => {
    const { rerender } = render(
      <ErrorBoundary fallback={CustomFallback}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Custom Error Fallback')).toBeInTheDocument();

    // Rerender with no error before clicking reset
    rerender(
      <ErrorBoundary fallback={CustomFallback}>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>
    );

    const customResetButton = screen.getByText('Custom Reset');
    fireEvent.click(customResetButton);

    expect(screen.getByText('No error')).toBeInTheDocument();
  });
});
