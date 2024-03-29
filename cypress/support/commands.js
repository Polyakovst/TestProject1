import {main_screen} from "../selectors/main_screen.js";
import {main_screen_onboarding_popups} from "../selectors/main_screen_onboarding_popups.js";
import {sign_in_page} from "../selectors/sign_in_page.js";
import {sign_up_page} from "../selectors/sign_up_page.js";

Cypress.Commands.add('ui_sign_up', () => {
    cy.get(sign_up_page.first_name_field).click().type('FirstName');
    cy.get(sign_up_page.last_name_field).click().type('LastName');
    cy.get(sign_up_page.user_name_field).click().type('UserName+11');
    cy.get(sign_up_page.password_field).click().type('TestPass');
    cy.get(sign_up_page.confirm_password_field).click().type('TestPass');
    cy.get(sign_up_page.sign_up_button).click();
    });

Cypress.Commands.add('ui_sign_in', () => {
    cy.get(sign_in_page.username_input_field).click().type('UserName+11');
    cy.get(sign_in_page.password_input_field).click().type('TestPass');
    cy.get(sign_in_page.signIn_button).click();
    });

Cypress.Commands.add('ui_logout', () => {
    cy.get(main_screen.logout_button).click()
    });

Cypress.Commands.add('ui_onboarding', () => {
    cy.get(main_screen_onboarding_popups.next_button).click()
    cy.get(main_screen_onboarding_popups.bank_name_field).click().type('testbank');
    cy.get(main_screen_onboarding_popups.routing_number_field).click().type('123456789');
    cy.get(main_screen_onboarding_popups.account_number_field).click().type('112233445');
    cy.get(main_screen_onboarding_popups.bank_acc_save_button).click();
    cy.get(main_screen_onboarding_popups.done_button).click()
    });

Cypress.Commands.add("loginByApi", (username = 'Allie2', password = 's3cret') => {
    cy.window({ log: false }).then((win) => win.authService.send("LOGIN", { username, password }));
    cy.get(main_screen.home_button).should('be.visible');
});

Cypress.Commands.add("logoutByApi", () => {
    cy.window({ log: false }).then((win) => win.authService.send("LOGOUT"));
    cy.get(sign_in_page.title_text).should('be.visible');
});

Cypress.Commands.add("signupByApi", (firstName = 'testFirstName', lastName = 'testLastName', username = 'testUserName', password = 'testPass', confirmPassword = 'testPass') => {
    cy.window({ log: false }).then((win) => win.authService.send("SIGNUP", { firstName, lastName, username, password, confirmPassword }));
    cy.get(sign_in_page.title_text).should('be.visible')
})

Cypress.Commands.add("create_bank_account_API",(bankName, accountNumber, routingNumber) => {
        cy.request("POST", `http://localhost:3001/bankAccounts`, {bankName, accountNumber, routingNumber});
});

Cypress.Commands.add("delete_bank_account_API",(bankAccountId) => {
    cy.request("DELETE", `http://localhost:3001/bankAccounts/${bankAccountId}`);
});

Cypress.Commands.add("add_contact_API", (userId) => {
    cy.request("POST", `http://localhost:3001/contacts`, {contactUserId: userId});
});

Cypress.Commands.add("delete_contact_API", (userId) => {
    cy.request("DELETE", `http://localhost:3001/contacts/${userId}`);
});