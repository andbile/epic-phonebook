const jwt = require('jsonwebtoken')

/**
 * Checking user rights
 * Using in routers
 * @param {array} permissions - necessary rights
 */
module.exports = function (permissions = []) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }
        try {
            // get token
            const token = req.headers.authorization.split(' ')[1] // Bearer token
            if (!token) {
                return res.status(401).json({message: "Не авторизований"})
            }

            // decoded token
            const decoded = jwt.verify(token, process.env.SECRET_KEY)

            // Iterate over the permissions array and look for a match in the roles of the authorized user.
            const isPermission = (permissionItem) => {
                let index = decoded.role.indexOf(permissionItem)
                return index !== -1
            }
            const isAllowed = permissions.some(isPermission)

            if(!isAllowed){
                return res.status(403).json({message: "Немає доступу"})
            }

            req.user = decoded;
            next()
        } catch (e) {
            res.status(401).json({message: "Не авторизований"})
        }
    };
}