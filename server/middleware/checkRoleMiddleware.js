// проверка прав пользователей
// что бы товар мог добавить только администратор
// используется в typeRouter

const jwt = require('jsonwebtoken')

// будем экспортировать функцию которая принимает параметром role (через замыкание)
// и уже из этой функции мы будем возвращать тот самый middleware
// то есть мы вызываем функцию передаем туда роль fn('admin')
// и эта функция уже нам возвращает middleware
module.exports = function (role) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1] // Bearer token
            if (!token) {
                return res.status(401).json({message: "Не авторизован"})
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            // после того как декодировали  выципляем от туда роль пользователя
            // и сравниваем с ролью каторую мы передали в middleware
            // сверяем роль из токена с переданной ролью
            console.log(decoded.role);

            // пример из видео
            /*if (decoded.role !== role) {
                return res.status(403).json({message: "Нет доступа"})
            }*/


            const candidateRole = decoded.role.filter(item => {
                return item === role
            })
            console.log(candidateRole);

            if (candidateRole.length === 0) {
                return res.status(403).json({message: "Нет доступа"})
            }

            req.user = decoded;
            next()
        } catch (e) {
            res.status(401).json({message: "Не авторизован"})
        }
    };
}



