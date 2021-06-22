import React from 'react';
import {Phone, Telephone} from "react-bootstrap-icons";
import PropTypes from 'prop-types'

const PhoneBookItem = (props) => {
    const {department, departmentContacts} = props

    return (
        <>
            <tr>
                <td
                    className={department.is_seller ? 'seller' : 'not-seller'}
                    colSpan={4}>
                    {department.code} &ndash; {department.name}
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
    departmentContacts: PropTypes.object.isRequired
}

export default PhoneBookItem;