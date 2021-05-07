// описание маршрутов
import {
    ADMIN_ROUTE,
    ADMIN_PERSONAL_ROUTE,
    ADMIN_WORK_SCHEDULE_ROUTE,
    HOME_ROUTE,
    PHONE_BOOK_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
    ROLES_ADMIN_PANEL_PERMISSION, ROLE_TEST_ADMIN, ROLE_PERSONAL
} from './consts'
import Home from './../pages/Home'
import PhoneBook from './../pages/PhoneBook'
import Auth from './../pages/Auth'

// admins components
import Admin from './../pages/Admin'
import Personal from "../pages/Admin/Personal";
import WorkSchedule from "../pages/Admin/WorkSchedule";

// для авторизованных пользователей
export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        component: Admin,
        permissions: ROLES_ADMIN_PANEL_PERMISSION,
        routes:[
            {
                path: ADMIN_PERSONAL_ROUTE,
                component: Personal,
                permissions:[ROLE_PERSONAL]
            },
            {
                path: ADMIN_WORK_SCHEDULE_ROUTE,
                component: WorkSchedule,
                permissions:[ROLE_TEST_ADMIN]
            }
        ]
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