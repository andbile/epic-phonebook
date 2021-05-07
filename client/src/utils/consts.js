// маршруты
export const HOME_ROUTE = '/'
export const PHONE_BOOK_ROUTE = '/phonebook'
export const LOGIN_ROUTE = '/login'
export const REGISTRATION_ROUTE = '/registration'

export const ADMIN_ROUTE = '/admin'
export const ADMIN_PERSONAL_ROUTE = '/admin/personal'
export const ADMIN_WORK_SCHEDULE_ROUTE = '/admin/work-schedule'



// роли пользователей
export const ROLE_ADMIN = 'ADMIN' // полный доступ к сайту
export const ROLE_PERSONAL = 'PERSONAL' // доступ на правку департаментов, контактов и телефонной книги
export const ROLE_TEST_ADMIN = 'TEST_ADMIN'

// доступ пользователей к кнопке "Админка" компонента Login и маршруту ADMIN_ROUTE (административная панель)
// ADMIN_ROLE не требует дополнительной проверки
export const ROLES_ADMIN_PANEL_PERMISSION = [ROLE_PERSONAL, ROLE_TEST_ADMIN]