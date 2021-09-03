const sequelize = require('../db')
const {DataTypes} = require('sequelize') // описуються типы того или иного поля

// Department
const Department = sequelize.define('department', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    code: {type: DataTypes.STRING, unique: true, allowNull: false},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    is_seller: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
})

// Departments phone book
const DepartmentContact = sequelize.define('department_contact', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    position: {type: DataTypes.STRING, allowNull: false},
    tel_dect: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: []
    },
    tel_landline: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: []
    },
    email: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: []
    },
})

// Сотрудники
const Employee = sequelize.define('employee', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    last_name: {type: DataTypes.STRING, allowNull: false},
    first_name: {type: DataTypes.STRING, allowNull: false},
    patronymic_name: {type: DataTypes.STRING, allowNull: false},
    position: {type: DataTypes.STRING},
    tel_mobile: {type: DataTypes.ARRAY(DataTypes.STRING)},
})

// пользователи
const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: ["USER"]}, // роли пользователей
})


// описание - как модели связаны с друг-другом
Department.hasMany(DepartmentContact, {
    foreignKey:{
        allowNull: false
    }
})
DepartmentContact.belongsTo(Department)
/*DepartmentContact.sync({ alter: true })*/

Department.hasMany(Employee)
Employee.belongsTo(Department)






module.exports = {
    Department,
    DepartmentContact,
    Employee,
    User
}





