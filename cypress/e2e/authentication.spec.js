import {sign_in_page} from "../selectors/sign_in_page.js";
import {sign_up_page} from "../selectors/sign_up_page.js";
import {main_screen} from "../selectors/main_screen.js";

describe('UI tests for sign in page', () => {

    before('visiting sign in page', () => {
        cy.visit('/')
    })

    it('Should show that the "sign in" button is enabled by default', () => {
        cy.get(sign_in_page.signIn_button).should('be.enabled')
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

    it('should show "Remember me" checkbox + check/uncheck', () => {
        cy.get(sign_in_page.rememberMe_checkbox).click().should('be.checked');
        cy.get(sign_in_page.rememberMe_checkbox).click().should('not.be.checked')
    })

    it('should show \'Don\'t have an account? Sign Up\' text with clickable link', () => {
        cy.get(sign_in_page.sign_up).should('be.visible').and('have.text', 'Don\'t have an account? Sign Up').click();
        cy.url().should('contain', 'http://localhost:3000/signup')
    })

    it('should show Cypress copyright link that leads to \'https://www.cypress.io/', () => {
        cy.get(sign_in_page.cypress_link).should('be.visible').and('have.attr', 'href', 'https://cypress.io')
    })

    it('should fill all fields and click the "sign up" button', () => {
        cy.get(sign_up_page.first_name_field).click().type('testfirstnametq');
        cy.get(sign_up_page.last_name_field).click().type('testlastnametq');
        cy.get(sign_up_page.user_name_field).click().type('testusernametq');
        cy.get(sign_up_page.password_field).click().type('testpasswordtq');
        cy.get(sign_up_page.confirm_password_field).click().type('testpasswordtq');
        cy.get(sign_up_page.sign_up_button).click();
        cy.get(sign_in_page.signIn_button).should('be.visible')
    })

    it('should fill the "Username" and "Password" fields on the "sign in" screen and click the "sign in" button', () => {
        cy.get(sign_in_page.username_input_field).click().type('testusernametq');
        cy.get(sign_in_page.password_input_field).click().type('testpasswordtq');
        cy.get(sign_in_page.signIn_button).click();
        cy.get(main_screen.logout_button).should('be.visible')
    })

    it('should click the "Logout" button in the main screen', () => {
        cy.get(main_screen.logout_button).click({force: true});
        cy.get(sign_in_page.signIn_button).should('be.visible')
    })

    it('should show "Password must contain at least 4 characters" validation error on the "Sign in" page', () => {
        cy.get(sign_in_page.password_input_field).click().type('1');
        cy.get(sign_in_page.username_input_field).click().type('TestUser');
        cy.get(sign_in_page.password_validation).should('be.visible').and('have.text', 'Password must contain at least 4 characters')
    })

    it('should show "Username or password is invalid" error on the "Sign in" page for non existing user', () => {
        cy.get(sign_in_page.username_input_field).click().type('NonExistingUser');
        cy.get(sign_in_page.password_input_field).click().type('InvalidPassword');
        cy.get(sign_in_page.signIn_button).click();
        cy.get(sign_in_page.invalid_name_or_pass).should('be.visible').and('have.text', 'Username or password is invalid')
    })

    it('should redirect to the "Sign up" page and show the "First Name is required" validation error', () => {
        cy.get(sign_in_page.sign_up).click();
        cy.get(sign_up_page.sign_up_text).should('be.visible').and('have.text', 'Sign Up');
        cy.get(sign_up_page.first_name_field).click();
        cy.get(sign_up_page.sign_up_button).click();
        cy.get(sign_up_page.first_name_is_required).should('be.visible').and('have.text', 'First Name is required');
    })

    it('should show the "Last Name is required" validation error', () => {
        cy.get(sign_up_page.last_name_field).click();
        cy.get(sign_up_page.first_name_field).click();
        cy.get(sign_up_page.last_name_is_required).should('be.visible').and('have.text', 'Last Name is required');
    })

    it('should show the "Username is required" validation error', () => {
        cy.get(sign_up_page.user_name_field).click();
        cy.get(sign_up_page.first_name_field).click();
        cy.get(sign_up_page.username_is_required).should('be.visible').and('have.text', 'Username is required');
    })

    it('should show the "Enter your password" validation error', () => {
        cy.get(sign_up_page.password_field).click();
        cy.get(sign_up_page.first_name_field).click();
        cy.get(sign_up_page.password_is_required).should('be.visible').and('have.text', 'Enter your password');
    })

    it('should show the "Confirm your password" validation error', () => {
        cy.get(sign_up_page.confirm_password_field).click();
        cy.get(sign_up_page.first_name_field).click();
        cy.get(sign_up_page.confirm_password_is_required).should('be.visible').and('have.text', 'Confirm your password');
    })

    it('should show "Password does not match" validation error', () => {
        cy.get(sign_up_page.first_name_field).click().type('Firstname')
        cy.get(sign_up_page.last_name_field).click().type('Lastname')
        cy.get(sign_up_page.user_name_field).click().type('Username')
        cy.get(sign_up_page.password_field).click().type('Firstpass')
        cy.get(sign_up_page.confirm_password_field).click().type('Secondpass')
        cy.get(sign_up_page.password_does_not_match).should('be.visible').and('have.text', 'Password does not match');
    })

})