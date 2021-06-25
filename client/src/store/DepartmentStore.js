import {makeAutoObservable} from "mobx";

export default class DepartmentStore {
    constructor() {
        this._departments = [
            {
                "id": 1,
                "code": "114",
                "name": "Апарат управління",
                "is_seller": false
            },
            {
                "id": 2,
                "code": "791",
                "name": "Центр видачі замовлень",
                "is_seller": false
            },
            {
                "id": 3,
                "code": "681",
                "name": "Відділ головного енергетика",
                "is_seller": false
            },
            {
                "id": 4,
                "code": "20.210.70",
                "name": "Інструменти, автогрупа та електроінструменти, сантехніка",
                "is_seller": true
            },
            {
                "id": 5,
                "code": "50",
                "name": "Декор",
                "is_seller": true
            }
        ]
        this._departmentsContacts = [
            {
                "id": 2,
                "departmentId": 1,
                "position": "Директор",
                "tel_dect": "2000",
                "tel_landline": [],
                "email":["um.dir@epicentrk.com"]
            },
            {
                "id": 1,
                "departmentId": 1,
                "position": "Асистент діра",
                "tel_dect": "",
                "tel_landline": ["2022", "4-67-26"],
                "email":["um.office@epicentrk.com"]
            },
            {
                "id": 3,
                "departmentId": 5,
                "position": "Продаваны 50",
                "tel_dect": "",
                "tel_landline": ["2050"],
                "email":["um.info50@epicentrk.com"]
            },
            {
                "id": 4,
                "departmentId": 5,
                "position": "Начальник 50",
                "tel_dect": "2005",
                "tel_landline": [],
                "email":["um.nach50@epicentrk.com"]
            }
        ]
        this._currentDepartment = ''
        makeAutoObservable(this)
    }

    setDepartments(departments) {
        this._departments = departments
    }

    setDepartmentsContacts(departmentsContacts){
        this._departmentsContacts = departmentsContacts
    }

    setCurrentDepartment(currentDepartment){
        this._currentDepartment = currentDepartment
    }

    get departments() {
        return this._departments
    }

    get departmentsContacts(){
        return this._departmentsContacts
    }

    get currentDepartment(){
        return this._currentDepartment
    }
}