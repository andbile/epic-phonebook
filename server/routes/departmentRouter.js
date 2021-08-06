const Router = require('express').Router
const router = new Router
const departmentController = require('../controllers/departmentController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.get('/', departmentController.getAllDepartment)

router.post('/', checkRole('ADMIN'), departmentController.createDepartment)
router.put('/:id', checkRole('ADMIN'), departmentController.updateDepartment)
router.delete('/:id', checkRole('ADMIN'), departmentController.deleteDepartment)


//router.get('/:id', departmentController.getOneDepartment)







module.exports = router