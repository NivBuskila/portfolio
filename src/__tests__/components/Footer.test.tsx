import { render, screen, fireEvent } from '@testing-library/react';
import Footer from '@/components/layout/Footer';
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
    // NB logo is present, but maybe not the full name in text except in copyright
    expect(screen.getByText('NB')).toBeInTheDocument();
  });

  it('displays description text', () => {
    render(<Footer />);
    expect(
      screen.getByText(/building digital experiences with modern technologies/i)
    ).toBeInTheDocument();
  });

  it('renders all navigation links', () => {
    render(<Footer />);

    const navigationLinks = ['Home', 'About', 'Projects', 'Contact'];
    navigationLinks.forEach((linkText) => {
      const links = screen.getAllByText(linkText);
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
      const footerLink = links.find(
        (link) => link.closest('a')?.getAttribute('href') === href
      );
      expect(footerLink).toBeDefined();
    });
  });

  it('renders social media links', () => {
    render(<Footer />);
    // The text is hidden with sr-only, so we should look for that or use getByRole with name
    expect(screen.getByText('GitHub')).toBeInTheDocument();
    expect(screen.getByText('LinkedIn')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('renders GitHub link with correct href', () => {
    render(<Footer />);
    const githubLink = screen.getByText('GitHub').closest('a');
    expect(githubLink).toHaveAttribute('href', personalInfo.socialLinks.github);
  });

  it('renders LinkedIn link with correct href', () => {
    render(<Footer />);
    const linkedinLink = screen.getByText('LinkedIn').closest('a');
    expect(linkedinLink).toHaveAttribute(
      'href',
      personalInfo.socialLinks.linkedin
    );
  });

  it('renders Email link with correct mailto href', () => {
    render(<Footer />);
    const emailLink = screen.getByText('Email').closest('a');
    expect(emailLink).toHaveAttribute('href', `mailto:${personalInfo.email}`);
  });

  it('displays copyright with current year', () => {
    const { container } = render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(container.textContent).toContain(currentYear.toString());
    expect(container.textContent).toContain(personalInfo.name);
  });

  it('renders "Scroll to top" button', () => {
    render(<Footer />);
    const backToTopButton = screen.getByRole('button', {
      name: /scroll to top/i,
    });
    expect(backToTopButton).toBeInTheDocument();
  });

  it('scrolls to top when "Scroll to top" button is clicked', () => {
    render(<Footer />);
    const backToTopButton = screen.getByRole('button', {
      name: /scroll to top/i,
    });
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

  it('renders with correct styling classes', () => {
    const { container } = render(<Footer />);
    const footer = container.querySelector('footer');
    expect(footer).toHaveClass('bg-background', 'border-t');
  });

  it('renders social icons', () => {
    const { container } = render(<Footer />);
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThanOrEqual(3);
  });
});
