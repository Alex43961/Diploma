# Playwright Tests для Angular Market App

Этот каталог содержит end-to-end тесты для Angular приложения Market, написанные с использованием Playwright.

## Структура тестов

```
tests/
├── example.spec.ts          # Базовые примеры тестов
├── home.spec.ts            # Тесты главной страницы
├── cart.spec.ts            # Тесты функциональности корзины
├── auth.spec.ts            # Тесты аутентификации
├── admin.spec.ts           # Тесты админ-панели
├── utils/
│   └── test-helpers.ts     # Вспомогательные функции
└── fixtures/
    └── test-data.ts        # Тестовые данные
```

## Установка и настройка

1. Убедитесь, что Playwright установлен:

```bash
npm install
```

2. Установите браузеры Playwright:

```bash
npx playwright install
```

## Запуск тестов

### Основные команды

```bash
# Запуск всех тестов
npm run test:e2e

# Запуск тестов с UI интерфейсом
npm run test:e2e:ui

# Запуск тестов в видимом режиме (headed)
npm run test:e2e:headed

# Запуск тестов в режиме отладки
npm run test:e2e:debug

# Показать отчет о тестах
npm run test:e2e:report
```

### Запуск конкретных тестов

```bash
# Запуск тестов только для главной страницы
npx playwright test home.spec.ts

# Запуск тестов аутентификации
npx playwright test auth.spec.ts

# Запуск тестов в определенном браузере
npx playwright test --project=chromium

# Запуск тестов с определенным тегом
npx playwright test --grep "should login"
```

## Конфигурация

Основная конфигурация находится в файле `playwright.config.ts` в корне проекта.

### Настройки по умолчанию:

- **Base URL**: http://localhost:4200
- **Браузеры**: Chromium, Firefox, WebKit
- **Режим**: Параллельное выполнение
- **Retry**: 2 попытки в CI, 0 в локальной разработке

## Написание тестов

### Базовый пример

```typescript
import { test, expect } from "@playwright/test";

test("should display home page", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Market/);
});
```

### Использование вспомогательных функций

```typescript
import { test, expect } from "@playwright/test";
import { TestHelpers } from "./utils/test-helpers";

test("should login user", async ({ page }) => {
  await TestHelpers.login(page, "user@example.com", "password123");
  await expect(page.locator("app-user")).toBeVisible();
});
```

### Использование тестовых данных

```typescript
import { test, expect } from "@playwright/test";
import { testUsers, formSelectors } from "./fixtures/test-data";

test("should login with valid credentials", async ({ page }) => {
  await page.goto("/login");
  await page.fill(formSelectors.login.email, testUsers.regular.email);
  await page.fill(formSelectors.login.password, testUsers.regular.password);
  await page.click(formSelectors.login.submit);
});
```

## Селекторы

Для лучшей надежности тестов используйте следующие типы селекторов:

1. **Роли и текст**: `page.getByRole('button', { name: 'Login' })`
2. **Data-testid**: `page.locator('[data-testid="login-button"]')`
3. **Семантические селекторы**: `page.locator('input[type="email"]')`

## Отладка

### Режим отладки

```bash
npm run test:e2e:debug
```

### Создание скриншотов

```typescript
await page.screenshot({ path: "screenshot.png" });
```

### Запись видео

```typescript
// В конфигурации
use: {
  video: 'on-first-retry',
}
```

### Трассировка

```typescript
// В конфигурации
use: {
  trace: 'on-first-retry',
}
```

## CI/CD интеграция

Для интеграции с CI/CD системами:

```yaml
# GitHub Actions пример
- name: Install dependencies
  run: npm ci

- name: Install Playwright Browsers
  run: npx playwright install --with-deps

- name: Run Playwright tests
  run: npm run test:e2e

- name: Upload test results
  uses: actions/upload-artifact@v2
  if: always()
  with:
    name: playwright-report
    path: playwright-report/
```

## Лучшие практики

1. **Используйте data-testid атрибуты** для стабильных селекторов
2. **Группируйте связанные тесты** в describe блоки
3. **Используйте beforeEach** для общей настройки
4. **Добавляйте ожидания** для асинхронных операций
5. **Используйте вспомогательные функции** для повторяющихся действий
6. **Пишите независимые тесты** - каждый тест должен работать автономно

## Устранение неполадок

### Тесты падают из-за таймаутов

- Увеличьте timeout в конфигурации
- Добавьте явные ожидания для элементов
- Проверьте стабильность селекторов

### Тесты не находят элементы

- Проверьте правильность селекторов
- Убедитесь, что элементы загружены
- Используйте `page.waitForSelector()` для динамического контента

### Проблемы с аутентификацией

- Проверьте тестовые учетные данные
- Убедитесь, что сервер аутентификации работает
- Используйте моки для изоляции тестов
