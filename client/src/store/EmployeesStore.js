import {makeAutoObservable} from "mobx";

export default class EmployeesStore{
    constructor() {
        /**
         * this._employees {array.object}
         * id {number}
         * last_name {string}
         * first_name {string}
         * patronymic_name {string}
         * position {string}
         * tel_mobile {array.<string>}
         * departmentId {number}
         */
        this._employees = []

        makeAutoObservable(this)
    }

    setEmployees(employees){
        this._employees = employees
    }

    get employees(){
        return this._employees
    }

}