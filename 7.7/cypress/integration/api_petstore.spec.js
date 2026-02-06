describe('Petstore API: Тесты пользователя', () => {
  // Функция-генератор: создаем свежий набор данных по запросу
  const generateUserData = () => {
    const id = Math.floor(Math.random() * 100000);
    return {
      id: id,
      username: `user_${id}`,
      firstName: "Ivan",
      lastName: "Tester",
      email: `test${id}@qa.com`,
      password: "password123"
    };
  };

  it('Должен создать пользователя', () => {
    const user = generateUserData(); // Уникально для этого теста
    cy.request('POST', 'https://petstore.swagger.io/v2/user', user)
      .then((response) => {
        expect(response.status).to.eq(200);
      });
  });

  it('Должен обновить данные пользователя', () => {
    const user = generateUserData(); // Уникально для этого теста
    cy.request('POST', 'https://petstore.swagger.io/v2/user', user); // Сначала создали
    
    const updatedData = { ...user, firstName: "Petr" }; // Меняем только имя
    
    cy.request('PUT', `https://petstore.swagger.io/v2/user/${user.username}`, updatedData)
      .then((response) => {
        expect(response.status).to.eq(200);
      });
  });

  it('Должен удалить пользователя', () => {
    const user = generateUserData(); // Уникально для этого теста
    cy.request('POST', 'https://petstore.swagger.io/v2/user', user); // Сначала создали
    
    cy.request('DELETE', `https://petstore.swagger.io/v2/user/${user.username}`)
      .then((response) => {
        expect(response.status).to.eq(200);
      });
  });
});