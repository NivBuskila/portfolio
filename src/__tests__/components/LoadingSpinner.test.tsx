import { render, screen } from '@testing-library/react';
import LoadingSpinner, { PageLoader, ButtonLoader, InlineLoader } from '@/components/common/LoadingSpinner';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, animate, transition, className, ...props }: React.PropsWithChildren<{
      animate?: Record<string, unknown>;
      transition?: Record<string, unknown>;
      className?: string;
    }>) => (
      <div
        className={className}
        data-animate={JSON.stringify(animate)}
        data-transition={JSON.stringify(transition)}
        {...props}
      >
        {children}
      </div>
    ),
    p: ({ children, animate, transition, className, ...props }: React.PropsWithChildren<{
      animate?: Record<string, unknown>;
      transition?: Record<string, unknown>;
      className?: string;
    }>) => (
      <p
        className={className}
        data-animate={JSON.stringify(animate)}
        data-transition={JSON.stringify(transition)}
        {...props}
      >
        {children}
      </p>
    ),
  },
}));

describe('LoadingSpinner', () => {
  describe('Basic Rendering', () => {
    it('renders with default props', () => {
      render(<LoadingSpinner />);
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('renders with custom text', () => {
      render(<LoadingSpinner text="Please wait..." />);
      expect(screen.getByText('Please wait...')).toBeInTheDocument();
    });

    it('renders without text when text prop is empty', () => {
      render(<LoadingSpinner text="" />);
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
  });

  describe('Size Variants', () => {
    it('renders small size spinner', () => {
      const { container } = render(<LoadingSpinner size="sm" />);
      expect(container.querySelector('.w-4.h-4')).toBeInTheDocument();
    });

    it('renders medium size spinner (default)', () => {
      const { container } = render(<LoadingSpinner size="md" />);
      expect(container.querySelector('.w-8.h-8')).toBeInTheDocument();
    });

    it('renders large size spinner', () => {
      const { container } = render(<LoadingSpinner size="lg" />);
      expect(container.querySelector('.w-12.h-12')).toBeInTheDocument();
    });

    it('renders extra large size spinner', () => {
      const { container } = render(<LoadingSpinner size="xl" />);
      expect(container.querySelector('.w-16.h-16')).toBeInTheDocument();
    });
  });

  describe('Spinner Type', () => {
    it('renders spinner type (default)', () => {
      const { container } = render(<LoadingSpinner type="spinner" />);
      expect(container.querySelector('.rounded-full')).toBeInTheDocument();
      expect(container.querySelector('.border-4')).toBeInTheDocument();
    });

    it('renders dots type', () => {
      const { container } = render(<LoadingSpinner type="dots" />);
      const dots = container.querySelectorAll('.rounded-full.bg-purple-500');
      expect(dots.length).toBe(3);
    });

    it('renders pulse type', () => {
      const { container } = render(<LoadingSpinner type="pulse" />);
      const pulse = container.querySelector('.rounded-full.bg-purple-500');
      expect(pulse).toBeInTheDocument();
    });

    it('renders wave type', () => {
      const { container } = render(<LoadingSpinner type="wave" />);
      const waves = container.querySelectorAll('.rounded-full.bg-purple-500');
      expect(waves.length).toBe(5);
    });
  });

  describe('Full Screen Mode', () => {
    it('renders full screen spinner', () => {
      const { container } = render(<LoadingSpinner fullScreen />);
      expect(container.querySelector('.fixed.inset-0')).toBeInTheDocument();
      expect(container.querySelector('.z-50')).toBeInTheDocument();
    });

    it('does not render full screen by default', () => {
      const { container } = render(<LoadingSpinner />);
      expect(container.querySelector('.fixed.inset-0')).not.toBeInTheDocument();
    });

    it('renders with backdrop blur when full screen', () => {
      const { container } = render(<LoadingSpinner fullScreen />);
      expect(container.querySelector('.backdrop-blur-sm')).toBeInTheDocument();
    });

    it('renders with card styling when full screen', () => {
      const { container } = render(<LoadingSpinner fullScreen />);
      expect(container.querySelector('.rounded-2xl')).toBeInTheDocument();
      expect(container.querySelector('.shadow-xl')).toBeInTheDocument();
    });
  });

  describe('Animation Data', () => {
    it('spinner has correct rotation animation', () => {
      const { container } = render(<LoadingSpinner type="spinner" />);
      const spinner = container.querySelector('[data-animate]') as HTMLElement;

      if (spinner) {
        const animate = JSON.parse(spinner.getAttribute('data-animate') || '{}');
        expect(animate.rotate).toBe(360);

        const transition = JSON.parse(spinner.getAttribute('data-transition') || '{}');
        expect(transition.duration).toBe(1);
        // Infinity gets serialized as null in JSON
        expect(transition.repeat).toBeNull();
        expect(transition.ease).toBe('linear');
      }
    });

    it('text has correct pulse animation', () => {
      const { container } = render(<LoadingSpinner text="Loading..." />);
      const text = container.querySelector('p[data-animate]') as HTMLElement;

      if (text) {
        const animate = JSON.parse(text.getAttribute('data-animate') || '{}');
        expect(animate.opacity).toEqual([0.5, 1, 0.5]);

        const transition = JSON.parse(text.getAttribute('data-transition') || '{}');
        expect(transition.duration).toBe(2);
        // Infinity gets serialized as null in JSON
        expect(transition.repeat).toBeNull();
      }
    });
  });

  describe('Compound Components', () => {
    it('renders PageLoader correctly', () => {
      const { container } = render(<PageLoader />);
      expect(screen.getByText('Loading page...')).toBeInTheDocument();
      expect(container.querySelector('.fixed.inset-0')).toBeInTheDocument();
    });

    it('renders PageLoader with custom text', () => {
      render(<PageLoader text="Initializing..." />);
      expect(screen.getByText('Initializing...')).toBeInTheDocument();
    });

    it('renders ButtonLoader correctly', () => {
      const { container } = render(<ButtonLoader />);
      expect(container.querySelector('.w-4.h-4')).toBeInTheDocument();
      // ButtonLoader uses LoadingSpinner with size="sm" and type="spinner", which still renders the default text
      // So we just verify it renders a small spinner
    });

    it('renders InlineLoader correctly', () => {
      const { container } = render(<InlineLoader />);
      expect(container.querySelector('.py-8')).toBeInTheDocument();
      const dots = container.querySelectorAll('.rounded-full.bg-purple-500');
      expect(dots.length).toBe(3);
    });

    it('renders InlineLoader with custom text', () => {
      render(<InlineLoader text="Fetching data..." />);
      expect(screen.getByText('Fetching data...')).toBeInTheDocument();
    });
  });

  describe('Styling', () => {
    it('applies correct color classes for spinner', () => {
      const { container } = render(<LoadingSpinner type="spinner" />);
      const spinner = container.querySelector('.border-purple-200');
      expect(spinner).toBeInTheDocument();
      expect(spinner).toHaveClass('border-t-purple-500');
    });

    it('applies correct color classes for dots', () => {
      const { container } = render(<LoadingSpinner type="dots" />);
      const dots = container.querySelectorAll('.bg-purple-500');
      expect(dots.length).toBe(3);
    });

    it('applies dark mode classes', () => {
      const { container } = render(<LoadingSpinner type="spinner" />);
      const spinner = container.querySelector('.dark\\:border-purple-800');
      expect(spinner).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles all size variants for dots type', () => {
      const sizes: Array<'sm' | 'md' | 'lg' | 'xl'> = ['sm', 'md', 'lg', 'xl'];

      sizes.forEach(size => {
        const { container } = render(<LoadingSpinner type="dots" size={size} />);
        const dots = container.querySelectorAll('.rounded-full.bg-purple-500');
        expect(dots.length).toBe(3);
      });
    });

    it('handles all size variants for wave type', () => {
      const sizes: Array<'sm' | 'md' | 'lg' | 'xl'> = ['sm', 'md', 'lg', 'xl'];

      sizes.forEach(size => {
        const { container } = render(<LoadingSpinner type="wave" size={size} />);
        const waves = container.querySelectorAll('.rounded-full.bg-purple-500');
        expect(waves.length).toBe(5);
      });
    });

    it('combines all props correctly', () => {
      const { container } = render(
        <LoadingSpinner
          size="lg"
          type="dots"
          text="Processing..."
          fullScreen
        />
      );

      expect(screen.getByText('Processing...')).toBeInTheDocument();
      expect(container.querySelector('.fixed.inset-0')).toBeInTheDocument();
      const dots = container.querySelectorAll('.rounded-full.bg-purple-500');
      expect(dots.length).toBe(3);
    });
  });
});
