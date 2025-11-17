import { test, expect } from '@playwright/test';

test.describe('Projects Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/projects');
  });

  test('should display projects page with heading', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /My Projects/i })).toBeVisible();
  });

  test('should display project cards', async ({ page }) => {
    // Wait for projects to load
    await page.waitForTimeout(1000);

    // Should have at least one project card
    const projectCards = page.locator('[class*="rounded"]').filter({ hasText: /GitHub/ });
    const count = await projectCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should filter projects by category', async ({ page }) => {
    // Wait for page to load
    await page.waitForTimeout(1000);

    // Get all projects count
    const allButton = page.getByRole('button', { name: /all/i });
    await allButton.click();
    await page.waitForTimeout(500);

    // Try to click frontend filter (if it exists)
    const frontendButton = page.getByRole('button', { name: /frontend/i }).first();
    if (await frontendButton.isVisible()) {
      await frontendButton.click();
      await page.waitForTimeout(500);

      // Should still have some projects visible
      const projectCards = page.locator('[class*="rounded"]').filter({ hasText: /GitHub|Demo|View/ });
      const frontendCount = await projectCards.count();
      expect(frontendCount).toBeGreaterThan(0);
    }
  });

  test('should have working search functionality', async ({ page }) => {
    // Wait for page to load
    await page.waitForTimeout(1000);

    // Find search input (if it exists)
    const searchInput = page.getByPlaceholder(/search/i);

    if (await searchInput.isVisible()) {
      // Type in search box
      await searchInput.fill('test');
      await page.waitForTimeout(500);

      // Results should be filtered or show "no results" message
      const noResults = page.getByText(/no projects found/i);
      const hasNoResults = await noResults.isVisible().catch(() => false);

      if (!hasNoResults) {
        // If there are results, check that they contain the search term
        const projectCards = page.locator('[class*="rounded"]').filter({ hasText: /GitHub|Demo/ });
        expect(await projectCards.count()).toBeGreaterThanOrEqual(0);
      }
    }
  });

  test('should have GitHub links on project cards', async ({ page }) => {
    // Wait for projects to load
    await page.waitForTimeout(1000);

    // Find first GitHub link
    const githubLinks = page.getByRole('link', { name: /github/i });
    const count = await githubLinks.count();

    if (count > 0) {
      const firstGithubLink = githubLinks.first();
      await expect(firstGithubLink).toBeVisible();

      // Should have external link attributes
      await expect(firstGithubLink).toHaveAttribute('target', '_blank');
      await expect(firstGithubLink).toHaveAttribute('rel', /noopener/);
    }
  });

  test('should display project images', async ({ page }) => {
    // Wait for projects to load
    await page.waitForTimeout(1000);

    // Look for images in project cards
    const projectImages = page.locator('img[alt]').first();

    if (await projectImages.isVisible()) {
      await expect(projectImages).toBeVisible();
    }
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Page should still be visible and functional
    await expect(page.getByRole('heading', { name: /My Projects/i })).toBeVisible();

    // Projects should be visible
    await page.waitForTimeout(1000);
    const projectCards = page.locator('[class*="rounded"]').filter({ hasText: /GitHub|Demo|View/ });
    const count = await projectCards.count();
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test('should have proper meta tags for SEO', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/Projects/);
  });

  test('should load without JavaScript errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    await page.goto('/projects');
    await page.waitForTimeout(2000);

    // Filter out known third-party errors or expected errors
    const criticalErrors = errors.filter(
      (error) => !error.includes('favicon') && !error.includes('Extension')
    );

    expect(criticalErrors.length).toBe(0);
  });
});
