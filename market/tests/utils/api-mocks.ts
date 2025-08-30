import { Page } from '@playwright/test';

// Моковые данные для тестов
export const mockUsers = [
  {
    _id: '1',
    email: 'test@example.com',
    password: 'password123',
    name: 'Test User',
    cart: []
  },
  {
    _id: '2', 
    email: 'admin@example.com',
    password: 'admin123',
    name: 'Admin User',
    cart: []
  }
];

export const mockProducts = [
  {
    _id: '1',
    name: 'Apple iPhone 15 Pro Max 256GB Black Titanium',
    price: 999.99,
    description: 'Айфон (iPhone) - это линейка смартфонов...',
    image: 'https://example.com/iphone.jpg'
  },
  {
    _id: '2',
    name: 'Apple MacBook Air 15" M2 256GB',
    price: 499.99,
    description: 'Макбук (MacBook) - это линейка ноутбуков...',
    image: 'https://example.com/macbook.jpg'
  }
];

// Функция для настройки моков API
export async function setupApiMocks(page: Page) {
  // Мокаем запросы к API пользователей
  await page.route('**/users', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockUsers)
    });
  });

  // Мокаем запросы к API продуктов
  await page.route('**/products', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockProducts)
    });
  });

  // Мокаем запросы к конкретному продукту
  await page.route('**/products/*', async (route) => {
    const url = route.request().url();
    const productId = url.split('/').pop();
    const product = mockProducts.find(p => p._id === productId);
    
    if (product) {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(product)
      });
    } else {
      await route.fulfill({
        status: 404,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Product not found' })
      });
    }
  });

  // Мокаем POST запросы для авторизации
  await page.route('**/users', async (route) => {
    if (route.request().method() === 'POST') {
      const postData = JSON.parse(route.request().postData() || '{}');
      const user = mockUsers.find(u => u.email === postData.email);
      
      if (user && user.password === postData.password) {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ success: true, user })
        });
      } else {
        await route.fulfill({
          status: 401,
          contentType: 'application/json',
          body: JSON.stringify({ error: 'Invalid credentials' })
        });
      }
    } else {
      // GET запрос - возвращаем список пользователей
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockUsers)
      });
    }
  });
}

// Функция для проверки API вызовов
export async function expectApiCall(page: Page, url: string, method: string = 'GET') {
  const requestPromise = page.waitForRequest(request => 
    request.url().includes(url) && request.method() === method
  );
  return requestPromise;
}
