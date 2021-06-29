import React from 'react';
import {Person, Phone, Telephone} from "react-bootstrap-icons";
import PropTypes from 'prop-types'
import Button from "react-bootstrap/Button";
import {useHistory} from "react-router-dom";
import {DEPARTMENT_PHONE_BOOK_LINK} from "../../../utils/consts";

/**
 * Display the abbreviated phone book of one department
 * Button - link to employees phone book of one department
 * @param props
 * @return {JSX.Element}
 * @constructor
 */
const PhoneBookItem = (props) => {
    const {department, departmentPhoneBook} = props
    const history = useHistory()

    return (
        <>
            <tr>
                <td className={department.is_seller ? 'seller' : 'not-seller'} colSpan={4}>
                    <div className='d-flex align-items-center'>
                        <span className='flex-grow-1'>{department.code} &ndash; {department.name}</span>
                        <Button variant="outline-dark bg-secondary text-white pt-1 pb-1"
                                onClick={() =>
                                    history.push(`${DEPARTMENT_PHONE_BOOK_LINK}${department.code}`)
                                }
                        > Детально<Person className='icon'/>
                        </Button>
                    </div>
                </td>
            </tr>

            {
                departmentPhoneBook.map(departmentPhoneBookItem =>
                    <tr key={departmentPhoneBookItem.id}>
                        <td className='text-left'>{departmentPhoneBookItem.position}</td>
                        <td>
                            {
                                departmentPhoneBookItem.tel_landline.length > 0 ?
                                    departmentPhoneBookItem.tel_landline.map((tel, i) =>
                                        <div key={i}>{tel}<Telephone className='icon icon-phone'/></div>)
                                    :
                                    <span>&mdash;</span>
                            }
                        </td>
                        <td>
                            {
                                departmentPhoneBookItem.tel_dect ?
                                    <span>{departmentPhoneBookItem.tel_dect}<Phone className='icon icon-phone'/></span>
                                    :
                                    <span>&mdash;</span>
                            }
                        </td>
                        <td>
                            {
                                departmentPhoneBookItem.email.length > 0 ?
                                    departmentPhoneBookItem.email.map((email, i) =>
                                        <a key={i} href={"mailto:" + email}>{email}</a>)
                                    :
                                    <span>&mdash;</span>
                            }

                        </td>
                    </tr>
                )
            }
        </>

    );
};


PhoneBookItem.prototype = {
    department: PropTypes.object.isRequired,
    departmentContacts: PropTypes.object.isRequired,
    setDepartmentCode: PropTypes.func.isRequired
}

export default PhoneBookItem;