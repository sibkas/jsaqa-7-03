describe("Книжный сервис", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Должна отображаться главная страница", () => {
    cy.contains("Books list").should("be.visible");
  });

  it("Успешный вход в систему", () => {
    cy.login("test@test.com", "test");
    cy.contains("test@test.com").should("be.visible");
  });

  it("Ошибка при пустом пароле", () => {
    cy.login("test@test.com"); // пароль не передаём

    // Проверяем браузерную валидацию
    cy.get("#pass:invalid").should("exist");
  });

  describe("Проверка раздела Избранное", () => {
    beforeEach(() => {
      cy.visit("/");
      cy.login("test@test.com", "test");
    });

    it("Добавление книги в избранное при создании", () => {
      cy.contains("Add new").click();
      cy.get("#title").type("Властелин колец");
      cy.get("#description").type("Фэнтези");
      cy.get("#authors").type("Дж. Р. Р. Толкин");
      cy.get("#favorite").check();
      cy.contains("Submit").click();

      cy.contains("Favorites").click();
      cy.contains("Властелин колец").should("be.visible");
    });

    it("Добавление книги в избранное через главную страницу", () => {
      cy.addNewBook("Хоббит", "Приключения", "Толкин");

      cy.contains("Хоббит")
        .parent()
        .within(() => {
          cy.contains("Add to favorite").click();
        });

      cy.contains("Favorites").click();
      cy.contains("Хоббит").should("be.visible");
    });

    it("Удаление книги из избранного", () => {
      cy.addNewBook("1984", "Антиутопия", "Джордж Оруэлл", true);

      cy.contains("Favorites").click();
      cy.contains("1984")
        .parent()
        .within(() => {
          cy.contains("Delete from favorite").click();
        });

      cy.contains("1984").should("not.exist");
    });
  });
});
