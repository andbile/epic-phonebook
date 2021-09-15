const validator = require('validator')
const {getValidationResult, validateStringUsingValidator} = require('./validationFunctions')

class RegistrationValidator {
    static isEmail(value, emptyValueIsAllowed = false) {
        const emailValidator = validator.isEmail
        const errorMessage = 'Некоректна адреса поштової скриньки'

        return validateStringUsingValidator(value, emailValidator, [], errorMessage, emptyValueIsAllowed)
    }

    static isPassword(value, emptyValueIsAllowed = false) {
        const isStrongPassword = validator.isStrongPassword
        const options = [
            {
                minLength: 8,
                minLowercase: 1,
                minUppercase: this.minLowercase,
                minNumbers: 1,
                minSymbols: 0,
            }
        ]
        const errorMessage = `Пароль має містити не меньше ${options[0].minLength} символів та принаймі 
            ${options[0].minNumbers} цифру, ${options[0].minLowercase} символ малої та заголовної букви`

        return validateStringUsingValidator(value, isStrongPassword, options, errorMessage, emptyValueIsAllowed)
    }

    /**
     * Get field validation
     * @param {object} fields - form fields
     * @return {{result: boolean, errorMessage: string}}
     */
    static fieldsValidation(fields = {}) {
        const isEmail = RegistrationValidator.isEmail(fields.email)
        if (!isEmail.result) return isEmail

        const isPassword = RegistrationValidator.isPassword(fields.password)
        if (!isPassword.result) return isPassword


        return getValidationResult(true)
    }
}

module.exports = RegistrationValidator