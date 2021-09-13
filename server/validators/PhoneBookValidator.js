const validator = require('validator')
const regularExpressions = require("./regularExpressions");
const {validateArrayUsingValidator} = require("./validationFunctions");
const {validateArrayUsingRegexp} = require("./validationFunctions");
const {getValidationResult, validateStringUsingRegexp, validateStringUsingValidator} = require('./validationFunctions')

// validation of the "department phone book" form
class PhoneBookValidator {
    // employee position or employee location
    static isPosition(value, emptyValueIsAllowed = false) {
        return validateStringUsingRegexp(value, regularExpressions.baseStringUkrRusWithDigits, 'Посада має містити від 3 до 255 символів українського алфавіту та цифри')
    }


    // phone landline/dect
    static isInternalTel(value, emptyValueIsAllowed = false) {
        if (typeof value === 'string') return validateStringUsingRegexp(value, regularExpressions.internalPhoneNumber, 'Телефон відділу має містити 4 цифри', emptyValueIsAllowed)

        if (Array.isArray(value))
            return validateArrayUsingRegexp(value, regularExpressions.internalPhoneNumber, 'Телефон відділу має містити 4 цифри', emptyValueIsAllowed)
    }

    // email
    static isEmail(value, emptyValueIsAllowed = false) {
        const emailValidator = validator.isEmail

        if (typeof value === 'string') return validateStringUsingValidator(value, emailValidator, [], 'Некоректна адреса поштової скриньки', emptyValueIsAllowed)

        if (Array.isArray(value))
            return validateArrayUsingValidator(value, emailValidator, [], 'Некоректна адреса поштової скриньки', emptyValueIsAllowed)
    }


    /**
     * Get field validation
     * @param {object} fields - form fields
     * @return {{result: boolean, errorMessage: string}}
     */
    static fieldsValidation(fields = {}) {
        const isPosition = PhoneBookValidator.isPosition(fields.position)
        if (!isPosition.result) return isPosition

        const isInternalTelLandline = PhoneBookValidator.isInternalTel(fields.tel_landline, true)
        if (!isInternalTelLandline.result) return isInternalTelLandline

        const isInternalTelDect = PhoneBookValidator.isInternalTel(fields.tel_dect, true)
        if (!isInternalTelDect.result) return isInternalTelDect

        const isEmail = PhoneBookValidator.isEmail(fields.email, true)
        if (!isEmail.result) return isEmail

        return getValidationResult(true)
    }
}

module.exports = PhoneBookValidator