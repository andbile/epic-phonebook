const {Sequelize} = require('sequelize')
const {Op} = require("sequelize");
const ApiError = require("../error/ApiError");
const {Department, Employees} = require('../models/models')
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
        }, next)
    }

    async getOneDepartmentByCode(req, res, next) {
        let {code} = req.params

        fetchDataFromBD(async () => {
            const departments = await Department.findAll(
                {where: {code}})
            return res.json(departments)
        }, next)
    }


    async createDepartment(req, res, next) {
        const {code, name, is_seller} = req.body

        const validationResult = DepartmentValidator.fieldsValidation({
            code, name: name.trim(), is_seller
        })
        if (!validationResult.result) return next(ApiError.validationError(validationResult.errorMessage))

        fetchDataFromBD(async () => {
            const department = await Department.create({code, name: name.trim(), is_seller})
            return res.json(department)
        }, next)
    }


    async deleteDepartment(req, res, next) {
        const {id} = req.params

        // get number of employees
        const numberEmployees = await fetchDataFromBD(async () => {
            return await Employees.count({where: {departmentId: id}})
        }, next)

        // cannot deleted a department if employees are attached to it
        if (numberEmployees > 0) {
            return next(ApiError.validationError(`За відділом закріплено ${numberEmployees} співробітник(а/ів), перед видаленням відділу перемістить їх у інший відділ`))
        }

        fetchDataFromBD(async () => {
            const result = await Department.destroy({where: {id}})

            if (result === 0) return next(ApiError.validationError(`Запис id: ${id} відсутній. Зверніться до адміністратора`))

            return res.json(result)
        }, next)

    }


    async updateDepartment(req, res, next) {
        const {id} = req.params
        const {code, name, is_seller} = req.body

        const validationResult = DepartmentValidator.fieldsValidation({
            code, name: name.trim(), is_seller
        })
        if (!validationResult.result) return next(ApiError.validationError(validationResult.errorMessage))

        fetchDataFromBD(async () => {
            const result = await Department.update(
                {code, name: name.trim(), is_seller},
                {where: {id}}
            )

            if (result[0] === 0) return next(ApiError.validationError(`Запис id: ${id} відсутній. Зверніться до адміністратора`))

            return res.json(result[0])
        }, next)
    }

    async getDepartmentsByName(req, res, next) {
        const name = req.query.name

        fetchDataFromBD(async () => {
            const departments = await Department.findAll({
                where: [
                    Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('name')),
                        {
                            [Op.like]: Sequelize.fn('LOWER', `%${name}%`)
                        },
                    )],

                order: [
                    ['is_seller', 'DESC'],
                    ['code', 'ASC']
                ]
            })


            return res.json(departments)
        }, next)
    }


}

module.exports = new DepartmentController()