module.exports = {
  clickElement: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      await page.click(selector);
    } catch (error) {
      throw new Error(`Selector ${selector} is not clickable`);
    }
  },
  // Добавим специальный метод для выбора кресла, если обычный клик капризничает
  clickSeat: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      const element = await page.$(selector);
      await element.click();
    } catch (error) {
       throw new Error(`Could not click seat: ${selector}`);
    }
  },
  getText: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      return await page.$eval(selector, (el) => el.textContent);
    } catch (error) {
      throw new Error(`Text could not be retrieved from selector ${selector}`);
    }
  },
};