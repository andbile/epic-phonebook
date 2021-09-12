const Router = require('express').Router
const router = new Router
const departmentController = require('../controllers/departmentController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.get('/', departmentController.getAllDepartment)
router.get('/:code', departmentController.getOneDepartmentByCode)

router.post('/', checkRole(['ADMIN', 'PERSONAL']), departmentController.createDepartment)
router.put('/:id', checkRole(['ADMIN', 'PERSONAL']), departmentController.updateDepartment)
router.delete('/:id', checkRole(['ADMIN', 'PERSONAL']), departmentController.deleteDepartment)



module.exports = router