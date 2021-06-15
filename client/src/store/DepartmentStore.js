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
        makeAutoObservable(this)
    }

    setDepartments(departments) {
        this._departments = departments
    }

    get departments() {
        return this._departments
    }
}