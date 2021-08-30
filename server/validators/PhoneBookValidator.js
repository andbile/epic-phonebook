const validator = require('validator')
const {getValidationResult, validationUsingRegexp, validationUsingValidator} = require('./validationFunctions')

// validation of the "department phone book" form
class PhoneBookValidator {
    // employee position or employee location
    static isPosition(value) {
        const regExp = /^[,\s\.\-А-Яа-яёЁЇїІіЄєҐґ]{3,255}$/
        return validationUsingRegexp(value,  regExp, 'Посада має містити від 3 до 255 символів українського алфавіту')
    }

    // phone / email
    // accepts a string or an array
    static isInternalTel(value) {
        // only 4 digits
        const regExp = /^\d{4}$/

        if (typeof value === 'string') return validationUsingRegexp(value,  regExp, 'Телефон відділу має містити 4 цифри', true)

        if (Array.isArray(value)) {
            for (let i = 0; i < value.length; i++) {
                const validationResult = validationUsingRegexp(value[i], regExp, 'Телефон відділу має містити 4 цифри')
                // if an error, we stop the iterating and return the error
                if(!validationResult.result) return validationResult
            }
            // else return successful result
            return getValidationResult(true)
        }
    }

    // email
    // accepts a string or an array
    static isEmail(value) {

        const validatorEmail = validator.isEmail

        if (typeof value === 'string') return validationUsingValidator(value,  validatorEmail, {},'Некоректна адреса поштової скриньки')

        if (Array.isArray(value)) {
            for (let i = 0; i < value.length; i++) {
                const validationResult = validationUsingValidator(value[i], validatorEmail, {},'Некоректна адреса поштової скриньки')
                // if an error, we stop the iterating and return the error
                if(!validationResult.result) return validationResult
            }
            // else return successful result
            return getValidationResult(true)
        }
    }


    /**
     * Get field validation
     * @param {object} fields - form fields
     * @return {{result: boolean, errorMessage: string}}
     */
    static fieldsValidation(fields = {}) {
        const isPosition = PhoneBookValidator.isPosition(fields.position)
        if (!isPosition.result) return isPosition

        const isInternalTelLandline = PhoneBookValidator.isInternalTel(fields.tel_landline)
        if (!isInternalTelLandline.result) return isInternalTelLandline

        const isInternalTelDect = PhoneBookValidator.isInternalTel(fields.tel_dect)
        if (!isInternalTelDect.result) return isInternalTelDect

         const isEmail = PhoneBookValidator.isEmail(fields.email)
         if (!isEmail.result) return isEmail

        return getValidationResult(true)
    }
}

module.exports = PhoneBookValidator