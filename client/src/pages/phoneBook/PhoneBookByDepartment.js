import React, {useContext} from 'react';
import MainContainer from "../../components/MainContainer";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {useParams, } from 'react-router-dom'
import Button from "react-bootstrap/cjs/Button";
import {PHONE_BOOK_ROUTE} from "../../utils/consts";
import {Link} from "react-router-dom";
import PersonalTable from "../../components/PersonalTable";
import PhoneBookByDepartmentItem from "./PhoneBookByDepartmentItem";


const PhoneBookByDepartment = observer(() => {
    const {employees, department} = useContext(Context)
    let {departId} = useParams()

    const getCurrentDepartment = (departmentCode) => {
        return department.departments.filter(item =>
            item.code === departmentCode
        )
    }

    const currentDepartment = getCurrentDepartment(departId)


    const getCurrentEmployees = (departmentId) => {
        return employees.employees.filter(item =>
            item.departmentId === departmentId
        )
    }

    const currentEmployees = getCurrentEmployees(currentDepartment[0].id)



    return (
        <MainContainer>
            <Link to={PHONE_BOOK_ROUTE}>
                <Button>Повернутися</Button>
            </Link>
            <h2 className='text-center'>Відділ {departId} &ndash; {currentDepartment[0].name}</h2>

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
                    currentEmployees.map( (employeesByDepartment , i) =>
                        <PhoneBookByDepartmentItem
                            key={i}
                            employeesByDepartment={employeesByDepartment}
                        />
                    )
                }
                </tbody>
            </PersonalTable>
        </MainContainer>
    );
});

export default PhoneBookByDepartment;