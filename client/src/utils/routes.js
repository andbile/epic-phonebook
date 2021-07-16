// описание маршрутов
import {
    ADMIN_ROUTE,
    //ADMIN_WORK_SCHEDULE_ROUTE,
    //ADMIN_PERSONAL_EMPLOYEES_ROUTE,
    HOME_ROUTE,
    DEPARTMENTS_PHONE_BOOK_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
    ROLES_ADMIN_PANEL_PERMISSION,
    ROLE_TEST_ADMIN,
    ROLE_PERSONAL,
    ADMIN_DEPARTMENTS_ROUTE,
    ADMIN_DEPARTMENTS_PHONE_BOOK_ROUTE, DEPARTMENT_PHONE_BOOK_ROUTE, ADMIN_EMPLOYEES_PHONE_BOOK_ROUTE
} from './consts'
import Home from './../pages/Home'
import DepartmentsPhoneBook from '../pages/departments/phonebook/DepartmentsPhoneBook'
import Auth from './../pages/Auth'

// admins components
import Admin from '../pages/admin/Admin'
import WorkSchedule from "../pages/admin/WorkSchedule";
import DepartmentsAdmin from "../pages/departments/DepartmentsAdmin";
import Employees from "../pages/admin/personal/Employees";
//import DepartmentContacts from "../pages/departments/DepartmentContacts----";
import EmployeesPhoneBook from "../pages/departments/phonebook/EmployeesPhoneBook";
import DepartmentsPhoneBookAdmin from "../pages/departments/phonebook/DepartmentsPhoneBookAdmin";
import EmployeesPhoneBookAdmin from "../pages/departments/phonebook/EmployeesPhoneBookAdmin";


//
const personalRoutes =
    [
        {
            path: ADMIN_DEPARTMENTS_ROUTE,
            component: DepartmentsAdmin,
            permissions: [ROLE_PERSONAL],
            exact: true
        },
        {
            path: ADMIN_DEPARTMENTS_PHONE_BOOK_ROUTE,
            component:DepartmentsPhoneBookAdmin,
            permissions: [ROLE_PERSONAL],
            exact: true
        },
        {
            path: ADMIN_EMPLOYEES_PHONE_BOOK_ROUTE,
            component: EmployeesPhoneBookAdmin,
            permissions: [ROLE_PERSONAL],
            exact: true
        },
       /* {
            path: ADMIN_DEPARTMENTS_PHONE_BOOK_ROUTE,
            component: DepartmentContacts,
            permissions: [ROLE_PERSONAL],
            exact: true
        }*/
    ]

const scheduleRoute = [
  /*  {
        path: ADMIN_WORK_SCHEDULE_ROUTE,
        component: WorkSchedule,
        permissions: [ROLE_TEST_ADMIN],
        exact: true
    }*/
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
        path: DEPARTMENTS_PHONE_BOOK_ROUTE,
        component: DepartmentsPhoneBook,
        exact: true
    },
    {
        path: DEPARTMENT_PHONE_BOOK_ROUTE,
        component: EmployeesPhoneBook,
        exact: true
    }
]