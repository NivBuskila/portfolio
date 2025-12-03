import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Projects from '@/components/projects/Projects';
import { projects } from '@/data/projects';

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

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({
      children,
      ...props
    }: React.PropsWithChildren<Record<string, unknown>>) => (
      <div {...props}>{children}</div>
    ),
    button: ({
      children,
      onClick,
      ...props
    }: React.PropsWithChildren<{ onClick?: () => void }>) => (
      <button onClick={onClick} {...props}>
        {children}
      </button>
    ),
    a: ({
      children,
      href,
      ...props
    }: React.PropsWithChildren<{ href?: string }>) => (
      <a href={href} {...props}>
        {children}
      </a>
    ),
  },
  AnimatePresence: ({ children }: React.PropsWithChildren) => <>{children}</>,
}));

// Mock FadeIn component
jest.mock('@/components/animations/FadeIn', () => ({
  FadeIn: ({ children }: React.PropsWithChildren) => <div>{children}</div>,
}));

describe('Projects', () => {
  it('renders the projects page with title and description', () => {
    render(<Projects />);

    expect(screen.getByText('My Projects')).toBeInTheDocument();
    expect(
      screen.getByText(/Showcasing my journey through code/i)
    ).toBeInTheDocument();
  });

  it('renders search input', () => {
    render(<Projects />);

    const searchInput = screen.getByPlaceholderText(/search projects/i);
    expect(searchInput).toBeInTheDocument();
  });

  it('renders all filter categories', () => {
    render(<Projects />);

    expect(screen.getByRole('button', { name: /^all$/i })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /frontend/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /backend/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /mobile/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /ai\/ml/i })).toBeInTheDocument();
  });

  it('displays all projects by default', () => {
    render(<Projects />);

    // Verify all projects are rendered
    projects.forEach((project) => {
      expect(screen.getByText(project.title)).toBeInTheDocument();
    });
  });

  it('filters projects by Frontend category', async () => {
    const user = userEvent.setup();
    render(<Projects />);

    const frontendButton = screen.getByRole('button', { name: /frontend/i });
    await user.click(frontendButton);

    await waitFor(() => {
      // Frontend projects should contain React, Next.js, TypeScript, etc.
      const frontendProjects = projects.filter((p) =>
        p.tech.some((tech) =>
          [
            'React',
            'Next.js',
            'TypeScript',
            'Tailwind CSS',
            'JavaScript',
          ].includes(tech)
        )
      );

      // Verify frontend projects are shown
      frontendProjects.forEach((project) => {
        expect(screen.getByText(project.title)).toBeInTheDocument();
      });
    });
  });

  it('filters projects by Backend category', async () => {
    const user = userEvent.setup();
    render(<Projects />);

    const backendButton = screen.getByRole('button', { name: /backend/i });
    await user.click(backendButton);

    await waitFor(() => {
      const backendProjects = projects.filter((p) =>
        p.tech.some((tech) =>
          [
            'Node.js',
            'Flask',
            'FastAPI',
            'Python',
            'MongoDB',
            'Firebase',
            'AWS Rekognition',
            'Supabase',
            'Express.js',
          ].includes(tech)
        )
      );

      backendProjects.forEach((project) => {
        expect(screen.getByText(project.title)).toBeInTheDocument();
      });
    });
  });

  it('filters projects by Mobile category', async () => {
    const user = userEvent.setup();
    render(<Projects />);

    const mobileButton = screen.getByRole('button', { name: /mobile/i });
    await user.click(mobileButton);

    await waitFor(() => {
      const mobileProjects = projects.filter((p) =>
        p.tech.some((tech) =>
          ['Java', 'Android SDK', 'ML Kit', 'CameraX', 'Retrofit'].includes(
            tech
          )
        )
      );

      mobileProjects.forEach((project) => {
        expect(screen.getByText(project.title)).toBeInTheDocument();
      });
    });
  });

  it('filters projects by AI/ML category', async () => {
    const user = userEvent.setup();
    render(<Projects />);

    const aiButton = screen.getByRole('button', { name: /ai\/ml/i });
    await user.click(aiButton);

    await waitFor(() => {
      const aiProjects = projects.filter(
        (p) =>
          p.tech.some((tech) =>
            [
              'AWS Rekognition',
              'ML Kit',
              'AI',
              'LangChain',
              'Gemini API',
              'RAG',
            ].includes(tech)
          ) ||
          p.title.toLowerCase().includes('ai') ||
          p.title.toLowerCase().includes('chatbot')
      );

      aiProjects.forEach((project) => {
        expect(screen.getByText(project.title)).toBeInTheDocument();
      });
    });
  });

  it('searches projects by title', async () => {
    const user = userEvent.setup();
    render(<Projects />);

    const searchInput = screen.getByPlaceholderText(/search projects/i);
    await user.type(searchInput, 'ChatBot');

    await waitFor(() => {
      expect(screen.getByText('Afeka ChatBot')).toBeInTheDocument();
    });
  });

  it('searches projects by description', async () => {
    const user = userEvent.setup();
    render(<Projects />);

    const searchInput = screen.getByPlaceholderText(/search projects/i);
    await user.type(searchInput, 'facial recognition');

    await waitFor(() => {
      // Should find Face Recognition API project
      expect(screen.getByText('Face Recognition API')).toBeInTheDocument();
    });
  });

  it('searches projects by technology', async () => {
    const user = userEvent.setup();
    render(<Projects />);

    const searchInput = screen.getByPlaceholderText(/search projects/i);
    await user.type(searchInput, 'Firebase');

    await waitFor(() => {
      expect(screen.getByText('TinyReminder')).toBeInTheDocument();
    });
  });

  it('shows "No projects found" when search has no results', async () => {
    const user = userEvent.setup();
    render(<Projects />);

    const searchInput = screen.getByPlaceholderText(/search projects/i);
    await user.type(searchInput, 'NonExistentProject12345');

    await waitFor(() => {
      expect(screen.getByText(/no projects found/i)).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /clear filters/i })
      ).toBeInTheDocument();
    });
  });

  it('shows "No projects found" when filter has no results', async () => {
    const user = userEvent.setup();
    render(<Projects />);

    // Apply a filter
    await user.click(screen.getByRole('button', { name: /frontend/i }));

    // Then search for something that doesn't match
    const searchInput = screen.getByPlaceholderText(/search projects/i);
    await user.type(searchInput, 'Universal Space');

    await waitFor(() => {
      expect(screen.getByText(/no projects found/i)).toBeInTheDocument();
    });
  });

  it('resets filters when "Clear filters" button is clicked', async () => {
    const user = userEvent.setup();
    render(<Projects />);

    // Apply a filter and search
    await user.click(screen.getByRole('button', { name: /frontend/i }));
    const searchInput = screen.getByPlaceholderText(/search projects/i);
    await user.type(searchInput, 'xyz');

    await waitFor(() => {
      expect(screen.getByText(/no projects found/i)).toBeInTheDocument();
    });

    // Click "Clear filters"
    const clearButton = screen.getByRole('button', { name: /clear filters/i });
    await user.click(clearButton);

    await waitFor(() => {
      // Should show all projects again
      projects.forEach((project) => {
        expect(screen.getByText(project.title)).toBeInTheDocument();
      });
      expect(searchInput).toHaveValue('');
    });
  });

  it('applies both filter and search together', async () => {
    const user = userEvent.setup();
    render(<Projects />);

    // Filter by Backend
    await user.click(screen.getByRole('button', { name: /backend/i }));

    // Search for "API"
    const searchInput = screen.getByPlaceholderText(/search projects/i);
    await user.type(searchInput, 'API');

    await waitFor(() => {
      // Should find Face Recognition API (backend + contains "API")
      expect(screen.getByText('Face Recognition API')).toBeInTheDocument();
    });
  });

  it('highlights active filter button', async () => {
    const user = userEvent.setup();
    render(<Projects />);

    const frontendButton = screen.getByRole('button', { name: /frontend/i });
    const allButton = screen.getByRole('button', { name: /^all$/i });

    // Initially "All" should be active
    expect(allButton.className).toContain('bg-primary');

    // Click Frontend
    await user.click(frontendButton);

    await waitFor(() => {
      expect(frontendButton.className).toContain('bg-primary');
    });
  });

  it('renders project cards with correct information', () => {
    render(<Projects />);

    const firstProject = projects[0];
    // Just check if the title is there, detailed card testing should be in ProjectCard.test.tsx
    expect(screen.getByText(firstProject.title)).toBeInTheDocument();
  });

  it('renders Live Demo links for projects with demo URLs', () => {
    render(<Projects />);

    // Find projects with demo URLs
    const projectsWithDemo = projects.filter((p) => p.demo);

    // Check that live demo links exist for projects with demo URLs
    if (projectsWithDemo.length > 0) {
      const liveDemoLinks = screen.getAllByText('Live Demo');
      expect(liveDemoLinks.length).toBeGreaterThan(0);
    }
  });

  it('handles special TinyReminder demo link', () => {
    render(<Projects />);

    // TinyReminder has a special internal demo link
    const tinyReminderTitle = screen.getByText('TinyReminder');
    expect(tinyReminderTitle).toBeInTheDocument();

    // Should have a Live Demo link that goes to /tinyreminder-demo
    const liveDemoLinks = screen.getAllByText('Live Demo');
    const tinyReminderDemo = liveDemoLinks.find(
      (link) => link.closest('a')?.getAttribute('href') === '/tinyreminder-demo'
    );
    expect(tinyReminderDemo).toBeDefined();
  });

  it('case-insensitive search', async () => {
    const user = userEvent.setup();
    render(<Projects />);

    const searchInput = screen.getByPlaceholderText(/search projects/i);
    await user.type(searchInput, 'CHATBOT');

    await waitFor(() => {
      expect(screen.getByText('Afeka ChatBot')).toBeInTheDocument();
    });
  });
});
