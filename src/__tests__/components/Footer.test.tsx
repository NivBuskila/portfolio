import { render, screen, fireEvent } from '@testing-library/react';
import Footer from '@/components/layout/Footer';
import { personalInfo } from '@/data/personalInfo';

// Mock next/link
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, ...props }: React.PropsWithChildren<{ href: string }>) => {
    return <a href={href} {...props}>{children}</a>;
  },
}));

describe('Footer', () => {
  beforeEach(() => {
    // Mock scrollTo
    window.scrollTo = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the footer', () => {
    render(<Footer />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('displays personal name', () => {
    render(<Footer />);
    expect(screen.getByText(personalInfo.name)).toBeInTheDocument();
  });

  it('displays description text', () => {
    render(<Footer />);
    expect(
      screen.getByText(/passionate full-stack developer creating innovative solutions/i)
    ).toBeInTheDocument();
  });

  it('renders all navigation links', () => {
    render(<Footer />);

    const navigationLinks = ['Home', 'About', 'Projects', 'Contact'];
    navigationLinks.forEach(linkText => {
      const links = screen.getAllByText(linkText);
      // Should have at least one link (might have multiple in navbar too)
      expect(links.length).toBeGreaterThan(0);
    });
  });

  it('renders navigation links with correct hrefs', () => {
    render(<Footer />);

    const navigation = [
      { name: 'Home', href: '/' },
      { name: 'About', href: '/about' },
      { name: 'Projects', href: '/projects' },
      { name: 'Contact', href: '/contact' },
    ];

    navigation.forEach(({ name, href }) => {
      const links = screen.getAllByText(name);
      const footerLink = links.find(link => link.closest('a')?.getAttribute('href') === href);
      expect(footerLink).toBeDefined();
    });
  });

  it('renders social media links', () => {
    render(<Footer />);

    expect(screen.getByText('GitHub')).toBeInTheDocument();
    expect(screen.getByText('LinkedIn')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('renders GitHub link with correct href', () => {
    render(<Footer />);

    const githubLink = screen.getByText('GitHub').closest('a');
    expect(githubLink).toHaveAttribute('href', personalInfo.socialLinks.github);
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders LinkedIn link with correct href', () => {
    render(<Footer />);

    const linkedinLink = screen.getByText('LinkedIn').closest('a');
    expect(linkedinLink).toHaveAttribute('href', personalInfo.socialLinks.linkedin);
    expect(linkedinLink).toHaveAttribute('target', '_blank');
    expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders Email link with correct mailto href', () => {
    render(<Footer />);

    const emailLink = screen.getByText('Email').closest('a');
    expect(emailLink).toHaveAttribute('href', `mailto:${personalInfo.email}`);
    expect(emailLink).toHaveAttribute('target', '_blank');
    expect(emailLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('displays obfuscated email address', () => {
    const { container } = render(<Footer />);

    // The email is displayed with HTML entities and appears in the page content
    expect(container.textContent).toContain('nivbuskila');
    expect(container.textContent).toContain('icloud');
    expect(container.textContent).toContain('com');
  });

  it('displays copyright with current year', () => {
    const { container } = render(<Footer />);

    const currentYear = new Date().getFullYear();
    // Year might be part of a span, not standalone text
    expect(container.textContent).toContain(currentYear.toString());
  });

  it('displays "Made with ❤️ and Next.js" message', () => {
    const { container } = render(<Footer />);

    expect(container.textContent).toMatch(/made with/i);
    expect(container.textContent).toMatch(/next\.js/i);
  });

  it('renders "Back to Top" button', () => {
    render(<Footer />);

    const backToTopButton = screen.getByRole('button', { name: /back to top/i });
    expect(backToTopButton).toBeInTheDocument();
  });

  it('scrolls to top when "Back to Top" button is clicked', () => {
    render(<Footer />);

    const backToTopButton = screen.getByRole('button', { name: /back to top/i });
    fireEvent.click(backToTopButton);

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });
  });

  it('renders Connect section header', () => {
    render(<Footer />);

    expect(screen.getByText('Connect')).toBeInTheDocument();
  });

  it('renders Navigation section header', () => {
    render(<Footer />);

    expect(screen.getByText('Navigation')).toBeInTheDocument();
  });

  it('does not display phone number when it is empty', () => {
    render(<Footer />);

    // personalInfo.phone is empty string
    if (!personalInfo.phone) {
      // Phone link should not be rendered
      const phoneLinks = screen.queryAllByText(/^\+?\d/);
      expect(phoneLinks.length).toBe(0);
    }
  });

  it('renders with correct styling classes', () => {
    const { container } = render(<Footer />);

    const footer = container.querySelector('footer');
    expect(footer).toHaveClass('bg-gray-50', 'dark:bg-gray-900');
  });

  it('renders social icons', () => {
    const { container } = render(<Footer />);

    // Check for SVG icons (GitHub, LinkedIn, Email)
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThan(5); // Multiple SVGs including social icons
  });

  it('renders developer emoji', () => {
    render(<Footer />);

    expect(screen.getByText('👨‍💻')).toBeInTheDocument();
  });
});
