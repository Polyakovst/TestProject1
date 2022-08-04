import { sign_in_page } from "../selectors/sign_in_page";
import { sign_up_page } from "../selectors/sign_up_page";
import { main_screen_onboarding_popups } from "../selectors/main_screen_onboarding_popups";
import { main_screen } from "../selectors/main_screen";
import {bank_account_screen} from "../selectors/bank_account_screen.js";

describe('just test part of my code', () => {

    before("Go to account creation", () => {
        cy.visit("/");
        cy.get(sign_in_page.sign_up).click();
    });

    it('should Bank Account', () => {
        cy.ui_sign_up();
        cy.ui_sign_in();
        cy.ui_onboarding();
        cy.get(main_screen.bank_accounts_button).click();
        cy.get(bank_account_screen.bank_accounts_list).should('contain.text', 'testbank');
        cy.get(bank_account_screen.delete_bank_account_button).click()
        cy.get(bank_account_screen.bank_accounts_list).should("contain.text", 'testbank').and('contain.text', '(Deleted)')
    })




})