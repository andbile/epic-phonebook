// здесь мы реализуем функции регистрации/авторизации и проверки токина на валидность
import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (email, password) => {
   /* const {data} = await $host.post('user/registration', {email, password, role: ['ADMIN']})*/
    const {data} = await $host.post('user/registration', {email, password})
    localStorage.setItem('token', data.token)
    // декодируем токен (почту/id/role) что бы отображать инфу в профиле/странице пользователя
    return jwt_decode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post('user/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

// каждый раз при обновлении старицы будем проверять валидность токина и/или розлогинивать пользователя
export const check = async () => {
    const {data} = await $authHost.get('user/auth' )
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}
