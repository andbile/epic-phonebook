// routes link
import {
    ADMIN_ROUTE,
    ROLES_ADMIN_PANEL_PERMISSION,
    ROLE_PERSONAL,
    ADMIN_DEPARTMENTS_ROUTE,
    ADMIN_DEPARTMENTS_PHONE_BOOK_ROUTE, ADMIN_EMPLOYEES_PHONE_BOOK_ROUTE
} from './consts'

// components
import Admin from '../pages/admin/Admin'
import DepartmentsAdmin from "../pages/departments/DepartmentsAdmin";
import DepartmentsPhoneBookAdmin from "../pages/departments/phonebook/DepartmentsPhoneBookAdmin";
import EmployeesPhoneBookAdmin from "../pages/departments/phonebook/EmployeesPhoneBookAdmin";


//
const departmentsRoutes =
    [
        {
            path: ADMIN_DEPARTMENTS_ROUTE,
            component: DepartmentsAdmin,
            permissions: [ROLE_PERSONAL],
            exact: true
        },
        {
            path: ADMIN_DEPARTMENTS_PHONE_BOOK_ROUTE,
            component: DepartmentsPhoneBookAdmin,
            permissions: [ROLE_PERSONAL],
            exact: true
        },
        {
            path: ADMIN_EMPLOYEES_PHONE_BOOK_ROUTE,
            component: EmployeesPhoneBookAdmin,
            permissions: [ROLE_PERSONAL],
            exact: true
        },
    ]


// для авторизованных пользователей
export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        component: Admin,
        /* exact: true,*/
        permissions: ROLES_ADMIN_PANEL_PERMISSION,
        routes: [...departmentsRoutes]
    }
]
