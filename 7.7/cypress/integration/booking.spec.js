/// <reference types="cypress" />

describe("Бронирование билетов", () => {
  beforeEach(() => {
    cy.fixture("selectors").as("sel");
  });

  it("Бронирование фильма через главную страницу", function () {
    cy.visit("http://qamid.tmweb.ru");

    // 1. Выбираем завтрашний день
    cy.get(this.sel.mainPage.days).eq(1).click();

    // 2. ПРОВЕРКА: Убеждаемся, что сеансы на этот день отображаются

    cy.get(this.sel.mainPage.showtimes)
      .should("be.visible")
      .should("have.length.at.least", 1);

    // 3. Выбираем первый сеанс
    cy.get(this.sel.mainPage.showtimes).first().click();

    // 4. ПРОВЕРКА: Убеждаемся, что в зале есть хотя бы одно свободное место

    cy.get(this.sel.booking.freeSeat)
      .should("exist")
      .should("have.length.at.least", 1);

    // 5. Кликаем по первому свободному месту
    cy.get(this.sel.booking.freeSeat).first().click();

    // 6. Нажимаем кнопку забронировать
    cy.get(this.sel.booking.bookBtn).should("not.be.disabled").click();

    // 7. Итоговая проверка
    cy.contains("Получить код бронирования").should("be.visible");
  });
});
