const Router = require('express')
const router = new Router
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/login', userController.login)
router.post('/registration', userController.registration)
// check if the user is authorized
router.get('/auth', authMiddleware, userController.generateNewToken)


module.exports = router