const {Sequelize} = require('sequelize')
const ApiError = require("../error/ApiError");

/**
 * Makes a request to the database with error handling and send a result
 * @function
 * @param {function} callback - makes a request to the database and sends the response
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {function} next - Express next middleware function
 * @return {undefined}
 */
module.exports = async function (callback, req, res, next) {
   return callback()
        .catch(err => {
                if (err instanceof Sequelize.ValidationError) {
                    return next(ApiError.badRequest(`${err.original}  ${err.parent.detail}`))

                } else if (err instanceof Sequelize.DatabaseError) {
                    console.log(`${err.original.code} ${err}`)
                    return next(ApiError.internal(`Помилка в запиті до бази даних ${err.original.code}`))

                } else {
                    console.log(err)
                    return next(ApiError.internal('Виникла непередбачувана помилка. Спробуйте пізніше'))
                }
            }
        )
}