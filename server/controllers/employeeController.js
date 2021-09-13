const {Employees} = require('../models/models')
const ApiError = require("../error/ApiError");
const fetchDataFromBD = require('../utils/fetchDataFromBD')
const EmployeeValidator = require("../validators/EmployeeValidator");

class EmployeeController {
    async getEmployeesByDepartmentId(req, res, next) {
        const {id} = req.params

        fetchDataFromBD(async () => {
            const employees = await Employees.findAll(
                {where: {departmentId: id}})
            return res.json(employees)
        }, req, res, next)
    }


    async createEmployee(req, res, next) {
        const {last_name, first_name, patronymic_name, position, tel_mobile, departmentId} = req.body

        const validationResult = EmployeeValidator.fieldsValidation({
            last_name: last_name.trim(),
            first_name: first_name.trim(),
            patronymic_name: patronymic_name.trim(),
            position: position.trim(),
            tel_mobile
        })
        if (!validationResult.result) return next(ApiError.badRequest(validationResult.errorMessage))


        fetchDataFromBD(async () => {
            const employee = await Employees.create({
                last_name: last_name.trim(),
                first_name: first_name.trim(),
                patronymic_name: patronymic_name.trim(),
                position: position.trim(),
                tel_mobile,
                departmentId
            })
            return res.json(employee)
        }, req, res, next)
    }


    async updateEmployee(req, res, next) {
        const {id} = req.params
        const {last_name, first_name, patronymic_name, position, tel_mobile, departmentId} = req.body

        const validationResult = EmployeeValidator.fieldsValidation({
            last_name: last_name.trim(),
            first_name: first_name.trim(),
            patronymic_name: patronymic_name.trim(),
            position: position.trim(),
            tel_mobile
        })
        if (!validationResult.result) return next(ApiError.badRequest(validationResult.errorMessage))


        fetchDataFromBD(async () => {
            const employee = await Employees.update({
                    last_name: last_name.trim(),
                    first_name: first_name.trim(),
                    patronymic_name: patronymic_name.trim(),
                    position: position.trim(),
                    tel_mobile,
                    departmentId
                },
                {where: {id}})
            return res.json(employee)
        }, req, res, next)
    }


    async deleteEmployee(req, res, next) {
        const {id} = req.params

        fetchDataFromBD(async () => {
            const result = await Employees.destroy({where: {id}})

            if (result === 0) return next(ApiError.badRequest(`Запис id: ${id} відсутній. Зверніться до адміністратора`))

            return res.json(result)
        }, req, res, next)

    }

    async changeEmployeeDepartment(req, res, next) {
        const {id} = req.params
        const {departmentId} = req.body

        fetchDataFromBD(async () => {
            const result = await Employees.update(
                {departmentId},
                {where: {id}}
            )

            if (result[0] === 0) return next(ApiError.badRequest(`Запис id: ${id} відсутній. Зверніться до адміністратора`))

            return res.json(result)
        }, req, res, next)
    }
}

module.exports = new EmployeeController()