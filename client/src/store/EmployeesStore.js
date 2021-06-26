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
                id:421,
                departmentId : 1,
                last_name: 'Ведецький',
                first_name: 'Ігор',
                patronymic_name: 'Степанович',
                position: 'заступник директора з адміністративно-господарських питань',
                tel_mobile: ['+380972797775']
            },
            {
                id:395,
                departmentId : 5,
                last_name: 'Колісник',
                first_name: 'Світлана',
                patronymic_name: 'Антонівна',
                position: 'продавець непродовольчих товарів',
                tel_mobile: ['+380984444180']
            },
            {
                id:375,
                departmentId : 5,
                last_name: 'Саранюк',
                first_name: 'Тетяна',
                patronymic_name: 'Павлівна',
                position: 'старший продавець непродовольчих товарів',
                tel_mobile: ['+380989086095']
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