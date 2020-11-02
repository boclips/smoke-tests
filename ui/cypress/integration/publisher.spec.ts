context('Publishers', () => {
    it('can visit the landing page', () => {
        console.log('USERNAME:', Cypress.env('PUBLISHER_USERNAME'));
        cy.visit('https://tazingo.boclips.com');
        cy.get('#username').type(Cypress.env('PUBLISHER_USERNAME'));
        cy.get('#password').type(Cypress.env('PUBLISHER_PASSWORD'));
        cy.get('#kc-form-login').submit();
        cy.findByRole('button', {name: /Search/i}).should('exist');
    })
})


Cypress.on('uncaught:exception', (err, runnable) => {
    console.log(err);
    return false;
})
