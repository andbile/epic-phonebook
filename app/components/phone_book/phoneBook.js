const {Pool} = require('pg');
const config = require('../../config/config');

function phoneBook (req, res){

    const pool = new Pool({
        host: config.bd_host,
        port: config.bd_port,
        database: config.bd_name,
        user: config.user,
        password: config.password,
    });

    //TODO коментарий и рефракторинг
    //TODO поменять гит на SSH


    const newObj = {}

    async function getPhoneBook (){
        const rowDepartment = await pool.query('SELECT * FROM department')
        const rowEmployee = await pool.query('SELECT * FROM employee')

        return {rowDepartment, rowEmployee}
    }

    getPhoneBook().then( object => {
        const department = object.rowDepartment.rows;
        const employee = object.rowEmployee.rows;

        let employees = []


        department.forEach( item => {
            newObj[item['department_id']] = getDepartmentObj(item);

            getEmployeesArray(item)
        })

        function getDepartmentObj( obj ){
            return {
                department_name: obj.department_name,
                department_isSeller: obj.is_seller,
                employees
            }
        }

        function getEmployeesArray(obj){
            const id = obj['department_id']
            newObj[id].employees = employee.filter( item => item['department_id'] === id)
        }

        console.log(newObj['10'].employees);

        render1();

    });



    function render1(){
        console.dir(newObj);

        res.render('phone_book/phone_book', {
            phoneBook:newObj
        })
    }

}

module.exports = phoneBook;