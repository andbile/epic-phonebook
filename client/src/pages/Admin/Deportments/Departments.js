import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import Table from "react-bootstrap/Table";
import {PencilSquare, Trash} from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";
import CreateDepartmentsModal from "./CreateDepartmentsModal";
import DeleteDepartmentsModal from "./DeleteDepartmentsModal";

const Departments = observer(() => {
    const {department} = useContext(Context)

    // отображение модального окна
    const [modalDepartmentVisible, setModalDepartmentVisible] = useState(false)
    // текущий id департамента, передается модальному окну для последующего редактирования
    const [departmentId, setDepartmentId] = useState('')
    // отображение модального окна - подтверждение удаления
    const [modalDeleteDepartmentVisible, setModalDeleteDepartmentVisible] = useState(false)


    // TODO tooltip правка/удаление
    // TODO сделать ощее модальное окно
    //

    return (
        <div>
            <h3 className='text-center pt-2 pb-2'>Відділи</h3>

            <Table striped bordered hover>
                <thead>
                <tr className='text-center'>
                    <th className='align-middle'>Відділ</th>
                    <th className='align-middle'>Назва</th>
                    <th className='align-middle'>Торговий /&#10; не торговий</th>
                    <th></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {
                    department.departments.map(department =>
                        <tr key={department.id}>
                            <td>{department.code}</td>
                            <td>{department.name}</td>
                            <td className={department.is_seller ?
                                'bg-primary text-white align-middle text-center'
                                : 'bg-success text-white align-middle text-center'}
                            >
                                {department.is_seller ? 'Торговий' : 'Не торговий'}
                            </td>
                            <td
                                className='align-middle text-center'
                                style={{cursor: 'pointer'}}
                                onClick={(evt, id = department.id) => {
                                    setModalDepartmentVisible(true)
                                    setDepartmentId(id)
                                }}
                            >
                                <PencilSquare/>
                            </td>
                            <td
                                className='align-middle text-center'
                                style={{cursor: 'pointer'}}
                                onClick={(evt, id = department.id) => {
                                setModalDeleteDepartmentVisible(true)
                                setDepartmentId(id)
                            }}
                            >

                                <Trash style={{color:'red'}}/>
                            </td>
                        </tr>
                    )
                }
                </tbody>
            </Table>

            <CreateDepartmentsModal show={modalDepartmentVisible}
                                    onHide={() => setModalDepartmentVisible(false)}
                                    id={departmentId}
            />
            <DeleteDepartmentsModal
                show={modalDeleteDepartmentVisible}
                onHide={() => setModalDeleteDepartmentVisible(false)}
                id={departmentId}
            />
            <Button onClick={
                () => {
                    setDepartmentId('')
                    setModalDepartmentVisible(true)
                }
            }
            >
                Створити новий департамент
            </Button>
        </div>
    );
});

export default Departments;