import { render, screen } from '@testing-library/react';
import { FadeIn } from '@/components/animations/FadeIn';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, initial, animate, transition, className, ...props }: any) => (
      <div
        className={className}
        data-initial={JSON.stringify(initial)}
        data-animate={JSON.stringify(animate)}
        data-transition={JSON.stringify(transition)}
        {...props}
      >
        {children}
      </div>
    ),
  },
}));

describe('FadeIn', () => {
  it('renders children correctly', () => {
    render(
      <FadeIn>
        <div>Test Content</div>
      </FadeIn>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies default direction "up"', () => {
    const { container } = render(
      <FadeIn>
        <div>Test</div>
      </FadeIn>
    );

    const motionDiv = container.firstChild as HTMLElement;
    const initial = JSON.parse(motionDiv.getAttribute('data-initial') || '{}');

    expect(initial.opacity).toBe(0);
    expect(initial.y).toBe(20); // up direction
  });

  it('applies direction "down"', () => {
    const { container } = render(
      <FadeIn direction="down">
        <div>Test</div>
      </FadeIn>
    );

    const motionDiv = container.firstChild as HTMLElement;
    const initial = JSON.parse(motionDiv.getAttribute('data-initial') || '{}');

    expect(initial.y).toBe(-20); // down direction
  });

  it('applies direction "left"', () => {
    const { container } = render(
      <FadeIn direction="left">
        <div>Test</div>
      </FadeIn>
    );

    const motionDiv = container.firstChild as HTMLElement;
    const initial = JSON.parse(motionDiv.getAttribute('data-initial') || '{}');

    expect(initial.x).toBe(20); // left direction
  });

  it('applies direction "right"', () => {
    const { container } = render(
      <FadeIn direction="right">
        <div>Test</div>
      </FadeIn>
    );

    const motionDiv = container.firstChild as HTMLElement;
    const initial = JSON.parse(motionDiv.getAttribute('data-initial') || '{}');

    expect(initial.x).toBe(-20); // right direction
  });

  it('applies custom delay', () => {
    const { container } = render(
      <FadeIn delay={0.5}>
        <div>Test</div>
      </FadeIn>
    );

    const motionDiv = container.firstChild as HTMLElement;
    const transition = JSON.parse(motionDiv.getAttribute('data-transition') || '{}');

    expect(transition.delay).toBe(0.5);
  });

  it('applies default delay of 0', () => {
    const { container } = render(
      <FadeIn>
        <div>Test</div>
      </FadeIn>
    );

    const motionDiv = container.firstChild as HTMLElement;
    const transition = JSON.parse(motionDiv.getAttribute('data-transition') || '{}');

    expect(transition.delay).toBe(0);
  });

  it('applies custom duration', () => {
    const { container } = render(
      <FadeIn duration={1.5}>
        <div>Test</div>
      </FadeIn>
    );

    const motionDiv = container.firstChild as HTMLElement;
    const transition = JSON.parse(motionDiv.getAttribute('data-transition') || '{}');

    expect(transition.duration).toBe(1.5);
  });

  it('applies default duration of 0.5', () => {
    const { container } = render(
      <FadeIn>
        <div>Test</div>
      </FadeIn>
    );

    const motionDiv = container.firstChild as HTMLElement;
    const transition = JSON.parse(motionDiv.getAttribute('data-transition') || '{}');

    expect(transition.duration).toBe(0.5);
  });

  it('applies custom className', () => {
    const { container } = render(
      <FadeIn className="custom-class">
        <div>Test</div>
      </FadeIn>
    );

    const motionDiv = container.firstChild as HTMLElement;
    expect(motionDiv).toHaveClass('custom-class');
  });

  it('applies empty className by default', () => {
    const { container } = render(
      <FadeIn>
        <div>Test</div>
      </FadeIn>
    );

    const motionDiv = container.firstChild as HTMLElement;
    expect(motionDiv.className).toBe('');
  });

  it('animates to opacity 1 and position 0', () => {
    const { container } = render(
      <FadeIn>
        <div>Test</div>
      </FadeIn>
    );

    const motionDiv = container.firstChild as HTMLElement;
    const animate = JSON.parse(motionDiv.getAttribute('data-animate') || '{}');

    expect(animate.opacity).toBe(1);
    expect(animate.x).toBe(0);
    expect(animate.y).toBe(0);
  });

  it('uses correct easing function', () => {
    const { container } = render(
      <FadeIn>
        <div>Test</div>
      </FadeIn>
    );

    const motionDiv = container.firstChild as HTMLElement;
    const transition = JSON.parse(motionDiv.getAttribute('data-transition') || '{}');

    expect(transition.ease).toEqual([0.4, 0, 0.2, 1]);
  });

  it('renders multiple children', () => {
    render(
      <FadeIn>
        <div>First Child</div>
        <div>Second Child</div>
      </FadeIn>
    );

    expect(screen.getByText('First Child')).toBeInTheDocument();
    expect(screen.getByText('Second Child')).toBeInTheDocument();
  });

  it('can be nested', () => {
    render(
      <FadeIn>
        <div>
          <FadeIn delay={0.2}>
            <span>Nested Content</span>
          </FadeIn>
        </div>
      </FadeIn>
    );

    expect(screen.getByText('Nested Content')).toBeInTheDocument();
  });

  it('handles all direction combinations with custom props', () => {
    const directions: Array<'up' | 'down' | 'left' | 'right'> = ['up', 'down', 'left', 'right'];

    directions.forEach(direction => {
      const { container } = render(
        <FadeIn direction={direction} delay={0.3} duration={0.8} className="test">
          <div>{direction}</div>
        </FadeIn>
      );

      expect(screen.getByText(direction)).toBeInTheDocument();

      const motionDiv = container.firstChild as HTMLElement;
      const transition = JSON.parse(motionDiv.getAttribute('data-transition') || '{}');

      expect(transition.delay).toBe(0.3);
      expect(transition.duration).toBe(0.8);
      expect(motionDiv).toHaveClass('test');
    });
  });

  it('renders with complex children structure', () => {
    render(
      <FadeIn>
        <div>
          <h1>Title</h1>
          <p>Paragraph</p>
          <button>Button</button>
        </div>
      </FadeIn>
    );

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Paragraph')).toBeInTheDocument();
    expect(screen.getByText('Button')).toBeInTheDocument();
  });
});
