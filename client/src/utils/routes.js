// описание маршрутов
import {
    ADMIN_ROUTE,
    ADMIN_WORK_SCHEDULE_ROUTE,
    HOME_ROUTE,
    PHONE_BOOK_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
    ROLES_ADMIN_PANEL_PERMISSION,
    ROLE_TEST_ADMIN,
    ROLE_PERSONAL,
    ADMIN_PERSONAL_DEPARTMENTS_ROUTE,
    ADMIN_PERSONAL_EMPLOYEES_ROUTE, ADMIN_PERSONAL_DEPARTMENTS_CONTACTS_ROUTE
} from './consts'
import Home from './../pages/Home'
import PhoneBook from './../pages/PhoneBook'
import Auth from './../pages/Auth'

// admins components
import Admin from '../pages/admin/Admin'
import WorkSchedule from "../pages/admin/WorkSchedule";
import Departments from "../pages/admin/Deportments/Departments";
import Employees from "../pages/admin/personal/Employees";
import DepartmentContacts from "../pages/admin/Deportments/DepartmentContacts";


//
const personalRoutes =
    [
        {
            path: ADMIN_PERSONAL_DEPARTMENTS_ROUTE,
            component: Departments,
            permissions: [ROLE_PERSONAL]
        },
        {
            path: ADMIN_PERSONAL_EMPLOYEES_ROUTE,
            component: Employees,
            permissions: [ROLE_PERSONAL]
        },
        {
            path: ADMIN_PERSONAL_DEPARTMENTS_CONTACTS_ROUTE,
            component: DepartmentContacts,
            permissions: [ROLE_PERSONAL]
        }
    ]

const scheduleRoute = {
    path: ADMIN_WORK_SCHEDULE_ROUTE,
    component: WorkSchedule,
    permissions: [ROLE_TEST_ADMIN]
}


// для авторизованных пользователей
export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        component: Admin,
        permissions: ROLES_ADMIN_PANEL_PERMISSION,
        routes: [...personalRoutes, scheduleRoute]
    }
]


// для неавторизованных пользователей
export const publicRoutes = [
    {
        path: HOME_ROUTE,
        component: Home
    },
    {
        path: LOGIN_ROUTE,
        component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        component: Auth
    },

    {
        path: PHONE_BOOK_ROUTE,
        component: PhoneBook
    }
]