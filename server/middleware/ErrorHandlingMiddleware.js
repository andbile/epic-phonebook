// обработка ошибок
const ApiError = require('../error/ApiError');

// next - функция, вызвав которую мы передадим вызов по цепочке в следующий middleware
module.exports = function (err, req, res, next) {
    if (err instanceof ApiError) {
        return res.status(err.status).json({message: err.message})
    }
    return res.status(500).json({message: "Непредвиденная ошибка!"})
}
