import { render, screen } from '@testing-library/react';
import Home from '@/components/home/Home';
import { personalInfo } from '@/data/personalInfo';

// Mock next/link
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({
    children,
    href,
    ...props
  }: React.PropsWithChildren<{ href: string }>) => {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  },
}));

// Mock next/dynamic
jest.mock('next/dynamic', () => ({
  __esModule: true,
  default: () => {
    const Component = () => <div data-testid="social-preview-modal">Modal</div>;
    return Component;
  },
}));

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({
      children,
      className,
      ...props
    }: React.PropsWithChildren<{ className?: string }>) => (
      <div className={className} {...props}>
        {children}
      </div>
    ),
    h1: ({
      children,
      className,
      ...props
    }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h1 className={className} {...props}>
        {children}
      </h1>
    ),
    h2: ({
      children,
      className,
      ...props
    }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h2 className={className} {...props}>
        {children}
      </h2>
    ),
    p: ({
      children,
      className,
      ...props
    }: React.HTMLAttributes<HTMLParagraphElement>) => (
      <p className={className} {...props}>
        {children}
      </p>
    ),
    span: ({
      children,
      className,
      ...props
    }: React.HTMLAttributes<HTMLSpanElement>) => (
      <span className={className} {...props}>
        {children}
      </span>
    ),
  },
  useAnimate: () => [{ current: null }, jest.fn()],
  useInView: () => true,
  stagger: jest.fn(),
  AnimatePresence: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

describe('Home', () => {
  it('renders the main heading with name', () => {
    const { container } = render(<Home />);

    expect(container.textContent).toMatch(/Hi,\s+I'm/);
    expect(container.textContent).toMatch(/Niv\s+Buskila/);
    expect(container.textContent).toContain('Full Stack Developer');
  });

  it('displays the personal title', () => {
    render(<Home />);

    expect(screen.getByText(personalInfo.title)).toBeInTheDocument();
  });

  it('displays the about section', () => {
    const { container } = render(<Home />);

    expect(container.textContent).toContain(personalInfo.about);
  });

  it('mentions key technologies', () => {
    const { container } = render(<Home />);

    expect(container.textContent).toMatch(/python/i);
    expect(container.textContent).toMatch(/java/i);
    expect(container.textContent).toMatch(/javascript/i);
  });

  it('renders GitHub social icon button', () => {
    render(<Home />);

    const githubButton = screen.getByLabelText(/view github profile/i);
    expect(githubButton).toBeInTheDocument();
  });

  it('renders LinkedIn social icon button', () => {
    render(<Home />);

    const linkedinButton = screen.getByLabelText(/view linkedin profile/i);
    expect(linkedinButton).toBeInTheDocument();
  });

  it('renders animated background blobs', () => {
    const { container } = render(<Home />);

    // Check for blur elements
    const blurElements = container.querySelectorAll('[class*="blur-"]');
    expect(blurElements.length).toBeGreaterThan(0);
  });

  it('has proper responsive layout', () => {
    const { container } = render(<Home />);

    // Check for responsive classes
    expect(
      container.querySelector('[class*="sm:flex-row"]')
    ).toBeInTheDocument();
  });

  it('applies dark mode classes', () => {
    const { container } = render(<Home />);

    // Check for dark mode classes
    const darkElements = container.querySelectorAll('[class*="dark:"]');
    expect(darkElements.length).toBeGreaterThan(0);
  });

  it('renders with full height', () => {
    const { container } = render(<Home />);

    expect(container.querySelector('[class*="min-h-"]')).toBeInTheDocument();
  });

  it('renders buttons with proper styling', () => {
    render(<Home />);

    const viewProjectsButton = screen.getByText('View Projects');
    expect(viewProjectsButton.closest('a')?.className).toContain('rounded-md');

    const contactButton = screen.getByText('Contact Me');
    expect(contactButton.closest('a')?.className).toContain('rounded-md');
  });

  it('renders with proper spacing', () => {
    const { container } = render(<Home />);

    // Check for margin/padding classes
    const spacedElements = container.querySelectorAll('[class*="mt-"]');
    expect(spacedElements.length).toBeGreaterThan(0);
  });

  it('renders with max-width container', () => {
    const { container } = render(<Home />);

    expect(container.querySelector('.container')).toBeInTheDocument();
  });

  it('renders SVG icons for social buttons', () => {
    const { container } = render(<Home />);

    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThan(0);
  });

  it('mentions AI and full stack products', () => {
    render(<Home />);

    expect(screen.getByText(/AI and full stack products/i)).toBeInTheDocument();
  });

  it('mentions key achievements', () => {
    render(<Home />);

    expect(screen.getByText(/RAG response times/i)).toBeInTheDocument();
    expect(screen.getByText(/microservice platforms/i)).toBeInTheDocument();
  });

  it('renders call to action buttons', () => {
    render(<Home />);

    const viewProjectsButton = screen.getByText('View Projects');
    expect(viewProjectsButton.closest('a')).toHaveAttribute(
      'href',
      '/projects'
    );

    const contactButton = screen.getByText('Contact Me');
    expect(contactButton.closest('a')).toHaveAttribute('href', '/contact');
  });

  it('has transition effects', () => {
    const { container } = render(<Home />);

    const transitionElements = container.querySelectorAll(
      '[class*="transition"]'
    );
    expect(transitionElements.length).toBeGreaterThan(0);
  });

  it('renders with overflow hidden', () => {
    const { container } = render(<Home />);

    expect(container.querySelector('.overflow-hidden')).toBeInTheDocument();
  });

  it('renders buttons in flex layout', () => {
    const { container } = render(<Home />);

    const flexContainers = container.querySelectorAll('.flex');
    expect(flexContainers.length).toBeGreaterThan(0);
  });

  it('renders social buttons with aria labels', () => {
    render(<Home />);

    expect(screen.getByLabelText(/view github profile/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/view linkedin profile/i)).toBeInTheDocument();
  });
});
