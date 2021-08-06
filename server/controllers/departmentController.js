const {Department} = require('../models/models')

//const ApiError = require('../error/ApiError');

class DepartmentController {
    async getAllDepartment(req, res) {
        const departments = await Department.findAll({
            attributes: ['id', 'code', 'name', 'is_seller'],
            order: [
                ['is_seller', 'DESC'],
                ['code', 'ASC']
            ]
        })
        return res.json(departments)
    }

    // TODO сделать валидацию
    async createDepartment(req, res) {
        const {code, name, is_seller} = req.body
        const department = await Department.create({code, name, is_seller})
        return res.json(department)
    }

    // TODO не цдалять если к депортаменту привязаны работники
    // проверка id
    async deleteDepartment(req, res) {
        const {id} = req.params
        //console.log(id)
        // 1 удален 0 не удален
        // ошибка если такого депортамента не существует, хотя странно, если бы его не было он бы не пояился
        // хотя может удалить кто-то другой, сообщение что такого нету, необходимо перегрузить страницу
        const deletedDepartment = await Department.destroy({where: {id}})
        return res.json(id)
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


    // TODO  SequelizeUniqueConstraintError: повторяющееся значение ключа нарушает ограничение уникальности "departments_code_key"


}

module.exports = new DepartmentController()