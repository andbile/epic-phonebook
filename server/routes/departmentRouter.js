const Router = require('express').Router
const router = new Router
const departmentController = require('../controllers/departmentController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.get('/', departmentController.getAllDepartment)
router.get('/:id', checkRole('ADMIN'), departmentController.getOneDepartment)

router.post('/', checkRole('ADMIN'), departmentController.createDepartment)
router.patch('/:id', checkRole('ADMIN'), departmentController.updateDepartment)

router.delete('/:id', departmentController.deleteDepartment)


module.exports = router