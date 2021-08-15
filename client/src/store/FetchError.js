import {makeAutoObservable} from "mobx";

export default class FetchError {
    constructor() {
        this._isError = false
        this._message = ''
        makeAutoObservable(this)
    }

    setIsError(bool) {
        this._isError = bool
    }

    setErrorMessage(message) {
        this._message = message
    }

    get isError() {
        return this._isError
    }

    get errorMessage() {
        return this._message
    }
}
