import React from 'react';
import { render, screen } from '@testing-library/react';
import ProjectCard from '@/components/projects/ProjectCard';

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
    return <img {...props} />;
  },
}));

describe('ProjectCard Component', () => {
  const mockProject = {
    title: 'Test Project',
    description: 'This is a test project description',
    tech: ['React', 'TypeScript', 'Next.js'],
    thumbnail: '/images/test-project.png',
    github: 'https://github.com/test/project',
  };

  it('renders project title', () => {
    render(<ProjectCard {...mockProject} />);

    expect(screen.getByText('Test Project')).toBeInTheDocument();
  });

  it('renders project description', () => {
    render(<ProjectCard {...mockProject} />);

    expect(screen.getByText('This is a test project description')).toBeInTheDocument();
  });

  it('renders all technology tags', () => {
    render(<ProjectCard {...mockProject} />);

    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Next.js')).toBeInTheDocument();
  });

  it('renders project thumbnail with correct alt text', () => {
    render(<ProjectCard {...mockProject} />);

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('alt', 'Test Project thumbnail');
    expect(image).toHaveAttribute('src', '/images/test-project.png');
  });

  it('renders GitHub link', () => {
    render(<ProjectCard {...mockProject} />);

    const githubLink = screen.getByRole('link', { name: /github/i });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', 'https://github.com/test/project');
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders demo link when demo prop is provided', () => {
    const projectWithDemo = {
      ...mockProject,
      demo: 'https://demo.example.com',
    };

    render(<ProjectCard {...projectWithDemo} />);

    const demoLink = screen.getByRole('link', { name: /live demo/i });
    expect(demoLink).toBeInTheDocument();
    expect(demoLink).toHaveAttribute('href', 'https://demo.example.com');
    expect(demoLink).toHaveAttribute('target', '_blank');
    expect(demoLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('does not render demo link when demo prop is not provided', () => {
    render(<ProjectCard {...mockProject} />);

    const demoLink = screen.queryByRole('link', { name: /live demo/i });
    expect(demoLink).not.toBeInTheDocument();
  });

  it('renders with correct card structure', () => {
    const { container } = render(<ProjectCard {...mockProject} />);

    const card = container.querySelector('.flex.flex-col');
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass('rounded-lg', 'shadow-lg', 'bg-white');
  });

  it('renders multiple tech tags with correct styling', () => {
    render(<ProjectCard {...mockProject} />);

    const techTags = screen.getAllByText(/React|TypeScript|Next.js/);
    expect(techTags).toHaveLength(3);

    techTags.forEach(tag => {
      expect(tag).toHaveClass('bg-blue-100', 'text-blue-800');
    });
  });

  it('renders image container with correct height', () => {
    const { container } = render(<ProjectCard {...mockProject} />);

    const imageContainer = container.querySelector('.relative.h-48');
    expect(imageContainer).toBeInTheDocument();
  });

  it('renders with empty tech array', () => {
    const projectWithoutTech = {
      ...mockProject,
      tech: [],
    };

    render(<ProjectCard {...projectWithoutTech} />);

    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.queryByText('React')).not.toBeInTheDocument();
  });

  it('renders project links in correct container', () => {
    const projectWithDemo = {
      ...mockProject,
      demo: 'https://demo.example.com',
    };

    const { container } = render(<ProjectCard {...projectWithDemo} />);

    const linksContainer = container.querySelector('.mt-6.flex.gap-4');
    expect(linksContainer).toBeInTheDocument();
    expect(linksContainer?.children).toHaveLength(2); // GitHub + Demo
  });

  it('applies correct classes to GitHub button', () => {
    render(<ProjectCard {...mockProject} />);

    const githubLink = screen.getByRole('link', { name: /github/i });
    expect(githubLink).toHaveClass('bg-blue-600', 'hover:bg-blue-700', 'text-white');
  });

  it('applies correct classes to demo button when provided', () => {
    const projectWithDemo = {
      ...mockProject,
      demo: 'https://demo.example.com',
    };

    render(<ProjectCard {...projectWithDemo} />);

    const demoLink = screen.getByRole('link', { name: /live demo/i });
    expect(demoLink).toHaveClass('bg-white', 'hover:bg-gray-50', 'text-gray-700');
  });

  it('handles long project titles', () => {
    const projectWithLongTitle = {
      ...mockProject,
      title: 'This is a very long project title that might overflow',
    };

    render(<ProjectCard {...projectWithLongTitle} />);

    expect(screen.getByText('This is a very long project title that might overflow')).toBeInTheDocument();
  });

  it('handles long descriptions', () => {
    const projectWithLongDescription = {
      ...mockProject,
      description: 'This is a very long description that contains a lot of text and details about the project implementation and features'.repeat(2),
    };

    render(<ProjectCard {...projectWithLongDescription} />);

    expect(screen.getByText(projectWithLongDescription.description)).toBeInTheDocument();
  });

  it('handles many technology tags', () => {
    const projectWithManyTech = {
      ...mockProject,
      tech: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB', 'AWS'],
    };

    render(<ProjectCard {...projectWithManyTech} />);

    projectWithManyTech.tech.forEach(tech => {
      expect(screen.getByText(tech)).toBeInTheDocument();
    });
  });
});
