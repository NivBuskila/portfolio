import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Footer from '@/components/layout/Footer';
import { personalInfo } from '@/data/personalInfo';

// Mock Next.js Link component
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe('Footer Component', () => {
  beforeEach(() => {
    // Mock window.scrollTo
    global.scrollTo = jest.fn();
  });

  it('renders the footer', () => {
    render(<Footer />);

    expect(screen.getByText(personalInfo.name)).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Footer />);

    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /projects/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument();
  });

  it('renders navigation links with correct hrefs', () => {
    render(<Footer />);

    expect(screen.getByRole('link', { name: /home/i })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: /about/i })).toHaveAttribute('href', '/about');
    expect(screen.getByRole('link', { name: /projects/i })).toHaveAttribute('href', '/projects');
    expect(screen.getByRole('link', { name: /contact/i })).toHaveAttribute('href', '/contact');
  });

  it('renders social media links', () => {
    render(<Footer />);

    const githubLinks = screen.getAllByRole('link', { name: /github/i });
    const linkedinLinks = screen.getAllByRole('link', { name: /linkedin/i });
    const emailLinks = screen.getAllByRole('link', { name: /email/i });

    expect(githubLinks.length).toBeGreaterThan(0);
    expect(linkedinLinks.length).toBeGreaterThan(0);
    expect(emailLinks.length).toBeGreaterThan(0);
  });

  it('renders GitHub link with correct href', () => {
    render(<Footer />);

    const githubLinks = screen.getAllByRole('link', { name: /github/i });
    const footerGithubLink = githubLinks.find(link =>
      link.getAttribute('href') === personalInfo.socialLinks.github
    );

    expect(footerGithubLink).toHaveAttribute('href', personalInfo.socialLinks.github);
    expect(footerGithubLink).toHaveAttribute('target', '_blank');
    expect(footerGithubLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders LinkedIn link with correct href', () => {
    render(<Footer />);

    const linkedinLinks = screen.getAllByRole('link', { name: /linkedin/i });
    const footerLinkedinLink = linkedinLinks.find(link =>
      link.getAttribute('href') === personalInfo.socialLinks.linkedin
    );

    expect(footerLinkedinLink).toHaveAttribute('href', personalInfo.socialLinks.linkedin);
    expect(footerLinkedinLink).toHaveAttribute('target', '_blank');
    expect(footerLinkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders email link with correct href', () => {
    render(<Footer />);

    const emailLinks = screen.getAllByRole('link', { name: /email/i });
    const footerEmailLink = emailLinks.find(link =>
      link.getAttribute('href')?.includes('mailto:')
    );

    expect(footerEmailLink?.getAttribute('href')).toContain('mailto:');
  });

  it('renders description text', () => {
    render(<Footer />);

    expect(screen.getByText(/passionate full-stack developer/i)).toBeInTheDocument();
  });

  it('renders copyright notice with current year', () => {
    render(<Footer />);

    const currentYear = new Date().getFullYear();
    const yearText = screen.getByText(new RegExp(currentYear.toString()));
    expect(yearText).toBeInTheDocument();
  });

  it('renders "Made with" text', () => {
    render(<Footer />);

    expect(screen.getByText(/made with/i)).toBeInTheDocument();
    expect(screen.getByText(/next.js/i)).toBeInTheDocument();
  });

  it('renders Back to Top button', () => {
    render(<Footer />);

    const backToTopButton = screen.getByRole('button', { name: /back to top/i });
    expect(backToTopButton).toBeInTheDocument();
  });

  it('scrolls to top when Back to Top button is clicked', async () => {
    const user = userEvent.setup();
    render(<Footer />);

    const backToTopButton = screen.getByRole('button', { name: /back to top/i });
    await user.click(backToTopButton);

    expect(global.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });
  });

  it('renders phone number if provided', () => {
    render(<Footer />);

    if (personalInfo.phone) {
      const phoneLinks = screen.getAllByRole('link');
      const phoneLink = phoneLinks.find(link =>
        link.getAttribute('href')?.includes('tel:')
      );
      expect(phoneLink).toBeInTheDocument();
    }
  });

  it('renders obfuscated email address', () => {
    const { container } = render(<Footer />);

    const emailLinks = container.querySelectorAll('a[href*="mailto"]');
    expect(emailLinks.length).toBeGreaterThan(0);
  });

  it('renders Navigation heading', () => {
    render(<Footer />);

    expect(screen.getByText('Navigation')).toBeInTheDocument();
  });

  it('renders Connect heading', () => {
    render(<Footer />);

    expect(screen.getByText('Connect')).toBeInTheDocument();
  });

  it('has correct link structure for navigation', () => {
    render(<Footer />);

    const navigationLinks = [
      { name: 'Home', href: '/' },
      { name: 'About', href: '/about' },
      { name: 'Projects', href: '/projects' },
      { name: 'Contact', href: '/contact' },
    ];

    navigationLinks.forEach(({ name, href }) => {
      const link = screen.getByRole('link', { name: new RegExp(name, 'i') });
      expect(link).toHaveAttribute('href', href);
    });
  });

  it('renders with gradient background', () => {
    const { container } = render(<Footer />);

    const footer = container.querySelector('footer');
    expect(footer).toHaveClass('bg-gray-50', 'dark:bg-gray-900');
  });

  it('renders all social icons', () => {
    const { container } = render(<Footer />);

    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThan(0);
  });
});
