const {Department} = require('../models/models')
//const ApiError = require('../error/ApiError');

class DepartmentController{
    async getAllDepartment(req, res){
        const departments = await Department.findAll({
            attributes:['id', 'code', 'name', 'is_seller'],
            order:[
                ['is_seller', 'DESC'],
                ['code', 'ASC']
            ]
        })
        return res.json(departments)
    }


    async getOneDepartment(req, res){
        const {id} = req.params
        console.log(id)
        // TODO сделать обработку ошибок

        const department = await Department.findOne({where:{id}})

        return res.json(department)
    }










    async updateDepartment(req, res){
        const {id} = req.params
        // TODO сделать обработку ошибок
        const department = await Department.findOne({where:{id}})

        return res.json(department)
    }


    // TODO  SequelizeUniqueConstraintError: повторяющееся значение ключа нарушает ограничение уникальности "departments_code_key"
    async createDepartment(req, res){
        const {code, name, is_seller} = req.body
        console.log(req.body);

        const department = await Department.create({code, name, is_seller})
        return res.json(department)
    }

    async deleteDepartment(req, res){
        const {id} = req.params
        const deletedDepartment = await Department.destroy({where:{id}})
        return res.json(deletedDepartment)
    }
}

module.exports = new DepartmentController()