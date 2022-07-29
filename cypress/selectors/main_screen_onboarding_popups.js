export const main_screen_onboarding_popups = {
    //Locators for elements in the start popups during the first login

    //'Get Started with Real World App' popup:
    next_button: '[data-test="user-onboarding-next"]',

    // 'Create Bank Account' popup:
    bank_name_field: '[id="bankaccount-bankName-input"]',
    routing_number_field: '[id="bankaccount-routingNumber-input"]',
    account_number_field: '[id="bankaccount-accountNumber-input"]',
    bank_acc_save_button: '[data-test="bankaccount-submit"]',
    short_bank_name_error: '[id="bankaccount-bankName-input-helper-text"]',
    short_routing_number_error: '[id="bankaccount-routingNumber-input-helper-text"]',
    short_account_number_error: '[id="bankaccount-accountNumber-input-helper-text"]',

    //'Finished' popup
    done_button: '[data-test="user-onboarding-next"]'
}