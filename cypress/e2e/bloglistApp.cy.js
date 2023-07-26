/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */

describe('Blog app', function () {
  const testUsername1 = 'teme';
  const testPassword1 = 'test_password';
  const testName1 = 'Teemu';
  const testUsername2 = 'heme';
  const testPassword2 = 'another_password';
  const testName2 = 'Henkka';

  beforeEach(function () {
    // Reset users and add two users.
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`);
    const user1 = {
      name: testName1,
      username: testUsername1,
      password: testPassword1,
    };
    const user2 = {
      name: testName2,
      password: testPassword2,
      username: testUsername2,
    };
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user1);
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user2);
    cy.visit('');
  });

  it('By default login form is shown', function () {
    cy.contains('Log in to application');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('input[name="Username"]').type(testUsername1);
      cy.get('input[name="Password"]').type(testPassword1);
      cy.contains('button', 'login').click();
      cy.contains(`Logged in as ${testName1}`);
    });

    it('fails with wrong credentials', function () {
      cy.get('input[name="Username"]').type('wrong');
      cy.get('input[name="Password"]').type('also wrong');
      cy.contains('button', 'login').click();
      cy.contains('Wrong username or password');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: testUsername1, password: testPassword1 });
    });

    it('A blog can be created', function () {
      cy.contains('Add blog').click();
      cy.get('#title-input').type('Test title');
      cy.get('#author-input').type('Good writer');
      cy.get('#url-input').type('good address');
      cy.contains('button', 'create').click();
      cy.contains('Add blog'); // To make sure that blog form was closed
      cy.contains('Test title Good writer');
    });
  });
  describe('When logged in and and two blogs by different users exist in the database', function () {
    beforeEach(function () {
      cy.login({ username: testUsername1, password: testPassword1 });
      cy.createBlog({ title: 'aaaa', author: 'bbbb', url: 'cccc' });
      cy.logout();
      cy.login({ username: testUsername2, password: testPassword2 });
      cy.createBlog({ title: 'dddd', author: 'eeee', url: 'ffff' });
      // Stay logged in as this second user
    });

    it('A blog can be liked', function () {
      cy.contains('button', 'view').click(); // Take the first blog
      cy.contains('button', 'like').click();
      cy.contains('1 like');
    });

    it('User that created the blog can remove it', function () {
      cy.contains('dddd').contains('button', 'view').click(); // Take the blog created by second user
      cy.contains('button', 'remove').click();
      cy.contains('dddd').should('not.exist');
    });

    it('Only user that has created the blog sees the remove button', function () {
      cy.contains('aaaa').contains('button', 'view').click(); // Take blog created by user that is not logged in
      cy.contains('button', 'remove').should('have.css', 'display', 'none'); // Make sure that display is none
      cy.contains('aaaa').contains('button', 'hide').click();
      cy.contains('dddd').contains('button', 'view').click(); // Take the blog that was created by user
      cy.contains('button', 'remove').should('be.visible');
    });

    it.only('Blogs are ordered correctly by number of likes', function () {
      cy.createBlog({ title: 'gggg', author: 'gggg', url: 'hhhh' }); // Add one more blog
      // Make it so that aaaa has 0 likes, dddd 2 likes and gggg 3 likes.
      cy.contains('dddd').contains('button', 'view').click();
      cy.contains('dddd').contains('button', 'like').as('ddddLike').click();
      cy.contains('@ddddLike').click();
    });
  });
});
