const validator = require('validator')
const regularExpressions = require("./regularExpressions");
const {validateArrayUsingValidator} = require("./validationFunctions");
const {validateStringUsingValidator} = require("./validationFunctions");
const {getValidationResult, validateStringUsingRegexp} = require('./validationFunctions')

class EmployeeValidator {

    // last/first/patronymic name, patronymic
    static baseStringUkrRus(value, emptyValueIsAllowed = false) {
        const errorMessage = `Ім'я/прізвище/по-батькові/посада має містити від 3 до 255 символів українського алфавіту`
        return validateStringUsingRegexp(value, regularExpressions.baseStringUkrRus, errorMessage, emptyValueIsAllowed)
    }

    // mobile phone
    static isMobilePhone(value, emptyValueIsAllowed = false) {
        const errorMessage = 'Некоректний мобільний телефонний номер'
        const mobilePhoneValidator = validator.isMobilePhone
        const options = [
            ['uk-UA'], {strictMode: true}
        ]

        if (typeof value === 'string')
            return validateStringUsingValidator(value, mobilePhoneValidator, options, errorMessage, emptyValueIsAllowed)

        if (Array.isArray(value))
            return validateArrayUsingValidator(value, mobilePhoneValidator, options, errorMessage, emptyValueIsAllowed)

        return getValidationResult(false, errorMessage)
    }


    /**
     * Get field validation
     * @param {object} fields - form fields
     * @return {{result: boolean, errorMessage: string}}
     */
    static fieldsValidation(fields = {}) {

        const isLastName = EmployeeValidator.baseStringUkrRus(fields.last_name)
        if (!isLastName.result) return isLastName

        const isFirstName = EmployeeValidator.baseStringUkrRus(fields.first_name)
        if (!isFirstName.result) return isFirstName

        const isPatronymicName = EmployeeValidator.baseStringUkrRus(fields.patronymic_name)
        if (!isPatronymicName.result) return isPatronymicName

        const isPosition = EmployeeValidator.baseStringUkrRus(fields.position, true)
        if (!isPosition.result) return isPosition

        const isPhone = EmployeeValidator.isMobilePhone(fields.tel_mobile, true)
        if (!isPhone.result) return isPhone

        return getValidationResult(true)
    }
}


module.exports = EmployeeValidator