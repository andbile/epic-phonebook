const Router = require('express').Router
const router = new Router
const checkRole = require('../middleware/checkRoleMiddleware')
const phoneBookController = require('../controllers/phoneBookController')


router.get('/', phoneBookController.getAllPhoneBook)
router.delete('/:id', checkRole(['admin', 'personal']), phoneBookController.deletePhoneBookEntry)
router.post('/', checkRole(['admin', 'personal']), phoneBookController.createPhoneBookEntry)
router.put('/:id', checkRole(['admin', 'personal']), phoneBookController.updatePhoneBookEntry)


module.exports = router
