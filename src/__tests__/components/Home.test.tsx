import { render, screen, fireEvent } from '@testing-library/react';
import Home from '@/components/home/Home';
import { personalInfo } from '@/data/personalInfo';

// Mock next/link
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, ...props }: React.PropsWithChildren<{ href: string }>) => {
    return <a href={href} {...props}>{children}</a>;
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
    div: ({ children, className, ...props }: React.PropsWithChildren<{ className?: string }>) => (
      <div className={className} {...props}>{children}</div>
    ),
  },
}));

describe('Home', () => {
  it('renders the main heading with name', () => {
    const { container } = render(<Home />);

    expect(container.textContent).toContain("Hi, I'm");
    expect(container.textContent).toContain(personalInfo.name);
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

  it('displays additional description text', () => {
    render(<Home />);

    expect(
      screen.getByText(/computer science graduate from afeka/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/currently working at amazon/i)
    ).toBeInTheDocument();
  });

  it('mentions key technologies', () => {
    const { container } = render(<Home />);

    expect(container.textContent).toMatch(/react/i);
    expect(container.textContent).toMatch(/next\.js/i);
    expect(container.textContent).toMatch(/typescript/i);
    expect(container.textContent).toMatch(/python/i);
    expect(container.textContent).toMatch(/java/i);
  });

  it('renders "View My Work" button', () => {
    render(<Home />);

    const button = screen.getByText('View My Work');
    expect(button).toBeInTheDocument();
    expect(button.closest('a')).toHaveAttribute('href', '/projects');
  });

  it('renders "Contact Me" button', () => {
    render(<Home />);

    const button = screen.getByText('Contact Me');
    expect(button).toBeInTheDocument();
    expect(button.closest('a')).toHaveAttribute('href', '/contact');
  });

  it('renders link to projects page', () => {
    render(<Home />);

    const projectsLink = screen.getByText('portfolio projects');
    expect(projectsLink.closest('a')).toHaveAttribute('href', '/projects');
  });

  it('renders link to about page', () => {
    render(<Home />);

    const aboutLink = screen.getByText('about my experience');
    expect(aboutLink.closest('a')).toHaveAttribute('href', '/about');
  });

  it('renders link to contact page', () => {
    render(<Home />);

    const contactLink = screen.getByText('get in touch');
    expect(contactLink.closest('a')).toHaveAttribute('href', '/contact');
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

  it('opens modal when GitHub button is clicked', () => {
    render(<Home />);

    const githubButton = screen.getByLabelText(/view github profile/i);
    fireEvent.click(githubButton);

    // Modal should be rendered
    expect(screen.getByTestId('social-preview-modal')).toBeInTheDocument();
  });

  it('opens modal when LinkedIn button is clicked', () => {
    render(<Home />);

    const linkedinButton = screen.getByLabelText(/view linkedin profile/i);
    fireEvent.click(linkedinButton);

    // Modal should be rendered
    expect(screen.getByTestId('social-preview-modal')).toBeInTheDocument();
  });

  it('renders animated background blobs', () => {
    const { container } = render(<Home />);

    // Check for blur elements
    const blurElements = container.querySelectorAll('.blur-3xl');
    expect(blurElements.length).toBeGreaterThan(0);
  });

  it('has gradient background', () => {
    const { container } = render(<Home />);

    const gradientBg = container.querySelector('.bg-gradient-to-b');
    expect(gradientBg).toBeInTheDocument();
  });

  it('has proper responsive layout', () => {
    const { container } = render(<Home />);

    // Check for responsive classes
    expect(container.querySelector('.md\\:flex-row')).toBeInTheDocument();
  });

  it('applies dark mode classes', () => {
    const { container } = render(<Home />);

    // Check for dark mode classes
    const darkElements = container.querySelectorAll('[class*="dark:"]');
    expect(darkElements.length).toBeGreaterThan(0);
  });

  it('renders with full height', () => {
    const { container } = render(<Home />);

    expect(container.querySelector('.min-h-screen')).toBeInTheDocument();
  });

  it('renders buttons with proper styling', () => {
    render(<Home />);

    const viewWorkButton = screen.getByText('View My Work');
    expect(viewWorkButton.closest('a')?.className).toContain('rounded-full');
    expect(viewWorkButton.closest('a')?.className).toContain('shadow-lg');

    const contactButton = screen.getByText('Contact Me');
    expect(contactButton.closest('a')?.className).toContain('rounded-full');
  });

  it('renders with gradient text for name', () => {
    const { container } = render(<Home />);

    // Check for gradient text classes
    const gradientText = container.querySelector('.bg-clip-text');
    expect(gradientText).toBeInTheDocument();
  });

  it('renders with proper spacing', () => {
    const { container } = render(<Home />);

    // Check for margin/padding classes
    const spacedElements = container.querySelectorAll('[class*="mt-"]');
    expect(spacedElements.length).toBeGreaterThan(0);
  });

  it('renders with max-width container', () => {
    const { container } = render(<Home />);

    expect(container.querySelector('.max-w-7xl')).toBeInTheDocument();
  });

  it('renders SVG icons for social buttons', () => {
    const { container } = render(<Home />);

    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThan(0);
  });

  it('mentions Android apps', () => {
    render(<Home />);

    expect(screen.getByText(/android apps/i)).toBeInTheDocument();
  });

  it('mentions AI tools', () => {
    render(<Home />);

    expect(screen.getByText(/ai tools/i)).toBeInTheDocument();
  });

  it('mentions full-stack web applications', () => {
    render(<Home />);

    expect(screen.getByText(/full-stack web applications/i)).toBeInTheDocument();
  });

  it('mentions RESTful APIs', () => {
    render(<Home />);

    expect(screen.getByText(/restful apis/i)).toBeInTheDocument();
  });

  it('mentions cloud platforms', () => {
    render(<Home />);

    expect(screen.getByText(/aws/i)).toBeInTheDocument();
    expect(screen.getByText(/vercel/i)).toBeInTheDocument();
  });

  it('mentions collaboration opportunities', () => {
    render(<Home />);

    expect(screen.getByText(/collaboration opportunities/i)).toBeInTheDocument();
  });

  it('mentions internships', () => {
    render(<Home />);

    expect(screen.getByText(/internships/i)).toBeInTheDocument();
  });

  it('has hover effects on buttons', () => {
    render(<Home />);

    const viewWorkButton = screen.getByText('View My Work');
    expect(viewWorkButton.closest('a')?.className).toContain('hover:scale-105');

    const contactButton = screen.getByText('Contact Me');
    expect(contactButton.closest('a')?.className).toContain('hover:scale-105');
  });

  it('has transition effects', () => {
    const { container } = render(<Home />);

    const transitionElements = container.querySelectorAll('[class*="transition"]');
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
