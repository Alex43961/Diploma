import { test, expect } from '@playwright/test';

test.describe('Home Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display home page', async ({ page }) => {
    // Проверяем, что страница загрузилась
    await expect(page).toHaveTitle(/Shop/);
    
    // Проверяем наличие основных элементов
    await expect(page.locator('h1:has-text("M.Tech")')).toBeVisible();
    await expect(page.locator('img[src="/assets/logo.png"]')).toBeVisible();
  });

  test('should display navigation elements', async ({ page }) => {
    // Проверяем наличие кнопок навигации
    await expect(page.locator('button:has-text("Register")')).toBeVisible();
    await expect(page.locator('button:has-text("Log in")')).toBeVisible();
    await expect(page.locator('button:has-text("Admin")')).toBeVisible();
    await expect(page.locator('button:has-text("Cart")')).toBeVisible();
  });

  test('should display products if available', async ({ page }) => {
    // Тест отображения продуктов
    // Ждем загрузки контента
    await page.waitForLoadState('networkidle');
    
    // Проверяем наличие продуктов (если они есть)
    const products = page.locator('.card');
    if (await products.count() > 0) {
      await expect(products.first()).toBeVisible();
    }
  });

  test('should have search functionality', async ({ page }) => {
    // Проверяем наличие поиска
    await expect(page.locator('input[placeholder="Search for goods..."]')).toBeVisible();
  });
});
