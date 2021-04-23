// тут декодируем токин и проверяем на валидность

const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    // если метод == OPTIONS то пропускаем
    // нас интересует ПОСТ/ПУТ/ДЕЛИТ
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        // из заголовка запроса получаем токин
        // но в хедер обычно помещают сначала тип токена а потом сам токен
        const token = req.headers.authorization.split(' ')[1] // Bearer asfasnfkajsfnjk
        if (!token) {
            // если токена нет снова возвращаем ошибку
            return res.status(401).json({message: "Не авторизован"})
        }
        // а если есть
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded
        console.log(decoded)
        next()
    } catch (e) {
        // если какая-то ошибка, то возвращаем сообщение
        res.status(401).json({message: "Не авторизован"})
    }
};
