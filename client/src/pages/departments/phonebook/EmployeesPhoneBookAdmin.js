import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import useModal from "../../../hooks/useModal";
import Form from "react-bootstrap/Form";
import SelectDepartment from "../../../components/SelectDepartment";
import EmployeesPhoneBook from "./EmployeesPhoneBook";
import Button from "react-bootstrap/Button";
import EmployeesPhoneBookModalAdmin from "./EmployeesPhoneBookModalAdmin";
import {fetchDepartments} from "../../../http/departmentAPI";
import {fetchEmployeesByDepartmentId} from "../../../http/employeeAPI";
import {useFetching} from "../../../hooks/useFetching";

// Add/update/delete employees phone book entry
// Get current employees phone book entry using select department
const EmployeesPhoneBookAdmin = observer(() => {
    const {employeesStore, departmentStore} = useContext(Context)

    const modal = useModal()

    // selected department id
    const [selectedDepartmentId, setSelectedDepartmentId] = useState(null)
    // current employee phone book entry id, use to delete/update a employee phone book entry in the modal window
    const [employeesEntryId, setEmployeesEntryId] = useState(null)
    // write to a state create/delete/update for use to identify the pressed button
    const [action, setAction] = useState({})

    const [fetchAllDepartments] = useFetching(async () => {
        const departments = await fetchDepartments()
        departmentStore.setDepartments(departments)
    })

    const [fetchAllEmployeesByDepartmentId] = useFetching(async (selectedDepartmentId) => {
        const employees = await fetchEmployeesByDepartmentId(selectedDepartmentId)
        employeesStore.setEmployees(employees)
    })


    // get departments for select one
    useEffect(() => {
        fetchAllDepartments()
    }, [])

    // get employees
    useEffect(() => {
        if (selectedDepartmentId) {
            fetchAllEmployeesByDepartmentId(selectedDepartmentId)
        }
    }, [selectedDepartmentId])


    // Get selected department
    const onChangeDepartment = evt => setSelectedDepartmentId(+evt.target.value)


    // event handler - delete employee phone book entry
    const deletePhoneBookEntry = id => {
        setEmployeesEntryId(id)
        setAction({delete: true})
        modal.showAModal()
    }

    // event handler - update employee phone book entry
    const updatePhoneBookEntry = id => {
        setEmployeesEntryId(id)
        setAction({update: true})
        modal.showAModal()
    }

    // event handler - add employee phone book entry
    const addEmployeesPhoneBookEntry = () => {
        setEmployeesEntryId(null)
        setAction({create: true})
        modal.showAModal()
    }

    //
    const changeEmployeeDepartment = (id) => {
        setEmployeesEntryId(id)
        setAction({change: true})
        modal.showAModal()
    }

    return (
        <>
            <h3 className='pt-2 pb-2'>Контакти співробітників</h3>

            <Form>
                <SelectDepartment
                    departments={departmentStore.departments}
                    onChangeDepartment={onChangeDepartment}
                />
            </Form>

            {
                selectedDepartmentId && (
                    <>
                        <EmployeesPhoneBook
                            phoneBookBtnCallbacks={{
                                updatePhoneBookEntry,
                                deletePhoneBookEntry,
                                changeEmployeeDepartment
                            }}
                            isAdminPanel={true}
                        />

                        <EmployeesPhoneBookModalAdmin {...modal}
                                                      employeesEntryId={employeesEntryId}
                                                      selectedDepartmentId={selectedDepartmentId}
                                                      action={action}
                                                      setAction={setAction}
                        />

                        <Button onClick={addEmployeesPhoneBookEntry}>Створити новий запис</Button>
                    </>
                )
            }
        </>
    );
});

export default EmployeesPhoneBookAdmin;