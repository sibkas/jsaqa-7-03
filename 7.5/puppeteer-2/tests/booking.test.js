const { clickElement, getText } = require("../lib/commands.js");

let page;
let browser;

jest.setTimeout(10000); // Даем тестам 10 секунд вместо 5

describe("Бронирование билетов в кино", () => {
  beforeEach(async () => {
    browser = await require("puppeteer").launch({
      headless: false,
      defaultViewport: null,
      args: ['--start-maximized'] 
    });
    page = await browser.newPage();
    await page.goto("https://qamid.tmweb.ru/client/index.php");
  });

  afterEach(async () => {
    if (browser) {
      await browser.close();
    }
  });

  test("Happy Path 1: Бронирование на завтра", async () => {
    await clickElement(page, "a.page-nav__day:nth-child(2)"); 
    await clickElement(page, "a.movie-seances__time"); 

    // Выбираем, например, 5-е свободное кресло в зале для надежности
    const seatSelector = "span.buying-scheme__chair:not(.buying-scheme__chair_taken):not(.buying-scheme__chair_selected)";
    await page.waitForSelector(seatSelector);
    
    // Кликаем по конкретному элементу (например, первому попавшемуся свободному)
    const seats = await page.$$(seatSelector);
    await seats[5].click(); // Кликнем по 6-му креслу в списке (индекс 5)

    await clickElement(page, "button.acceptin-button");
    
    const actual = await getText(page, "h2.ticket__check-title");
    expect(actual).toContain("Вы выбрали билеты:");
  });

  test("Happy Path 2: Бронирование на сегодня (VIP место)", async () => {
    // 1. Кликаем по сеансу 17:00
    await clickElement(page, "a[data-seance-id='225']"); 
    
    // 2. Явное ожидание, пока появится обертка зала
    await page.waitForSelector(".buying-scheme__wrapper");
    
    // 3. Ждем 1 секунду, чтобы скрипты сайта успели прописать атрибуты кнопке
    await new Promise(r => setTimeout(r, 1000)); 

    const vipSeatSelector = "span.buying-scheme__chair_vip:not(.buying-scheme__chair_taken)";
    
    // 4. Кликаем по креслу
    await clickElement(page, vipSeatSelector);
    
    // 5. Кликаем "Забронировать"
    await clickElement(page, "button.acceptin-button");
    
    const actual = await getText(page, "h2.ticket__check-title");
    expect(actual).toContain("Вы выбрали билеты:");
  }, 30000);

  test("Sad Path: Кнопка забронировать неактивна, если места не выбраны", async () => {
    // 1. Заходим на сеанс 20:00 (ID 223)
    await clickElement(page, "a[data-seance-id='223']");
    
    // 2. Ждем отрисовку схемы зала
    await page.waitForSelector(".buying-scheme__wrapper");

    // 3. Ждем 1 секунду, чтобы скрипты сайта успели прописать атрибуты кнопке
    await new Promise(r => setTimeout(r, 1000));

    // 4. Проверяем атрибут disabled именно через getAttribute
    
    const isDisabled = await page.$eval(".acceptin-button", (el) => {
      return el.getAttribute("disabled") === "true";
    });
    
    expect(isDisabled).toBe(true);
  }, 20000);
});