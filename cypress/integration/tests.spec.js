
describe('Web App Testing', () => {
    it('shows the landing page', () => {
        cy.visit('/');
        cy.contains('Welcome to our shop!');
    });

    it('shows the about page', () => {
        cy.visit('/about');
        cy.contains('Lorem ipsum dolor sit amet');
    });

    it('shows 4 jewelery products', () => {
        cy.visit('/products?category=jewelery');
        cy.get('ion-card').should('have.length', '4');
    });
});


describe('Mobile App Testing', () => {

    beforeEach(() => {
        cy.viewport('iphone-x');
        cy.visit('/');
    });

    it('shows the about page', () => {
        cy.openMobileProducts(2);
        cy.contains('Lorem ipsum dolor sit amet');
    });


    it('shows 20 jewelery products', () => {
        cy.openMobileProducts(1);
        cy.get('ion-card').should('have.length', '20');
    });
});


describe('Css App Testing', () => {

    beforeEach(() => {
        // cy.viewport('iphone-x');
        cy.visit('/');
    });

    it('marks the active page', () => {
        cy.visit('/');
        cy.get('.header ion-button').should('have.length', '4');
        cy.get('.header ion-button').eq(0).should('have.class', 'active-item');

        cy.visit('/products');
        cy.get('.header ion-button').eq(1).should('have.class', 'active-item');

        cy.visit('/about');
        cy.get('.header ion-button').eq(2).should('have.class', 'active-item');
    });

    it('has a blue border when active', () => {
        cy.visit('/');
        cy.get('.header ion-button').eq(0).should('have.css', 'border-bottom', '2px solid rgb(56, 128, 255)');
    });
});



describe('Web App responsive Testing', () => {

    it('shows a menu on small screens', () => {
        cy.visit('/');
        cy.get('ion-menu-button').should('be.not.visible');
        cy.viewport('iphone-x');
        cy.wait(200);
        cy.get('ion-menu-button').should('be.visible');
    });

    it('shows a menu on small screens', () => {
        cy.visit('/');
        cy.get('.mobile-header').should('be.not.visible');
        cy.get('.header').should('be.visible');

        cy.viewport('iphone-x');
        cy.wait(200);
        cy.get('.mobile-header').should('be.visible');
        cy.get('.header').should('be.not.visible');
    });

});


describe('Web App button data-cy="btn-cart" Testing', () => {

    it('opens and closes the cart modal', () => {
        cy.visit('/');
        cy.get('[data-cy=btn-cart]').click();
        cy.get('ion-modal').should('exist');
        cy.get('ion-modal ion-header').contains('Cart');

        cy.get('[data-cy=btn-close]').click();
        cy.wait(200);
        cy.get('ion-modal').should('not.exist');
    });

});



describe('Web App Local JSON Testing', () => {

    it('shows local test JSON', () => {
        cy.intercept({ method: 'GET', url: 'https://fakestoreapi.com/products' }, { fixture: 'data' }).as('getProducts');
        cy.visit('/products');
        cy.wait(['@getProducts']);
        cy.get('ion-card').should('have.length', '1');
        cy.screenshot();
    });

});


