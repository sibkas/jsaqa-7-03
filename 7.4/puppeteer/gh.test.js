let page;


beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});

// 1. тесты задачи 1
describe("Github page tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/team");
  });

  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual('GitHub · Change is constant. GitHub keeps you ahead. · GitHub');
  }, 60000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content");
  }, 60000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, { visible: true });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain("Get started with Team")
  }, 60000);
});

// 2. НОВЫЕ тесты на другие страницы (Задача 2)
describe("Other Github pages", () => {
  test("Pricing page title", async () => {
    await page.goto("https://github.com/pricing");
    const title = await page.title();
    expect(title).toContain("Pricing · Plans for every developer · GitHub");
  }, 60000);

  test("Enterprise page title", async () => {
    await page.goto("https://github.com/enterprise");
    const title = await page.title();
    expect(title).toContain("GitHub Enterprise · The AI-powered developer platform for the agent-ready enterprise · GitHub");
  }, 60000);

  test("Marketplace page title", async () => {
    await page.goto("https://github.com/marketplace");
    const title = await page.title();
    expect(title).toContain("Marketplace · Tools to improve your workflow · GitHub");
  }, 60000);
});