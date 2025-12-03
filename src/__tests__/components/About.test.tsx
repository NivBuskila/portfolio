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
  });

  it('renders all highlight cards', () => {
    render(<About />);

    expect(screen.getByText('Problem Solver')).toBeInTheDocument();
    expect(screen.getByText('Continuous Learner')).toBeInTheDocument();
    expect(screen.getByText('Team Player')).toBeInTheDocument();
  });

  it('renders Technologies & Resources section', () => {
    render(<About />);

    expect(screen.getByText('Technologies & Resources')).toBeInTheDocument();
  });

  it('renders Frontend Development subsection', () => {
    render(<About />);

    expect(screen.getByText('Frontend Development')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Next.js')).toBeInTheDocument();
    expect(screen.getByText('Tailwind CSS')).toBeInTheDocument();
  });

  it('renders Backend & Mobile subsection', () => {
    render(<About />);

    expect(screen.getByText('Backend & Mobile')).toBeInTheDocument();
    expect(screen.getByText('Python')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
  });

  it('renders animated background blobs', () => {
    const { container } = render(<About />);
    // Check for blur elements using the specific class used in the component
    // The class is blur-[100px]
    const blurElements = container.querySelectorAll('.blur-\\[100px\\]');
    expect(blurElements.length).toBeGreaterThan(0);
  });

  it('has proper responsive structure', () => {
    const { container } = render(<About />);
    // Check for grid classes
    const gridElements = container.querySelectorAll('.grid');
    expect(gridElements.length).toBeGreaterThan(0);
  });
});
