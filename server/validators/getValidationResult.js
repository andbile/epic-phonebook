/**
 * Get an object with the result of the form validation
 * @param {boolean} isValid - value is valid
 * @param {string} errorMessage - error message
 * @return {{result: boolean, errorMessage: string}}
 */
module.exports = function (isValid = false, errorMessage = '') {
    return {
        result: isValid,
        errorMessage: errorMessage
    }
}