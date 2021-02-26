const {pool} = require('../../bd/connect') // connect to BD

//TODO коментарий и рефракторинг
//TODO поменять гит на SSH
// TODO обработка ощибок

/**
 * telephone and e-mail directory
 */


class PhoneBook{
    constructor(req, res) {
        this.res = res
        this.departments = {} // list of departments from BD
        this.employees = {} // list of employees from BD
        this.phoneBook = {} // the resulting object for the template engine

        this.render()
    }


    async getDepartments(){
        const row = await pool.query('SELECT * FROM department')
        return row.rows
    }

    async getEmployees(){
        const row = await pool.query('SELECT * FROM employee')
        return row.rows
    }

    async getAllDataFromBD (){
        try{
            const [departments, employees] = await Promise.all([this.getDepartments(), this.getEmployees()]);
            return {departments, employees}
        }catch (err){
            // TODO обрабатывать как-то ошибки
            console.log(err)
        }
    }


    // get resulting object
    getResultPhoneBookObj(){
        this.departments.forEach( item => {
            this.phoneBook[item['department_id']] = this.setDepartments(item);

            this.setEmployees(item)

        })
    }

    setDepartments(obj){
        return {
            department_name: obj.department_name,
            department_isSeller: obj.is_seller,
            employees: []
        }
    }

    setEmployees(departmentItem){
        const id = departmentItem['department_id']
        this.phoneBook[id].employees = this.employees.filter( item => item['department_id'] === id)
    }


    async render(){

        await this.getAllDataFromBD().then( (object) => {
            const {departments, employees} = object
            this.departments = departments
            this.employees = employees
        })

        // get resulting object
        await this.getResultPhoneBookObj();

        this.res.render('phone_book/phone_book', {
            phoneBook:this.phoneBook
        })
    }
}


module.exports = PhoneBook