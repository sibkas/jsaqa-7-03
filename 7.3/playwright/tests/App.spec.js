const { test, expect } = require("@playwright/test");
const { email, password } = require("../user.js");

test("Успешная авторизация", async ({ page }) => {
  test.setTimeout(120000); 

  // Скриншот 1: Главная страница / Форма входа
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.screenshot({ path: 'screenshots/successful_login_1_start.png' });
  
  await page.click("text=Войти по почте");

  await page.locator('input[name="email"]').first().fill(email);
  await page.locator('input[name="password"]').first().fill(password);
  
  // Скриншот 2: Заполненные данные перед кликом
  await page.screenshot({ path: 'screenshots/successful_login_2_filled.png' });

  await page.click('[data-testid="login-submit-btn"]');

  console.log("Решайте капчу! Жду 30 секунд...");
  await page.waitForTimeout(30000); 

  try {
    await page.click('[data-testid="login-submit-btn"]', { force: true, timeout: 5000 });
  } catch (e) {}

  // Скриншот 3: После входа (Личный кабинет)
  await expect(page).toHaveURL(/.*netology\.ru\/profile/, { timeout: 30000 });
  await page.screenshot({ path: 'screenshots/successful_login_3_profile.png', fullPage: true });
  
  console.log("Успех: Скриншоты сохранены в папку screenshots/");
});

test("Неуспешная авторизация", async ({ page }) => {
  test.setTimeout(120000);
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.click("text=Войти по почте");

  await page.locator('input[name="email"]').first().fill("wrong_user@test.com");
  await page.locator('input[name="password"]').first().fill("wrong_password");
  
  // Скриншот 4: Неверные данные
  await page.screenshot({ path: 'screenshots/failed_login_1_input.png' });

  await page.click('[data-testid="login-submit-btn"]');
  await page.waitForTimeout(20000); 

  // Скриншот 5: Вид окна с ошибкой
  const errorBox = page.locator(':has-text("неправильно"), :has-text("Неверный")').first();
  await expect(errorBox).toBeVisible();
  await page.screenshot({ path: 'screenshots/failed_login_2_error.png' });
});