// regular expressions, used for validate forms
module.exports = regularExpressions = {
    // String in Ukrainian/Russian, characters ., '' and spaces,
    // Expression is used to validate fields, for example: full name, positions, department names, etc.
    baseStringUkrRus: /^[.,'`\-\sА-Яа-яёЁЇїІіЄєҐґ]{3,255}$/,

    // String in Ukrainian/Russian, numbers, characters ., '' and spaces,
    // Expression is used to validate fields, for example: contacts of departments, offices, for example - pay desk 1...10
    baseStringUkrRusWithDigits: /^[.,'`\-\sА-Яа-яёЁЇїІіЄєҐґ\d]{3,255}$/,

    // internal phone number, for example 4025 / 2001
    internalPhoneNumber: /^\d{4}$/,

    // only 2-3 digits or/and dot and 2-3 digits, for example: 10 or 10.10 / 999.10.999
    departmentCode: /^\d{2,3}((\.\d{2,3})?)+$/


}

//module.exports = regularExpressions








