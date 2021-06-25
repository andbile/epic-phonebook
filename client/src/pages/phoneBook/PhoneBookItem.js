import React, {useState} from 'react';
import {Person, Phone, Telephone} from "react-bootstrap-icons";
import PropTypes from 'prop-types'
import Button from "react-bootstrap/Button";
import {useHistory} from "react-router-dom";
import {PHONE_BOOK_BY_DEPARTMENT_LINK} from "../../utils/consts";

const PhoneBookItem = (props) => {
    const {department, departmentContacts} = props
    const history = useHistory()

    return (
        <>
            <tr>
                <td
                    className={department.is_seller ? 'seller' : 'not-seller'}
                    colSpan={4}
                >
                    <div className='d-flex align-items-center'>
                        <span className='flex-grow-1'>{department.code} &ndash; {department.name}</span>
                        <Button variant="outline-dark bg-secondary text-white"
                                onClick={() =>
                                    history.push(`${PHONE_BOOK_BY_DEPARTMENT_LINK}${department.code}`)
                                }
                        >Детально<Person className='icon'/></Button>
                    </div>
                </td>
            </tr>

            {
                departmentContacts.map(departmentContactItem =>
                    <tr key={departmentContactItem.id}>
                        <td className='text-left'>{departmentContactItem.position}</td>
                        <td>
                            {
                                departmentContactItem.tel_landline.length > 0 ?
                                    departmentContactItem.tel_landline.map((tel, i) =>
                                        <div key={i}>{tel}<Telephone className='icon'/></div>)
                                    :
                                    <span>&mdash;</span>
                            }
                        </td>
                        <td>
                            {
                                departmentContactItem.tel_dect ?
                                    <span>{departmentContactItem.tel_dect}<Phone className='icon'/></span>
                                    :
                                    <span>&mdash;</span>
                            }
                        </td>
                        <td>
                            {
                                departmentContactItem.email.length > 0 ?
                                    departmentContactItem.email.map((email, i) =>
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