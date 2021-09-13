const validator = require('validator')
const regularExpressions = require("./regularExpressions");
const {getValidationResult, validateStringUsingRegexp, validateStringUsingValidator} = require('./validationFunctions')

// validation of the "department" form
class DepartmentValidator {
    // code of the department
    static isCode(value, emptyValueIsAllowed = false) {
        return validateStringUsingRegexp(value,  regularExpressions.departmentCode, 'Номер відділу не відповідає шаблону, наприклад: 99 або 99.999', emptyValueIsAllowed)
    }

    // name of the department
    static isName(value, emptyValueIsAllowed = false) {
        return validateStringUsingRegexp(value,  regularExpressions.baseStringUkrRus, 'Назва відділу має містити від 3 до 255 символів українського алфавіту', emptyValueIsAllowed)
    }

    // seller/not seller sign of the department
    static isPosition(value, emptyValueIsAllowed = false) {
        const validatorBoolean = validator.isBoolean
        const options = [
            {loose: false}
        ]

        return validateStringUsingValidator((value.toString()),  validatorBoolean, options, 'Необхідно поставити відмітку: "Торговий" або "Не торговий"', emptyValueIsAllowed)
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