/**
 * @file Marital Status of a user.
 */

/**
 * @class MaritalStatus A data type which is an enum class
 * representing the marital status of the user.
 * @property {string} Married indicates that the User is married
 * @property {string} Single indicates that the User is single
 * @property {string} Widowed indicates that the User is widowed
 */

enum MaritalStatus {
    Married = 'MARRIED',
    Single = 'SINGLE',
    Widowed = 'WIDOWED'
}

export default MaritalStatus;