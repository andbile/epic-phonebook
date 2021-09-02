import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import Button from "react-bootstrap/Button";
import DepartmentModalAdmin from "./DepartmentModalAdmin";
import useModal from '../../hooks/useModal'
import PersonalTable from "../../components/PersonalTable";
import ButtonUpdateInTable from "../../components/Buttons/ButtonUpdateInTable";
import ButtonDeleteInTable from "../../components/Buttons/ButtonDeleteInTable";
import {fetchDepartments} from "../../http/departmentAPI";
import useFetching from "../../hooks/useFetching";

// Create, update, delete departments
const DepartmentsAdmin = observer(() => {
    const {departmentStore} = useContext(Context)
    const fetching = useFetching(null)

    useEffect(() => {
        fetching(async () => {
            await fetchDepartments().then(data => departmentStore.setDepartments(data))
        })
    }, [])

    const modal = useModal()

    // department id, used to delete/update the department in the modal window
    const [departmentId, setDepartmentId] = useState(null)
    // write to a state create/delete/update for use to identify the pressed button
    const [action, setAction] = useState({})


    /**
     * event handler - delete department
     * @param {number} id - department id from BD
     */
    const deleteDepartment = id => {
        setDepartmentId(id)
        setAction({delete: true})
        modal.showAModal()
    }

    /**
     * event handler - update department
     * @param {number} id - department id from BD
     */
    const updateDepartment = id => {
        setDepartmentId(id)
        setAction({update: true})
        modal.showAModal()
    }

    // event handler - add department
    const addDepartment = () => {
        setDepartmentId('')
        setAction({create: true})
        modal.showAModal()
    }

    return (
        <div>
            <h3 className='pt-2 pb-2'>Відділи</h3>

            <PersonalTable striped bordered hover>
                <thead>
                <tr>
                    <th>Відділ</th>
                    <th>Назва</th>
                    <th>Торговий /<br/> не торговий</th>
                    <th colSpan={2}/>
                </tr>
                </thead>
                <tbody>
                {
                    departmentStore.departments.map(department =>
                        <tr key={department.id}>
                            <td>{department.code}</td>
                            <td className='text-left'>{department.name}</td>
                            <td className={department.is_seller ?
                                'bg-primary text-white'
                                : 'bg-success text-white'}
                            >
                                {department.is_seller ? 'Торговий' : 'Не торговий'}
                            </td>

                            <ButtonUpdateInTable
                                tooltipId='tooltip-department-update'
                                tooltipIdMessage='Редагувати відділ'
                                eventHandler={updateDepartment}
                                itemId={department.id}
                            />

                            <ButtonDeleteInTable
                                tooltipId='tooltip-department-delete'
                                tooltipIdMessage='Видалити відділ'
                                eventHandler={deleteDepartment}
                                itemId={department.id}
                            />
                        </tr>
                    )
                }
                </tbody>
            </PersonalTable>

            <Button onClick={addDepartment}>Створити новий відділ</Button>

            <DepartmentModalAdmin
                {...modal}
                departmentId={departmentId} action={action} setAction={setAction}
            />

        </div>
    );
});

export default DepartmentsAdmin;