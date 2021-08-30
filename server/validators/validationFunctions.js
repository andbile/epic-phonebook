/**
 * Get an object with the result of the form validation
 * @param {boolean} isValid - value is valid
 * @param {string} errorMessage - error message
 * @return {{result: boolean, errorMessage: string}}
 */
const getValidationResult = (isValid = false, errorMessage = '') => {
    return {
        result: isValid,
        errorMessage: errorMessage
    }
}

/**
 * Validation using regular expressions
 * @param {string} value - value for validation
 * @param {RegExp} regExp - regular expression
 * @param {string} errorMessage - error message
 * @param {boolean} isEmptyValueAllowed - field is optional to fill
 * @return {{result: boolean, errorMessage: string}}
 */
const validationUsingRegexp = (value, regExp, errorMessage = '', isEmptyValueAllowed = false) => {
    // field is optional to fill
    if(isEmptyValueAllowed && value.trim() === ''){
        return getValidationResult(true)
    }

    return regExp.test(value)
        ? getValidationResult(true)
        : getValidationResult(false, errorMessage)
}

/**
 * Validation using other libraries
 * @param {string} value - value for validation
 * @param {function} validatorFunc - validation function
 * @param {object} validatorOptions - validation options
 * @param {string} errorMessage - error message
 * @param {boolean} isEmptyValueAllowed - field is optional to fill
 * @return {{result: boolean, errorMessage: string}}
 */
const validationUsingValidator = (value, validatorFunc, validatorOptions = {}, errorMessage = '', isEmptyValueAllowed = false) => {
    // field is optional to fill
    if(isEmptyValueAllowed && value.trim() === ''){
        return getValidationResult(true)
    }

    return validatorFunc(value, validatorOptions)
        ? getValidationResult(true)
        : getValidationResult(false, errorMessage)
}


module.exports = {
    getValidationResult,
    validationUsingRegexp,
    validationUsingValidator
}