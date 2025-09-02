import { test, expect } from '@playwright/test';

test.describe('Playwright UI Demo Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should demonstrate step-by-step debugging', async ({ page }) => {
    // Этот тест можно использовать для пошаговой отладки в UI

    // Шаг 1: Проверяем загрузку главной страницы
    await expect(page.locator('h1:has-text("M.Tech")')).toBeVisible();

    // Шаг 2: Находим и кликаем на кнопку входа
    const loginButton = page.locator('button:has-text("Log in")');
    await expect(loginButton).toBeVisible();
    await loginButton.click();

    // Шаг 3: Проверяем переход на страницу входа
    await expect(page).toHaveURL(/logIn/);

    // Шаг 4: Заполняем форму входа
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', 'password123');

    // Шаг 5: Нажимаем кнопку отправки
    await page.click('button[type="submit"]');

    // Шаг 6: Проверяем результат
    await page.waitForLoadState('networkidle');
    await expect(page.locator('body')).toBeVisible();
  });

  test('should demonstrate element inspection', async ({ page }) => {
    // Этот тест демонстрирует инспекцию элементов

    // Проверяем различные элементы на странице
    const elements = [
      'h1:has-text("M.Tech")',
      'img[src="/assets/logo.png"]',
      'button:has-text("Register")',
      'button:has-text("Log in")',
      'button:has-text("Admin")',
      'button:has-text("Cart")',
    ];

    for (const selector of elements) {
      const element = page.locator(selector);
      if ((await element.count()) > 0) {
        await expect(element).toBeVisible();
        console.log(`Element found: ${selector}`);
      } else {
        console.log(`Element not found: ${selector}`);
      }
    }
  });

  test('should demonstrate network monitoring', async ({ page }) => {
    // Этот тест демонстрирует мониторинг сетевых запросов

    // Ожидаем API вызовы
    const requests: string[] = [];

    page.on('request', (request) => {
      if (request.url().includes('localhost:3000')) {
        requests.push(`${request.method()} ${request.url()}`);
        console.log(`API Request: ${request.method()} ${request.url()}`);
      }
    });

    // Переходим на страницу входа для генерации запросов
    await page.goto('/logIn');
    await page.waitForLoadState('networkidle');

    console.log('Total API requests:', requests.length);
    console.log('Requests:', requests);
  });

  test('should demonstrate screenshot capture', async ({ page }) => {
    // Этот тест демонстрирует создание скриншотов

    // Скриншот главной страницы
    await page.screenshot({
      path: 'screenshots/home-page.png',
      fullPage: true,
    });

    // Переходим на страницу входа
    await page.goto('/logIn');
    await page.screenshot({
      path: 'screenshots/login-page.png',
      fullPage: true,
    });

    // Заполняем форму
    await page.fill('input[type="email"]', 'test@example.com');
    await page.screenshot({ path: 'screenshots/login-form-filled.png' });

    // Скриншот только формы
    const form = page.locator('form');
    if ((await form.count()) > 0) {
      await form.screenshot({ path: 'screenshots/login-form-only.png' });
    }
  });

  test('should demonstrate conditional testing', async ({ page }) => {
    // Этот тест демонстрирует условное тестирование

    // Проверяем наличие продуктов
    const products = page.locator('.card');
    const productCount = await products.count();

    console.log(`Found ${productCount} products on the page`);

    if (productCount > 0) {
      // Если есть продукты, тестируем их
      await expect(products.first()).toBeVisible();

      // Кликаем на первый продукт
      await products.first().click();
      await page.waitForLoadState('networkidle');

      // Проверяем, что перешли на страницу продукта
      await expect(page).toHaveURL(/product/);
    } else {
      // Если продуктов нет, проверяем сообщение
      const noProductsMessage = page.locator(
        'text=No products available, text=Товары не найдены'
      );
      if ((await noProductsMessage.count()) > 0) {
        await expect(noProductsMessage).toBeVisible();
      }
    }
  });

  test('should demonstrate error handling', async ({ page }) => {
    // Этот тест демонстрирует обработку ошибок

    try {
      // Пытаемся найти несуществующий элемент
      const nonExistentElement = page.locator('.non-existent-class');
      await expect(nonExistentElement).toBeVisible({ timeout: 5000 });
    } catch (error) {
      console.log('Expected error caught:', error.message);
      // Продолжаем выполнение теста
    }

    // Проверяем, что страница все еще работает
    await expect(page.locator('body')).toBeVisible();

    // Пытаемся перейти на несуществующую страницу
    try {
      await page.goto('/non-existent-page');
      await page.waitForLoadState('networkidle', { timeout: 5000 });
    } catch (error) {
      console.log('Navigation error caught:', error.message);
    }
  });
});
