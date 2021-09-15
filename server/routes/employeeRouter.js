const Router = require('express')
const router = new Router
const employeeController = require('../controllers/employeeController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.get('/byId/:id', employeeController.getEmployeesByDepartmentId)

router.post('/', checkRole(['admin', 'personal']), employeeController.createEmployee)
router.delete('/:id', checkRole(['admin', 'personal']), employeeController.deleteEmployee)
router.put('/:id', checkRole(['admin', 'personal']), employeeController.updateEmployee)
router.put('/change-department/:id', checkRole(['admin', 'personal']), employeeController.changeEmployeeDepartment)





module.exports = router