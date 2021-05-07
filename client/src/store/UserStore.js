import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._email = ''
        this._role = []
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }

    setEmail(email) {
        this._email = email
    }

    setRole(role) {
        this._role = role
    }

    get isAuth() {
        return this._isAuth
    }

    get Email() {
        return this._email
    }

    get Role() {
        return this._role
    }

    login(userData) {
        this.setIsAuth(true)
        this.setRole(userData.role)
        this.setEmail(userData.email)
    }

    loginOut(){
        this.setIsAuth(false)
        this.setEmail('')
        this.setRole([])
        localStorage.removeItem('token')
    }
}
