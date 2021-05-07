import React, {useContext} from "react";
import {observer} from "mobx-react-lite";
import PropTypes from 'prop-types'
import {Context} from "../index";
import checkUserPermissions from "../utils/checkUserPermissions";

/**
 * Проверка прав пользователя и условный рендер вложенных компонентов
 * @param {Props} props -
 * @param {Array} props.permissions - необходимые права для рендера компонента
 * @param {ReactNode} props.children
 * **/
const CheckPermissions = observer(({permissions = [], children}) => {

    const {user} = useContext(Context)

    return (
        <>
            {checkUserPermissions(permissions, user.Role) && children}
        </>
    );
});

CheckPermissions.propTypes = {
    permissions: PropTypes.arrayOf(PropTypes.string),
    children: PropTypes.node.isRequired
}

export default CheckPermissions;



