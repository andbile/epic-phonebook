import axios from "axios";

// unauthorized users
const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})


// authorized users
const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

// adding a token to requests requiring authorization
const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}
$authHost.interceptors.request.use(authInterceptor)


export {
    $host,
    $authHost
}
