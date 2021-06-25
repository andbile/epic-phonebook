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
    ADMIN_PERSONAL_EMPLOYEES_ROUTE, ADMIN_PERSONAL_DEPARTMENTS_CONTACTS_ROUTE, PHONE_BOOK_BY_DEPARTMENT_ROUTE
} from './consts'
import Home from './../pages/Home'
import PhoneBook from '../pages/phoneBook/PhoneBook'
import Auth from './../pages/Auth'

// admins components
import Admin from '../pages/admin/Admin'
import WorkSchedule from "../pages/admin/WorkSchedule";
import Departments from "../pages/admin/deportments/Departments";
import Employees from "../pages/admin/personal/Employees";
import DepartmentContacts from "../pages/admin/deportments/DepartmentContacts";
import PhoneBookByDepartment from "../pages/phoneBook/PhoneBookByDepartment";


//
const personalRoutes =
    [
        {
            path: ADMIN_PERSONAL_DEPARTMENTS_ROUTE,
            component: Departments,
            permissions: [ROLE_PERSONAL],
            exact: true
        },
        {
            path: ADMIN_PERSONAL_EMPLOYEES_ROUTE,
            component: Employees,
            permissions: [ROLE_PERSONAL],
            exact: true
        },
        {
            path: ADMIN_PERSONAL_DEPARTMENTS_CONTACTS_ROUTE,
            component: DepartmentContacts,
            permissions: [ROLE_PERSONAL],
            exact: true
        }
    ]

const scheduleRoute = [
    {
        path: ADMIN_WORK_SCHEDULE_ROUTE,
        component: WorkSchedule,
        permissions: [ROLE_TEST_ADMIN],
        exact: true
    }
]


// для авторизованных пользователей
export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        component: Admin,
       /* exact: true,*/
        permissions: ROLES_ADMIN_PANEL_PERMISSION,
        routes: [...personalRoutes, ...scheduleRoute]
    }
]


// для неавторизованных пользователей
export const publicRoutes = [
    {
        path: HOME_ROUTE,
        component: Home,
        exact: true
    },
    {
        path: LOGIN_ROUTE,
        component: Auth,
        exact: true
    },
    {
        path: REGISTRATION_ROUTE,
        component: Auth,
        exact: true
    },

    {
        path: PHONE_BOOK_ROUTE,
        component: PhoneBook,
        exact: true
    },
    {
        path: PHONE_BOOK_BY_DEPARTMENT_ROUTE,
        component: PhoneBookByDepartment,
        exact: true
    }
]