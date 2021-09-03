const Router = require('express').Router
const router = new Router
const checkRole = require('../middleware/checkRoleMiddleware')
const phoneBookController = require('../controllers/phoneBookController')


router.get('/', phoneBookController.getAllPhoneBook)
router.delete('/:id', checkRole(['ADMIN', 'PERSONAL']), phoneBookController.deletePhoneBookEntry)
router.post('/', checkRole(['ADMIN', 'PERSONAL']), phoneBookController.createPhoneBookEntry)
router.put('/:id', checkRole(['ADMIN', 'PERSONAL']), phoneBookController.updatePhoneBookEntry)


module.exports = router
