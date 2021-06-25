// -----------------------------------------------
// маршруты - для неавторизованных пользователей
export const HOME_ROUTE = '/'
export const LOGIN_ROUTE = '/login'
export const REGISTRATION_ROUTE = '/registration'

export const PHONE_BOOK_ROUTE = '/phonebook'
export const PHONE_BOOK_BY_DEPARTMENT_LINK = '/phonebook-by-department/'
export const PHONE_BOOK_BY_DEPARTMENT_ROUTE = `${PHONE_BOOK_BY_DEPARTMENT_LINK}:departId`


// -----------------------------------------------
// маршруты - админка
export const ADMIN_ROUTE = '/admin'
export const ADMIN_PERSONAL_DEPARTMENTS_ROUTE = '/admin/departments'
export const ADMIN_PERSONAL_DEPARTMENTS_CONTACTS_ROUTE = '/admin/personal-dept-contact/:departId'
export const ADMIN_PERSONAL_EMPLOYEES_ROUTE = '/admin/employees'
export const ADMIN_WORK_SCHEDULE_ROUTE = '/admin/work-schedule'


// роли пользователей
export const ROLE_ADMIN = 'ADMIN' // полный доступ к сайту
export const ROLE_PERSONAL = 'PERSONAL' // доступ на правку департаментов, контактов и телефонной книги
export const ROLE_TEST_ADMIN = 'TEST_ADMIN'

// доступ пользователей к кнопке "Админка" компонента Login и маршруту ADMIN_ROUTE (административная панель)
// ROLE_ADMIN не требует дополнительной проверки
export const ROLES_ADMIN_PANEL_PERMISSION = [ROLE_PERSONAL, ROLE_TEST_ADMIN]