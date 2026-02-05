/// <reference types="cypress" />

describe('Админка: Тесты входа', () => {
  
  beforeEach(() => {
    // Загружаем селекторы и данные пользователя
    cy.fixture('selectors').as('sel');
    cy.fixture('user').as('users');
    cy.visit('http://qamid.tmweb.ru/admin');
  });

  it('Успешный вход (Happy Path)', function() {
    cy.get(this.sel.admin.login).type(this.users.happyPath.email);
    cy.get(this.sel.admin.password).type(this.users.happyPath.pass);
    cy.get(this.sel.admin.submit).click();
    
    // Проверяем, что вошли (например, видим заголовок управления залами)
    cy.contains('Управление залами').should('be.visible');
  });

  it('Ошибка при входе с неверным паролем (Sad Path)', function() {
    cy.get(this.sel.admin.login).type(this.users.sadPath.email);
    cy.get(this.sel.admin.password).type(this.users.sadPath.pass);
    cy.get(this.sel.admin.submit).click();
    
    // Проверяем наличие сообщения об ошибке
    cy.contains('Ошибка авторизации').should('be.visible');
  });
});