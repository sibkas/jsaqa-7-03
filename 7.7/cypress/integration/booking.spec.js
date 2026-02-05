/// <reference types="cypress" />

describe('Бронирование билетов', () => {
  beforeEach(() => {
    cy.fixture('selectors').as('sel');
  });

  it('Бронирование фильма через главную страницу', function() {
    cy.visit('http://qamid.tmweb.ru');
    
    // Выбираем завтрашний день, чтобы точно были сеансы и места
    cy.get(this.sel.mainPage.days).eq(1).click(); 

    // Берем первый доступный сеанс (время) первого фильма
    cy.get(this.sel.mainPage.showtimes).first().click();

    // Выбираем первое свободное место
    // Используем .click({force: true}), если элементы перекрыты
    cy.get(this.sel.booking.freeSeat).first().click();

    // Нажимаем кнопку забронировать
    cy.get(this.sel.booking.bookBtn).click();

    // Проверка: мы на странице подтверждения
    cy.contains('Получить код бронирования').should('be.visible');
  });
});