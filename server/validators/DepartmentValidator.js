const validator = require('validator')
const {getValidationResult, validationUsingRegexp, validationUsingValidator} = require('./validationFunctions')

// validation of the "department" form
class DepartmentValidator {
    // code of the department
    static isCode(value) {
        // only 2-3 digits or/and dot and 2-3 digits, example regular expressions: 10 or 10.10 / 999.10.999
        const regExp = /^\d{2,3}((\.\d{2,3})?)+$/
        return validationUsingRegexp(value,  regExp, 'Номер відділу не відповідає шаблону, наприклад: 99 або 99.999')
    }

    // name of the department
    static isName(value) {
        const regExp = /^[,\s\.\-А-Яа-яёЁЇїІіЄєҐґ]{3,255}$/
        return validationUsingRegexp(value,  regExp, 'Назва відділу має містити від 3 до 255 символів українського алфавіту')
    }

    // seller/not seller sign of the department
    static isPosition(value) {
        const validatorBoolean = validator.isBoolean
        return validationUsingValidator((value.toString()),  validatorBoolean, {loose: false}, 'Необхідно поставити відмітку: "Торговий" або "Не торговий"')
    }


    /**
     * Get field validation
     * @param {object} fields - form fields
     * @return {{result: boolean, errorMessage: string}}
     */
    static fieldsValidation(fields = {}){
        const isCode = DepartmentValidator.isCode(fields.code)
        if (!isCode.result) return isCode

        const isName = DepartmentValidator.isName(fields.name)
        if (!isName.result) return isName

        const isPosition = DepartmentValidator.isPosition(fields.is_seller)
        if (!isPosition.result) return isPosition

        return getValidationResult(true)
    }
}

module.exports = DepartmentValidator