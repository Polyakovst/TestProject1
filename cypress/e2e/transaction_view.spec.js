import { sign_in_page } from "../selectors/sign_in_page";
import { main_screen } from "../selectors/main_screen";
import {transaction_creation_screen} from "../selectors/transaction_creation_screen.js";
import {transactions_screen} from "../selectors/transactions_screen.js";

describe('Tests for transactions view ', () => {

    beforeEach("log in", () => {
        cy.clearCookies();
        cy.visit("/");
        cy.get(sign_in_page.username_input_field).click().type('Allie2');
        cy.get(sign_in_page.password_input_field).click().type('s3cret');
        cy.get(sign_in_page.signIn_button).click()
    })

    it('Transactions navigation tabs should be hidden on a transaction view page + user should be able to like and comment transaction', () => {
        cy.get(transactions_screen.everyone_tab).should('be.visible');
        cy.get(transactions_screen.friends_tab).should('be.visible');
        cy.get(transactions_screen.mine_tab).should('be.visible');
        cy.get(transactions_screen.first_transaction_in_the_list).click({force: true});
        cy.get(transactions_screen.everyone_tab).should('not.exist');
        cy.get(transactions_screen.friends_tab).should('not.exist');
        cy.get(transactions_screen.mine_tab).should('not.exist');
        cy.get(transactions_screen.like_counter).should("contain", '0');
        cy.get(transactions_screen.like_button).click({force: true});
        cy.get(transactions_screen.like_counter).should("contain.text", '1');
        cy.get(main_screen.home_button).click();
        cy.get(transactions_screen.first_transaction_in_the_list).click({force: true});
        cy.get(transactions_screen.comment_field).click().type('Test comment for transaction{enter}');
        cy.get(transactions_screen.comments_list).should('contain.text', 'Test comment for transaction');
        cy.get(main_screen.logout_button).click();
    })

    it('User should be able to accept a transaction request + Accept/reject buttons shouldn\'t exist on completed request', () => {
        cy.get(main_screen.new_transaction_button).click();
        cy.get(transaction_creation_screen.select_user_edgar_johns).click();
        cy.get(transaction_creation_screen.amount_field).click().type('11');
        cy.get(transaction_creation_screen.add_a_note_field).click().type('Accept request');
        cy.get(transaction_creation_screen.request_button).click();
        cy.get(main_screen.logout_button).click();
        cy.get(sign_in_page.username_input_field).click().type('Katharina_Bernier');
        cy.get(sign_in_page.password_input_field).click().type('s3cret');
        cy.get(sign_in_page.signIn_button).click();
        cy.get(transactions_screen.mine_tab).click();
        cy.get(transactions_screen.transactions_list).should("contain.text", 'Accept request').click();
        cy.get(transactions_screen.accept_request_button).click();
        cy.get(transactions_screen.accept_request_button).should('not.exist');
        cy.get(transactions_screen.reject_request_button).should('not.exist');
    })

    it('User should be able to reject a transaction request + Accept/reject buttons shouldn\'t exist on completed request', () => {
        cy.get(main_screen.new_transaction_button).click();
        cy.get(transaction_creation_screen.select_user_edgar_johns).click();
        cy.get(transaction_creation_screen.amount_field).click().type('22');
        cy.get(transaction_creation_screen.add_a_note_field).click().type('Reject request');
        cy.get(transaction_creation_screen.request_button).click();
        cy.get(main_screen.logout_button).click();
        cy.get(sign_in_page.username_input_field).click().type('Katharina_Bernier');
        cy.get(sign_in_page.password_input_field).click().type('s3cret');
        cy.get(sign_in_page.signIn_button).click();
        cy.get(transactions_screen.mine_tab).click();
        cy.get(transactions_screen.transactions_list).should("contain.text", 'Reject request').click();
        cy.get(transactions_screen.reject_request_button).click();
        cy.get(transactions_screen.accept_request_button).should('not.exist');
        cy.get(transactions_screen.reject_request_button).should('not.exist');
    })

})