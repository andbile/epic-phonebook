import React from 'react';
import styled from "styled-components";
import {
    ADMIN_PERSONAL_DEPARTMENTS_CONTACTS_ROUTE,
    ADMIN_PERSONAL_DEPARTMENTS_ROUTE, ADMIN_PERSONAL_EMPLOYEES_ROUTE,
    ADMIN_WORK_SCHEDULE_ROUTE,
    ROLE_PERSONAL,
    ROLE_TEST_ADMIN
} from "../../utils/consts";
import {Link} from "react-router-dom";
import CheckPermissions from "../../components/CheckPermissions";
import {Button} from "react-bootstrap";


const menuList = [
    {
        name: 'Відділи',
        route: ADMIN_PERSONAL_DEPARTMENTS_ROUTE,
        permissions: [ROLE_PERSONAL]
    },
    {
        name: "Співробітники",
        route: ADMIN_PERSONAL_EMPLOYEES_ROUTE,
        permissions: [ROLE_PERSONAL]
    },
    {
        name: "Контакти департаментів",
        route: ADMIN_PERSONAL_DEPARTMENTS_CONTACTS_ROUTE,
        permissions: [ROLE_PERSONAL]
    },
    {
        name: "Графіки",
        route: ADMIN_WORK_SCHEDULE_ROUTE,
        permissions: [ROLE_TEST_ADMIN],
    }

]

const StyledAdminMenu = styled.div`
 // margin-right: 20px;
`

const AdminBar = () => {
    return (
        <StyledAdminMenu>
                {menuList.map( (item, i) =>
                    <CheckPermissions key={i} permissions={item.permissions}>
                        <Link key={i} to={item.route}>
                            <Button className="mb-1 w-100 text-left">{item.name}</Button>
                        </Link>
                    </CheckPermissions>
                )}
        </StyledAdminMenu>
    );
};

export default AdminBar;
