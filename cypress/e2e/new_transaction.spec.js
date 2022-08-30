import { main_screen } from "../selectors/main_screen";
import {transaction_creation_screen} from "../selectors/transaction_creation_screen.js";
import {transactions_screen} from "../selectors/transactions_screen.js";

describe('Test for transactions', () => {

    before("log in", () => {
        cy.visit("/");
        cy.loginByApi();
    });

    it('should search user', () => {
        cy.get(main_screen.new_transaction_button).click({force: true});
        cy.get(transaction_creation_screen.search_field).click({force: true}).type('Katharina_Bernier');
        cy.get(transaction_creation_screen.users_list).should('contain.text', 'Edgar Johns')
        cy.reload();
        cy.get(main_screen.new_transaction_button).click({force: true});
        cy.get(transaction_creation_screen.search_field).click({force: true}).type('625-316-9882');
        cy.get(transaction_creation_screen.users_list).should('contain.text', 'Edgar Johns')
        cy.reload();
        cy.get(main_screen.new_transaction_button).click({force: true});
        cy.get(transaction_creation_screen.search_field).click({force: true}).type('Norene39@yahoo.com');
        cy.get(transaction_creation_screen.users_list).should('contain.text', 'Edgar Johns')
    })

    it('should create new transaction and click request', () => {
        cy.get(main_screen.new_transaction_button).click();
        cy.get(transaction_creation_screen.select_user_edgar_johns).click({force: true});
        cy.get(transaction_creation_screen.amount_field).click().type('10');
        cy.get(transaction_creation_screen.add_a_note_field).click().type('Test request QQQ for Edgar Johnes');
        cy.get(transaction_creation_screen.request_button).click();
        cy.get(transaction_creation_screen.transaction_requested_message).should('contain.text', 'Requested');
    })

    it('should create new transaction and click pay', () => {
        cy.get(transaction_creation_screen.create_another_transaction_button).click()
        cy.get(transaction_creation_screen.select_user_edgar_johns).click({force: true});
        cy.get(transaction_creation_screen.amount_field).click().type('15');
        cy.get(transaction_creation_screen.add_a_note_field).click().type('Test payment WWW for Edgar Johnes');
        cy.get(transaction_creation_screen.button_pay).click();
        cy.get(transaction_creation_screen.transaction_paid_message).should('contain.text', 'Paid')
    })

    it('should show "Please enter a valid amount" and "Add a note" errors', () => {
        cy.get(transaction_creation_screen.create_another_transaction_button).click();
        cy.get(transaction_creation_screen.select_user_edgar_johns).click({force: true});
        cy.get(transaction_creation_screen.amount_field).click();
        cy.get(transaction_creation_screen.add_a_note_field).click();
        cy.get(transaction_creation_screen.amount_field).click();
        cy.get(transaction_creation_screen.amount_validation_message).should('have.text', 'Please enter a valid amount');
        cy.get(transaction_creation_screen.note_validation_message).should('have.text', 'Please enter a note')
    })

    it('should log out and log in as transactions receiver', () => {
        cy.logoutByApi();
        cy.loginByApi('Katharina_Bernier','s3cret');
    })

    it('should show received transactions', () => {
        cy.get(main_screen.mine_transactions_button).click();
        cy.get(transactions_screen.transactions_list).should("contain.text", 'Test request QQQ for Edgar Johnes');
        cy.get(transactions_screen.transactions_list).should("contain.text", 'Test payment WWW for Edgar Johnes');
    })

})