import {sign_in_page} from "../selectors/sign_in_page";
import {main_screen} from "../selectors/main_screen";
import {user_settings_screen} from "../selectors/user_settings_screen.js";

describe('Tests for user settings screen ', () => {

    beforeEach("log in", () => {
        cy.clearCookies();
        cy.visit("/");
        cy.get(sign_in_page.username_input_field).click().type('Allie2');
        cy.get(sign_in_page.password_input_field).click().type('s3cret');
        cy.get(sign_in_page.signIn_button).click()
    })

    it('Should show user settings form', () => {
        cy.get(main_screen.my_account_button).click();
        cy.get(user_settings_screen.first_name_field).should('exist');
        cy.get(user_settings_screen.last_name_field).should('exist');
        cy.get(user_settings_screen.email_field).should('exist');
        cy.get(user_settings_screen.phoneNumber_field).should('exist');
        cy.get(user_settings_screen.save_button).should('exist');
    })

    it('Should display user setting form errors', () => {
        cy.get(main_screen.my_account_button).click();
        cy.get(user_settings_screen.first_name_field).click().clear();
        cy.get(user_settings_screen.enter_a_first_name_error).should('be.visible');
        cy.get(user_settings_screen.last_name_field).click().clear();
        cy.get(user_settings_screen.enter_a_last_name_error).should('be.visible');
        cy.get(user_settings_screen.email_field).click().clear();
        cy.get(user_settings_screen.enter_an_email_address_error).should('be.visible').and('have.text', 'Enter an email address');
        cy.get(user_settings_screen.email_field).click().type('qwe123');
        cy.get(user_settings_screen.enter_an_email_address_error).should('be.visible').and('have.text', 'Must contain a valid email address');
        cy.get(user_settings_screen.phoneNumber_field).click().clear();
        cy.get(user_settings_screen.enter_a_phone_number_error).should('be.visible').and('have.text', 'Enter a phone number');
        cy.get(user_settings_screen.phoneNumber_field).click().type('qwe123');
        cy.get(user_settings_screen.enter_a_phone_number_error).should('be.visible').and('have.text', 'Phone number is not valid');
    })

    it('Should update all user settings in once', () => {
        cy.get(main_screen.my_account_button).click();
        cy.get(user_settings_screen.first_name_field).click().clear().type('UpdatedFirstName');
        cy.get(user_settings_screen.last_name_field).click().clear().type('UpdatedLastName');
        cy.get(user_settings_screen.email_field).click().clear().type('UpdatedEmail@mail.mail');
        cy.get(user_settings_screen.phoneNumber_field).click().clear().type(123456789);
        cy.get(user_settings_screen.save_button).click();
        cy.get(main_screen.home_button).click();
        cy.get(main_screen.my_account_button).click();
        cy.get(user_settings_screen.first_name_field).should('have.value', 'UpdatedFirstName')
        cy.get(user_settings_screen.last_name_field).should('have.value', 'UpdatedLastName')
        cy.get(user_settings_screen.email_field).should('have.value', 'UpdatedEmail@mail.mail')
        cy.get(user_settings_screen.phoneNumber_field).should('have.value', '123456789')
    })

    it('Should update first name', () => {
        cy.get(main_screen.my_account_button).click();
        cy.get(user_settings_screen.first_name_field).click().clear().type('NewFirstName');
        cy.get(user_settings_screen.save_button).click();
        cy.get(main_screen.home_button).click();
        cy.get(main_screen.my_account_button).click();
        cy.get(user_settings_screen.first_name_field).should('have.value', 'NewFirstName')
    })

    it('Should update last name', () => {
        cy.get(main_screen.my_account_button).click();
        cy.get(user_settings_screen.last_name_field).click().clear().type('NewLastName');
        cy.get(user_settings_screen.save_button).click();
        cy.get(main_screen.home_button).click();
        cy.get(main_screen.my_account_button).click();
        cy.get(user_settings_screen.last_name_field).should('have.value', 'NewLastName')
    })

    it('Should update email', () => {
        cy.get(main_screen.my_account_button).click();
        cy.get(user_settings_screen.email_field).click().clear().type('NewEmail@mail.mail');
        cy.get(user_settings_screen.save_button).click();
        cy.get(main_screen.home_button).click();
        cy.get(main_screen.my_account_button).click();
        cy.get(user_settings_screen.email_field).should('have.value', 'NewEmail@mail.mail')
    })

    it('Should update phone number', () => {
        cy.get(main_screen.my_account_button).click();
        cy.get(user_settings_screen.phoneNumber_field).click().clear().type('987654321');
        cy.get(user_settings_screen.save_button).click();
        cy.get(main_screen.home_button).click();
        cy.get(main_screen.my_account_button).click();
        cy.get(user_settings_screen.phoneNumber_field).should('have.value', '987654321')
    })

})