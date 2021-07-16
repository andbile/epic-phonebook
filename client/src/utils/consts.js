// routes for unauthorized users
export const HOME_ROUTE = '/'
export const LOGIN_ROUTE = '/login'
export const REGISTRATION_ROUTE = '/registration'

export const DEPARTMENT_PHONE_BOOK_LINK = '/department-phonebook/'
export const DEPARTMENT_PHONE_BOOK_ROUTE = `${DEPARTMENT_PHONE_BOOK_LINK}:departId`
export const DEPARTMENTS_PHONE_BOOK_ROUTE = '/departments-phonebook'


// -----------------------------------------------
// маршруты - админка
export const ADMIN_ROUTE = '/admin'
export const ADMIN_DEPARTMENTS_ROUTE = '/admin/departments'
export const ADMIN_DEPARTMENTS_PHONE_BOOK_ROUTE = '/admin/department-phonebook'
export const ADMIN_EMPLOYEES_PHONE_BOOK_ROUTE = '/admin/employees'

//export const ADMIN_WORK_SCHEDULE_ROUTE = '/admin/work-schedule' // --


// роли пользователей
export const ROLE_ADMIN = 'ADMIN' // полный доступ к сайту
export const ROLE_PERSONAL = 'PERSONAL' // доступ на правку департаментов, контактов и телефонной книги
export const ROLE_TEST_ADMIN = 'TEST_ADMIN'

// доступ пользователей к кнопке "Админка" компонента Login и маршруту ADMIN_ROUTE (административная панель)
// ROLE_ADMIN не требует дополнительной проверки
export const ROLES_ADMIN_PANEL_PERMISSION = [ROLE_PERSONAL, ROLE_TEST_ADMIN]