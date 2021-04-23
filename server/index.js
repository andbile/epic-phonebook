require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
//const models = require('./models/models') // модели БД
const cors = require('cors')
const path = require('path')
const router = require('./routes/index') // основной маршрут
const errorHandler = require('./middleware/ErrorHandlingMiddleware') // обработка ошибок

const PORT = process.env.PORT || 5000
const app = express()
app.use(cors()) // что бы могли отправлять запросы с браузера
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use('/', router) // подключаем роутер



app.use(errorHandler) // Обработка ошибок

// Подключения к БД и запуск сервера
const start = async () => {
    try {
        await sequelize.authenticate() // подключение к БД
        await sequelize.sync() // сверяет состояние БД со схемой БД
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}


start()