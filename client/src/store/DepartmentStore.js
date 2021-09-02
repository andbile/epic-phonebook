import {makeAutoObservable} from "mobx";

export default class DepartmentStore {
    constructor() {

        /**
         * this._departments {array.object}
         * code {string}
         * id {number}
         * is_seller {boolean}
         * name {string}
         */
        this._departments = []

        /**
         * this._departmentsContacts {array.<object>}
         * departmentId {number},
         * email {array.<string>}
         * id {number}
         * position {string}
         * tel_dect {string}
         * tel_landline {array.<string>}
         */
        this._departmentsContacts = []
        makeAutoObservable(this)
    }

    setDepartments(departments) {
        this._departments = departments
    }

    setDepartmentsContacts(departmentsContacts) {
        this._departmentsContacts = departmentsContacts
    }

    get departments() {
        return this._departments
    }

    get departmentsContacts() {
        return this._departmentsContacts
    }
}