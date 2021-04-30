import React, {useContext} from "react";
import {observer} from "mobx-react-lite";
import PropTypes from 'prop-types'
import {Context} from "../index";
import {ADMIN_ROLE} from '../utils/consts'

// Проверка прав пользователя и условный рендер вложенных компонентов
const CheckPermissions = observer(({permissions = [], children}) => {

    const {user} = useContext(Context)

    const allowed = () => {
        // Пользователь с правами администратора проверяется всегда
        // без необходимости передавать роль как параметр компонента
        const index = user.Role.indexOf(ADMIN_ROLE)
        if (index !== -1) return true

        // Доступ для пользователя с правами переданными через параметр
        // Перебираем массив permissions и ищем совпадение в ролях авторизированного пользователя.
        return Array.isArray(permissions) ? permissions.some(isPermission) : null

    }

    const isPermission = (permissionItem) => {
        let index = user.Role.indexOf(permissionItem)
        return index !== -1
    }

    return (
        <>
            {allowed() && children}
        </>
    );
});

CheckPermissions.propTypes = {
    permissions: PropTypes.arrayOf(PropTypes.string),
    children: PropTypes.node.isRequired
}

export default CheckPermissions;



