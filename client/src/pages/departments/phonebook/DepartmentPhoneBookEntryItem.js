import React from 'react';
import {Phone, Telephone} from "react-bootstrap-icons";
import CheckPermissions from "../../../components/CheckPermissions";
import ButtonUpdateInTable from "../../../components/Buttons/ButtonUpdateInTable";
import ButtonDeleteInTable from "../../../components/Buttons/ButtonDeleteInTable";
import {observer} from "mobx-react-lite";
import PropTypes from "prop-types";
import {ROLES_ADMIN_PANEL_PERMISSION} from "../../../utils/consts";
import isPhoneBookBtnCallbacks from "../../../components/propTypeValidators/isPhoneBookBtnCallbacks";


/**
 * Get phone book entry
 * @param {object} props
 * @param {object} props.departmentPhoneBookEntryItem - phone book entry
 * @param {boolean} props.isAdminPanel - call react component from admin route
 * @param {object} props.phoneBookBtnCallbacks - event handlers delete/update phone book entry
 * @type {React.FunctionComponent<object>}
 */
const DepartmentPhoneBookEntryItem = observer((props) => {
    const {departmentPhoneBookEntryItem, isAdminPanel, phoneBookBtnCallbacks} = props

    return (
        <tr>
            <td className='text-left'>{departmentPhoneBookEntryItem.position}</td>
            <td>
                {
                    departmentPhoneBookEntryItem.tel_landline && (
                        departmentPhoneBookEntryItem.tel_landline.length > 0 ?
                            departmentPhoneBookEntryItem.tel_landline.map(tel =>
                                <div key={departmentPhoneBookEntryItem.id + tel}>
                                    {tel}
                                    <Telephone className='icon icon-phone'/>
                                </div>
                            )
                            :
                            <span>&mdash;</span>
                    )
                }
            </td>
            <td>
                {
                    departmentPhoneBookEntryItem.tel_dect && (
                        departmentPhoneBookEntryItem.tel_dect.length > 0 ?
                            departmentPhoneBookEntryItem.tel_dect.map(tel =>
                                <div key={departmentPhoneBookEntryItem.id + tel}>
                                    {tel}
                                    <Phone className='icon icon-phone'/>
                                </div>
                            )
                            :
                            <span>&mdash;</span>
                    )
                }
            </td>
            <td>
                {
                        departmentPhoneBookEntryItem.email && (
                        departmentPhoneBookEntryItem.email.length > 0 ?
                            departmentPhoneBookEntryItem.email.map(email =>
                                    <span key={departmentPhoneBookEntryItem.id + email}>
                                <a href={"mailto:" + email}>{email}</a>
                                <br/>
                            </span>
                            )
                            :
                            <span>&mdash;</span>
                    )
                }
            </td>

            {
                isAdminPanel && (
                    <CheckPermissions permissions={ROLES_ADMIN_PANEL_PERMISSION}>
                        <ButtonUpdateInTable
                            tooltipId='tooltip-dept-phonebook-update'
                            tooltipIdMessage='Редагувати запис'
                            eventHandler={phoneBookBtnCallbacks.updatePhoneBookEntry}
                            itemId={departmentPhoneBookEntryItem.id}
                        />

                        <ButtonDeleteInTable
                            tooltipId='tooltip-dept-phonebook-delete'
                            tooltipIdMessage='Видалити запис'
                            eventHandler={phoneBookBtnCallbacks.deletePhoneBookEntry}
                            itemId={departmentPhoneBookEntryItem.id}
                        />
                    </CheckPermissions>
                )
            }
        </tr>
    );
});


DepartmentPhoneBookEntryItem.propTypes = {
    departmentPhoneBookEntryItem: PropTypes.object.isRequired,
    isAdminPanel: PropTypes.bool,
    phoneBookBtnCallbacks: isPhoneBookBtnCallbacks
}


export default DepartmentPhoneBookEntryItem;