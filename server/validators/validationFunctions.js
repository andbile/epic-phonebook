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
 * @param {boolean} emptyValueIsAllowed - field is optional to fill
 * @return {{result: boolean, errorMessage: string}}
 */
const validateStringUsingRegexp = (value, regExp, errorMessage = '', emptyValueIsAllowed = false) => {
    if (typeof value === 'string') {
        // field is optional to fill
        if (emptyValueIsAllowed && value.trim() === '') {
            return getValidationResult(true)
        }

        return regExp.test(value)
            ? getValidationResult(true)
            : getValidationResult(false, errorMessage)
    }else {
        return getValidationResult(false, errorMessage)
    }
}

/**
 * Validation array using regular expressions
 * @param {array} value - value for validation
 * @param {RegExp} regExp - regular expression
 * @param {string} errorMessage - error message
 * @param {boolean} emptyValueIsAllowed - field is optional to fill
 * @return {{result: boolean, errorMessage: string}}
 */
const validateArrayUsingRegexp = (value, regExp, errorMessage = '', emptyValueIsAllowed = false) => {
    if (Array.isArray(value)) {
        // field is optional to fill
        if (emptyValueIsAllowed && value.length === 0) return getValidationResult(true)

        for (let i = 0; i < value.length; i++) {
            const validationResult = validateStringUsingRegexp(value[i], regExp, errorMessage, emptyValueIsAllowed)
            // if an error, we stop the iterating and return the error
            if (!validationResult.result) return validationResult
        }
        return getValidationResult(true)
    }
}



/**
 * Validation string using other libraries
 * @param {string} value - value for validation
 * @param {function} validatorFunc - validation function
 * @param {array} validatorOptions - validation options
 * @param {string} errorMessage - error message
 * @param {boolean} emptyValueIsAllowed - field is optional to fill
 * @return {{result: boolean, errorMessage: string}}
 */
const validateStringUsingValidator = (value, validatorFunc, validatorOptions = [], errorMessage = '', emptyValueIsAllowed = false) => {
    if (typeof value === 'string') {
        // field is optional to fill
        if (emptyValueIsAllowed && value.trim() === '') {
            return getValidationResult(true)
        }

        return validatorFunc(value, ...validatorOptions)
            ? getValidationResult(true)
            : getValidationResult(false, errorMessage)
    } else {
        return getValidationResult(false, errorMessage)
    }
}


/**
 * Validation array using other libraries
 * @param {array} value - value for validation
 * @param {function} validatorFunc - validation function
 * @param {array} validatorOptions - validation options
 * @param {string} errorMessage - error message
 * @param {boolean} emptyValueIsAllowed - field is optional to fill
 * @return {{result: boolean, errorMessage: string}}
 */
const validateArrayUsingValidator = (value, validatorFunc, validatorOptions = [], errorMessage = '', emptyValueIsAllowed = false) => {
    if (Array.isArray(value)) {
        // field is optional to fill
        if (emptyValueIsAllowed && value.length === 0) return getValidationResult(true)

        for (let i = 0; i < value.length; i++) {
            const validationResult = validateStringUsingValidator(value[i], validatorFunc, validatorOptions, errorMessage, emptyValueIsAllowed)
            // if an error, we stop the iterating and return the error
            if (!validationResult.result) return validationResult
        }
        return getValidationResult(true)
    }
}


module.exports = {
    getValidationResult,
    validateStringUsingRegexp,
    validateArrayUsingRegexp,
    validateStringUsingValidator,
    validateArrayUsingValidator
}