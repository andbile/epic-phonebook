// routes links
import {
    HOME_ROUTE,
    DEPARTMENTS_PHONE_BOOK_ROUTE,
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
    EMPLOYEES_PHONE_BOOK_ROUTE, NOT_FOUND_ROUTE
} from './consts'

// components
import Home from './../pages/Home'
import DepartmentsPhoneBook from '../pages/departments/phonebook/DepartmentsPhoneBook'
import Auth from './../pages/Auth'
import EmployeesPhoneBook from "../pages/departments/phonebook/EmployeesPhoneBook";
import NotFound from "../pages/NotFound";

// public routes
const baseRoutes = [
    {
        path: HOME_ROUTE,
        component: Home,
        exact: true
    },
    {
        // TODO
        path: LOGIN_ROUTE,
        component: Auth,
        exact: true
    },
    {
        // TODO
        path: REGISTRATION_ROUTE,
        component: Auth,
        exact: true
    },
]


const departmentRoutes = [
    {
        path: DEPARTMENTS_PHONE_BOOK_ROUTE,
        component: DepartmentsPhoneBook,
        exact: true
    },
    {
        path: EMPLOYEES_PHONE_BOOK_ROUTE,
        component: EmployeesPhoneBook,
        exact: true
    }
]

const notFoundRoute = {
    path: NOT_FOUND_ROUTE,
    component: NotFound
}

//
export const publicRoutes = [
    ...baseRoutes, ...departmentRoutes
]