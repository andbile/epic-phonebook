/** @type {string} ADMIN_ROLE - роль администратора */
import {ROLE_ADMIN} from "./consts";

/**
 * Проверка прав пользователя
 * @param {Array} permissions - необходимые права для рендера компонента
 * @param {Array} role - текуще права предоставленные пользователю
 * @return {Boolean}
 * **/
const checkUserPermissions = (permissions = [], role = []) => {

    const allowed = () => {
        // пользователь с правами администратора проверяется всегда
        // без необходимости передавать роль как параметр
        const index =  Array.isArray(role) ? role.indexOf(ROLE_ADMIN) : -1
        if (index !== -1) return true

        // Доступ для пользователя с правами переданными через параметр
        // Перебираем массив permissions и ищем совпадение в ролях авторизированного пользователя.
        return Array.isArray(permissions) ? permissions.some(isPermission) : false
    }

    const isPermission = (permissionItem) => {
        let index = role.indexOf(permissionItem)
        return index !== -1
    }

    return allowed()
}

export default checkUserPermissions