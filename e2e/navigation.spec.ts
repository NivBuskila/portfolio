import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should navigate between all pages', async ({ page }) => {
    await page.goto('/');

    // Should be on home page
    await expect(page.getByRole('heading', { name: /Hi, I'm/i })).toBeVisible();

    // Click About link
    await page.getByRole('link', { name: 'About' }).click();
    await expect(page).toHaveURL('/about');
    await expect(page.getByRole('heading', { name: /About Me/i })).toBeVisible();

    // Click Projects link
    await page.getByRole('link', { name: 'Projects' }).click();
    await expect(page).toHaveURL('/projects');
    await expect(page.getByRole('heading', { name: /My Projects/i })).toBeVisible();

    // Click Contact link
    await page.getByRole('link', { name: 'Contact' }).click();
    await expect(page).toHaveURL('/contact');
    await expect(page.getByRole('heading', { name: /Get in Touch/i })).toBeVisible();

    // Click Home link
    await page.getByRole('link', { name: 'Home' }).click();
    await expect(page).toHaveURL('/');
    await expect(page.getByRole('heading', { name: /Hi, I'm/i })).toBeVisible();
  });

  test('should show active navigation state', async ({ page }) => {
    await page.goto('/about');

    // About link should have active styling
    const aboutLink = page.getByRole('link', { name: 'About' });
    await expect(aboutLink).toHaveClass(/border-purple-500/);
  });

  test('should work on mobile menu', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Desktop menu should be hidden, mobile button should be visible
    const mobileMenuButton = page.getByRole('button', { name: /open main menu/i });
    await expect(mobileMenuButton).toBeVisible();

    // Click to open mobile menu
    await mobileMenuButton.click();

    // Mobile menu should be visible
    await expect(page.getByRole('link', { name: 'About' }).nth(1)).toBeVisible();

    // Click About in mobile menu
    await page.getByRole('link', { name: 'About' }).nth(1).click();

    // Should navigate to About page
    await expect(page).toHaveURL('/about');

    // Mobile menu should close after navigation
    await expect(page.getByRole('link', { name: 'Projects' }).nth(1)).not.toBeVisible();
  });

  test('should have functioning theme toggle', async ({ page }) => {
    await page.goto('/');

    // Find theme toggle button
    const themeToggle = page.getByRole('button', { name: /toggle theme/i });
    await expect(themeToggle).toBeVisible();

    // Get initial theme
    const htmlElement = page.locator('html');
    const initialClass = await htmlElement.getAttribute('class');

    // Click theme toggle
    await themeToggle.click();

    // Wait a bit for animation
    await page.waitForTimeout(300);

    // Theme should have changed
    const newClass = await htmlElement.getAttribute('class');
    expect(initialClass).not.toBe(newClass);
  });

  test('should persist theme preference', async ({ page, context }) => {
    await page.goto('/');

    // Toggle theme to dark
    const themeToggle = page.getByRole('button', { name: /toggle theme/i });
    await themeToggle.click();
    await page.waitForTimeout(300);

    // Reload page
    await page.reload();
    await page.waitForTimeout(500);

    // Theme should still be dark
    const htmlElement = page.locator('html');
    const classAfterReload = await htmlElement.getAttribute('class');
    expect(classAfterReload).toContain('dark');
  });

  test('should have logo link to home', async ({ page }) => {
    await page.goto('/about');

    // Click on logo
    await page.getByRole('link', { name: 'NB' }).click();

    // Should navigate to home
    await expect(page).toHaveURL('/');
  });

  test('should have sticky navbar on scroll', async ({ page }) => {
    await page.goto('/');

    const navbar = page.locator('nav');
    await expect(navbar).toHaveClass(/sticky/);
    await expect(navbar).toHaveClass(/top-0/);
  });
});
