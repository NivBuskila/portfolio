import { render, screen } from '@testing-library/react';
import ProjectCard from '@/components/projects/ProjectCard';

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({
    src,
    alt,
    ...props
  }: {
    src: string;
    alt: string;
    fill?: boolean;
  }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} {...props} />;
  },
}));

describe('ProjectCard', () => {
  const mockProject = {
    title: 'Test Project',
    description: 'This is a test project description',
    tech: ['React', 'TypeScript', 'Jest'],
    image: '/images/test.jpg',
    github: 'https://github.com/test/project',
  };

  it('renders project title', () => {
    render(<ProjectCard {...mockProject} />);
    expect(screen.getByText('Test Project')).toBeInTheDocument();
  });

  it('renders project description', () => {
    render(<ProjectCard {...mockProject} />);
    expect(
      screen.getByText('This is a test project description')
    ).toBeInTheDocument();
  });

  it('renders all technology tags', () => {
    render(<ProjectCard {...mockProject} />);

    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Jest')).toBeInTheDocument();
  });

  it('renders project thumbnail with correct alt text', () => {
    render(<ProjectCard {...mockProject} />);

    const image = screen.getByAltText('Test Project thumbnail');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/images/test.jpg');
  });

  it('renders GitHub link with correct href', () => {
    render(<ProjectCard {...mockProject} />);

    const githubLink = screen.getByRole('link', { name: /github/i });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute(
      'href',
      'https://github.com/test/project'
    );
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders Live Demo link when demo prop is provided', () => {
    const projectWithDemo = {
      ...mockProject,
      demo: 'https://example.com/demo',
    };

    render(<ProjectCard {...projectWithDemo} />);

    const demoLink = screen.getByRole('link', { name: /live demo/i });
    expect(demoLink).toBeInTheDocument();
    expect(demoLink).toHaveAttribute('href', 'https://example.com/demo');
    expect(demoLink).toHaveAttribute('target', '_blank');
    expect(demoLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('does not render Live Demo link when demo prop is not provided', () => {
    render(<ProjectCard {...mockProject} />);

    const demoLink = screen.queryByRole('link', { name: /live demo/i });
    expect(demoLink).not.toBeInTheDocument();
  });

  it('applies correct CSS classes for styling', () => {
    const { container } = render(<ProjectCard {...mockProject} />);

    const card = container.firstChild;
    expect(card).toHaveClass(
      'flex',
      'flex-col',
      'overflow-hidden',
      'hover:shadow-lg'
    );
  });

  it('renders technology tags with correct styling', () => {
    render(<ProjectCard {...mockProject} />);

    const techTag = screen.getByText('React');
    expect(techTag).toHaveClass(
      'inline-flex',
      'items-center',
      'rounded-full',
      'px-2.5',
      'py-0.5',
      'text-xs',
      'font-semibold'
    );
  });

  it('handles multiple technology tags correctly', () => {
    const projectWithManyTech = {
      ...mockProject,
      tech: ['React', 'TypeScript', 'Jest', 'Node.js', 'MongoDB', 'Express'],
    };

    render(<ProjectCard {...projectWithManyTech} />);

    projectWithManyTech.tech.forEach((tech) => {
      expect(screen.getByText(tech)).toBeInTheDocument();
    });
  });

  it('renders buttons in correct layout', () => {
    const projectWithDemo = {
      ...mockProject,
      demo: 'https://example.com/demo',
    };

    render(<ProjectCard {...projectWithDemo} />);

    const githubLink = screen.getByRole('link', { name: /github/i });
    const demoLink = screen.getByRole('link', { name: /live demo/i });

    expect(githubLink).toBeInTheDocument();
    expect(demoLink).toBeInTheDocument();

    // Both should be in the same container
    const container = githubLink.closest('div');
    expect(container).toContainElement(demoLink);
  });

  it('renders with empty tech array', () => {
    const projectWithNoTech = {
      ...mockProject,
      tech: [],
    };

    render(<ProjectCard {...projectWithNoTech} />);

    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(
      screen.getByText('This is a test project description')
    ).toBeInTheDocument();
  });

  it('handles long project descriptions', () => {
    const projectWithLongDescription = {
      ...mockProject,
      description:
        'This is a very long project description that contains a lot of information about the project, including its features, technologies used, and the problems it solves. It should be displayed properly in the card without breaking the layout.',
    };

    render(<ProjectCard {...projectWithLongDescription} />);

    expect(
      screen.getByText(projectWithLongDescription.description)
    ).toBeInTheDocument();
  });

  it('handles long project titles', () => {
    const projectWithLongTitle = {
      ...mockProject,
      title: 'Very Long Project Title That Might Overflow',
    };

    render(<ProjectCard {...projectWithLongTitle} />);

    expect(
      screen.getByText('Very Long Project Title That Might Overflow')
    ).toBeInTheDocument();
  });

  it('handles special characters in project information', () => {
    const projectWithSpecialChars = {
      ...mockProject,
      title: 'Project with "Quotes" & Special <Characters>',
      description: 'Description with special chars: @#$%^&*()',
    };

    render(<ProjectCard {...projectWithSpecialChars} />);

    expect(
      screen.getByText('Project with "Quotes" & Special <Characters>')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Description with special chars: @#$%^&*()')
    ).toBeInTheDocument();
  });
});
