const {DepartmentContact} = require('../models/models')
const fetchDataFromBD = require('../utils/fetchDataFromBD')
const ApiError = require("../error/ApiError");
const PhoneBookValidator = require("../validators/PhoneBookValidator");


class PhoneBookController {
    async getAllPhoneBook(req, res, next) {
        fetchDataFromBD(async () => {
            const phoneBook = await DepartmentContact.findAll({
                order: [
                    ['position', 'ASC']
                ]
            })

            res.json(phoneBook)
        }, next)
    }

    async createPhoneBookEntry(req, res, next) {
        const {position, tel_landline, tel_dect, email, departmentId} = req.body

        const emailLowerCase = email.map(item => item.toLowerCase().trim())

        const validationResult = PhoneBookValidator.fieldsValidation({
            position: position.trim(), tel_landline, tel_dect, email: emailLowerCase
        })
        if (!validationResult.result) return next(ApiError.validationError(validationResult.errorMessage))


        fetchDataFromBD(async () => {
            const phoneBookEntry = await DepartmentContact.create({
                position: position.trim(), tel_landline, tel_dect, email: emailLowerCase, departmentId
            })
            return res.json(phoneBookEntry)
        }, next)
    }


    async deletePhoneBookEntry(req, res, next) {
        const {id} = req.params

        fetchDataFromBD(async () => {
            const result = await DepartmentContact.destroy({where: {id}})

            if (result === 0) return next(ApiError.validationError(`Запис id: ${id} відсутній. Зверніться до адміністратора`))

            return res.json(result)
        }, next)
    }


    async updatePhoneBookEntry(req, res, next) {
        const {id} = req.params
        const {position, tel_landline, tel_dect, email, departmentId} = req.body

        const emailLowerCase = email.map(item => item.toLowerCase().trim())

        const validationResult = PhoneBookValidator.fieldsValidation({
            position: position.trim(), tel_landline, tel_dect, email: emailLowerCase
        })
        if (!validationResult.result) return next(ApiError.validationError(validationResult.errorMessage))

        fetchDataFromBD(async () => {
            const result = await DepartmentContact.update(
                {position: position.trim(), tel_landline, tel_dect, email: emailLowerCase, departmentId},
            {where: {id}}
            )

            if (result[0] === 0) return next(ApiError.validationError(`Запис id: ${id} відсутній. Зверніться до адміністратора`))

            return res.json(result[0])
        }, next)
    }





}

module.exports = new PhoneBookController()