import {makeAutoObservable} from "mobx";

export default class FetchStore {
    constructor() {
        this._isLoading = false
        this._isError = false
        this._errorMessage = ''
        makeAutoObservable(this)
    }

    setIsLoading(bool) {
        this._isLoading = bool
    }

    setIsError(bool) {
        this._isError = bool
    }

    setErrorMessage(message) {
        this._errorMessage = message
    }

    get isLoading(){
        return this._isLoading
    }

    get isError() {
        return this._isError
    }

    get errorMessage() {
        return this._errorMessage
    }
}
