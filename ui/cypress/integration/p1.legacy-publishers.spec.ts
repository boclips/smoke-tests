context('legacy-publishers', () => {
  it('loads the login form', () => {
    cy.visit('https://publishers.boclips.com/')
      .get('[data-qa="username"]')
      .should('be.visible');
  });
});
