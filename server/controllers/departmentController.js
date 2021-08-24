const {Sequelize} = require('sequelize')
const ApiError = require("../error/ApiError");
const {Department} = require('../models/models')
const DepartmentValidator = require('../validators/DepartmentValidator')
const fetchDataFromBD = require('../utils/fetchDataFromBD')
const {Employee} = require("../models/models");

class DepartmentController {
    async getAllDepartment(req, res, next) {
        fetchDataFromBD(async () => {
            const departments = await Department.findAll({
                attributes: ['id', 'code', 'name', 'is_seller'],
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

        const isCode = DepartmentValidator.isCode(code)
        if (!isCode.result) return next(ApiError.badRequest(isCode.errorMessage))

        const isName = DepartmentValidator.isName(name.trim())
        if (!isName.result) return next(ApiError.badRequest(isName.errorMessage))

        const isPosition = DepartmentValidator.isPosition(is_seller)
        if (!isPosition.result) return next(ApiError.badRequest(isPosition.errorMessage))

        fetchDataFromBD(async () => {
            const department = await Department.create({code, name, is_seller})
            return res.json(department)
        }, req, res, next)
    }

    async deleteDepartment(req, res, next) {
        const {id} = req.params

        //
        const numberEmployees = await fetchDataFromBD(async () => {
            return await Employee.count({where: {departmentId: id}})
        }, req, res, next)

        // cannot deleted a department if employees are attached to it
        if (numberEmployees > 0) {
            return next(ApiError.badRequest(`За відділом закріплено ${numberEmployees} співробітник(а/ів), перед видаленням відділу перемістить їх у інший відділ`))
        } else{
            fetchDataFromBD(async ()=>{
                const deletedDepartment = await Department.destroy({where: {id}})
                return res.json({deletedDepartment})
            }, req, res, next)
        }
    }


    async updateDepartment(req, res) {
        const {id} = req.params
        const {code, name, is_seller} = req.body
        console.log(id)
        console.log(`${code} ${name} ${is_seller}`)
        // TODO сделать обработку ошибок
        const department = await Department.update(
            {code: code, name: name, is_seller: is_seller},
            {where: {id: id}})

        return res.json(department)
    }
}

module.exports = new DepartmentController()