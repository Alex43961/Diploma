import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Shop/);
});

test('should display M.Tech logo and navigation', async ({ page }) => {
  await page.goto('/');

  // Check for M.Tech logo and navigation elements
  await expect(page.locator('h1:has-text("M.Tech")')).toBeVisible();
  await expect(page.locator('img[src="/assets/logo.png"]')).toBeVisible();
  
  // Check for navigation buttons
  await expect(page.locator('button:has-text("Register")')).toBeVisible();
  await expect(page.locator('button:has-text("Log in")')).toBeVisible();
  await expect(page.locator('button:has-text("Admin")')).toBeVisible();
  await expect(page.locator('button:has-text("Cart")')).toBeVisible();
});
