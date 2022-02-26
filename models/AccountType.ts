/**
 * @file AccountType Data type which represents the type of the User's account.
 */

/**
 * @class AccountType an enum representing the type of a User's Tuiter Account that is either Personal, Academic, or Professional.
 * @property {string} Personal a personal account
 * @property {string} Academic an academic account
 * @property {string} Professional a professional account
 */

enum AccountType {
    Personal = 'PERSONAL',
    Academic = 'ACADEMIC',
    Professional = 'PROFESSIONAL'
}

export default AccountType;