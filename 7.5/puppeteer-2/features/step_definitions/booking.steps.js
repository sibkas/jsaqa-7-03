const {
  Given,
  When,
  Then,
  Before,
  After,
  setDefaultTimeout,
} = require("@cucumber/cucumber");
const puppeteer = require("puppeteer");
const { clickElement, getText } = require("../../lib/commands.js");
const { expect } = require("chai");

setDefaultTimeout(60000);

let browser, page;

Before(async function () {
  browser = await puppeteer.launch({ headless: false, defaultViewport: null });
  page = await browser.newPage();
});

After(async function () {
  if (browser) await browser.close();
});

Given(
  "пользователь находится на главной странице {string}",
  async function (url) {
    await page.goto(url);
  },
);

When("пользователь выбирает завтрашний день", async function () {
  await clickElement(page, "a.page-nav__day:nth-child(2)");
});

When("выбирает сеанс на {string}", async function (time) {
  await clickElement(page, "a.movie-seances__time");
});

When("пользователь выбирает сеанс с ID {string}", async function (id) {
  await clickElement(page, `a[data-seance-id='${id}']`);
});

When("выбирает свободное стандартное кресло", async function () {
  await page.waitForSelector(".buying-scheme__wrapper");

  await new Promise((r) => setTimeout(r, 1000)); // 🔥 ОБЯЗАТЕЛЬНО

  const selector =
    "span.buying-scheme__chair_standart:not(.buying-scheme__chair_taken):not(.buying-scheme__chair_selected)";

  const seats = await page.$$(selector);
  expect(seats.length).to.be.greaterThan(0);

  await seats[0].click(); // 🔥 реальный клик
});

When("выбирает свободное VIP кресло", async function () {
  await page.waitForSelector(".buying-scheme__wrapper");

  await new Promise((r) => setTimeout(r, 1000));

  const selector =
    "span.buying-scheme__chair_vip:not(.buying-scheme__chair_taken):not(.buying-scheme__chair_selected)";

  const seats = await page.$$(selector);
  expect(seats.length).to.be.greaterThan(0);

  await seats[0].click();
});

When("нажимает кнопку забронировать", async function () {
  const buttonSelector = ".acceptin-button";

  await page.waitForSelector(buttonSelector, { visible: true });

  await page.click(buttonSelector);

  // Ждём, пока появится заголовок страницы билета
  await page.waitForSelector("h2.ticket__check-title", {
    visible: true,
    timeout: 20000,
  });
});

Then("видит текст {string}", async function (expectedText) {
  const actualText = await page.$eval(
    "h2.ticket__check-title",
    (el) => el.innerText,
  );

  expect(actualText.toLowerCase()).to.contain(expectedText.toLowerCase());
});

Then("кнопка забронировать заблокирована", async function () {
  await page.waitForSelector(".buying-scheme__wrapper");
  await new Promise((r) => setTimeout(r, 1000));
  const isDisabled = await page.$eval(".acceptin-button", (el) => el.disabled);
  expect(isDisabled).to.be.true;
});
