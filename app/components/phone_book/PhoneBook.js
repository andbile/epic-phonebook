const {pool} = require('../../bd/connect') // connect to BD

// TODO Пошук по прізвищам
// TODO Мобільні номера

/**
 * telephone and e-mail directory
 */


class PhoneBook{
    constructor(req, res) {
        this.res = res
        this.departments = {} // list of departments from BD
        this.employees = {} // list of employees from BD
        this.phoneBook = {} // the resulting object for the template engine
        this.error = '' // error massage

        this.render()
    }

    // get departments from DB
    async getDepartments(){
        const row = await pool.query('SELECT * FROM department')
        return row.rows
    }

    // get employees from DB
    async getEmployees(){
        const row = await pool.query('SELECT * FROM employee')
        return row.rows
    }

    // get departments and employees from DB
    async getPhoneBookData (){
        const [departments, employees] = await Promise.all([this.getDepartments(), this.getEmployees()]);
        return {departments, employees}
    }


    /**
     * Create resulting object for the template engine
     * Create object where:
     *  key - department_id, value - object with properties:
     *      department_name {string},
     *      department_isSeller {boolean} - for sorting on the client
     *      employees {array} - array of employees
     */
    getResultPhoneBookObj(){
        this.departments.forEach( item => {
            this.phoneBook[item['department_id']] = this.setDepartments(item);

            this.setEmployees(item)
        })
    }

    /**
     * Create object
     * @param {object} department - item of the departments list from BD
     * @returns {object} - {department_name: string, department_isSeller: boolean, employees: array}
     */
    setDepartments(department){
        return {
            department_name: department.department_name,
            department_isSeller: department.is_seller,
            employees: []
        }
    }

    /**
     * Fill array by the list of employees of the relevant department
     * Filter array using id
     * @param department {object} - item of the departments' list
     */
    setEmployees(department){
        const id = department['department_id']
        this.phoneBook[id].employees = this.employees.filter( item => item['department_id'] === id)
    }


    async render(){

        await this.getPhoneBookData().then( (object) => {
            const {departments, employees} = object
            this.departments = departments
            this.employees = employees
        }).catch( err => {

            this.error = `Сталася помилка ${err.code}, спробуйте пізніше`
            this.res.render('errors/error', {
                error: this.error
            })
        })

        if(!this.error){
            // get resulting object
            await this.getResultPhoneBookObj();

            this.res.render('phone_book/phone_book', {
                phoneBook:this.phoneBook
            })
        }
    }
}


module.exports = PhoneBook