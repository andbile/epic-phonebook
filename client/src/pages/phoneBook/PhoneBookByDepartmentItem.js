import React from 'react';

const PhoneBookByDepartmentItem = (props) => {

    const {employeesByDepartment} = props


    return (
        <tr>
            <td>{employeesByDepartment.last_name} {employeesByDepartment.first_name} {employeesByDepartment.patronymic_name}</td>
            <td className='text-left'>{employeesByDepartment.position}</td>
            <td>
                {
                    employeesByDepartment.tel_mobile.length > 0 ?
                        employeesByDepartment.tel_mobile.map(tel =>
                            <div key={employeesByDepartment.id}><a href={'tel:' + tel}>{tel}</a></div>)
                        :
                        <span>&mdash;</span>
                }
            </td>


        </tr>
    );
};

export default PhoneBookByDepartmentItem;