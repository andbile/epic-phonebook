import React from 'react';
import styled from "styled-components";
import {
    ADMIN_PERSONAL_DEPARTMENTS_CONTACTS_ROUTE,
    ADMIN_PERSONAL_DEPARTMENTS_ROUTE, ADMIN_PERSONAL_EMPLOYEES_ROUTE,
    ADMIN_WORK_SCHEDULE_ROUTE,
    ROLE_PERSONAL,
    ROLE_TEST_ADMIN
} from "../../utils/consts";
import AdminMenuItem from "./AdminMenuItem";


const menuList = [
    {
        name: 'Департаменти',
        link: ADMIN_PERSONAL_DEPARTMENTS_ROUTE,
        permissions: [ROLE_PERSONAL]
    },
    {
        name: "Співробітники",
        link: ADMIN_PERSONAL_EMPLOYEES_ROUTE,
        permissions: [ROLE_PERSONAL]
    },
    {
        name: "Контакти департаментів",
        link: ADMIN_PERSONAL_DEPARTMENTS_CONTACTS_ROUTE,
        permissions: [ROLE_PERSONAL]
    },
    {
        name: "Графіки",
        link: ADMIN_WORK_SCHEDULE_ROUTE,
        permissions: [ROLE_TEST_ADMIN],
    }

]

const StyledAdminMenu = styled.div`
  width: 150px;
  margin-right: 20px;
`

const AdminMenu = () => {
    return (
        <StyledAdminMenu>
            {menuList.map((item, i) => {
                return <AdminMenuItem key={i} {...item}/>
            })}
        </StyledAdminMenu>
    );
};

export default AdminMenu;
