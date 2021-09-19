import React, {useContext} from 'react';
import {Person} from "react-bootstrap-icons";
import PropTypes from 'prop-types'
import Button from "react-bootstrap/Button";
import {useHistory} from "react-router-dom";
import {EMPLOYEES_PHONE_BOOK_LINK} from "../../../utils/consts";
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import DepartmentPhoneBookEntryItem from "./DepartmentPhoneBookEntryItem";
import isPhoneBookBtnCallbacks from "../../../components/propTypeValidators/isPhoneBookBtnCallbacks";

/**
 * Display the abbreviated phone book of the department
 * Button - link to employees phone book of the department
 * @param {object} props
 * @param {number} props.departmentId - department id from DB
 * @param {boolean} props.isAdminPanel - call react component from admin route
 * @param {object} props.phoneBookBtnCallbacks - event handlers delete/update phone book entry
 * @return {React.FunctionComponent<object>}
 */

const DepartmentPhoneBookItem = observer((props) => {
    const {departmentStore} = useContext(Context)
    const history = useHistory()

    const {departmentId, isAdminPanel, phoneBookBtnCallbacks} = props

    // Get the department
    const department = departmentStore.departments.find(item => item.id === departmentId)

    // Get phone book entries of the department
    const phoneBookEntries = departmentStore.departmentsContacts.filter(item => item.departmentId === departmentId)

    /**
     * Button to display employees phone book of the department
     * @return {JSX.Element}
     */
    const btnToShowEmployeesPhoneBookByDepartment = () => {
        return (
            <Button variant="outline-dark bg-secondary text-white pt-1 pb-1"
                    onClick={() =>
                        history.push(`${EMPLOYEES_PHONE_BOOK_LINK}${department.code}`)
                    }
            > Детально<Person className='icon'/>
            </Button>
        )
    }

    return (
        <>
            <tr>
                <td
                    className={department && department.is_seller ? 'seller' : 'not-seller'}
                    colSpan={isAdminPanel ? 6 : 4}
                >
                    <div className='d-flex align-items-center'>
                        <span className='flex-grow-1'>{department && department.code} &ndash; {department && department.name}</span>
                        {!isAdminPanel && btnToShowEmployeesPhoneBookByDepartment()}
                    </div>
                </td>
            </tr>

            {
                phoneBookEntries.map(item =>
                    <DepartmentPhoneBookEntryItem
                        key={department && department.code + item.id}
                        departmentPhoneBookEntryItem={item}
                        isAdminPanel={isAdminPanel}
                        phoneBookBtnCallbacks={phoneBookBtnCallbacks}
                    />
                )
            }
        </>

    );
});


DepartmentPhoneBookItem.propTypes = {
    departmentId: PropTypes.number.isRequired,
    isAdminPanel: PropTypes.bool,
    phoneBookBtnCallbacks: isPhoneBookBtnCallbacks
}

export default DepartmentPhoneBookItem;