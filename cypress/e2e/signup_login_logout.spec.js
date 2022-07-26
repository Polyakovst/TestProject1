import { sign_in_page } from "../selectors/sign_in_page";
import { sign_up_page } from "../selectors/sign_up_page";
import { main_screen_onboarding_popups } from "../selectors/main_screen_onboarding_popups";
import { main_screen } from "../selectors/main_screen";

describe('Tests for signup, login, logout', () => {

    before("Go to signup page", () => {
        cy.visit("/");
        cy.get(sign_in_page.sign_up).click();
    });

    it('should show "Sign up" text', () => {
        cy.get(sign_up_page.sign_up_text).should('be.visible').and('have.text', 'Sign Up')
    })

    it('should fill the "firstname", "lastname", "username", "password" and "repeat password" fields', () => {
        cy.get(sign_up_page.first_name_field).click().type('testfirstname');
        cy.get(sign_up_page.last_name_field).click().type('testlastname');
        cy.get(sign_up_page.user_name_field).click().type('testusername');
        cy.get(sign_up_page.password_field).click().type('testpassword');
        cy.get(sign_up_page.confirm_password_field).click().type('testpassword')
    })

    it('should click the "sign up" button', () => {
        cy.get(sign_up_page.sign_up_button).click()
    })

    it('should fill the "Username" and "Password" fields on the "sign in" screen', () => {
        cy.get(sign_in_page.username_input_field).click().type('testusername');
        cy.get(sign_in_page.password_input_field).click().type('testpassword')
    })

    it('should click the "Sign in" button', () => {
        cy.get(sign_in_page.signIn_button).click()
    })

    it('should click the "Next" button in the "Get Started with Real World App\n"`popup', () => {
        cy.get(main_screen_onboarding_popups.next_button).click()
    })

    it('should fill the "bank name", "routing number" and "account number" fields in the "Create Bank Account\n" popup', () => {
        cy.get(main_screen_onboarding_popups.bank_name_field).click().type('testbank');
        cy.get(main_screen_onboarding_popups.routing_number_field).click().type('145789845');
        cy.get(main_screen_onboarding_popups.account_number_field).click().type('1122334455');
    })

    it('should click the "Save" button in the "Create Bank Account\n" popup', () => {
        cy.get(main_screen_onboarding_popups.bank_acc_save_button).click()
    })

    it('should click the "Done" button in the "Finished" popup', () => {
        cy.get(main_screen_onboarding_popups.done_button).click()
    })

    it('should click the "Logout" button in the main screen', () => {
        cy.get(main_screen.logout_button).click()
    })

    it('should show "Sign in" title', () => {
        cy.get(sign_in_page.title_text).should('be.visible').and('have.text', 'Sign in')
    })
})