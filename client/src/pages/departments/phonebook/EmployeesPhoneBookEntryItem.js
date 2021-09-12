import React from 'react';
import PropTypes from "prop-types";
import {observer} from "mobx-react-lite";
import CheckPermissions from "../../../components/CheckPermissions";
import {ROLES_ADMIN_PANEL_PERMISSION} from "../../../utils/consts";
import ButtonUpdateInTable from "../../../components/Buttons/ButtonUpdateInTable";
import ButtonDeleteInTable from "../../../components/Buttons/ButtonDeleteInTable";
import isPhoneBookBtnCallbacks from "../../../components/propTypeValidators/isPhoneBookBtnCallbacks";

/**
 * Employee phone book of one departments
 * @param {object} props
 * @param {object} props.employeeEntry - employee phone book entry
 * @param {boolean} props.isAdminPanel - call react component from admin route
 * @param {object} props.phoneBookBtnCallbacks - event handlers delete/update phone book entry
 * @return {React.FunctionComponent<object>}
 */
const EmployeesPhoneBookEntryItem = observer( props => {
    const {employeeEntry, isAdminPanel, phoneBookBtnCallbacks} = props

    return (
        <tr>
            <td className='text-left'>{employeeEntry.last_name} {employeeEntry.first_name} {employeeEntry.patronymic_name}</td>
            <td className='text-left'>{employeeEntry.position ? employeeEntry.position : <>&mdash;</>}</td>
            <td>
                {
                    employeeEntry.tel_mobile && (
                    employeeEntry.tel_mobile.length > 0 ?
                        employeeEntry.tel_mobile.map( ( tel, i ) =>
                            <div key={i + tel}><a href={'tel:' + tel}>{tel}</a></div> )
                        :
                        <>&mdash;</>
                    )
                }
            </td>

            {
                isAdminPanel && (
                    <CheckPermissions permissions={ROLES_ADMIN_PANEL_PERMISSION}>
                        <ButtonUpdateInTable
                            tooltipId='tooltip-employee-phonebook-update'
                            tooltipIdMessage='Редагувати запис'
                            eventHandler={phoneBookBtnCallbacks.updatePhoneBookEntry}
                            itemId={employeeEntry.id}
                        />

                        <ButtonDeleteInTable
                            tooltipId='tooltip-employee-phonebook-delete'
                            tooltipIdMessage='Видалити запис'
                            eventHandler={phoneBookBtnCallbacks.deletePhoneBookEntry}
                            itemId={employeeEntry.id}
                        />
                    </CheckPermissions>
                )
            }


        </tr>
    );
} );

EmployeesPhoneBookEntryItem.propTypes = {
    employeeEntry: PropTypes.object.isRequired,
    isAdminPanel: PropTypes.bool,
    phoneBookBtnCallbacks: isPhoneBookBtnCallbacks
}

export default EmployeesPhoneBookEntryItem;