const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../models/models')

/**
 * @param {number} id - user id from db
 * @param {string} email - user email
 * @param {array} role - user roles
 * @return {string} jwt token
 */
const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}


class UserController{
    // регистрация
    // TODO сделать валидацию, перевести на украинский
    // TODO сообщение об ошибке на фронте
    async registration(req, res, next) {
        const {email, password, role} = req.body

        // TODO role tolowercase

        //console.log(req.body)
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или password'))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, password: hashPassword, role})

        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    // логин
    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }


    // if the user is authorized, update the token
    async generateNewToken(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }
}

module.exports = new UserController()