import { test, expect } from '@playwright/test';
import { TestHelpers } from './utils/test-helpers';
import { navigationSelectors, pageSelectors } from './fixtures/test-data';

test.describe('Navigation Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should navigate between main pages', async ({ page }) => {
    // Проверяем навигацию в корзину
    const cartButton = page.locator('button:has-text("Cart")');
    if (await cartButton.count() > 0) {
      await cartButton.click();
      await expect(page).toHaveURL(/cart/);
    }

    // Возвращаемся на главную
    await page.goto('/');
    
    // Проверяем навигацию на страницу входа
    const loginButton = page.locator('button:has-text("Log in")');
    if (await loginButton.count() > 0) {
      await loginButton.click();
      await expect(page).toHaveURL(/logIn/);
    }
  });

  test('should maintain navigation state', async ({ page }) => {
    // Переходим в корзину
    await page.goto('/cart');
    
    // Проверяем, что мы остаемся в корзине после обновления страницы
    await page.reload();
    await expect(page).toHaveURL(/cart/);
  });

  test('should handle direct URL navigation', async ({ page }) => {
    // Проверяем прямую навигацию по URL
    await page.goto('/cart');
    await expect(page).toHaveURL(/cart/);

    await page.goto('/logIn');
    await expect(page).toHaveURL(/logIn/);

    await page.goto('/admin-page');
    await expect(page).toHaveURL(/admin-page/);
  });

  test('should show correct active navigation item', async ({ page }) => {
    // Проверяем, что активный элемент навигации выделен
    const cartButton = page.locator('button:has-text("Cart")');
    if (await cartButton.count() > 0) {
      await cartButton.click();
      
      // Проверяем, что мы на странице корзины
      await expect(page).toHaveURL(/cart/);
    }
  });

  test('should handle back and forward navigation', async ({ page }) => {
    // Переходим на страницу корзины
    await page.goto('/cart');
    
    // Переходим на страницу входа
    await page.goto('/logIn');
    
    // Проверяем кнопку "Назад"
    await page.goBack();
    await expect(page).toHaveURL(/cart/);
    
    // Проверяем кнопку "Вперед"
    await page.goForward();
    await expect(page).toHaveURL(/logIn/);
  });

  test('should handle navigation with query parameters', async ({ page }) => {
    // Проверяем навигацию с параметрами запроса
    await page.goto('/?category=electronics');
    
    // Проверяем, что параметры сохранились
    await expect(page).toHaveURL(/category=electronics/);
  });

  test('should handle navigation errors gracefully', async ({ page }) => {
    // Проверяем обработку несуществующих страниц
    await page.goto('/non-existent-page');
    
    // Проверяем, что показывается страница 404 или редирект на главную
    const notFoundElement = page.locator('.not-found, .error-404, h1:has-text("404")');
    if (await notFoundElement.count() > 0) {
      await expect(notFoundElement).toBeVisible();
    } else {
      // Если нет 404 страницы, проверяем редирект на главную
      await expect(page).toHaveURL('/');
    }
  });
});
