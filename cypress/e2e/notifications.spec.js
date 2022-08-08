import { sign_in_page } from "../selectors/sign_in_page";
import { main_screen } from "../selectors/main_screen";
import {transaction_creation_screen} from "../selectors/transaction_creation_screen.js";
import {transactions_screen} from "../selectors/transactions_screen.js";
import {notifications_screen} from "../selectors/notifications_screen.js";

describe('Test for transactions', () => {

    before("log in", () => {
        cy.clearCookies();
        cy.visit("/");
        cy.get(sign_in_page.username_input_field).click().type('Allie2');
        cy.get(sign_in_page.password_input_field).click().type('s3cret');
        cy.get(sign_in_page.signIn_button).click()
    })

    it('User A should send payment and request to user B/like and comment transaction of User B/like and comment transaction between User B and C', () => {
        cy.get(transactions_screen.first_transaction_in_the_list).click({force: true});
        cy.get(transactions_screen.like_button).click({force: true});
        cy.get(transactions_screen.comment_field).click().type('Test comment for transaction{enter}');
        cy.get(main_screen.home_button).click();
        cy.get(transactions_screen.transaction_between_b_and_c).click({force: true});
        cy.get(transactions_screen.like_button_2).click({force: true});
        cy.get(transactions_screen.comment_field_2).click().type('Test comment for transaction(B to C){enter}');
        cy.get(main_screen.new_transaction_button).click();
        cy.get(transaction_creation_screen.select_user_arely_kertzmann).click();
        cy.get(transaction_creation_screen.amount_field).click().type('10');
        cy.get(transaction_creation_screen.add_a_note_field).click().type('Test request for Arely Kertzmann');
        cy.get(transaction_creation_screen.request_button).click();
        cy.get(transaction_creation_screen.create_another_transaction_button).click();
        cy.get(transaction_creation_screen.select_user_arely_kertzmann).click();
        cy.get(transaction_creation_screen.amount_field).click().type('15');
        cy.get(transaction_creation_screen.add_a_note_field).click().type('Test payment for Arely Kertzmann');
        cy.get(transaction_creation_screen.button_pay).click();
        cy.get(main_screen.logout_button).click();
    })

    it('User B should see notifications(like, comment, request, payment)', () => {
        cy.get(sign_in_page.username_input_field).click().type('Tavares_Barrows');
        cy.get(sign_in_page.password_input_field).click().type('s3cret');
        cy.get(sign_in_page.signIn_button).click();
        cy.get(main_screen.notifications_button).click();
        cy.get(notifications_screen.notifications_list).should('contain.text', 'Kaylin Homenick liked a transaction.');
        cy.get(notifications_screen.notifications_list).should('contain.text', 'Kaylin Homenick commented on a transaction.')
        cy.get(notifications_screen.notifications_list).should('contain.text', 'Kaylin Homenick requested payment.')
        cy.get(notifications_screen.notifications_list).should('contain.text', 'Arely Kertzmann received payment.')
        cy.get(main_screen.logout_button).click();
    })

    it('User C should see notifications(like, comment)', () => {
        cy.get(sign_in_page.username_input_field).click().type('Katharina_Bernier');
        cy.get(sign_in_page.password_input_field).click().type('s3cret');
        cy.get(sign_in_page.signIn_button).click();
        cy.get(main_screen.notifications_button).click();
        cy.get(notifications_screen.notifications_list).should('contain.text', 'Kaylin Homenick liked a transaction.');
        cy.get(notifications_screen.notifications_list).should('contain.text', 'Kaylin Homenick commented on a transaction.')
        })

})