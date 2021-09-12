const Router = require('express')
const router = new Router
const employeeController = require('../controllers/employeeController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.get('/byId/:id', employeeController.getEmployeesByDepartmentId)

router.post('/', checkRole(['ADMIN', 'PERSONAL']), employeeController.createEmployee)
router.delete('/:id', checkRole(['ADMIN', 'PERSONAL']), employeeController.deleteEmployee)
router.put('/:id', checkRole(['ADMIN', 'PERSONAL']), employeeController.updateEmployee)





module.exports = router