//const {sign_in_page} = require("../selectors/sign_in_page");

import {sign_in_page} from "../selectors/sign_in_page.js";

describe('UI tests for sign in page', () => {

    before('visiting sign in page', () => {
        cy.visit('/')
    })

    it('should show "Real World App logo"', () => {
        cy.get(sign_in_page.logo_image).should('be.visible').and('have.attr', 'xmlns', 'http://www.w3.org/2000/svg')
    })

    it('should show "Sign in" title', () => {
        cy.get(sign_in_page.title_text).should('be.visible').and('have.text', 'Sign in')
    })

    it('should show the "Username is required" validation text if user clicks on it and then click outside this field', () =>{
        cy.get(sign_in_page.password_input_field).click();
        cy.get(sign_in_page.userName_validation).should('be.visible').and('have.text', 'Username is required');
    })

    it('should show "Username" field', () => {
        cy.get(sign_in_page.username_field).should('be.visible').and('have.text', 'Username');
        cy.get(sign_in_page.username_input_field).click().type('TestUser')
    })

    it('should show "Password" field', () => {
        cy.get(sign_in_page.password_field).should('be.visible').and('have.text', 'Password')
        cy.get(sign_in_page.password_input_field).click().type('TestPass').clear()
    })

    it('Should show that the "sign in" button is disabled', () => {
        cy.get(sign_in_page.signIn_button).should('be.disabled')
    })

    it('should show "Remember me" checkbox + check/uncheck', () => {
        cy.get(sign_in_page.rememberMe_checkbox).click().should('be.checked');
        cy.get(sign_in_page.rememberMe_checkbox).click().should('not.be.checked')
    })

    it('should \'Don\'t have an account? Sign Up\' text with clickable link', () => {
        cy.get(sign_in_page.sign_up).should('be.visible').and('have.text', 'Don\'t have an account? Sign Up').click();
        cy.url().should('contain', 'http://localhost:3000/signup')
    })

    it('should show Cypress copyright link that leads to \'https://www.cypress.io/', () => {
        cy.get(sign_in_page.cypress_link).should('be.visible').and('have.attr', 'href', 'https://cypress.io')
    })

    // todo: automate following test cases:
    // 1. should show typeable Username field +
    // 2. should show typeable Password field +
    // 3. should show Username and Password placeholders +
    // 4. should show 'Username is required' error if user clicks on it and then click outside this field and didn't enter any value +
    // 5. check "Remember me" checkbox +
    // 6. should show disabled by default sign in btn +
    // 7. should have 'Don't have an account? Sign Up' clickable link under 'Sign up' btn +
    // 8. should show Cypress copyright link that leads to 'https://www.cypress.io/' +
})