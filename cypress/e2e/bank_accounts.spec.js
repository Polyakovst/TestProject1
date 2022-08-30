import { sign_in_page } from "../selectors/sign_in_page";
import { sign_up_page } from "../selectors/sign_up_page";
import { main_screen_onboarding_popups } from "../selectors/main_screen_onboarding_popups";
import { main_screen } from "../selectors/main_screen";
import {bank_account_screen} from "../selectors/bank_account_screen.js";

describe('Tests bank accounts(create, delete, errors)', () => {

    before("Go to account creation", () => {
        cy.visit("/");
        cy.get(sign_in_page.sign_up).click();
        cy.get(sign_up_page.first_name_field).click().type('testfirstnametest');
        cy.get(sign_up_page.last_name_field).click().type('testlastnametest');
        cy.get(sign_up_page.user_name_field).click().type('testusernametest');
        cy.get(sign_up_page.password_field).click().type('testpasswordtest');
        cy.get(sign_up_page.confirm_password_field).click().type('testpasswordtest');
        cy.get(sign_up_page.sign_up_button).click();
        cy.get(sign_in_page.username_input_field).click().type('testusernametest');
        cy.get(sign_in_page.password_input_field).click().type('testpasswordtest');
        cy.get(sign_in_page.signIn_button).click();
        cy.get(main_screen_onboarding_popups.next_button).click();
    });

    it('should show validation errors for short "Bank name", "Routing number" and "Account number" values', () => {
        cy.get(main_screen_onboarding_popups.bank_name_field).click().type('qwe');
        cy.get(main_screen_onboarding_popups.short_bank_name_error).should('be.visible').and('have.text','Must contain at least 5 characters');
        cy.get(main_screen_onboarding_popups.routing_number_field).click().type('123');
        cy.get(main_screen_onboarding_popups.short_routing_number_error).should('be.visible').and('have.text','Must contain a valid routing number');
        cy.get(main_screen_onboarding_popups.account_number_field).click().type('123');
        cy.get(main_screen_onboarding_popups.short_account_number_error).should('be.visible').and('have.text','Must contain at least 9 digits');
    })

    it('should show validation errors for long "Routing number" and "Account number" values', () => {
        cy.get(main_screen_onboarding_popups.routing_number_field).click().type('123456789101112');
        cy.get(main_screen_onboarding_popups.short_routing_number_error).should('be.visible').and('have.text','Must contain a valid routing number');
        cy.get(main_screen_onboarding_popups.account_number_field).click().type('123456789101112');
        cy.get(main_screen_onboarding_popups.short_account_number_error).should('be.visible').and('have.text','Must contain no more than 12 digits');
    })

    it('should show errors about mandatory data entry in "Bank name", "Routing number" and "Account number" values', () => {
        cy.get(main_screen_onboarding_popups.bank_name_field).clear();
        cy.get(main_screen_onboarding_popups.short_bank_name_error).should('be.visible').and('have.text','Enter a bank name');
        cy.get(main_screen_onboarding_popups.routing_number_field).clear();
        cy.get(main_screen_onboarding_popups.short_routing_number_error).should('be.visible').and('have.text','Enter a valid bank routing number');
        cy.get(main_screen_onboarding_popups.account_number_field).clear();
        cy.get(main_screen_onboarding_popups.short_account_number_error).should('be.visible').and('have.text','Enter a valid bank account number');
    })

    it('should fill "Bank name", "Routing number" and "Account number" fields and create account', () => {
        cy.get(main_screen_onboarding_popups.bank_name_field).click().type('testbankq');
        cy.get(main_screen_onboarding_popups.routing_number_field).click().type('145789849');
        cy.get(main_screen_onboarding_popups.account_number_field).click().type('1122334459');
        cy.get(main_screen_onboarding_popups.bank_acc_save_button).click();
        cy.get(main_screen_onboarding_popups.done_button).click();
    })

    it('should delete Bank Account', () => {
        cy.get(main_screen.bank_accounts_button).click();
        cy.get(bank_account_screen.bank_accounts_list).should('contain.text', 'testbankq');
        cy.get(bank_account_screen.delete_bank_account_button).click()
        cy.get(bank_account_screen.bank_accounts_list).should("contain.text", 'testbankq').and('contain.text', '(Deleted)')
    })

    it('should open "Bank accounts" creation screen', () => {
        cy.get(bank_account_screen.create_button).click({force: true});
    })

    it('should show validation errors for short "Bank name", "Routing number" and "Account number" values', () => {
        cy.get(main_screen_onboarding_popups.bank_name_field).click().type('qwe');
        cy.get(main_screen_onboarding_popups.short_bank_name_error).should('be.visible').and('have.text','Must contain at least 5 characters');
        cy.get(main_screen_onboarding_popups.routing_number_field).click().type('123');
        cy.get(main_screen_onboarding_popups.short_routing_number_error).should('be.visible').and('have.text','Must contain a valid routing number');
        cy.get(main_screen_onboarding_popups.account_number_field).click().type('123');
        cy.get(main_screen_onboarding_popups.short_account_number_error).should('be.visible').and('have.text','Must contain at least 9 digits');
    })

    it('should show validation errors for long "Routing number" and "Account number" values', () => {
        cy.get(main_screen_onboarding_popups.routing_number_field).click().type('123456789101112');
        cy.get(main_screen_onboarding_popups.short_routing_number_error).should('be.visible').and('have.text','Must contain a valid routing number');
        cy.get(main_screen_onboarding_popups.account_number_field).click().type('123456789101112');
        cy.get(main_screen_onboarding_popups.short_account_number_error).should('be.visible').and('have.text','Must contain no more than 12 digits');
    })

    it('should show errors about mandatory data entry in "Bank name", "Routing number" and "Account number" values', () => {
        cy.get(main_screen_onboarding_popups.bank_name_field).clear();
        cy.get(main_screen_onboarding_popups.short_bank_name_error).should('be.visible').and('have.text', 'Enter a bank name');
        cy.get(main_screen_onboarding_popups.routing_number_field).clear();
        cy.get(main_screen_onboarding_popups.short_routing_number_error).should('be.visible').and('have.text', 'Enter a valid bank routing number');
        cy.get(main_screen_onboarding_popups.account_number_field).clear();
        cy.get(main_screen_onboarding_popups.short_account_number_error).should('be.visible').and('have.text', 'Enter a valid bank account number');
    })

})