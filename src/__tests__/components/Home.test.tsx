import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '@/components/home/Home';
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

// Mock dynamic import for SocialPreviewModal
jest.mock('next/dynamic', () => ({
  __esModule: true,
  default: (fn: any) => {
    const MockedComponent = (props: any) => {
      if (!props.isOpen) return null;
      return <div data-testid="social-preview-modal">Modal Content</div>;
    };
    return MockedComponent;
  },
}));

describe('Home Component', () => {
  it('renders the main heading with name', () => {
    render(<Home />);

    expect(screen.getByText(/hi, i'm/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(personalInfo.name, 'i'))).toBeInTheDocument();
    const fullStackElements = screen.getAllByText(/full stack developer/i);
    expect(fullStackElements.length).toBeGreaterThan(0);
  });

  it('renders the title from personal info', () => {
    render(<Home />);

    const titleElement = screen.getByText(new RegExp(personalInfo.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'));
    expect(titleElement).toBeInTheDocument();
  });

  it('renders the about section from personal info', () => {
    render(<Home />);

    expect(screen.getByText(personalInfo.about)).toBeInTheDocument();
  });

  it('renders description about Computer Science background', () => {
    render(<Home />);

    expect(screen.getByText(/computer science graduate from afeka college/i)).toBeInTheDocument();
  });

  it('renders description about working at Amazon', () => {
    render(<Home />);

    expect(screen.getByText(/currently working at amazon/i)).toBeInTheDocument();
  });

  it('renders technologies expertise', () => {
    render(<Home />);

    expect(screen.getByText(/react, next.js, typescript, python, and java/i)).toBeInTheDocument();
  });

  it('renders CTA buttons', () => {
    render(<Home />);

    expect(screen.getByRole('link', { name: /view my work/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /contact me/i })).toBeInTheDocument();
  });

  it('renders View My Work button with correct link', () => {
    render(<Home />);

    const viewWorkButton = screen.getByRole('link', { name: /view my work/i });
    expect(viewWorkButton).toHaveAttribute('href', '/projects');
  });

  it('renders Contact Me button with correct link', () => {
    render(<Home />);

    const contactButton = screen.getByRole('link', { name: /contact me/i });
    expect(contactButton).toHaveAttribute('href', '/contact');
  });

  it('renders link to projects page in text', () => {
    render(<Home />);

    const projectsLinks = screen.getAllByRole('link', { name: /portfolio projects/i });
    expect(projectsLinks.length).toBeGreaterThan(0);
    expect(projectsLinks[0]).toHaveAttribute('href', '/projects');
  });

  it('renders link to about page in text', () => {
    render(<Home />);

    const aboutLinks = screen.getAllByRole('link', { name: /about my experience/i });
    expect(aboutLinks.length).toBeGreaterThan(0);
    expect(aboutLinks[0]).toHaveAttribute('href', '/about');
  });

  it('renders link to contact page in text', () => {
    render(<Home />);

    const contactLinks = screen.getAllByRole('link', { name: /get in touch/i });
    expect(contactLinks.length).toBeGreaterThan(0);
    expect(contactLinks[0]).toHaveAttribute('href', '/contact');
  });

  it('renders GitHub social button', () => {
    render(<Home />);

    const githubButton = screen.getByRole('button', { name: /view github profile/i });
    expect(githubButton).toBeInTheDocument();
  });

  it('renders LinkedIn social button', () => {
    render(<Home />);

    const linkedinButton = screen.getByRole('button', { name: /view linkedin profile/i });
    expect(linkedinButton).toBeInTheDocument();
  });

  it('opens GitHub modal when GitHub button is clicked', async () => {
    const user = userEvent.setup();
    render(<Home />);

    const githubButton = screen.getByRole('button', { name: /view github profile/i });
    await user.click(githubButton);

    await waitFor(() => {
      expect(screen.getByTestId('social-preview-modal')).toBeInTheDocument();
    });
  });

  it('opens LinkedIn modal when LinkedIn button is clicked', async () => {
    const user = userEvent.setup();
    render(<Home />);

    const linkedinButton = screen.getByRole('button', { name: /view linkedin profile/i });
    await user.click(linkedinButton);

    await waitFor(() => {
      expect(screen.getByTestId('social-preview-modal')).toBeInTheDocument();
    });
  });

  it('renders with gradient background', () => {
    const { container } = render(<Home />);

    const mainDiv = container.querySelector('.bg-gradient-to-b');
    expect(mainDiv).toBeInTheDocument();
  });

  it('renders animated background blobs', () => {
    const { container } = render(<Home />);

    const blobs = container.querySelectorAll('.blur-3xl');
    expect(blobs.length).toBeGreaterThan(0);
  });

  it('renders description about responsive user interfaces', () => {
    render(<Home />);

    expect(screen.getByText(/creating responsive user interfaces with react and next.js/i)).toBeInTheDocument();
  });

  it('renders description about RESTful APIs', () => {
    render(<Home />);

    expect(screen.getByText(/building restful apis/i)).toBeInTheDocument();
  });

  it('renders description about cloud platforms', () => {
    render(<Home />);

    expect(screen.getByText(/deploying on cloud platforms like aws and vercel/i)).toBeInTheDocument();
  });

  it('renders description about Android apps', () => {
    render(<Home />);

    expect(screen.getByText(/android apps, ai tools, and full-stack web applications/i)).toBeInTheDocument();
  });

  it('has correct styling for name gradient', () => {
    const { container } = render(<Home />);

    const nameSpan = container.querySelector('.text-transparent.bg-clip-text');
    expect(nameSpan).toBeInTheDocument();
    expect(nameSpan?.textContent).toContain(personalInfo.name);
  });

  it('renders social buttons with hover effects', () => {
    const { container } = render(<Home />);

    const socialButtons = container.querySelectorAll('button[aria-label*="Profile"]');
    expect(socialButtons.length).toBe(2);

    socialButtons.forEach(button => {
      expect(button).toHaveClass('hover:scale-110');
    });
  });

  it('renders CTA buttons with correct styling', () => {
    render(<Home />);

    const viewWorkButton = screen.getByRole('link', { name: /view my work/i });
    expect(viewWorkButton).toHaveClass('bg-gradient-to-r');

    const contactButton = screen.getByRole('link', { name: /contact me/i });
    expect(contactButton).toHaveClass('bg-white');
  });

  it('renders with responsive layout classes', () => {
    const { container } = render(<Home />);

    const mainContainer = container.querySelector('.flex-col.md\\:flex-row');
    expect(mainContainer).toBeInTheDocument();
  });

  it('contains all required links for navigation', () => {
    render(<Home />);

    const allLinks = screen.getAllByRole('link');
    const linkHrefs = allLinks.map(link => link.getAttribute('href'));

    expect(linkHrefs).toContain('/projects');
    expect(linkHrefs).toContain('/about');
    expect(linkHrefs).toContain('/contact');
  });

  it('renders text content with proper styling classes', () => {
    const { container } = render(<Home />);

    const heading = container.querySelector('h1');
    expect(heading).toHaveClass('text-5xl', 'font-extrabold');

    const subheading = container.querySelector('h2');
    expect(subheading).toHaveClass('text-2xl', 'font-medium');
  });

  it('renders with dark mode support classes', () => {
    const { container } = render(<Home />);

    const elementsWithDarkMode = container.querySelectorAll('[class*="dark:"]');
    expect(elementsWithDarkMode.length).toBeGreaterThan(0);
  });
});
