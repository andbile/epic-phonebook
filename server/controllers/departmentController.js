const ApiError = require("../error/ApiError");
const {Department, Employee} = require('../models/models')
const DepartmentValidator = require('../validators/DepartmentValidator')
const fetchDataFromBD = require('../utils/fetchDataFromBD')

class DepartmentController {
    async getAllDepartment(req, res, next) {
        fetchDataFromBD(async () => {
            const departments = await Department.findAll({
                order: [
                    ['is_seller', 'DESC'],
                    ['code', 'ASC']
                ]
            })
            res.json(departments)
        }, req, res, next)
    }


    async createDepartment(req, res, next) {
        const {code, name, is_seller} = req.body

        const validationResult = DepartmentValidator.fieldsValidation({
            code, name: name.trim(), is_seller
        })
        if (!validationResult.result) return next(ApiError.badRequest(validationResult.errorMessage))

        fetchDataFromBD(async () => {
            const department = await Department.create({code, name: name.trim(), is_seller})
            return res.json(department)
        }, req, res, next)
    }


    async deleteDepartment(req, res, next) {
        const {id} = req.params

        // get number of employees
        const numberEmployees = await fetchDataFromBD(async () => {
            return await Employee.count({where: {departmentId: id}})
        }, req, res, next)

        // cannot deleted a department if employees are attached to it
        if (numberEmployees > 0) {
            return next(ApiError.badRequest(`За відділом закріплено ${numberEmployees} співробітник(а/ів), перед видаленням відділу перемістить їх у інший відділ`))
        }

        fetchDataFromBD(async () => {
            const result = await Department.destroy({where: {id}})

            if (result === 0) return next(ApiError.badRequest(`Запис id: ${id} відсутній. Зверніться до адміністратора`))

            return res.json(result)
        }, req, res, next)

    }


    async updateDepartment(req, res, next) {
        const {id} = req.params
        const {code, name, is_seller} = req.body

        const validationResult = DepartmentValidator.fieldsValidation({
            code, name: name.trim(), is_seller
        })
        if (!validationResult.result) return next(ApiError.badRequest(validationResult.errorMessage))

        fetchDataFromBD(async () => {
            const result = await Department.update(
                {code, name: name.trim(), is_seller},
                {where: {id}}
            )

            if (result[0] === 0) return next(ApiError.badRequest(`Запис id: ${id} відсутній. Зверніться до адміністратора`))


            return res.json(result[0])
        }, req, res, next)
    }
}

module.exports = new DepartmentController()