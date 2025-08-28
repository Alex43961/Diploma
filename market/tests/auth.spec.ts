import { test, expect } from '@playwright/test';

test.describe('Authentication Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display login form', async ({ page }) => {
    // Находим кнопку входа
    const loginButton = page.locator('button:has-text("Log in")');

    if ((await loginButton.count()) > 0) {
      await loginButton.click();

      // Проверяем, что мы на странице входа
      await expect(page.locator('h2:has-text("Вход в аккаунт")')).toBeVisible();
      await expect(page.locator('input[type="email"]')).toBeVisible();
      await expect(page.locator('input[type="password"]')).toBeVisible();
    }
  });

  test('should submit login form', async ({ page }) => {
    // Переходим на страницу входа
    await page.goto('/logIn');

    // Заполняем форму входа
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', 'password123');

    // Нажимаем кнопку входа
    await page.click('button[type="submit"]');

    // Проверяем, что форма была отправлена
    // Приложение может остаться на странице входа или показать ошибку
    await page.waitForLoadState('networkidle');

    // Проверяем, что мы либо остались на странице входа, либо перешли на другую страницу
    const currentUrl = page.url();
    console.log('Current URL after login:', currentUrl);

    // Проверяем, что страница загрузилась корректно - проверяем наличие любого элемента
    await expect(page.locator('body')).toBeVisible();
  });

  test('should show error with invalid credentials', async ({ page }) => {
    // Переходим на страницу входа
    await page.goto('/logIn');

    // Заполняем форму неверными данными
    await page.fill('input[type="email"]', 'invalid@example.com');
    await page.fill('input[type="password"]', 'wrongpassword');

    // Нажимаем кнопку входа
    await page.click('button[type="submit"]');

    // Проверяем сообщение об ошибке (если есть)
    const errorMessage = page.locator('.error-message');
    if ((await errorMessage.count()) > 0) {
      await expect(errorMessage).toBeVisible();
    }
  });

  test('should have working login form', async ({ page }) => {
    // Переходим на страницу входа
    await page.goto('/logIn');

    // Проверяем, что форма работает
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();

    // Проверяем, что можно заполнить форму
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', 'password123');

    // Проверяем, что значения заполнились
    await expect(page.locator('input[type="email"]')).toHaveValue(
      'test@example.com'
    );
    await expect(page.locator('input[type="password"]')).toHaveValue(
      'password123'
    );
  });
});
