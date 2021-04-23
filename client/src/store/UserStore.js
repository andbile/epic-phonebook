import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._user = {}
        this._email = ''
        this._role = []
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }

    setUser(user) {
        this._user = user
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

    get User() {
        return this._user
    }

    get Email() {
        return this._email
    }

    get Role() {
        return this._role
    }
}
