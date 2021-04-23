const {Department, Employee, DepartmentContact} = require('../models/models')

//const ApiError = require('../error/ApiError');

class PhoneBookController {
    async getPhoneBook(req, res) {
        const phoneBook = await  DepartmentContact.findAll()
        console.log(phoneBook[0]['department_contact'])
        console.log(phoneBook[0].dataValues)
        const id = phoneBook[0].dataValues.departmentId
        console.log(id);
        //const department = await Department.findOne({where:{id}})
        const department = await Department.findAll()
        const arr = [phoneBook, department]
        res.json(arr)
    }

    async createItemOfPhoneBook(req, res){
        const {position, tel_dect, tel_mobile, email, departmentId} = req.body
        const itemPhoneBook = await DepartmentContact.create({position, tel_dect, tel_mobile, email, departmentId})

        console.log(req.body)
        res.json(itemPhoneBook)
    }

    async deleteItemOfPhoneBook(req, res){
        const {id} = req.params
        const itemOfPhoneBook = await DepartmentContact.destroy({where: {id}})
        res.json(itemOfPhoneBook)
    }
}

module.exports = new PhoneBookController()