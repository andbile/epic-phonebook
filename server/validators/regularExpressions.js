// regular expressions, used for validate forms
const regularExpressions = {
    // Строка на украинском/русском языке, включая символы .,'` и пробелы
    // используется при валидации полей: ПІБ, должностей, названий отделов и т.п.
    baseStringUkrRus : /^[.,'`\-\sА-Яа-яёЁЇїІіЄєҐґ]{3,255}$/,


}

module.exports = regularExpressions








