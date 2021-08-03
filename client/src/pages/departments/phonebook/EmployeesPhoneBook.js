import React, {useContext, useEffect, useState} from 'react';
import MainContainer from "../../../components/MainContainer";
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import {useParams} from 'react-router-dom'
import Button from "react-bootstrap/cjs/Button";
import {DEPARTMENTS_PHONE_BOOK_ROUTE} from "../../../utils/consts";
import {Link} from "react-router-dom";
import PersonalTable from "../../../components/PersonalTable";
import {BoxArrowLeft} from "react-bootstrap-icons";
import EmployeesPhoneBookEntryItem from "./EmployeesPhoneBookEntryItem";
import PropTypes from 'prop-types'
import isPhoneBookBtnCallbacks from './../../../components/propTypeValidators/isPhoneBookBtnCallbacks'
import isDepartmentId from './../../../components/propTypeValidators/isDepartmentId'
import {fetchDepartments} from "../../../http/departmentAPI";


/**
 * Display a list employees of the department
 * @param {object} props
 * @param {number} props.departmentId - department id from DB
 * @param {boolean} props.isAdminPanel - call react component from admin route
 * @param {object} props.phoneBookBtnCallbacks - event handlers delete/update phone book entry
 * @return {React.FunctionComponent<object>}
 */
const EmployeesPhoneBook = observer( props => {
    const {employeesStore, departmentStore} = useContext( Context )
    const {departmentId, isAdminPanel, phoneBookBtnCallbacks} = props


    const {departmentCode} = useParams()

    const [currentDepartment, setCurrentDepartment] = useState({})

    //TODO если такого departmentCode нету, вывод ошибки - такого департамента не существует, сейчас реакт крушится
    // с базы тянуть только конкретный департамент по departmentCode

    useEffect(() => {
        fetchDepartments().then(data => {
            departmentStore.setDepartments(data)

            setCurrentDepartment(
                isAdminPanel
                    ? getCurrentDepartmentByID( departmentId )
                    : getCurrentDepartmentByCode( departmentCode ))
        })
    }, [])

    /**
     * Get the department using department id
     * @param {string} departmentId - department id from DB
     * @return {object} the department from state
     */
    const getCurrentDepartmentByID = departmentId => {
        return departmentStore.departments.find( item =>
            item.id === +departmentId
        )
    }

    /**
     * Get the department using the request parameter
     * @param {string} departmentCode - department code
     * @return {object} the department from state
     */
    const getCurrentDepartmentByCode = departmentCode => {
        return departmentStore.departments.find( item =>
            item.code === departmentCode
        )
    }

    /**
     * Get an array of employees phone book of the selected department
     * @param {number} departmentId - department id from DB
     * @return {array} employees from state
     */
    const getCurrentEmployees = ( departmentId ) =>
        employeesStore.employees.filter( item =>
            item.departmentId === departmentId
        )


    const employees = getCurrentEmployees( currentDepartment.id )


    return (
        <MainContainer>
            {
                !isAdminPanel && (
                    <>
                        <Link to={DEPARTMENTS_PHONE_BOOK_ROUTE}>
                            <Button><BoxArrowLeft className='icon'/> Повернутися</Button>
                        </Link>
                        <h2>Відділ {departmentCode} &ndash; {currentDepartment.name}</h2>
                    </>
                )
            }

            <PersonalTable>
                <thead>
                <tr>
                    <th>ПІБ</th>
                    <th>Посада</th>
                    <th>Мобільний телефон</th>
                    {isAdminPanel && <th colSpan={2}/>}
                </tr>
                </thead>
                <tbody>
                {
                    employees.map( ( employeeItem, i ) =>
                        <EmployeesPhoneBookEntryItem
                            key={employeeItem.id}
                            employeeEntry={employeeItem}
                            isAdminPanel={isAdminPanel}
                            phoneBookBtnCallbacks={phoneBookBtnCallbacks}
                        />
                    )
                }
                </tbody>
            </PersonalTable>
        </MainContainer>
    );
} );


EmployeesPhoneBook.propTypes = {
    isAdminPanel: PropTypes.bool,
    departmentId: isDepartmentId,
    phoneBookBtnCallbacks: isPhoneBookBtnCallbacks
}

export default EmployeesPhoneBook;