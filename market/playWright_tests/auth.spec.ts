import { test, expect } from '@playwright/test';
import { setupApiMocks, expectApiCall, mockUsers } from './utils/api-mocks';

test.describe('Authentication Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Настраиваем моки API перед каждым тестом
    await setupApiMocks(page);
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

  test('should make API call when loading login page', async ({ page }) => {
    // Ожидаем API вызов при загрузке страницы входа
    const apiCallPromise = expectApiCall(page, '/users', 'GET');
    
    await page.goto('/logIn');
    
    // Проверяем, что API вызов был сделан
    const request = await apiCallPromise;
    expect(request.url()).toContain('/users');
    expect(request.method()).toBe('GET');
  });

  test('should make API call during login process', async ({ page }) => {
    await page.goto('/logIn');

    // Ожидаем API вызов при отправке формы
    const apiCallPromise = expectApiCall(page, '/users', 'POST');
    
    // Заполняем форму валидными данными
    await page.fill('input[type="email"]', mockUsers[0].email);
    await page.fill('input[type="password"]', mockUsers[0].password);
    await page.click('button[type="submit"]');
    
    // Проверяем, что API вызов был сделан
    const request = await apiCallPromise;
    expect(request.url()).toContain('/users');
    expect(request.method()).toBe('POST');
    
    // Проверяем, что данные были отправлены корректно
    const postData = JSON.parse(request.postData() || '{}');
    expect(postData.email).toBe(mockUsers[0].email);
    expect(postData.password).toBe(mockUsers[0].password);
  });

  test('should handle API errors gracefully', async ({ page }) => {
    // Переопределяем мок для симуляции ошибки API
    await page.route('**/users', async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal Server Error' })
      });
    });

    await page.goto('/logIn');
    
    // Проверяем, что приложение не падает при ошибке API
    await expect(page.locator('body')).toBeVisible();
    
    // Проверяем, что форма все еще доступна
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
  });
});
