// описание маршрутов
import {ADMIN_ROUTE, HOME_ROUTE, PHONE_BOOK_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from './consts'
import Home from './../pages/Home'
import Admin from './../pages/Admin'
import PhoneBook from './../pages/PhoneBook'
import Auth from './../pages/Auth'

// для авторизованных пользователей
export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    }
]

// для любых пользователей
export const publicRoutes = [
    {
        path: HOME_ROUTE,
        Component: Home
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    // TODO Регистрация отключена
   /* {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },*/

    {
        path: PHONE_BOOK_ROUTE,
        Component: PhoneBook
    }
]