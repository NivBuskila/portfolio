import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('should display contact form with all required fields', async ({ page }) => {
    // Check page title
    await expect(page.getByRole('heading', { name: /get in touch/i })).toBeVisible();

    // Check form fields exist
    await expect(page.getByPlaceholder(/name/i)).toBeVisible();
    await expect(page.getByPlaceholder(/email/i)).toBeVisible();
    await expect(page.getByPlaceholder(/message/i)).toBeVisible();

    // Check submit button
    await expect(page.getByRole('button', { name: /send message/i })).toBeVisible();
  });

  test('should show validation errors for empty form submission', async ({ page }) => {
    // Try to submit empty form
    await page.getByRole('button', { name: /send message/i }).click();

    // Wait for validation errors to appear
    await expect(page.getByText(/name is required/i)).toBeVisible({ timeout: 3000 });
    await expect(page.getByText(/email is required/i)).toBeVisible();
    await expect(page.getByText(/message is required/i)).toBeVisible();
  });

  test('should show validation error for invalid email', async ({ page }) => {
    // Fill name and message but invalid email
    await page.getByPlaceholder(/name/i).fill('John Doe');
    await page.getByPlaceholder(/email/i).fill('invalid-email');
    await page.getByPlaceholder(/message/i).fill('This is a test message');

    // Trigger validation by clicking submit
    await page.getByRole('button', { name: /send message/i }).click();

    // Check for email validation error
    await expect(page.getByText(/please enter a valid email/i)).toBeVisible({ timeout: 3000 });
  });

  test('should show validation error for short message', async ({ page }) => {
    // Fill with valid data but short message
    await page.getByPlaceholder(/name/i).fill('John Doe');
    await page.getByPlaceholder(/email/i).fill('john@example.com');
    await page.getByPlaceholder(/message/i).fill('Short');

    // Trigger validation
    await page.getByRole('button', { name: /send message/i }).click();

    // Check for message length validation
    await expect(page.getByText(/message must be at least 10 characters/i)).toBeVisible({ timeout: 3000 });
  });

  test('should accept valid form input', async ({ page }) => {
    // Fill all fields with valid data
    await page.getByPlaceholder(/name/i).fill('John Doe');
    await page.getByPlaceholder(/email/i).fill('john@example.com');
    await page.getByPlaceholder(/message/i).fill('This is a valid test message with more than 10 characters');

    // Submit button should be enabled
    const submitButton = page.getByRole('button', { name: /send message/i });
    await expect(submitButton).toBeEnabled();
  });

  test('should display direct contact information', async ({ page }) => {
    // Check that direct email and phone links are visible
    await expect(page.getByText(/nivbuskila@icloud\.com/i)).toBeVisible();
    await expect(page.getByText(/\+972/)).toBeVisible();
  });

  test('should have working email link', async ({ page }) => {
    // Find email link and verify it has proper mailto
    const emailLink = page.getByRole('link', { name: /nivbuskila@icloud\.com/i });
    await expect(emailLink).toHaveAttribute('href', /mailto:/);
  });

  test('should have working phone link', async ({ page }) => {
    // Find phone link and verify it has proper tel
    const phoneLink = page.getByRole('link').filter({ hasText: /\+972/ });
    await expect(phoneLink.first()).toHaveAttribute('href', /tel:/);
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Verify form is still visible and functional
    await expect(page.getByPlaceholder(/name/i)).toBeVisible();
    await expect(page.getByPlaceholder(/email/i)).toBeVisible();
    await expect(page.getByPlaceholder(/message/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /send message/i })).toBeVisible();
  });

  test('should clear validation errors when user starts typing', async ({ page }) => {
    // Submit empty form to trigger errors
    await page.getByRole('button', { name: /send message/i }).click();

    // Wait for error to appear
    await expect(page.getByText(/name is required/i)).toBeVisible({ timeout: 3000 });

    // Start typing in name field
    await page.getByPlaceholder(/name/i).fill('J');

    // Error should disappear
    await expect(page.getByText(/name is required/i)).not.toBeVisible({ timeout: 3000 });
  });
});
