import {makeAutoObservable} from "mobx";

export default class EmployeesStore{
    constructor() {
        this._employees = [
            {
                id:420,
                departmentId : 1,
                last_name: 'Літинська',
                first_name: 'Інна',
                patronymic_name: 'Василівна',
                position: 'юрисконсульт',
                tel_mobile: ['+380504118913', '+380963357050']
            },
            {
                id:420,
                departmentId : 1,
                last_name: 'Ведецький',
                first_name: 'Ігор',
                patronymic_name: 'Степанович',
                position: 'заступник директора з адміністративно-господарських питань',
                tel_mobile: ['+380972797775']
            }
        ]
        makeAutoObservable(this)
    }

    setEmployees(employees){
        this._employees = employees
    }

    get employees(){
        return this._employees
    }

}