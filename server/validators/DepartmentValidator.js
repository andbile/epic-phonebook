const validator = require('validator')
const getValidationResult = require('./getValidationResult')

// validation of the "department" form
class DepartmentValidator {
    // code of the department
    static isCode(value) {
        // only 2-3 digits or/and dot and 2-3 digits, example regular expressions: 10 or 10.10 / 999.10.999
        const regExp = /^\d{2,3}((\.\d{2,3})?)+$/
        return regExp.test(value)
            ? getValidationResult(true)
            : getValidationResult(false, 'Номер відділу не відповідає шаблону, наприклад: 99 або 99.999')
    }

    // name of the department
    static isName(value) {
        const regExp = /^[,\s\.А-Яа-яёЁЇїІіЄєҐґ]{3,255}$/
        return regExp.test(value)
            ? getValidationResult(true)
            : getValidationResult(false, 'Назва відділу має містити від 3 до 255 символів українського алфавіту')
    }

    // seller/not seller sign
    static isPosition(value) {
        return validator.isBoolean(value.toString(), {loose: false})
            ? getValidationResult(true)
            : getValidationResult(false, 'Необхідно поставити відмітку: "Торговий" або "Не торговий"')
    }
}

module.exports = DepartmentValidator