// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("login", (email, password) => {
  cy.contains("Log in").click();

  cy.get("#mail").type(email);

  if (password) {
    cy.get("#pass").type(password);
  }

  cy.contains("Submit").click();
});

Cypress.Commands.add(
  "addNewBook",
  (title, description, authors, favorite = false) => {
    cy.contains("Add new").click();
    cy.get("#title").type(title);
    cy.get("#description").type(description);
    cy.get("#authors").type(authors);

    if (favorite) {
      cy.get("#favorite").check();
    }

    cy.contains("Submit").click();
  },
);
