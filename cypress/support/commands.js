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

Cypress.Commands.add('login', (credentials) => {
  cy.request('POST', `${Cypress.env('BACKEND')}/login`, credentials)
    .then((response) => {
      localStorage.setItem('loggedBlogAppUser', JSON.stringify(response.body));
      cy.visit('');
    });
});

Cypress.Commands.add('createBlog', (blog) => {
  cy.request({
    url: `${Cypress.env('BACKEND')}/blogs`,
    method: 'POST',
    body: blog,
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('loggedBlogAppUser')).token}`,
    },
  });

  cy.visit('');
});

Cypress.Commands.add('logout', () => {
  cy.contains('button', 'logout').click();
});
