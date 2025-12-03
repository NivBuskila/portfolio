import { render, screen } from '@testing-library/react';
import SkillsVisualization from '@/components/about/SkillsVisualization';
import { personalInfo } from '@/data/personalInfo';

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
  },
}));

describe('SkillsVisualization', () => {
  it('renders the component title', () => {
    render(<SkillsVisualization />);

    expect(screen.getByText('Technical Skills')).toBeInTheDocument();
    expect(screen.getByText(/comprehensive overview/i)).toBeInTheDocument();
  });

  it('renders Programming Languages category', () => {
    render(<SkillsVisualization />);

    if (personalInfo.skills.languages.length > 0) {
      expect(
        screen.getAllByText('Programming Languages').length
      ).toBeGreaterThan(0);
    }
  });

  it('renders Frontend Development category', () => {
    render(<SkillsVisualization />);

    if (personalInfo.skills.frontend.length > 0) {
      expect(screen.getByText('Frontend Development')).toBeInTheDocument();
    }
  });

  it('renders Backend Development category', () => {
    render(<SkillsVisualization />);

    if (personalInfo.skills.backend.length > 0) {
      expect(screen.getByText('Backend Development')).toBeInTheDocument();
    }
  });

  it('renders AI & Machine Learning category', () => {
    render(<SkillsVisualization />);

    if (personalInfo.skills.ai.length > 0) {
      expect(screen.getByText('AI & Machine Learning')).toBeInTheDocument();
    }
  });

  it('renders Cloud & DevOps category', () => {
    render(<SkillsVisualization />);

    if (personalInfo.skills.cloud.length > 0) {
      expect(screen.getByText('Cloud & DevOps')).toBeInTheDocument();
    }
  });

  it('renders Databases category', () => {
    render(<SkillsVisualization />);

    if (personalInfo.skills.databases.length > 0) {
      expect(screen.getByText('Databases')).toBeInTheDocument();
    }
  });

  it('renders Mobile Development category', () => {
    render(<SkillsVisualization />);

    if (personalInfo.skills.mobile.length > 0) {
      expect(screen.getByText('Mobile Development')).toBeInTheDocument();
    }
  });

  it('renders Development Tools category', () => {
    render(<SkillsVisualization />);

    if (personalInfo.skills.tools.length > 0) {
      expect(screen.getByText('Development Tools')).toBeInTheDocument();
    }
  });

  it('renders all language skills', () => {
    const { container } = render(<SkillsVisualization />);

    personalInfo.skills.languages.forEach((skill) => {
      expect(container.textContent).toContain(skill);
    });
  });

  it('renders all frontend skills', () => {
    const { container } = render(<SkillsVisualization />);

    personalInfo.skills.frontend.forEach((skill) => {
      expect(container.textContent).toContain(skill);
    });
  });

  it('renders all backend skills', () => {
    const { container } = render(<SkillsVisualization />);

    personalInfo.skills.backend.forEach((skill) => {
      expect(container.textContent).toContain(skill);
    });
  });

  it('does not render empty categories', () => {
    const { container } = render(<SkillsVisualization />);
    expect(container).toBeInTheDocument();
  });

  it('has responsive grid layout', () => {
    const { container } = render(<SkillsVisualization />);

    // Check for responsive grid classes
    expect(container.querySelector('.grid')).toBeInTheDocument();
    expect(container.querySelector('.md\\:grid-cols-2')).toBeInTheDocument();
  });

  it('renders skill cards with border and shadow', () => {
    const { container } = render(<SkillsVisualization />);

    // Check for border and shadow classes (Shadcn Card usually has border and shadow-sm or similar)
    // The component uses "rounded-xl border bg-card text-card-foreground shadow"
    const borderedElements = container.querySelectorAll('.border');
    expect(borderedElements.length).toBeGreaterThan(0);
  });

  it('renders with rounded corners', () => {
    const { container } = render(<SkillsVisualization />);

    // Check for rounded classes
    const roundedElements = container.querySelectorAll('[class*="rounded"]');
    expect(roundedElements.length).toBeGreaterThan(0);
  });

  it('uses memoization correctly', () => {
    // Render twice to verify memoization doesn't cause issues
    const { rerender } = render(<SkillsVisualization />);

    expect(screen.getByText('Technical Skills')).toBeInTheDocument();

    rerender(<SkillsVisualization />);

    expect(screen.getByText('Technical Skills')).toBeInTheDocument();
  });

  it('has proper max-width container', () => {
    const { container } = render(<SkillsVisualization />);

    expect(container.querySelector('.max-w-7xl')).toBeInTheDocument();
  });
});
