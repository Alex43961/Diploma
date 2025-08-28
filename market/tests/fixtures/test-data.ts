export const testUsers = {
  admin: {
    email: 'admin@example.com',
    password: 'admin123',
    name: 'Admin User',
  },
  regular: {
    email: 'user@example.com',
    password: 'user123',
    name: 'Regular User',
  },
  invalid: {
    email: 'invalid@example.com',
    password: 'wrongpassword',
    name: 'Invalid User',
  },
};

export const testProducts = {
  valid: {
    name: 'Test Product',
    price: '99.99',
    description: 'This is a test product for testing purposes',
    category: 'Electronics',
  },
  invalid: {
    name: '',
    price: '-10',
    description: '',
    category: '',
  },
};

export const testCartItems = [
  {
    name: 'Product 1',
    price: '29.99',
    quantity: 1,
  },
  {
    name: 'Product 2',
    price: '49.99',
    quantity: 2,
  },
];

export const formSelectors = {
  login: {
    email: 'input[type="email"], input[name="email"]',
    password: 'input[type="password"], input[name="password"]',
    submit: 'button[type="submit"], button:has-text("Login")',
  },
  product: {
    name: 'input[name="name"], input[placeholder*="name"]',
    price: 'input[name="price"], input[placeholder*="price"]',
    description:
      'textarea[name="description"], textarea[placeholder*="description"]',
    category: 'select[name="category"], input[name="category"]',
    submit: 'button[type="submit"], button:has-text("Save")',
  },
  cart: {
    addButton: 'button:has-text("Add to Cart"), [data-testid="add-to-cart"]',
    removeButton: 'button:has-text("Remove"), [data-testid="remove-item"]',
    quantityInput: 'input[type="number"], input[name="quantity"]',
  },
};

export const pageSelectors = {
  home: 'app-home',
  cart: 'app-cart',
  login: 'app-log-in',
  admin: 'app-admin-page',
  user: 'app-user',
  product: 'app-product',
};

export const navigationSelectors = {
  home: 'a:has-text("Home"), [data-testid="home-link"]',
  cart: 'a:has-text("Cart"), [data-testid="cart-link"]',
  login: 'a:has-text("Login"), [data-testid="login-link"]',
  admin: 'a:has-text("Admin"), [data-testid="admin-link"]',
  logout: 'button:has-text("Logout"), [data-testid="logout"]',
};
