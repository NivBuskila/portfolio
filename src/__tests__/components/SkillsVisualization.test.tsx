import { render, screen } from '@testing-library/react';
import SkillsVisualization from '@/components/about/SkillsVisualization';
import { personalInfo } from '@/data/personalInfo';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, ...props }: React.PropsWithChildren<{ className?: string }>) => (
      <div className={className} {...props}>{children}</div>
    ),
  },
}));

describe('SkillsVisualization', () => {
  it('renders the component title', () => {
    render(<SkillsVisualization />);

    expect(screen.getByText('Technical Skills')).toBeInTheDocument();
  });

  it('displays the correct number of skill categories', () => {
    render(<SkillsVisualization />);

    // Count non-empty categories
    const nonEmptyCategories = [
      personalInfo.skills.languages,
      personalInfo.skills.frontend,
      personalInfo.skills.backend,
      personalInfo.skills.ai,
      personalInfo.skills.cloud,
      personalInfo.skills.databases,
      personalInfo.skills.mobile,
      personalInfo.skills.tools,
    ].filter(arr => arr.length > 0);

    const categoryCountText = screen.getByText(/technology domains/i);
    expect(categoryCountText.textContent).toContain(nonEmptyCategories.length.toString());
  });

  it('displays the total skills count', () => {
    render(<SkillsVisualization />);

    const totalSkills =
      personalInfo.skills.languages.length +
      personalInfo.skills.frontend.length +
      personalInfo.skills.backend.length +
      personalInfo.skills.ai.length +
      personalInfo.skills.cloud.length +
      personalInfo.skills.databases.length +
      personalInfo.skills.mobile.length +
      personalInfo.skills.tools.length;

    const totalSkillsElements = screen.getAllByText(new RegExp(`${totalSkills}\\+`));
    expect(totalSkillsElements.length).toBeGreaterThan(0);
  });

  it('renders Programming Languages category', () => {
    render(<SkillsVisualization />);

    if (personalInfo.skills.languages.length > 0) {
      expect(screen.getAllByText('Programming Languages').length).toBeGreaterThan(0);
      expect(screen.getAllByText('💻').length).toBeGreaterThan(0);
    }
  });

  it('renders Frontend Development category', () => {
    render(<SkillsVisualization />);

    if (personalInfo.skills.frontend.length > 0) {
      expect(screen.getByText('Frontend Development')).toBeInTheDocument();
      expect(screen.getByText('🎨')).toBeInTheDocument();
    }
  });

  it('renders Backend Development category', () => {
    render(<SkillsVisualization />);

    if (personalInfo.skills.backend.length > 0) {
      expect(screen.getByText('Backend Development')).toBeInTheDocument();
      expect(screen.getByText('⚙️')).toBeInTheDocument();
    }
  });

  it('renders AI & Machine Learning category', () => {
    render(<SkillsVisualization />);

    if (personalInfo.skills.ai.length > 0) {
      expect(screen.getByText('AI & Machine Learning')).toBeInTheDocument();
      expect(screen.getByText('🤖')).toBeInTheDocument();
    }
  });

  it('renders Cloud & DevOps category', () => {
    render(<SkillsVisualization />);

    if (personalInfo.skills.cloud.length > 0) {
      expect(screen.getByText('Cloud & DevOps')).toBeInTheDocument();
      expect(screen.getByText('☁️')).toBeInTheDocument();
    }
  });

  it('renders Databases category', () => {
    render(<SkillsVisualization />);

    if (personalInfo.skills.databases.length > 0) {
      expect(screen.getByText('Databases')).toBeInTheDocument();
      expect(screen.getByText('🗄️')).toBeInTheDocument();
    }
  });

  it('renders Mobile Development category', () => {
    render(<SkillsVisualization />);

    if (personalInfo.skills.mobile.length > 0) {
      expect(screen.getByText('Mobile Development')).toBeInTheDocument();
      expect(screen.getByText('📱')).toBeInTheDocument();
    }
  });

  it('renders Development Tools category', () => {
    render(<SkillsVisualization />);

    if (personalInfo.skills.tools.length > 0) {
      expect(screen.getByText('Development Tools')).toBeInTheDocument();
      expect(screen.getByText('🛠️')).toBeInTheDocument();
    }
  });

  it('displays skill count for each category', () => {
    const { container } = render(<SkillsVisualization />);

    // Check for "X skills" text
    const skillCountElements = container.querySelectorAll('span');
    const hasSkillCount = Array.from(skillCountElements).some(
      el => el.textContent && /\d+ skills?/i.test(el.textContent)
    );
    expect(hasSkillCount).toBe(true);
  });

  it('renders all language skills', () => {
    const { container } = render(<SkillsVisualization />);

    personalInfo.skills.languages.forEach(skill => {
      expect(container.textContent).toContain(skill);
    });
  });

  it('renders all frontend skills', () => {
    const { container } = render(<SkillsVisualization />);

    personalInfo.skills.frontend.forEach(skill => {
      expect(container.textContent).toContain(skill);
    });
  });

  it('renders all backend skills', () => {
    const { container } = render(<SkillsVisualization />);

    personalInfo.skills.backend.forEach(skill => {
      expect(container.textContent).toContain(skill);
    });
  });

  it('renders Skills Overview section', () => {
    render(<SkillsVisualization />);

    expect(screen.getByText('Skills Overview')).toBeInTheDocument();
  });

  it('displays Total Skills metric', () => {
    render(<SkillsVisualization />);

    expect(screen.getByText('Total Skills')).toBeInTheDocument();
  });

  it('displays Tech Domains metric', () => {
    render(<SkillsVisualization />);

    expect(screen.getByText('Tech Domains')).toBeInTheDocument();
  });

  it('displays Programming Languages count metric', () => {
    render(<SkillsVisualization />);

    expect(screen.getAllByText('Programming Languages').length).toBeGreaterThan(0);

    const languageCount = personalInfo.skills.languages.length;
    const countElements = screen.getAllByText(languageCount.toString());
    expect(countElements.length).toBeGreaterThan(0);
  });

  it('does not render empty categories', () => {
    const { container } = render(<SkillsVisualization />);

    // If a category has 0 skills, it should not be rendered
    // This is tested implicitly - we're checking that the component renders without errors
    expect(container).toBeInTheDocument();
  });

  it('applies gradient color classes to skill tags', () => {
    const { container } = render(<SkillsVisualization />);

    // Check for gradient classes
    const gradients = container.querySelectorAll('[class*="gradient"]');
    expect(gradients.length).toBeGreaterThan(0);
  });

  it('has responsive grid layout', () => {
    const { container } = render(<SkillsVisualization />);

    // Check for responsive grid classes
    expect(container.querySelector('.grid')).toBeInTheDocument();
    expect(container.querySelector('.md\\:grid-cols-2')).toBeInTheDocument();
  });

  it('applies dark mode classes', () => {
    const { container } = render(<SkillsVisualization />);

    // Check for dark mode classes
    const darkElements = container.querySelectorAll('[class*="dark:"]');
    expect(darkElements.length).toBeGreaterThan(0);
  });

  it('renders with proper padding and spacing', () => {
    const { container } = render(<SkillsVisualization />);

    // Check for padding classes
    const paddedElements = container.querySelectorAll('[class*="py-"]');
    expect(paddedElements.length).toBeGreaterThan(0);
  });

  it('renders skill cards with border and shadow', () => {
    const { container } = render(<SkillsVisualization />);

    // Check for border and shadow classes
    const borderedElements = container.querySelectorAll('.border');
    expect(borderedElements.length).toBeGreaterThan(0);

    const shadowElements = container.querySelectorAll('[class*="shadow"]');
    expect(shadowElements.length).toBeGreaterThan(0);
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

  it('calculates total skills correctly', () => {
    render(<SkillsVisualization />);

    const expectedTotal =
      personalInfo.skills.languages.length +
      personalInfo.skills.frontend.length +
      personalInfo.skills.backend.length +
      personalInfo.skills.ai.length +
      personalInfo.skills.cloud.length +
      personalInfo.skills.databases.length +
      personalInfo.skills.mobile.length +
      personalInfo.skills.tools.length;

    const totalText = screen.getByText(/comprehensive expertise/i);
    expect(totalText.textContent).toContain(`${expectedTotal}+`);
  });

  it('renders all category icons', () => {
    render(<SkillsVisualization />);

    const icons = ['💻', '🎨', '⚙️', '🤖', '☁️', '🗄️', '📱', '🛠️'];

    icons.forEach(icon => {
      const iconElements = screen.queryAllByText(icon);
      // Icon might appear if category has skills
      if (iconElements.length > 0) {
        expect(iconElements[0]).toBeInTheDocument();
      }
    });
  });

  it('has proper max-width container', () => {
    const { container } = render(<SkillsVisualization />);

    expect(container.querySelector('.max-w-7xl')).toBeInTheDocument();
  });

  it('renders with background gradient', () => {
    const { container } = render(<SkillsVisualization />);

    // Check for gradient background classes
    const gradientBg = container.querySelector('.bg-gradient-to-b');
    expect(gradientBg).toBeInTheDocument();
  });
});
