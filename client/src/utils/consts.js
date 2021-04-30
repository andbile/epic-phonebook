// маршруты
export const HOME_ROUTE = '/'
export const ADMIN_ROUTE = '/admin'
export const PHONE_BOOK_ROUTE = '/phonebook'
export const LOGIN_ROUTE = '/login'
export const REGISTRATION_ROUTE = '/registration'



// роли пользователей
export const ADMIN_ROLE = 'ADMIN' // полный доступ к сайту
export const PERSONAL_ROLE = 'PERSONAL' // доступ на правку департаментов, контактов и телефонной книги

// доступ пользователей к кнопке "Админка" компонента Login и маршруту ADMIN_ROUTE (административная панель)
// ADMIN_ROLE не требует дополнительной проверки
export const ADMIN_PANEL_PERMISSION_ROLES = [PERSONAL_ROLE]