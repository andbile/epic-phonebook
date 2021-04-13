const {pool} = require('../../bd/connect') // connect to BD

// TODO Пошук по прізвищам
// TODO При додаванні контакту перевіряти наявність (чи вибирати із списку) відділ
// TODO Придумати щось зі здвоєними відділами. Асистентів відділів копіювати у декілька відділів.
// TODO Об'явити в групі, якщо э корпоративні номера можна забити лише їх. Змінити відділ якщо числиться
//  в одному відділі а по факту працює в іншому відділі
// TODO Якщо асистент двох відділів, додавати у оба, продумати цей нюанс в адмінці
// TODO Зробити перевірку, щоб дві пошти в одну строку не засунули, приклад ['um.info50@epicentrk.com, um.info100@epicentrk.com']
// TODO Зробити окрему строку: загальні номере відділу (DECT, стац, телефони кас), загальна пошта, якщо є
// TODO Зробити опис (пояснення) в адмінці: якщо є загальні номери, то всы ПІБ їх не прописувати
// TODO Можна зробити загальний довідник по телефонам відділів (короткий), і групу кнопок для детальних
//  контактів по відділам. Із-зателефонів касс, нема куди їх записати, зробити обов'язково
// TODO исправить кнопку на главной странице, заменить "button" на "а"

// TODO в админке при обновлении БД проверять не только фамилию/имя/отдел но и отдел, так как могут быть однофамильцы

// TODO localStorage запоминать последний просмотренный отдел

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
        const row = await pool.query('SELECT * FROM department_contacts RIGHT JOIN department on department.department_code = department_contacts.department_code ORDER BY department.department_code')
        return row.rows
    }

    // get employees from DB
    async getEmployees(){
        const row = await pool.query('SELECT * FROM employee ORDER BY last_name')
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
            this.phoneBook[item['department_code']] = this.setDepartments(item);

            this.setEmployees(item)
        })
    }

    /**
     * Create object
     * @param {object} department - item of the departments list from BD
     * @returns {object} - {department_name: string, department_isSeller: boolean, employees: array}
     *
     *
     */
    setDepartments(department){
        return {
            department_name: department.department_name,
            department_code: department.department_code,
            department_isSeller: department.is_seller,
            // !!! TODO описать добавление новых контактов is_department_contacts сли есть хоть один контакт добовляем
            //      * в шаблонизаторе - пеерделать!!!
            is_department_contacts: ( () => {
                if (department.tel_number_dect || department.tel_number_landline ||
                    department.tel_number_mobile || department.email){
                    return true
                }else return false
            })(),
            tel_number_dect: department.tel_number_dect,
            tel_number_landline: department.tel_number_landline,
            tel_number_mobile: department.tel_number_mobile,
            email:department.email,
            employees: []
        }
    }

    /**
     * Fill array by the list of employees of the relevant department
     * Filter array using id
     * @param department {object} - item of the departments' list
     */
    setEmployees(department){
        const departmentCode = department['department_code']
        this.phoneBook[departmentCode].employees = this.employees.filter( item => item['department_code'] === departmentCode)
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