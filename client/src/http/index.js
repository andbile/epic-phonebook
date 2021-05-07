import axios from "axios";

// для обычных запросов которе не требует авторизации
const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

// требующих авторизацию
// каждому запросу автоматически будет подставляться header.authorization
const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

// добавляем интерцептор на запрос
// будет отрабатывать перед каждым запросом и будет подставлять токен
$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}
