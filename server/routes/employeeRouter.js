const Router = require('express')
const router = new Router
const employeeController = require('../controllers/employeeController')
const checkRole = require('../middleware/checkRoleMiddleware')


router.get('/:id', employeeController.getOneEmployee)
router.post('/', checkRole('ADMIN'), employeeController.createEmployee)
router.delete('/:id', checkRole('ADMIN'), employeeController.deleteEmployee)


module.exports = router