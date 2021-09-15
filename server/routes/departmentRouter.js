const Router = require('express').Router
const router = new Router
const departmentController = require('../controllers/departmentController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.get('/', departmentController.getAllDepartment)
router.get('/:code', departmentController.getOneDepartmentByCode)

router.post('/', checkRole(['admin', 'personal']), departmentController.createDepartment)
router.put('/:id', checkRole(['admin', 'personal']), departmentController.updateDepartment)
router.delete('/:id', checkRole(['admin', 'personal']), departmentController.deleteDepartment)



module.exports = router