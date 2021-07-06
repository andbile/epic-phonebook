import React, {useContext} from 'react';
import MainContainer from "../../../components/MainContainer";
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import {useParams,} from 'react-router-dom'
import Button from "react-bootstrap/cjs/Button";
import {DEPARTMENTS_PHONE_BOOK_ROUTE} from "../../../utils/consts";
import {Link} from "react-router-dom";
import PersonalTable from "../../../components/PersonalTable";
import {BoxArrowLeft} from "react-bootstrap-icons";

// Display a list of department employees
const EmployeesPhoneBook = observer(() => {
    const {employees, departmentStore} = useContext(Context)
    let {departId} = useParams()

    /**
     * Get the department using the request parameter
     * @param {string} departmentCode
     * @return {{code: string, is_seller: boolean, name: string, id: number}}
     */
    const getCurrentDepartment = departmentCode => {
        return departmentStore.departments.find(item =>
            item.code === departmentCode
        )
    }

    /**
     * Get an array of employees of current department
     * @param {number} departmentId
     * @return {[{id:number, departmentId:number, last_name:string, first_name:string,
     *  patronymic_name:string, position: string, tel_mobile:[string]}]}
     */
    const getCurrentEmployees = (departmentId) => {
        return employees.employees.filter(item =>
            item.departmentId === departmentId
        )
    }

    const currentDepartment = getCurrentDepartment(departId)
    const currentEmployees = getCurrentEmployees(currentDepartment.id)


    return (
        <MainContainer>
            <Link to={DEPARTMENTS_PHONE_BOOK_ROUTE}>
                <Button><BoxArrowLeft className='icon'/> Повернутися</Button>
            </Link>
            <h2>Відділ {departId} &ndash; {currentDepartment.name}</h2>

            <PersonalTable>
                <thead>
                <tr>
                    <th>ПБ</th>
                    <th>Посада</th>
                    <th>Мобільний телефон</th>
                </tr>
                </thead>
                <tbody>
                {
                    currentEmployees.map((employeesItem, i) =>
                        <tr key={employeesItem.id}>
                            <td>{employeesItem.last_name} {employeesItem.first_name} {employeesItem.patronymic_name}</td>
                            <td className='text-left'>{employeesItem.position}</td>
                            <td>
                                {
                                    employeesItem.tel_mobile.length > 0 ?
                                        employeesItem.tel_mobile.map((tel, i) =>
                                            <div key={tel}><a href={'tel:' + tel}>{tel}</a></div>)
                                        :
                                        <span>&mdash;</span>
                                }
                            </td>
                        </tr>
                    )
                }
                </tbody>
            </PersonalTable>
        </MainContainer>
    );
});

export default EmployeesPhoneBook;