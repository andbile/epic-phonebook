const sequelize = require('../db')
const {DataTypes} = require('sequelize') // описуються типы того или иного поля

// Department
const Department = sequelize.define('departments', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    code: {type: DataTypes.STRING, unique: true, allowNull: false},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    is_seller: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
})

// Departments phone book
const DepartmentContact = sequelize.define('department_contacts', {
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

// Employees phone book
const Employees = sequelize.define('employees', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    last_name: {type: DataTypes.STRING, allowNull: false},
    first_name: {type: DataTypes.STRING, allowNull: false},
    patronymic_name: {type: DataTypes.STRING, allowNull: false},
    position: {type: DataTypes.STRING},
    tel_mobile: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: []
    }
})

// users
const Users = sequelize.define('users', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    role: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: ["user"]
    }
})




Department.hasMany(DepartmentContact, {
    foreignKey:{
        allowNull: false
    }
})
DepartmentContact.belongsTo(Department)
//DepartmentContact.sync({ alter: true })


Department.hasMany(Employees, {
    foreignKey:{
        allowNull: false
    }
})
//Department.sync({ alter: true })
Employees.belongsTo(Department)
//Employees.sync({ alter: true })

//Users.sync({ alter: true })




module.exports = {
    Department,
    DepartmentContact,
    Employees,
    Users
}





