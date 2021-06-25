import React from 'react';

const PhoneBookByDepartmentItem = (props) => {

    const {employeesByDepartment} = props


    return (
        <tr>
            <td>{employeesByDepartment.last_name} {employeesByDepartment.first_name} {employeesByDepartment.patronymic_name}</td>
            <td>{employeesByDepartment.position}</td>
            <td>
                {
                    employeesByDepartment.tel_mobile.length > 0 ?
                        employeesByDepartment.tel_mobile.map((tel, i) =>
                            <div key={i}><a href={'tel:' + tel}>{tel}</a></div>)
                        :
                        <span>&mdash;</span>
                }
            </td>


        </tr>
    );
};

export default PhoneBookByDepartmentItem;