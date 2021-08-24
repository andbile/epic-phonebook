/**
 * Get an object with the result of form validation
 * @param {boolean} isValid - is the value valid
 * @param {string} errorMessage - error message
 * @return {{result: boolean, errorMessage: string}}
 */
module.exports = function (isValid = false, errorMessage = '') {
    return {
        result: isValid,
        errorMessage: errorMessage
    }
}