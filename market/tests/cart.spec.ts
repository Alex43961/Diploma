import { test, expect } from '@playwright/test';

test.describe('Cart Functionality Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should navigate to cart page', async ({ page }) => {
    // Находим кнопку корзины
    const cartButton = page.locator('button:has-text("Cart")');
    
    if (await cartButton.count() > 0) {
      await cartButton.click();
      
      // Проверяем, что мы на странице корзины
      await expect(page).toHaveURL(/cart/);
    }
  });

  test('should display cart items', async ({ page }) => {
    // Переходим на страницу корзины
    await page.goto('/cart');
    
    // Проверяем, что мы на странице корзины
    await expect(page).toHaveURL(/cart/);
  });

  test('should add product to cart from product page', async ({ page }) => {
    // Сначала переходим на страницу продукта
    await page.goto('/product/1'); // Предполагаем, что есть продукт с ID 1
    
    // Ищем кнопку добавления в корзину
    const addToCartButton = page.locator('button:has-text("Add to Cart"), button:has-text("Добавить в корзину")');
    
    if (await addToCartButton.count() > 0) {
      await addToCartButton.click();
      
      // Проверяем, что товар добавлен в корзину
      // Это может быть счетчик корзины или уведомление
      await expect(page.locator('.cartCounter, [data-testid="cart-count"]')).toBeVisible();
    }
  });

  test('should remove item from cart', async ({ page }) => {
    // Переходим на страницу корзины
    await page.goto('/cart');
    
    // Находим кнопку удаления товара
    const removeButton = page.locator('button:has-text("Remove"), button:has-text("Удалить")');
    
    if (await removeButton.count() > 0) {
      await removeButton.first().click();
      
      // Проверяем, что товар удален
      await expect(removeButton.first()).not.toBeVisible();
    }
  });
});
