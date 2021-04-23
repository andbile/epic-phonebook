const Router = require('express').Router
const router = new Router
const phoneBookRouter = require ('./phoneBookRouter')
const departmentRouter = require('./departmentRouter')
const employeeRouter = require('./employeeRouter')
const userRouter = require('./userRouter')


// объединение "подмаршрутов" к основному маршруту
router.use('/department', departmentRouter)
router.use('/employee', employeeRouter)
router.use('/phone-book', phoneBookRouter)
router.use('/user', userRouter)

module.exports = router