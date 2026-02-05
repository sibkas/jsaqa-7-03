/// <reference types="cypress" />

describe('Petstore API: Тесты пользователя', () => {
  const userId = Math.floor(Math.random() * 100000);
  const userName = `user_${userId}`;

  const userPayload = {
    id: userId,
    username: userName,
    firstName: "Ivan",
    lastName: "Tester",
    email: "test@qa.com",
    password: "password123",
    phone: "1234567890",
    userStatus: 1
  };

  it('Должен создать пользователя', () => {
    cy.request('POST', 'https://petstore.swagger.io/v2/user', userPayload)
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq(userId.toString());
      });
  });

  it('Должен обновить данные пользователя', () => {
    // Сначала создаем, чтобы тест был независимым
    cy.request('POST', 'https://petstore.swagger.io/v2/user', userPayload);
    
    const updatedData = { ...userPayload, firstName: "Petr" };
    
    cy.request('PUT', `https://petstore.swagger.io/v2/user/${userName}`, updatedData)
      .then((response) => {
        expect(response.status).to.eq(200);
      });

    // Проверяем изменение
    cy.request('GET', `https://petstore.swagger.io/v2/user/${userName}`)
      .then((response) => {
        expect(response.body.firstName).to.eq("Petr");
      });
  });

  it('Должен удалить пользователя', () => {
    // Сначала создаем
    cy.request('POST', 'https://petstore.swagger.io/v2/user', userPayload);
    
    // Удаляем
    cy.request('DELETE', `https://petstore.swagger.io/v2/user/${userName}`)
      .then((response) => {
        expect(response.status).to.eq(200);
      });
  });
});