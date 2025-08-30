import { test, expect } from '@playwright/test';
import { setupApiMocks, expectApiCall, mockProducts } from './utils/api-mocks';

test.describe('Home Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Настраиваем моки API перед каждым тестом
    await setupApiMocks(page);
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

  test('should load products from API', async ({ page }) => {
    // Ожидаем API вызов при загрузке домашней страницы
    const apiCallPromise = expectApiCall(page, '/products', 'GET');
    
    await page.goto('/');
    
    // Проверяем, что API вызов был сделан
    const request = await apiCallPromise;
    expect(request.url()).toContain('/products');
    expect(request.method()).toBe('GET');
    
    // Проверяем, что продукты отображаются на странице
    await page.waitForLoadState('networkidle');
    
    // Проверяем, что хотя бы один продукт отображается
    const productCards = page.locator('.card, .product-item, [data-testid="product"]');
    await expect(productCards.first()).toBeVisible();
  });

  test('should handle API errors when loading products', async ({ page }) => {
    // Переопределяем мок для симуляции ошибки API
    await page.route('**/products', async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Failed to load products' })
      });
    });

    await page.goto('/');
    
    // Проверяем, что приложение не падает при ошибке API
    await expect(page.locator('body')).toBeVisible();
    
    // Проверяем, что навигация все еще работает
    await expect(page.locator('h1:has-text("M.Tech")')).toBeVisible();
  });
});
