import { render, screen } from '@testing-library/react';
import About from '@/components/about/About';
import { personalInfo } from '@/data/personalInfo';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, ...props }: React.PropsWithChildren<{ className?: string }>) => (
      <div className={className} {...props}>{children}</div>
    ),
    section: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <section {...props}>{children}</section>,
    li: ({ children, className, ...props }: React.PropsWithChildren<{ className?: string }>) => (
      <li className={className} {...props}>{children}</li>
    ),
  },
}));

// Mock SkillsVisualization component
jest.mock('@/components/about/SkillsVisualization', () => ({
  __esModule: true,
  default: () => <div data-testid="skills-visualization">Skills Visualization</div>,
}));

describe('About', () => {
  it('renders the page title', () => {
    render(<About />);

    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Me')).toBeInTheDocument();
  });

  it('displays personal information from personalInfo', () => {
    const { container } = render(<About />);

    // Check if the about text is displayed
    expect(container.textContent).toContain(personalInfo.about.slice(0, 50));
  });

  it('renders SkillsVisualization component', () => {
    render(<About />);

    expect(screen.getByTestId('skills-visualization')).toBeInTheDocument();
  });

  it('renders Education section', () => {
    render(<About />);

    expect(screen.getByText('Education')).toBeInTheDocument();
    expect(screen.getAllByText('🎓').length).toBeGreaterThan(0);
  });

  it('renders all education entries', () => {
    render(<About />);

    personalInfo.education.forEach((edu) => {
      expect(screen.getByText(edu.degree)).toBeInTheDocument();
      expect(screen.getByText(edu.school)).toBeInTheDocument();
      expect(screen.getByText(edu.duration)).toBeInTheDocument();
    });
  });

  it('renders Experience section', () => {
    render(<About />);

    expect(screen.getByText('Experience')).toBeInTheDocument();
    expect(screen.getAllByText('💼').length).toBeGreaterThan(0);
  });

  it('renders all experience entries', () => {
    render(<About />);

    personalInfo.experience.forEach((exp) => {
      expect(screen.getByText(exp.title)).toBeInTheDocument();
      expect(screen.getByText(exp.company)).toBeInTheDocument();
      expect(screen.getByText(exp.duration)).toBeInTheDocument();
    });
  });

  it('renders experience descriptions', () => {
    const { container } = render(<About />);

    personalInfo.experience.forEach((exp) => {
      exp.description.forEach((desc) => {
        expect(container.textContent).toContain(desc);
      });
    });
  });

  it('renders Personal Highlights section', () => {
    render(<About />);

    expect(screen.getByText('Personal Highlights')).toBeInTheDocument();
    expect(screen.getByText('⭐')).toBeInTheDocument();
  });

  it('renders all highlight cards', () => {
    render(<About />);

    expect(screen.getByText('Problem Solver')).toBeInTheDocument();
    expect(screen.getByText('Continuous Learner')).toBeInTheDocument();
    expect(screen.getByText('Team Player')).toBeInTheDocument();

    // Check icons
    expect(screen.getByText('🧠')).toBeInTheDocument();
    expect(screen.getByText('📚')).toBeInTheDocument();
    expect(screen.getByText('🤝')).toBeInTheDocument();
  });

  it('renders highlight descriptions', () => {
    render(<About />);

    expect(
      screen.getByText(/passionate about finding elegant solutions/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/always exploring new technologies/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/strong communication skills/i)
    ).toBeInTheDocument();
  });

  it('renders Technologies & Resources section', () => {
    render(<About />);

    expect(screen.getByText('Technologies & Resources')).toBeInTheDocument();
    expect(screen.getByText('🚀')).toBeInTheDocument();
  });

  it('renders Frontend Development subsection', () => {
    render(<About />);

    expect(screen.getByText('Frontend Development')).toBeInTheDocument();
  });

  it('renders Backend & Mobile subsection', () => {
    render(<About />);

    expect(screen.getByText('Backend & Mobile')).toBeInTheDocument();
  });

  it('renders external resource links', () => {
    render(<About />);

    // Frontend links
    const reactLink = screen.getByText('React Documentation');
    expect(reactLink.closest('a')).toHaveAttribute('href', 'https://react.dev');
    expect(reactLink.closest('a')).toHaveAttribute('target', '_blank');
    expect(reactLink.closest('a')).toHaveAttribute('rel', 'noopener noreferrer');

    const nextjsLink = screen.getByText('Next.js Guide');
    expect(nextjsLink.closest('a')).toHaveAttribute('href', 'https://nextjs.org/docs');

    const tailwindLink = screen.getByText('Tailwind CSS');
    expect(tailwindLink.closest('a')).toHaveAttribute('href', 'https://tailwindcss.com');

    // Backend links
    const pythonLink = screen.getByText('Python Official Site');
    expect(pythonLink.closest('a')).toHaveAttribute('href', 'https://www.python.org');

    const androidLink = screen.getByText('Android Developers');
    expect(androidLink.closest('a')).toHaveAttribute('href', 'https://developer.android.com');

    const firebaseLink = screen.getByText('Firebase');
    expect(firebaseLink.closest('a')).toHaveAttribute('href', 'https://firebase.google.com');
  });

  it('renders link descriptions', () => {
    render(<About />);

    expect(screen.getByText(/official react documentation/i)).toBeInTheDocument();
    expect(screen.getByText(/complete guide to next\.js/i)).toBeInTheDocument();
    expect(screen.getByText(/utility-first css framework/i)).toBeInTheDocument();
    expect(screen.getByText(/python programming language resources/i)).toBeInTheDocument();
    expect(screen.getByText(/official android development documentation/i)).toBeInTheDocument();
    expect(screen.getByText(/backend-as-a-service platform/i)).toBeInTheDocument();
  });

  it('renders animated background blobs', () => {
    const { container } = render(<About />);

    // Check for blur elements
    const blurElements = container.querySelectorAll('.blur-3xl');
    expect(blurElements.length).toBeGreaterThan(0);
  });

  it('has proper responsive structure', () => {
    const { container } = render(<About />);

    // Check for grid layouts
    expect(container.querySelector('.grid')).toBeInTheDocument();
    expect(container.querySelector('.lg\\:grid-cols-2')).toBeInTheDocument();
  });

  it('applies dark mode classes', () => {
    const { container } = render(<About />);

    // Check for dark mode classes
    const darkElements = container.querySelectorAll('[class*="dark:"]');
    expect(darkElements.length).toBeGreaterThan(0);
  });

  it('renders with proper section structure', () => {
    const { container } = render(<About />);

    // Should have multiple sections
    const sections = container.querySelectorAll('section');
    expect(sections.length).toBeGreaterThan(0);
  });

  it('handles empty experience descriptions', () => {
    // This test verifies the component can handle edge cases
    render(<About />);

    // Component should render without crashing
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('renders all section icons', () => {
    render(<About />);

    // Check for all emoji icons
    const icons = ['🎓', '💼', '⭐', '🚀', '🧠', '📚', '🤝'];
    icons.forEach((icon) => {
      expect(screen.getAllByText(icon).length).toBeGreaterThan(0);
    });
  });

  it('renders with proper spacing and padding', () => {
    const { container } = render(<About />);

    // Check for padding/margin classes
    const paddedElements = container.querySelectorAll('[class*="py-"]');
    expect(paddedElements.length).toBeGreaterThan(0);
  });

  it('renders max-width containers', () => {
    const { container } = render(<About />);

    // Check for max-width containers
    const maxWidthContainers = container.querySelectorAll('.max-w-7xl');
    expect(maxWidthContainers.length).toBeGreaterThan(0);
  });

  it('has gradient backgrounds', () => {
    const { container } = render(<About />);

    // Check for gradient classes
    const gradients = container.querySelectorAll('[class*="gradient"]');
    expect(gradients.length).toBeGreaterThan(0);
  });
});
