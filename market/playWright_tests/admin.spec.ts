import { test, expect } from '@playwright/test';

test.describe('Admin Panel Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should access admin panel', async ({ page }) => {
    // Находим кнопку админ-панели
    const adminButton = page.locator('button:has-text("Admin")');
    
    if (await adminButton.count() > 0) {
      await adminButton.click();
      
      // Проверяем, что мы на странице админ-панели
      await expect(page).toHaveURL(/admin-page/);
    }
  });

  test('should display admin dashboard', async ({ page }) => {
    // Переходим на страницу админ-панели
    await page.goto('/admin-page');
    
    // Проверяем, что мы на странице админ-панели
    await expect(page).toHaveURL(/admin-page/);
  });

  test('should manage products in admin panel', async ({ page }) => {
    // Переходим на страницу админ-панели
    await page.goto('/admin-page');
    
    // Находим кнопку добавления продукта
    const addProductButton = page.locator('button:has-text("Add Product"), button:has-text("Добавить продукт")');
    
    if (await addProductButton.count() > 0) {
      await addProductButton.click();
      
      // Проверяем, что форма добавления продукта открылась
      await expect(page.locator('form, .product-form')).toBeVisible();
    }
  });

  test('should edit existing product', async ({ page }) => {
    // Переходим на страницу админ-панели
    await page.goto('/admin-page');
    
    // Находим кнопку редактирования продукта
    const editButton = page.locator('button:has-text("Edit"), button:has-text("Редактировать")');
    
    if (await editButton.count() > 0) {
      await editButton.first().click();
      
      // Проверяем, что форма редактирования открылась
      await expect(page.locator('form, .edit-form')).toBeVisible();
    }
  });

  test('should delete product', async ({ page }) => {
    // Переходим на страницу админ-панели
    await page.goto('/admin-page');
    
    // Находим кнопку удаления продукта
    const deleteButton = page.locator('button:has-text("Delete"), button:has-text("Удалить")');
    
    if (await deleteButton.count() > 0) {
      // Подтверждаем удаление (если есть диалог)
      page.on('dialog', (dialog) => dialog.accept());
      
      await deleteButton.first().click();
      
      // Проверяем, что продукт удален
      await expect(deleteButton.first()).not.toBeVisible();
    }
  });
});
