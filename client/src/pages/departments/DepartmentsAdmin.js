import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {PencilSquare, Trash} from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";
import DepartmentModalAdmin from "./DepartmentModalAdmin";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import {useModal} from '../../hooks/useModal'
import PersonalTable from "../../components/PersonalTable";

// Create, update, delete departments
const DepartmentsAdmin = observer(() => {
    const {departmentStore} = useContext(Context)

    const modal = useModal()

    // current department id, used to delete/update a department in the modal window
    const [departmentId, setDepartmentId] = useState('')
    // write to a state create/delete/update for use to identify the pressed button
    const [action, setAction] = useState({})


    /**
     * event handler - delete department
     * @param {string} id - department id from BD
     */
    const deleteDepartment = (id) => {
        setDepartmentId(id)
        setAction({delete: true})
        modal.showAModal()
    }

    /**
     * event handler - update department
     * @param {string} id - department id from BD
     */
    const updateDepartment = (id) => {
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

                            <OverlayTrigger
                                overlay={<Tooltip id="tooltip-department-update">Редагувати відділ</Tooltip>}>
                                <td className='p-0'
                                    onClick={() => updateDepartment(department.id)}
                                >
                                    <Button variant="outline-dark" style={{border: 'none'}}>
                                        <PencilSquare/>
                                    </Button>
                                </td>
                            </OverlayTrigger>

                            <OverlayTrigger
                                overlay={<Tooltip id="tooltip-department-delete">Видалити відділ</Tooltip>}>
                                <td className='p-0'
                                    onClick={() => deleteDepartment(department.id)}
                                >
                                    <Button variant="outline-danger" style={{border: 'none'}}>
                                        <Trash/>
                                    </Button>
                                </td>
                            </OverlayTrigger>
                        </tr>
                    )
                }
                </tbody>
            </PersonalTable>

            <DepartmentModalAdmin {...modal} id={departmentId} action={action} setAction={setAction}/>
            <Button onClick={addDepartment}>Створити новий відділ</Button>
        </div>
    );
});

export default DepartmentsAdmin;