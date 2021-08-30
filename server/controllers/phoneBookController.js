const {DepartmentContact} = require('../models/models')
const fetchDataFromBD = require('../utils/fetchDataFromBD')
const ApiError = require("../error/ApiError");
const PhoneBookValidator = require("../validators/PhoneBookValidator");


class PhoneBookController {
    async getAllPhoneBook(req, res, next) {
        fetchDataFromBD(async () => {
            const phoneBook = await DepartmentContact.findAll({
                attributes: ['id', 'position', 'tel_dect', 'tel_landline', 'email', 'departmentId'],
                order: [
                    ['position', 'ASC']
                ]
            })

            res.json(phoneBook)
        }, req, res, next)
    }

    async createPhoneBookItem(req, res, next) {
        const {position, tel_landline, tel_dect, email, departmentId} = req.body

        const emailLowerCase = email.map(item => item.toLowerCase().trim())

        const validationResult = PhoneBookValidator.fieldsValidation({
            position: position.trim(), tel_landline, tel_dect, email: emailLowerCase, departmentId
        })
        if (!validationResult.result) return next(ApiError.badRequest(validationResult.errorMessage))


        fetchDataFromBD(async () => {
            const itemPhoneBook = await DepartmentContact.create({
                position: position.trim(), tel_landline, tel_dect, email: emailLowerCase, departmentId
            })
            return res.json(itemPhoneBook)
        }, req, res, next)
    }











    async deleteItemOfPhoneBook(req, res) {
        const {id} = req.params
        const itemOfPhoneBook = await DepartmentContact.destroy({where: {id}})
        res.json(itemOfPhoneBook)
    }
}

module.exports = new PhoneBookController()