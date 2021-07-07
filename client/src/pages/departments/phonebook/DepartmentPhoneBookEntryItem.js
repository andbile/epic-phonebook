import React, {useContext} from 'react';
import {Phone, Telephone} from "react-bootstrap-icons";
import CheckPermissions from "../../../components/CheckPermissions";
import ButtonUpdateInTable from "../../../components/Buttons/ButtonUpdateInTable";
import ButtonDeleteInTable from "../../../components/Buttons/ButtonDeleteInTable";
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";


// TODO передать функции через контекст
// Get phone book entry item
const DepartmentPhoneBookEntryItem = observer((props) => {
    //const {departmentStore} = useContext(Context)

    const {departmentPhoneBookEntryItem, isAdminPanel, phoneBookBtnCallbacks} = props


    return (
        <tr>
            <td className='text-left'>{departmentPhoneBookEntryItem.position}</td>
            <td>
                {
                    departmentPhoneBookEntryItem.tel_landline.length > 0 ?
                        departmentPhoneBookEntryItem.tel_landline.map(tel =>
                            <div key={departmentPhoneBookEntryItem.id + tel}>
                                {tel}
                                <Telephone className='icon icon-phone'/>
                            </div>
                        )
                        :
                        <span>&mdash;</span>
                }
            </td>
            <td>
                {
                    departmentPhoneBookEntryItem.tel_dect ?
                        <span>{departmentPhoneBookEntryItem.tel_dect}<Phone className='icon icon-phone'/></span>
                        :
                        <span>&mdash;</span>
                }
            </td>
            <td>
                {
                    departmentPhoneBookEntryItem.email.length > 0 ?
                        departmentPhoneBookEntryItem.email.map(email =>
                            <span key={departmentPhoneBookEntryItem.id + email}>
                                <a href={"mailto:" + email}>{email}</a>
                                <br/>
                            </span>
                        )
                        :
                        <span>&mdash;</span>
                }
            </td>

            {
                isAdminPanel && (
                    <CheckPermissions permissions={['PERSONAL']}>
                        <ButtonUpdateInTable
                            tooltipId='tooltip-dept-phonebook-update'
                            tooltipIdMessage='Редагувати запис'
                            eventHandler={phoneBookBtnCallbacks.updatePhoneBookEntry}
                            phoneBookItemId={departmentPhoneBookEntryItem.id}
                        />

                        <ButtonDeleteInTable
                            tooltipId='tooltip-dept-phonebook-delete'
                            tooltipIdMessage='Видалити запис'
                            eventHandler={phoneBookBtnCallbacks.deletePhoneBookEntry}
                            phoneBookItemId={departmentPhoneBookEntryItem.id}
                        />
                    </CheckPermissions>
                )
            }
        </tr>
    );
});


// TODO props
export default DepartmentPhoneBookEntryItem;