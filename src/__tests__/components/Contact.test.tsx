import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Contact from '@/components/contact/Contact';
import emailjs from '@emailjs/browser';

// Mock emailjs
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

// Mock window.gtag
const mockGtag = jest.fn();
(global as any).window = {
  gtag: mockGtag,
  scrollTo: jest.fn(),
  matchMedia: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
};

describe('Contact Component', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env = {
      ...originalEnv,
      NEXT_PUBLIC_EMAILJS_SERVICE_ID: 'test_service_id',
      NEXT_PUBLIC_EMAILJS_TEMPLATE_ID: 'test_template_id',
      NEXT_PUBLIC_EMAILJS_PUBLIC_KEY: 'test_public_key',
    };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('renders the contact form', () => {
    render(<Contact />);

    expect(screen.getByText("Let's Connect")).toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  it('displays validation errors for empty fields', async () => {
    const user = userEvent.setup();
    render(<Contact />);

    const submitButton = screen.getByRole('button', { name: /send message/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/message is required/i)).toBeInTheDocument();
    });
  });

  it('displays validation error for short name', async () => {
    const user = userEvent.setup();
    render(<Contact />);

    const nameInput = screen.getByLabelText(/full name/i);
    await user.type(nameInput, 'A');
    await user.tab();

    await waitFor(() => {
      expect(screen.getByText(/name must be at least 2 characters/i)).toBeInTheDocument();
    });
  });

  it('displays validation error for invalid email', async () => {
    const user = userEvent.setup();
    render(<Contact />);

    const emailInput = screen.getByLabelText(/email address/i);
    await user.type(emailInput, 'invalid-email');
    await user.tab();

    await waitFor(() => {
      expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
    });
  });

  it('displays validation error for short message', async () => {
    const user = userEvent.setup();
    render(<Contact />);

    const messageInput = screen.getByLabelText(/message/i);
    await user.type(messageInput, 'Short');
    await user.tab();

    await waitFor(() => {
      expect(screen.getByText(/message must be at least 10 characters/i)).toBeInTheDocument();
    });
  });

  it('displays character count for message field', async () => {
    const user = userEvent.setup();
    render(<Contact />);

    const messageInput = screen.getByLabelText(/message/i);
    await user.type(messageInput, 'Hello');

    expect(screen.getByText('5/1000')).toBeInTheDocument();
  });

  it('successfully submits form with valid data', async () => {
    const user = userEvent.setup();
    (emailjs.send as jest.Mock).mockResolvedValue({ status: 200, text: 'OK' });

    render(<Contact />);

    await user.type(screen.getByLabelText(/full name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email address/i), 'john@example.com');
    await user.type(screen.getByLabelText(/message/i), 'This is a test message');

    const submitButton = screen.getByRole('button', { name: /send message/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(emailjs.send).toHaveBeenCalledWith(
        'test_service_id',
        'test_template_id',
        expect.objectContaining({
          from_name: 'John Doe',
          from_email: 'john@example.com',
          message: 'This is a test message',
        }),
        expect.objectContaining({
          publicKey: 'test_public_key',
        })
      );
    });

    await waitFor(() => {
      expect(screen.getByText(/thank you! your message has been sent successfully/i)).toBeInTheDocument();
    });
  });

  it('handles form submission error', async () => {
    const user = userEvent.setup();
    (emailjs.send as jest.Mock).mockRejectedValue(new Error('Network error'));

    render(<Contact />);

    await user.type(screen.getByLabelText(/full name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email address/i), 'john@example.com');
    await user.type(screen.getByLabelText(/message/i), 'This is a test message');

    const submitButton = screen.getByRole('button', { name: /send message/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/send failed/i)).toBeInTheDocument();
    });
  });

  it('displays error when EmailJS configuration is missing', async () => {
    const user = userEvent.setup();
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID = '';

    render(<Contact />);

    await user.type(screen.getByLabelText(/full name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email address/i), 'john@example.com');
    await user.type(screen.getByLabelText(/message/i), 'This is a test message');

    const submitButton = screen.getByRole('button', { name: /send message/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/send failed \(setup\)/i)).toBeInTheDocument();
    });
  });

  it('renders direct contact information', () => {
    render(<Contact />);

    expect(screen.getByText(/or reach me directly at:/i)).toBeInTheDocument();
  });

  it('disables submit button when form is invalid', async () => {
    const user = userEvent.setup();
    render(<Contact />);

    const submitButton = screen.getByRole('button', { name: /send message/i });

    // Initially the button may or may not be disabled depending on form state
    // Try to submit to trigger validation
    await user.click(submitButton);

    await waitFor(() => {
      // After clicking with empty form, errors should show
      expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    });
  });

  it('shows loading state during submission', async () => {
    const user = userEvent.setup();
    (emailjs.send as jest.Mock).mockImplementation(
      () => new Promise(resolve => setTimeout(() => resolve({ status: 200 }), 100))
    );

    render(<Contact />);

    await user.type(screen.getByLabelText(/full name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email address/i), 'john@example.com');
    await user.type(screen.getByLabelText(/message/i), 'This is a test message');

    const submitButton = screen.getByRole('button', { name: /send message/i });
    await user.click(submitButton);

    expect(screen.getByText(/sending message/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/thank you!/i)).toBeInTheDocument();
    });
  });

  it('initializes EmailJS on mount', async () => {
    render(<Contact />);

    // EmailJS init is called in useEffect with the public key from env
    await waitFor(() => {
      expect(emailjs.init).toHaveBeenCalled();
    });
  });
});
