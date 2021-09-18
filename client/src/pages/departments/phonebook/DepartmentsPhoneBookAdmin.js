import React, {useContext, useEffect, useState} from 'react';
import Form from "react-bootstrap/Form";
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import DepartmentPhoneBookItem from "./DepartmentPhoneBookItem";
import PersonalTable from "../../../components/PersonalTable";
import Button from "react-bootstrap/Button";
import useModal from '../../../hooks/useModal'
import DepartmentsPhoneBookModalAdmin from "./DepartmentsPhoneBookModalAdmin";
import SelectDepartment from "../../../components/SelectDepartment";
import {fetchDepartments, fetchDepartmentsPhoneBook} from "../../../http/departmentAPI";
import {useFetching} from "../../../hooks/useFetching";

// Display the abbreviated phone book of the department using select HTML element
const DepartmentsPhoneBookAdmin = observer(() => {
    const {departmentStore} = useContext(Context)

    const modal = useModal()

    // selected department id, used to display department with phone book after choosing one
    const [selectedDepartmentId, setSelectedDepartmentId] = useState(null)
    // current phone book entry id, used to delete/update a phone book entry in the modal window
    const [phoneBookEntryId, setPhoneBookEntryId] = useState(null)
    // write to a state create/delete/update for use to identify the pressed button
    const [action, setAction] = useState({})

    const [fetchAllDepartments] = useFetching(async () => {
        const departments = await fetchDepartments()
        const departmentsPhoneBook = await fetchDepartmentsPhoneBook()

        departmentStore.setDepartments(departments)
        departmentStore.setDepartmentsContacts(departmentsPhoneBook)
    })


    useEffect(() => {
        fetchAllDepartments()
    }, [])


    // Get selected department
    const onChangeDepartment = evt => setSelectedDepartmentId(+evt.target.value)


    // event handler - delete phone book entry
    const deletePhoneBookEntry = id => {
        setPhoneBookEntryId(id)
        setAction({delete: true})
        modal.showAModal()
    }

    // event handler - update phone book entry
    const updatePhoneBookEntry = id => {
        setPhoneBookEntryId(id)
        setAction({update: true})
        modal.showAModal()
    }


    // event handler - add phone book entry
    const addPhoneBookEntry = () => {
        setPhoneBookEntryId(null)
        setAction({create: true})
        modal.showAModal()
    }

    return (
        <>
            <h3 className='pt-2 pb-2'>Контакти відділів</h3>

            <Form>
                <SelectDepartment
                    departments={departmentStore.departments}
                    onChangeDepartment={onChangeDepartment}
                />
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
                                phoneBookBtnCallbacks={{updatePhoneBookEntry, deletePhoneBookEntry}}
                                isAdminPanel={true}
                            />
                            </tbody>
                        </PersonalTable>

                        <DepartmentsPhoneBookModalAdmin {...modal} phoneBookEntryId={phoneBookEntryId}
                                                        selectedDepartmentId={selectedDepartmentId} action={action}
                                                        setAction={setAction}/>
                        <Button onClick={addPhoneBookEntry}>Створити новий запис</Button>
                    </>
                )
            }
        </>
    );
});

export default DepartmentsPhoneBookAdmin;