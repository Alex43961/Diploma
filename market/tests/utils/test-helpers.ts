import { Page, expect } from '@playwright/test';

export class TestHelpers {
  static async login(
    page: Page,
    email: string = 'test@example.com',
    password: string = 'password123'
  ) {
    await page.goto('/login');
    await page.fill('input[type="email"], input[name="email"]', email);
    await page.fill('input[type="password"], input[name="password"]', password);
    await page.click('button[type="submit"], button:has-text("Login")');

    // Ждем успешного входа
    await page.waitForLoadState('networkidle');
  }

  static async addProductToCart(page: Page, productIndex: number = 0) {
    const addToCartButton = page.locator(
      'button:has-text("Add to Cart"), [data-testid="add-to-cart"]'
    );

    if ((await addToCartButton.count()) > productIndex) {
      await addToCartButton.nth(productIndex).click();
      await page.waitForTimeout(1000); // Ждем обновления корзины
    }
  }

  static async navigateToCart(page: Page) {
    const cartLink = page.locator(
      'a:has-text("Cart"), [data-testid="cart-link"]'
    );

    if ((await cartLink.count()) > 0) {
      await cartLink.click();
      await page.waitForLoadState('networkidle');
    }
  }

  static async navigateToAdmin(page: Page) {
    const adminLink = page.locator(
      'a:has-text("Admin"), [data-testid="admin-link"]'
    );

    if ((await adminLink.count()) > 0) {
      await adminLink.click();
      await page.waitForLoadState('networkidle');
    }
  }

  static async waitForElement(
    page: Page,
    selector: string,
    timeout: number = 5000
  ) {
    await page.waitForSelector(selector, { timeout });
  }

  static async expectElementToBeVisible(page: Page, selector: string) {
    await expect(page.locator(selector)).toBeVisible();
  }

  static async expectElementToNotBeVisible(page: Page, selector: string) {
    await expect(page.locator(selector)).not.toBeVisible();
  }

  static async fillForm(page: Page, formData: Record<string, string>) {
    for (const [field, value] of Object.entries(formData)) {
      await page.fill(
        `input[name="${field}"], input[placeholder*="${field}"]`,
        value
      );
    }
  }

  static async submitForm(page: Page) {
    await page.click('button[type="submit"], button:has-text("Submit")');
    await page.waitForLoadState('networkidle');
  }
}
