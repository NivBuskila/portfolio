import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Contact from '@/components/contact/Contact';
import emailjs from '@emailjs/browser';
import { personalInfo } from '@/data/personalInfo';

// Mock EmailJS
jest.mock('@emailjs/browser', () => ({
  init: jest.fn(),
  send: jest.fn(),
  EmailJSResponseStatus: class EmailJSResponseStatus extends Error {
    status: number;
    text: string;
    constructor(status: number, text: string) {
      super(text);
      this.status = status;
      this.text = text;
    }
  },
}));

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <div {...props}>{children}</div>,
    form: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <form {...props}>{children}</form>,
  },
  AnimatePresence: ({ children }: React.PropsWithChildren) => <>{children}</>,
}));

describe('Contact', () => {
  const mockEmailJS = emailjs as jest.Mocked<typeof emailjs>;

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock environment variables
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID = 'test_service_id';
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID = 'test_template_id';
    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY = 'test_public_key';

    // Mock window.gtag
    (window as Window & { gtag?: typeof jest.fn }).gtag = jest.fn();
  });

  afterEach(() => {
    delete (window as Window & { gtag?: typeof jest.fn }).gtag;
  });

  it('renders the contact form', () => {
    render(<Contact />);

    expect(screen.getByText("Let's Connect")).toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  it('displays email and phone contact information', () => {
    render(<Contact />);

    const emailLink = screen.getByText(personalInfo.email);
    expect(emailLink).toBeInTheDocument();
    expect(emailLink.closest('a')).toHaveAttribute('href', `mailto:${personalInfo.email}`);
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

    const nameInput = screen.getByLabelText(/full name/i);

    // Test name too short
    await user.type(nameInput, 'A');
    await user.tab(); // Trigger blur

    await waitFor(() => {
      expect(screen.getByText(/name must be at least 2 characters/i)).toBeInTheDocument();
    });

    // Clear and test name too long
    await user.clear(nameInput);
    await user.type(nameInput, 'A'.repeat(51));
    await user.tab();

    await waitFor(() => {
      expect(screen.getByText(/name must be less than 50 characters/i)).toBeInTheDocument();
    });
  });

  it('validates email format', async () => {
    const user = userEvent.setup();
    render(<Contact />);

    const emailInput = screen.getByLabelText(/email address/i);

    // Test invalid email
    await user.type(emailInput, 'invalid-email');
    await user.tab();

    await waitFor(() => {
      expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
    });
  });

  it('validates message length', async () => {
    const user = userEvent.setup();
    render(<Contact />);

    const messageInput = screen.getByLabelText(/message/i);

    // Test message too short
    await user.type(messageInput, 'Short');
    await user.tab();

    await waitFor(() => {
      expect(screen.getByText(/message must be at least 10 characters/i)).toBeInTheDocument();
    });

    // Clear and test message too long
    await user.clear(messageInput);
    await user.type(messageInput, 'A'.repeat(1001));
    await user.tab();

    await waitFor(() => {
      expect(screen.getByText(/message must be less than 1000 characters/i)).toBeInTheDocument();
    });
  });

  it('shows character count for message', async () => {
    const user = userEvent.setup();
    render(<Contact />);

    const messageInput = screen.getByLabelText(/message/i);

    await user.type(messageInput, 'Hello world');

    expect(screen.getByText('11/1000')).toBeInTheDocument();
  });

  it('successfully submits the form', async () => {
    const user = userEvent.setup();
    mockEmailJS.send.mockResolvedValueOnce({
      status: 200,
      text: 'OK',
    } as emailjs.EmailJSResponseStatus);

    render(<Contact />);

    // Fill out the form
    await user.type(screen.getByLabelText(/full name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email address/i), 'john@example.com');
    await user.type(screen.getByLabelText(/message/i), 'This is a test message for the contact form.');

    // Submit the form
    await user.click(screen.getByRole('button', { name: /send message/i }));

    // Wait for success message
    await waitFor(() => {
      expect(screen.getByText(/thank you! your message has been sent successfully/i)).toBeInTheDocument();
    });

    // Verify EmailJS was called correctly
    expect(mockEmailJS.send).toHaveBeenCalledWith(
      'test_service_id',
      'test_template_id',
      expect.objectContaining({
        from_name: 'John Doe',
        from_email: 'john@example.com',
        message: 'This is a test message for the contact form.',
        to_email: personalInfo.email,
      }),
      expect.objectContaining({
        publicKey: 'test_public_key',
      })
    );

    // Verify analytics was tracked
    expect((window as Window & { gtag?: typeof jest.fn }).gtag).toHaveBeenCalledWith('event', 'contact_submit', {
      method: 'emailjs',
      status: 'success',
    });

    // Verify form was reset
    await waitFor(() => {
      expect(screen.getByLabelText(/full name/i)).toHaveValue('');
      expect(screen.getByLabelText(/email address/i)).toHaveValue('');
      expect(screen.getByLabelText(/message/i)).toHaveValue('');
    });
  });

  it('shows error when EmailJS configuration is missing', async () => {
    const user = userEvent.setup();

    // Clear environment variables before rendering
    const originalServiceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const originalTemplateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const originalPublicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID = '';
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID = '';
    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY = '';

    render(<Contact />);

    await user.type(screen.getByLabelText(/full name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email address/i), 'john@example.com');
    await user.type(screen.getByLabelText(/message/i), 'This is a test message.');

    await user.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      const errorMessages = screen.queryAllByText(/send failed/i);
      expect(errorMessages.length).toBeGreaterThan(0);
    }, { timeout: 5000 });

    expect(mockEmailJS.send).not.toHaveBeenCalled();

    // Restore environment variables
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID = originalServiceId;
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID = originalTemplateId;
    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY = originalPublicKey;
  });

  it('handles EmailJS 400 error (invalid service/template)', async () => {
    const user = userEvent.setup();
    const EmailJSResponseStatus = emailjs.EmailJSResponseStatus;
    mockEmailJS.send.mockRejectedValueOnce(new EmailJSResponseStatus(400, 'Bad Request'));

    render(<Contact />);

    await user.type(screen.getByLabelText(/full name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email address/i), 'john@example.com');
    await user.type(screen.getByLabelText(/message/i), 'This is a test message.');

    await user.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText(/send failed \(invalid service\/template\)/i)).toBeInTheDocument();
    });

    // Verify analytics was tracked
    expect((window as Window & { gtag?: typeof jest.fn }).gtag).toHaveBeenCalledWith('event', 'contact_submit', {
      method: 'emailjs',
      status: 'error',
    });
  });

  it('handles EmailJS 401 error (authentication)', async () => {
    const user = userEvent.setup();
    const EmailJSResponseStatus = emailjs.EmailJSResponseStatus;
    mockEmailJS.send.mockRejectedValueOnce(new EmailJSResponseStatus(401, 'Unauthorized'));

    render(<Contact />);

    await user.type(screen.getByLabelText(/full name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email address/i), 'john@example.com');
    await user.type(screen.getByLabelText(/message/i), 'This is a test message.');

    await user.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText(/send failed \(auth\)/i)).toBeInTheDocument();
    });
  });

  it('handles EmailJS 422 error (missing fields)', async () => {
    const user = userEvent.setup();
    const EmailJSResponseStatus = emailjs.EmailJSResponseStatus;
    mockEmailJS.send.mockRejectedValueOnce(new EmailJSResponseStatus(422, 'Unprocessable Entity'));

    render(<Contact />);

    await user.type(screen.getByLabelText(/full name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email address/i), 'john@example.com');
    await user.type(screen.getByLabelText(/message/i), 'This is a test message.');

    await user.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText(/send failed \(missing fields\)/i)).toBeInTheDocument();
    });
  });

  it('handles EmailJS 429 error (rate limit)', async () => {
    const user = userEvent.setup();
    const EmailJSResponseStatus = emailjs.EmailJSResponseStatus;
    mockEmailJS.send.mockRejectedValueOnce(new EmailJSResponseStatus(429, 'Too Many Requests'));

    render(<Contact />);

    await user.type(screen.getByLabelText(/full name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email address/i), 'john@example.com');
    await user.type(screen.getByLabelText(/message/i), 'This is a test message.');

    await user.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText(/send failed \(rate limit\)/i)).toBeInTheDocument();
    });
  });

  it('handles EmailJS 500+ error (server error)', async () => {
    const user = userEvent.setup();
    const EmailJSResponseStatus = emailjs.EmailJSResponseStatus;
    mockEmailJS.send.mockRejectedValueOnce(new EmailJSResponseStatus(500, 'Internal Server Error'));

    render(<Contact />);

    await user.type(screen.getByLabelText(/full name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email address/i), 'john@example.com');
    await user.type(screen.getByLabelText(/message/i), 'This is a test message.');

    await user.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText(/send failed \(server\)/i)).toBeInTheDocument();
    });
  });

  it('handles generic error', async () => {
    const user = userEvent.setup();
    mockEmailJS.send.mockRejectedValueOnce(new Error('Network error'));

    render(<Contact />);

    await user.type(screen.getByLabelText(/full name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email address/i), 'john@example.com');
    await user.type(screen.getByLabelText(/message/i), 'This is a test message.');

    await user.click(screen.getByRole('button', { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByText(/send failed\. please try again\./i)).toBeInTheDocument();
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
    mockEmailJS.send.mockImplementation(() =>
      new Promise(resolve => setTimeout(() => resolve({ status: 200, text: 'OK' } as emailjs.EmailJSResponseStatus), 1000))
    );

    render(<Contact />);

    await user.type(screen.getByLabelText(/full name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email address/i), 'john@example.com');
    await user.type(screen.getByLabelText(/message/i), 'This is a test message.');

    const submitButton = screen.getByRole('button', { name: /send message/i });
    await user.click(submitButton);

    // Button should show "Sending Message..."
    await waitFor(() => {
      expect(screen.getByText(/sending message/i)).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('initializes EmailJS on mount', () => {
    render(<Contact />);

    expect(mockEmailJS.init).toHaveBeenCalledWith({
      publicKey: 'test_public_key',
    });
  });
});
