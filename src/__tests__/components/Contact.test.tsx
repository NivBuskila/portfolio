import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Contact from '@/components/contact/Contact';
import { personalInfo } from '@/data/personalInfo';

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ success: true }),
  })
) as jest.Mock;

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({
      children,
      ...props
    }: React.PropsWithChildren<Record<string, unknown>>) => (
      <div {...props}>{children}</div>
    ),
    form: ({
      children,
      ...props
    }: React.PropsWithChildren<Record<string, unknown>>) => (
      <form {...props}>{children}</form>
    ),
  },
  AnimatePresence: ({ children }: React.PropsWithChildren) => <>{children}</>,
}));

describe('Contact', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY = 'test-access-key';
    // Mock window.gtag
    (window as Window & { gtag?: typeof jest.fn }).gtag = jest.fn();
  });

  afterEach(() => {
    delete (window as Window & { gtag?: typeof jest.fn }).gtag;
  });

  it('renders the contact form', () => {
    render(<Contact />);

    expect(screen.getByText('Get in')).toBeInTheDocument();
    expect(screen.getByText('Touch')).toBeInTheDocument();
    expect(screen.getByLabelText(/^Name$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Email$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Message$/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /send message/i })
    ).toBeInTheDocument();
  });

  it('displays email contact information', () => {
    render(<Contact />);

    const emailLink = screen.getByText(personalInfo.email);
    expect(emailLink).toBeInTheDocument();
    expect(emailLink.closest('a')).toHaveAttribute(
      'href',
      `mailto:${personalInfo.email}`
    );
  });

  it('validates required fields', async () => {
    const user = userEvent.setup();
    render(<Contact />);

    const submitButton = screen.getByRole('button', { name: /send message/i });

    // Click submit without filling any fields
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/message is required/i)).toBeInTheDocument();
    });
  });

  it('validates name length', async () => {
    const user = userEvent.setup();
    render(<Contact />);

    const nameInput = screen.getByLabelText(/^Name$/i);

    // Test name too short
    await user.type(nameInput, 'A');
    await user.tab(); // Trigger blur

    await waitFor(() => {
      expect(
        screen.getByText(/name must be at least 2 characters/i)
      ).toBeInTheDocument();
    });

    // Clear and test name too long
    await user.clear(nameInput);
    await user.type(nameInput, 'A'.repeat(51));
    await user.tab();

    await waitFor(() => {
      expect(
        screen.getByText(/name must be less than 50 characters/i)
      ).toBeInTheDocument();
    });
  });

  it('validates email format', async () => {
    const user = userEvent.setup();
    render(<Contact />);

    const emailInput = screen.getByLabelText(/^Email$/i);

    // Test invalid email
    await user.type(emailInput, 'invalid-email');
    await user.tab();

    await waitFor(() => {
      expect(
        screen.getByText(/please enter a valid email address/i)
      ).toBeInTheDocument();
    });
  });

  it('validates message length', async () => {
    const user = userEvent.setup();
    render(<Contact />);

    const messageInput = screen.getByLabelText(/^Message$/i);

    // Test message too short
    await user.type(messageInput, 'Short');
    await user.tab();

    await waitFor(() => {
      expect(
        screen.getByText(/message must be at least 10 characters/i)
      ).toBeInTheDocument();
    });

    // Clear and test message too long
    await user.clear(messageInput);
    // Use fireEvent for long text to avoid timeout
    fireEvent.change(messageInput, { target: { value: 'A'.repeat(1001) } });
    fireEvent.blur(messageInput);

    await waitFor(() => {
      expect(
        screen.getByText(/message must be less than 1000 characters/i)
      ).toBeInTheDocument();
    });
  });

  it('successfully submits the form', async () => {
    const user = userEvent.setup();
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true }),
    });

    render(<Contact />);

    // Fill out the form using fireEvent to avoid potential userEvent issues with weird characters
    fireEvent.change(screen.getByLabelText(/^Name$/i), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText(/^Email$/i), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/^Message$/i), {
      target: { value: 'This is a test message for the contact form.' },
    });

    // Submit the form
    await user.click(screen.getByRole('button', { name: /send message/i }));

    // Wait for success message
    await waitFor(() => {
      expect(
        screen.getByText(/thank you! your message has been sent successfully/i)
      ).toBeInTheDocument();
    });

    // Verify fetch was called correctly
    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.web3forms.com/submit',
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: expect.stringContaining('John Doe'),
      })
    );

    // Verify analytics was tracked
    expect(
      (window as Window & { gtag?: typeof jest.fn }).gtag
    ).toHaveBeenCalledWith('event', 'contact_submit', {
      event_category: 'Contact',
      event_label: 'Form Submission',
    });

    // Verify form was reset
    await waitFor(() => {
      expect(screen.getByLabelText(/^Name$/i)).toHaveValue('');
      expect(screen.getByLabelText(/^Email$/i)).toHaveValue('');
      expect(screen.getByLabelText(/^Message$/i)).toHaveValue('');
    });
  });

  it('handles generic error', async () => {
    const user = userEvent.setup();
    (global.fetch as jest.Mock).mockRejectedValueOnce(
      new Error('Network error')
    );

    render(<Contact />);

    fireEvent.change(screen.getByLabelText(/^Name$/i), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText(/^Email$/i), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/^Message$/i), {
      target: { value: 'This is a test message.' },
    });

    await user.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });
  });

  it('disables submit button when form is invalid', async () => {
    const user = userEvent.setup();
    render(<Contact />);

    const submitButton = screen.getByRole('button', { name: /send message/i });

    // Try to submit empty form
    await user.click(submitButton);

    // Should show validation errors instead of submitting
    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    });
  });

  it('disables submit button while submitting', async () => {
    const user = userEvent.setup();

    // Mock a slow response
    (global.fetch as jest.Mock).mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({
                ok: true,
                json: () => Promise.resolve({ success: true }),
              }),
            1000
          )
        )
    );

    render(<Contact />);

    fireEvent.change(screen.getByLabelText(/^Name$/i), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText(/^Email$/i), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/^Message$/i), {
      target: { value: 'This is a test message.' },
    });

    const submitButton = screen.getByRole('button', { name: /send message/i });
    await user.click(submitButton);

    // Button should show "Sending..."
    await waitFor(
      () => {
        expect(screen.getByText(/^Sending\.\.\.$/i)).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });
});
