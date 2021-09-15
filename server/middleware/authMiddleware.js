const ApiError = require("../error/ApiError");
const {User} = require('../models/models')
const jwt = require('jsonwebtoken')
const _ = require('lodash');

// checking token validity
module.exports = async function (req, res, next) {
    if (req.method === "OPTIONS") next()

    try {
        //get the token from the request header
        const token = req.headers.authorization.split(' ')[1] // Bearer[0] token[1]
        if (!token) return next(ApiError.unauthorized('Не авторизований'))

        const userFromDecodedToken = jwt.verify(token, process.env.SECRET_KEY)
        console.log(userFromDecodedToken)

        // get user from bd
        const user = await User.findOne({where: {id: userFromDecodedToken.id}})
        if (!user) return next(ApiError.unauthorized('Не авторизований'))

        // Compare the user's roles with the token and the database, and if they do not converge, log out
        // Why: after the creation of the token and before the expiration date, the user's role could change,
        // you need to log out the user to enter a password and get a new token with current roles
        const compareRoles = _.difference(userFromDecodedToken.role, user.role)
        if (compareRoles.length > 0) return next(ApiError.unauthorized('Не авторизований'))

        req.user = userFromDecodedToken
        next()
    } catch (e) {
        return next(ApiError.unauthorized('Не авторизований'))
    }
};
