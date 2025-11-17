import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SocialPreviewModal from '@/components/home/SocialPreviewModal';

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} {...props} />;
  },
}));

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, onClick, className, ...props }: any) => (
      <div onClick={onClick} className={className} {...props}>{children}</div>
    ),
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock fetch
global.fetch = jest.fn();

describe('SocialPreviewModal', () => {
  const mockGitHubData = {
    public_repos: 25,
    followers: 50,
    following: 30,
    bio: 'Full Stack Developer',
    avatar_url: 'https://example.com/avatar.jpg',
    name: 'Niv Buskila',
    login: 'NivBuskila',
    html_url: 'https://github.com/NivBuskila',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => mockGitHubData,
      headers: new Headers(),
    });
  });

  describe('Modal Visibility', () => {
    it('does not render when isOpen is false', () => {
      const { container } = render(
        <SocialPreviewModal
          isOpen={false}
          onClose={jest.fn()}
          type="github"
          username="NivBuskila"
        />
      );

      expect(container.firstChild).toBeNull();
    });

    it('renders when isOpen is true', () => {
      render(
        <SocialPreviewModal
          isOpen={true}
          onClose={jest.fn()}
          type="github"
          username="NivBuskila"
        />
      );

      expect(screen.getByText('GitHub Profile')).toBeInTheDocument();
    });
  });

  describe('GitHub Mode', () => {
    it('shows loading spinner initially', () => {
      render(
        <SocialPreviewModal
          isOpen={true}
          onClose={jest.fn()}
          type="github"
          username="NivBuskila"
        />
      );

      const spinner = document.querySelector('.animate-spin');
      expect(spinner).toBeInTheDocument();
    });

    it('fetches and displays GitHub data', async () => {
      render(
        <SocialPreviewModal
          isOpen={true}
          onClose={jest.fn()}
          type="github"
          username="NivBuskila"
        />
      );

      await waitFor(() => {
        expect(screen.getByText('Niv Buskila')).toBeInTheDocument();
        expect(screen.getByText('@NivBuskila')).toBeInTheDocument();
        expect(screen.getByText('Full Stack Developer')).toBeInTheDocument();
      });

      expect(fetch).toHaveBeenCalledWith('https://api.github.com/users/NivBuskila');
    });

    it('displays GitHub stats', async () => {
      render(
        <SocialPreviewModal
          isOpen={true}
          onClose={jest.fn()}
          type="github"
          username="NivBuskila"
        />
      );

      await waitFor(() => {
        expect(screen.getByText('25')).toBeInTheDocument();
        expect(screen.getByText('50')).toBeInTheDocument();
        expect(screen.getByText('30')).toBeInTheDocument();
      });

      expect(screen.getByText('Repositories')).toBeInTheDocument();
      expect(screen.getByText('Followers')).toBeInTheDocument();
      expect(screen.getByText('Following')).toBeInTheDocument();
    });

    it('displays GitHub avatar', async () => {
      render(
        <SocialPreviewModal
          isOpen={true}
          onClose={jest.fn()}
          type="github"
          username="NivBuskila"
        />
      );

      await waitFor(() => {
        const avatar = screen.getByAltText('Niv Buskila');
        expect(avatar).toBeInTheDocument();
        expect(avatar).toHaveAttribute('src', mockGitHubData.avatar_url);
      });
    });

    it('renders View Full Profile button with correct link', async () => {
      render(
        <SocialPreviewModal
          isOpen={true}
          onClose={jest.fn()}
          type="github"
          username="NivBuskila"
        />
      );

      await waitFor(() => {
        const profileLink = screen.getByText(/view full profile/i);
        expect(profileLink.closest('a')).toHaveAttribute('href', mockGitHubData.html_url);
        expect(profileLink.closest('a')).toHaveAttribute('target', '_blank');
        expect(profileLink.closest('a')).toHaveAttribute('rel', 'noopener noreferrer');
      });
    });

    it('uses cached data when available and fresh', async () => {
      const cachedData = {
        data: mockGitHubData,
        timestamp: Date.now(),
      };
      localStorage.setItem('github_NivBuskila', JSON.stringify(cachedData));

      render(
        <SocialPreviewModal
          isOpen={true}
          onClose={jest.fn()}
          type="github"
          username="NivBuskila"
        />
      );

      await waitFor(() => {
        expect(screen.getByText('Niv Buskila')).toBeInTheDocument();
      });

      // Should not fetch if cache is fresh
      expect(fetch).not.toHaveBeenCalled();
    });

    it('fetches new data when cache is stale', async () => {
      const staleData = {
        data: mockGitHubData,
        timestamp: Date.now() - (6 * 60 * 1000), // 6 minutes ago (stale)
      };
      localStorage.setItem('github_NivBuskila', JSON.stringify(staleData));

      render(
        <SocialPreviewModal
          isOpen={true}
          onClose={jest.fn()}
          type="github"
          username="NivBuskila"
        />
      );

      await waitFor(() => {
        expect(fetch).toHaveBeenCalled();
      });
    });

    it('handles corrupted cache gracefully', async () => {
      localStorage.setItem('github_NivBuskila', 'invalid json');

      render(
        <SocialPreviewModal
          isOpen={true}
          onClose={jest.fn()}
          type="github"
          username="NivBuskila"
        />
      );

      await waitFor(() => {
        expect(fetch).toHaveBeenCalled();
      });

      // Cache should be ignored and fetch should be called
      // After successful fetch, valid data is written back
      const cachedData = localStorage.getItem('github_NivBuskila');
      expect(cachedData).not.toBe('invalid json');
    });

    it('handles rate limit error', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 403,
        headers: new Headers({
          'X-RateLimit-Reset': '1700000000',
        }),
      });

      render(
        <SocialPreviewModal
          isOpen={true}
          onClose={jest.fn()}
          type="github"
          username="NivBuskila"
        />
      );

      await waitFor(() => {
        expect(screen.getByText(/rate limit reached/i)).toBeInTheDocument();
        expect(screen.getByText('⚠️')).toBeInTheDocument();
      });
    });

    it('handles fetch error', async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      render(
        <SocialPreviewModal
          isOpen={true}
          onClose={jest.fn()}
          type="github"
          username="NivBuskila"
        />
      );

      await waitFor(() => {
        expect(screen.getByText(/failed to load github profile/i)).toBeInTheDocument();
        expect(screen.getByText('⚠️')).toBeInTheDocument();
      });
    });

    it('has retry button on error', async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      render(
        <SocialPreviewModal
          isOpen={true}
          onClose={jest.fn()}
          type="github"
          username="NivBuskila"
        />
      );

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
      });

      // Mock successful response for retry
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockGitHubData,
        headers: new Headers(),
      });

      const retryButton = screen.getByRole('button', { name: /try again/i });
      fireEvent.click(retryButton);

      await waitFor(() => {
        expect(screen.getByText('Niv Buskila')).toBeInTheDocument();
      });
    });

    it('does not display bio if not available', async () => {
      const dataWithoutBio = { ...mockGitHubData, bio: '' };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => dataWithoutBio,
        headers: new Headers(),
      });

      render(
        <SocialPreviewModal
          isOpen={true}
          onClose={jest.fn()}
          type="github"
          username="NivBuskila"
        />
      );

      await waitFor(() => {
        expect(screen.getByText('Niv Buskila')).toBeInTheDocument();
      });

      // Bio should not be displayed
      expect(screen.queryByText('Full Stack Developer')).not.toBeInTheDocument();
    });
  });

  describe('LinkedIn Mode', () => {
    it('displays LinkedIn profile information', () => {
      render(
        <SocialPreviewModal
          isOpen={true}
          onClose={jest.fn()}
          type="linkedin"
          username="NivBuskila"
        />
      );

      expect(screen.getByText('LinkedIn Profile')).toBeInTheDocument();
      expect(screen.getByText('Niv Buskila')).toBeInTheDocument();
      expect(screen.getByText('Full Stack Developer')).toBeInTheDocument();
      expect(screen.getByText('NB')).toBeInTheDocument();
    });

    it('displays education info', () => {
      render(
        <SocialPreviewModal
          isOpen={true}
          onClose={jest.fn()}
          type="linkedin"
          username="NivBuskila"
        />
      );

      expect(screen.getByText(/computer science graduate/i)).toBeInTheDocument();
      expect(screen.getByText(/afeka college/i)).toBeInTheDocument();
    });

    it('displays location info', () => {
      render(
        <SocialPreviewModal
          isOpen={true}
          onClose={jest.fn()}
          type="linkedin"
          username="NivBuskila"
        />
      );

      expect(screen.getByText(/tel aviv, israel/i)).toBeInTheDocument();
    });

    it('displays top skills', () => {
      render(
        <SocialPreviewModal
          isOpen={true}
          onClose={jest.fn()}
          type="linkedin"
          username="NivBuskila"
        />
      );

      expect(screen.getByText('Top Skills')).toBeInTheDocument();
      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('Next.js')).toBeInTheDocument();
      expect(screen.getByText('TypeScript')).toBeInTheDocument();
      expect(screen.getByText('Python')).toBeInTheDocument();
      expect(screen.getByText('Java')).toBeInTheDocument();
      expect(screen.getByText('Node.js')).toBeInTheDocument();
      expect(screen.getByText('AWS')).toBeInTheDocument();
    });

    it('renders Connect on LinkedIn button with correct link', () => {
      render(
        <SocialPreviewModal
          isOpen={true}
          onClose={jest.fn()}
          type="linkedin"
          username="NivBuskila"
        />
      );

      const linkedinLink = screen.getByText(/connect on linkedin/i);
      expect(linkedinLink.closest('a')).toHaveAttribute('href', 'https://www.linkedin.com/in/nivbuskila/');
      expect(linkedinLink.closest('a')).toHaveAttribute('target', '_blank');
      expect(linkedinLink.closest('a')).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('does not fetch data for LinkedIn', () => {
      render(
        <SocialPreviewModal
          isOpen={true}
          onClose={jest.fn()}
          type="linkedin"
          username="NivBuskila"
        />
      );

      expect(fetch).not.toHaveBeenCalled();
    });
  });

  describe('Modal Interactions', () => {
    it('calls onClose when backdrop is clicked', () => {
      const onClose = jest.fn();
      const { container } = render(
        <SocialPreviewModal
          isOpen={true}
          onClose={onClose}
          type="linkedin"
          username="NivBuskila"
        />
      );

      const backdrop = container.querySelector('.fixed.inset-0.bg-black\\/50');
      if (backdrop) {
        fireEvent.click(backdrop);
        expect(onClose).toHaveBeenCalled();
      }
    });

    it('calls onClose when close button is clicked', () => {
      const onClose = jest.fn();
      render(
        <SocialPreviewModal
          isOpen={true}
          onClose={onClose}
          type="linkedin"
          username="NivBuskila"
        />
      );

      const closeButtons = screen.getAllByText('Close');
      fireEvent.click(closeButtons[0]);

      expect(onClose).toHaveBeenCalled();
    });

    it('calls onClose when X button is clicked', () => {
      const onClose = jest.fn();
      const { container } = render(
        <SocialPreviewModal
          isOpen={true}
          onClose={onClose}
          type="linkedin"
          username="NivBuskila"
        />
      );

      const xButton = container.querySelector('button svg[viewBox="0 0 24 24"]')?.closest('button');
      if (xButton) {
        fireEvent.click(xButton);
        expect(onClose).toHaveBeenCalled();
      }
    });

    it('does not close when clicking inside modal', () => {
      const onClose = jest.fn();
      render(
        <SocialPreviewModal
          isOpen={true}
          onClose={onClose}
          type="linkedin"
          username="NivBuskila"
        />
      );

      const modalContent = screen.getByText('LinkedIn Profile').closest('div');
      if (modalContent) {
        fireEvent.click(modalContent);
        expect(onClose).not.toHaveBeenCalled();
      }
    });
  });

  describe('Styling and UI', () => {
    it('has backdrop blur effect', () => {
      const { container } = render(
        <SocialPreviewModal
          isOpen={true}
          onClose={jest.fn()}
          type="linkedin"
          username="NivBuskila"
        />
      );

      expect(container.querySelector('.backdrop-blur-sm')).toBeInTheDocument();
    });

    it('has rounded corners on modal', () => {
      const { container } = render(
        <SocialPreviewModal
          isOpen={true}
          onClose={jest.fn()}
          type="linkedin"
          username="NivBuskila"
        />
      );

      expect(container.querySelector('.rounded-3xl')).toBeInTheDocument();
    });

    it('applies dark mode classes', () => {
      const { container } = render(
        <SocialPreviewModal
          isOpen={true}
          onClose={jest.fn()}
          type="linkedin"
          username="NivBuskila"
        />
      );

      const darkElements = container.querySelectorAll('[class*="dark:"]');
      expect(darkElements.length).toBeGreaterThan(0);
    });

    it('has gradient backgrounds for stats', async () => {
      render(
        <SocialPreviewModal
          isOpen={true}
          onClose={jest.fn()}
          type="github"
          username="NivBuskila"
        />
      );

      await waitFor(() => {
        expect(screen.getByText('Repositories')).toBeInTheDocument();
      });

      const { container } = render(
        <SocialPreviewModal
          isOpen={true}
          onClose={jest.fn()}
          type="github"
          username="NivBuskila"
        />
      );

      await waitFor(() => {
        const gradients = container.querySelectorAll('.bg-gradient-to-br');
        expect(gradients.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Caching', () => {
    it('saves data to localStorage after successful fetch', async () => {
      render(
        <SocialPreviewModal
          isOpen={true}
          onClose={jest.fn()}
          type="github"
          username="NivBuskila"
        />
      );

      await waitFor(() => {
        expect(screen.getByText('Niv Buskila')).toBeInTheDocument();
      });

      const cached = localStorage.getItem('github_NivBuskila');
      expect(cached).not.toBeNull();

      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        expect(data.name).toBe('Niv Buskila');
        expect(timestamp).toBeDefined();
      }
    });

    it('handles localStorage quota exceeded gracefully', async () => {
      const originalSetItem = Storage.prototype.setItem;
      Storage.prototype.setItem = jest.fn(() => {
        throw new Error('QuotaExceededError');
      });

      render(
        <SocialPreviewModal
          isOpen={true}
          onClose={jest.fn()}
          type="github"
          username="NivBuskila"
        />
      );

      await waitFor(() => {
        expect(screen.getByText('Niv Buskila')).toBeInTheDocument();
      });

      // Should still display data even if caching fails
      expect(screen.getByText('@NivBuskila')).toBeInTheDocument();

      Storage.prototype.setItem = originalSetItem;
    });
  });
});
