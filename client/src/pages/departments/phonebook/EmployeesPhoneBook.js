import React, {useContext, useEffect} from 'react';
import MainContainer from "../../../components/MainContainer";
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import {useParams} from 'react-router-dom'
import {useHistory} from "react-router-dom";
import Button from "react-bootstrap/cjs/Button";
import {DEPARTMENTS_PHONE_BOOK_ROUTE} from "../../../utils/consts";
import {Link} from "react-router-dom";
import PersonalTable from "../../../components/PersonalTable";
import {BoxArrowLeft} from "react-bootstrap-icons";
import EmployeesPhoneBookEntryItem from "./EmployeesPhoneBookEntryItem";
import PropTypes from 'prop-types'
import isPhoneBookBtnCallbacks from './../../../components/propTypeValidators/isPhoneBookBtnCallbacks'
import {fetchOneDepartmentByCode} from "../../../http/departmentAPI";
import useFetching from "../../../hooks/useFetching";
import {fetchEmployeesByDepartmentId} from "../../../http/employeeAPI";


/**
 * Display a list employees of the department
 * @param {object} props
 * @param {number} props.departmentId - department id from DB
 * @param {boolean} props.isAdminPanel - call react component from admin route
 * @param {object} props.phoneBookBtnCallbacks - event handlers delete/update phone book entry
 * @return {React.FunctionComponent<object>}
 */
const EmployeesPhoneBook = observer(props => {
    const {employeesStore, departmentStore} = useContext(Context)
    const {isAdminPanel, phoneBookBtnCallbacks} = props

    const {departmentCode} = useParams()
    const history = useHistory()
    const fetching = useFetching(null)

    useEffect(() => {
        if (departmentCode) {
            fetching(async () => {
                // get department using department code from request parameter
                fetchOneDepartmentByCode(departmentCode)
                    .then( data => {
                        // redirect if department is not found
                        if (data.length === 0) return history.push(DEPARTMENTS_PHONE_BOOK_ROUTE)

                        departmentStore.setCurrentDepartment(data[0])

                        // get employees
                        fetchEmployeesByDepartmentId(departmentStore.currentDepartment.id)
                            .then(data => employeesStore.setEmployees(data))
                    })
            })
        }
    }, [])

    return (
        <MainContainer>
            {
                !isAdminPanel && (
                    <>
                        <Link to={DEPARTMENTS_PHONE_BOOK_ROUTE}>
                            <Button><BoxArrowLeft className='icon'/> Повернутися</Button>
                        </Link>
                        <h2 className='mt-3'>Відділ {departmentCode} &ndash; {departmentStore.currentDepartment.name}</h2>
                    </>
                )
            }

            <PersonalTable>
                <thead>
                <tr>
                    <th>ПІБ</th>
                    <th>Посада</th>
                    <th>Мобільний телефон</th>
                    {isAdminPanel && <th colSpan={3}/>}
                </tr>
                </thead>
                <tbody>
                {
                    employeesStore.employees.map((employeeItem) =>
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
});


EmployeesPhoneBook.propTypes = {
    isAdminPanel: PropTypes.bool,
    phoneBookBtnCallbacks: isPhoneBookBtnCallbacks
}

export default EmployeesPhoneBook;