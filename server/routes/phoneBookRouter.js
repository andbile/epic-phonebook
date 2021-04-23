const Router = require('express').Router
const router = new Router
const phoneBookController = require('../controllers/phoneBookController')
const checkRole = require('../middleware/checkRoleMiddleware')


router.get('/', phoneBookController.getPhoneBook)
router.post('/', phoneBookController.createItemOfPhoneBook)
router.delete('/:id', checkRole('ADMIN'), phoneBookController.deleteItemOfPhoneBook)






module.exports = router