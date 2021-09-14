import React from 'react';
import {
    ADMIN_DEPARTMENTS_PHONE_BOOK_ROUTE,
    ADMIN_DEPARTMENTS_ROUTE, ADMIN_EMPLOYEES_PHONE_BOOK_ROUTE,
    ROLE_PERSONAL,
} from "../../utils/consts";
import {Link} from "react-router-dom";
import CheckPermissions from "../../components/CheckPermissions";
import {Button} from "react-bootstrap";


const menuList = [
    {
        name: 'Відділи',
        route: ADMIN_DEPARTMENTS_ROUTE,
        permissions: [ROLE_PERSONAL]
    },
    {
        name: "Контакти співробітників",
        route: ADMIN_EMPLOYEES_PHONE_BOOK_ROUTE,
        permissions: [ROLE_PERSONAL]
    },
    {
        name: "Контакти відділів",
        route: ADMIN_DEPARTMENTS_PHONE_BOOK_ROUTE,
        permissions: [ROLE_PERSONAL]
    }
]

/**
 * Sidebar menu in admin panel
 * @return {JSX.Element}
 */
const AdminSidebar = () => {
    return (
        <div>
            {menuList.map((item, i) =>
                <CheckPermissions key={i} permissions={item.permissions}>
                    <Link key={i} to={item.route}>
                        <Button className="mb-1 w-100 text-left">{item.name}</Button>
                    </Link>
                </CheckPermissions>
            )}
        </div>
    );
};

export default AdminSidebar;
