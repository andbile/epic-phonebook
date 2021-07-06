import React, {useContext, useState} from 'react';
import Form from "react-bootstrap/Form";
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import DepartmentPhoneBookItem from "./DepartmentPhoneBookItem";
import PersonalTable from "../../../components/PersonalTable";
import Button from "react-bootstrap/Button";
import {useModal} from '../../../hooks/useModal'
import DepartmentsPhoneBookModalAdmin from "./DepartmentsPhoneBookModalAdmin";

const DepartmentsPhoneBookAdmin = observer(() => {
    const {departmentStore} = useContext(Context)

    const modal = useModal()

    const [selectedDepartmentId, setSelectedDepartmentId] = useState('')
    const [phoneBookEntryId, setPhoneBookEntryId] = useState('')
    const [action, setAction] = useState({})


    // Get selected department
    const onChangeDepartment = evt => {
        setSelectedDepartmentId(evt.target.value)
    }


    // event handler - delete phone book entry
    const deletePhoneBookEntry = (id) => {
        setPhoneBookEntryId(id)
        setAction({delete: true})
        modal.showAModal()
    }

    // event handler - update phone book entry
    const updatePhoneBookEntry = (id) => {
        setPhoneBookEntryId(id)
        setAction({update: true})
        modal.showAModal()
    }


    // event handler - add phone book entry
    const addPhoneBookEntry = () => {
        setPhoneBookEntryId('')
        setAction({create: true})
        modal.showAModal()
    }

    return (
        <>
            <h3 className='pt-2 pb-2'>Контакти відділів</h3>

            <Form>
                <Form.Group>
                    <Form.Label>Виберіть відділ:</Form.Label>
                    <Form.Control as='select' onChange={evt => {
                        onChangeDepartment(evt)
                    }}>
                         <option/>
                        {
                            departmentStore.departments.map(departmentItem =>
                                <option
                                    key={departmentItem.id}
                                    value={departmentItem.id}
                                >
                                    {departmentItem.code} &ndash; {departmentItem.name}
                                </option>
                            )
                        }
                    </Form.Control>
                </Form.Group>
            </Form>

            {
                selectedDepartmentId && (
                    <>
                        <PersonalTable>
                            <thead>
                            <tr>
                                <th>Посада</th>
                                <th>Телефон (стаціонарний)</th>
                                <th>Телефон (трубка)</th>
                                <th>Email</th>
                                <th colSpan={2}/>
                            </tr>
                            </thead>
                            <tbody>
                            <DepartmentPhoneBookItem
                                departmentId={selectedDepartmentId}
                                phoneBookBtnCallbacks={{updatePhoneBookEntry, deletePhoneBookEntry, setPhoneBookEntryId}}
                                isAdminPanel={true}
                            />
                            </tbody>
                        </PersonalTable>

                        <DepartmentsPhoneBookModalAdmin {...modal} phoneBookEntryId={phoneBookEntryId} selectedDepartmentId={selectedDepartmentId} action={action} setAction={setAction}/>
                        <Button onClick={addPhoneBookEntry}>Створити новий запис</Button>
                    </>
                )
            }
        </>
    );
});

export default DepartmentsPhoneBookAdmin;