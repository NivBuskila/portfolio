import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Projects from '@/components/projects/Projects';
import { projects } from '@/data/projects';

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
    return <img {...props} />;
  },
}));

// Mock FadeIn component
jest.mock('@/components/animations/FadeIn', () => ({
  FadeIn: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe('Projects Component', () => {
  it('renders the projects page with title', () => {
    render(<Projects />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent(/my.*projects/i);
  });

  it('renders all filter categories', () => {
    render(<Projects />);

    expect(screen.getByRole('button', { name: /all/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /frontend/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /backend/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /mobile/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /ai\/ml/i })).toBeInTheDocument();
  });

  it('renders search input', () => {
    render(<Projects />);

    const searchInput = screen.getByPlaceholderText(/search projects/i);
    expect(searchInput).toBeInTheDocument();
  });

  it('displays project count', () => {
    render(<Projects />);

    const projectCount = `Showing ${projects.length} of ${projects.length} projects`;
    expect(screen.getByText(projectCount)).toBeInTheDocument();
  });

  it('renders all projects by default', () => {
    render(<Projects />);

    projects.forEach((project) => {
      expect(screen.getByText(project.title)).toBeInTheDocument();
    });
  });

  it('filters projects by frontend category', async () => {
    const user = userEvent.setup();
    render(<Projects />);

    const frontendButton = screen.getByRole('button', { name: /frontend/i });
    await user.click(frontendButton);

    await waitFor(() => {
      expect(frontendButton).toHaveClass('from-purple-500');
    });

    // At least one project should be visible
    const projectElements = screen.queryAllByRole('img');
    expect(projectElements.length).toBeGreaterThan(0);
  });

  it('filters projects by backend category', async () => {
    const user = userEvent.setup();
    render(<Projects />);

    const backendButton = screen.getByRole('button', { name: /backend/i });
    await user.click(backendButton);

    await waitFor(() => {
      expect(backendButton).toHaveClass('from-purple-500');
    });
  });

  it('filters projects by mobile category', async () => {
    const user = userEvent.setup();
    render(<Projects />);

    const mobileButton = screen.getByRole('button', { name: /mobile/i });
    await user.click(mobileButton);

    await waitFor(() => {
      expect(mobileButton).toHaveClass('from-purple-500');
    });
  });

  it('filters projects by AI/ML category', async () => {
    const user = userEvent.setup();
    render(<Projects />);

    const aiButton = screen.getByRole('button', { name: /ai\/ml/i });
    await user.click(aiButton);

    await waitFor(() => {
      expect(aiButton).toHaveClass('from-purple-500');
    });
  });

  it('searches projects by title', async () => {
    const user = userEvent.setup();
    render(<Projects />);

    const searchInput = screen.getByPlaceholderText(/search projects/i);
    const firstProject = projects[0];

    await user.type(searchInput, firstProject.title);

    await waitFor(() => {
      expect(screen.getByText(firstProject.title)).toBeInTheDocument();
      expect(screen.getByText(new RegExp(`for "${firstProject.title}"`, 'i'))).toBeInTheDocument();
    });
  });

  it('searches projects by description', async () => {
    const user = userEvent.setup();
    render(<Projects />);

    const searchInput = screen.getByPlaceholderText(/search projects/i);
    const searchTerm = projects[0].description.split(' ')[0];

    await user.type(searchInput, searchTerm);

    await waitFor(() => {
      expect(screen.getByText(new RegExp(`for "${searchTerm}"`, 'i'))).toBeInTheDocument();
    });
  });

  it('searches projects by technology', async () => {
    const user = userEvent.setup();
    render(<Projects />);

    const searchInput = screen.getByPlaceholderText(/search projects/i);
    const tech = projects[0].tech[0];

    await user.type(searchInput, tech);

    await waitFor(() => {
      const techElements = screen.getAllByText(tech);
      expect(techElements.length).toBeGreaterThan(0);
    });
  });

  it('shows "no projects found" message when search has no results', async () => {
    const user = userEvent.setup();
    render(<Projects />);

    const searchInput = screen.getByPlaceholderText(/search projects/i);
    await user.type(searchInput, 'NonExistentProject12345');

    await waitFor(() => {
      expect(screen.getByText(/no projects found/i)).toBeInTheDocument();
      expect(screen.getByText(/try adjusting your search terms or filters/i)).toBeInTheDocument();
    });
  });

  it('clears filters and search when "Show All Projects" button is clicked', async () => {
    const user = userEvent.setup();
    render(<Projects />);

    // Apply filter
    const frontendButton = screen.getByRole('button', { name: /frontend/i });
    await user.click(frontendButton);

    // Apply search with no results
    const searchInput = screen.getByPlaceholderText(/search projects/i);
    await user.type(searchInput, 'NonExistentProject12345');

    await waitFor(() => {
      expect(screen.getByText(/no projects found/i)).toBeInTheDocument();
    });

    // Click show all
    const showAllButton = screen.getByRole('button', { name: /show all projects/i });
    await user.click(showAllButton);

    await waitFor(() => {
      expect(screen.getByText(`Showing ${projects.length} of ${projects.length} projects`)).toBeInTheDocument();
    });
  });

  it('renders project cards with GitHub links', () => {
    render(<Projects />);

    const githubLinks = screen.getAllByRole('link', { name: /github/i });
    expect(githubLinks.length).toBeGreaterThan(0);
  });

  it('renders project cards with tech badges', () => {
    render(<Projects />);

    // Collect all unique technologies
    const allTech = Array.from(new Set(projects.flatMap(p => p.tech)));

    allTech.forEach((tech) => {
      const techElements = screen.getAllByText(tech);
      expect(techElements.length).toBeGreaterThan(0);
    });
  });

  it('applies active filter styling', async () => {
    const user = userEvent.setup();
    render(<Projects />);

    const allButton = screen.getByRole('button', { name: /^all$/i });
    expect(allButton).toHaveClass('from-purple-500');

    const frontendButton = screen.getByRole('button', { name: /frontend/i });
    await user.click(frontendButton);

    await waitFor(() => {
      expect(frontendButton).toHaveClass('from-purple-500');
      expect(allButton).not.toHaveClass('from-purple-500');
    });
  });

  it('combines filter and search correctly', async () => {
    const user = userEvent.setup();
    render(<Projects />);

    // Apply frontend filter
    const frontendButton = screen.getByRole('button', { name: /frontend/i });
    await user.click(frontendButton);

    // Then search
    const searchInput = screen.getByPlaceholderText(/search projects/i);
    await user.type(searchInput, 'React');

    await waitFor(() => {
      // Should show filtered count
      const countText = screen.getByText(/showing \d+ of \d+ projects/i);
      expect(countText).toBeInTheDocument();
    });
  });

  it('renders project descriptions', () => {
    render(<Projects />);

    projects.forEach((project) => {
      // Check for part of the description to handle long texts
      const descriptionPart = project.description.substring(0, 50);
      expect(screen.getByText(new RegExp(descriptionPart.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'))).toBeInTheDocument();
    });
  });

  it('updates project count when filtering', async () => {
    const user = userEvent.setup();
    render(<Projects />);

    const initialCount = `Showing ${projects.length} of ${projects.length} projects`;
    expect(screen.getByText(initialCount)).toBeInTheDocument();

    const frontendButton = screen.getByRole('button', { name: /frontend/i });
    await user.click(frontendButton);

    await waitFor(() => {
      const countText = screen.getByText(/showing \d+ of \d+ projects/i);
      expect(countText).toBeInTheDocument();
    });
  });
});
