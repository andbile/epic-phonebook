// routes for unauthorized users
export const HOME_ROUTE = '/'
export const NOT_FOUND_ROUTE = '/notfound'
export const LOGIN_ROUTE = '/login'
export const REGISTRATION_ROUTE = '/registration'

export const EMPLOYEES_PHONE_BOOK_LINK = '/employee-phonebook/'
//export const EMPLOYEES_PHONE_BOOK_ROUTE = `${EMPLOYEES_PHONE_BOOK_LINK}:departmentCode`
export const EMPLOYEES_PHONE_BOOK_ROUTE = `/employee-phonebook/:departmentCode`
//export const DEPARTMENT_PHONE_BOOK_ROUTE = '/departments-phonebook/:departmentCode'
export const DEPARTMENTS_PHONE_BOOK_ROUTE = '/departments-phonebook'


// routes for admin users
export const ADMIN_ROUTE = '/admin'
export const ADMIN_DEPARTMENTS_ROUTE = '/admin/departments'
export const ADMIN_DEPARTMENTS_PHONE_BOOK_ROUTE = '/admin/department-phonebook'
export const ADMIN_EMPLOYEES_PHONE_BOOK_ROUTE = '/admin/employees'


// роли пользователей
// TODO получать от сервера
export const ROLE_ADMIN = 'admin' // полный доступ к сайту
export const ROLE_PERSONAL = 'personal' // доступ на правку департаментов, контактов и телефонной книги
export const ROLE_TEST_ADMIN = 'test_admin'

// доступ пользователей к кнопке "Админка" компонента Login и маршруту ADMIN_ROUTE (административная панель)
// ROLE_ADMIN не требует дополнительной проверки
// TODO получать от сервера
export const ROLES_ADMIN_PANEL_PERMISSION = [ROLE_PERSONAL, ROLE_TEST_ADMIN]