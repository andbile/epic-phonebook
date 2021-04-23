const {Employee} = require('../models/models')

class EmployeeController{
    async getOneEmployee(req, res){
        const {id} = req.params
        const employee = await Employee.findAll({where: {id}})
        return res.json(employee)
    }

    async createEmployee(req, res){
        const {last_name, first_name, patronymic_name, position, tel_mobile, departmentId} = req.body
        console.log(req.body);

        const employee = await Employee.create({last_name, first_name, patronymic_name, position, tel_mobile, departmentId})
        return res.json(employee)
    }

    async deleteEmployee(req, res){
        const {id} = req.params
        const deletedEmployee = await Employee.destroy({where:{id}})
        return res.json(deletedEmployee)
    }

}

module.exports = new EmployeeController()