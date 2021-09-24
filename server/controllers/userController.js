const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const RegistrationValidator = require("../validators/RegistrationValidator");
const {Users} = require('../models/models')
const fetchDataFromBD = require('../utils/fetchDataFromBD')

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


class UserController {
    async registration(req, res, next) {
        const {email, password} = req.body
        const emailLowerCase = email.toLowerCase().trim()

        const validationResult = RegistrationValidator.fieldsValidation({
            email: emailLowerCase, password
        })
        if (!validationResult.result) return next(ApiError.validationError(validationResult.errorMessage))

        // Get users with the same email
        const candidate = await fetchDataFromBD(async () => {
            return await Users.findOne({where: {email}})
        }, next)
        if (candidate) return next(ApiError.validationError('Користувач з таким email вже існує'))


        const hashPassword = await bcrypt.hash(password, 5)
        // new user to assign the default role "user"
        fetchDataFromBD(async () => {
            const user = await Users.create({email:emailLowerCase, password: hashPassword})
            const token = generateJwt(user.id, user.email, user.role)
            return res.json({token})
        }, next)
    }

    // логин
    async login(req, res, next) {
        const {email, password} = req.body

        const user = await fetchDataFromBD(async () =>
             await Users.findOne({where: {email}})
        , next)
        if (!user) return next(ApiError.validationError('Користувач не знайдений'))

        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) return next(ApiError.internal('Введено недійсний пароль'))

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