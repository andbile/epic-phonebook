import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const checkUserAuthorization = async () => {
    const {data} = await $authHost.get('user/auth' )
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const registration = async (email, password) => {
    const {data} = await $host.post('user/registration', {email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post('user/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}