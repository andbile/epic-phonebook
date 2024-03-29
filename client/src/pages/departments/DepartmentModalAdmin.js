import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import PropTypes from 'prop-types'
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import Card from "react-bootstrap/Card";
import {createDepartment, deleteDepartment, updateDepartment} from "../../http/departmentAPI";
import {useFetching} from "../../hooks/useFetching";


/**
 * Modal window for create/update/delete the department
 * @type {React.FunctionComponent<object>}
 * @param {Object} -
 * @param {boolean} props.modalVisible - show modal state
 * @param {function} props.closeModal - set show modal state
 * @param {number} props.id - department id from DB
 * @param {Object} props.action - state to identify the pressed button (create/delete/update)
 * @aram {function} props.setAction - set action state
 */
const DepartmentModalAdmin = observer(props => {
        const {departmentStore} = useContext(Context)

        const {modalVisible, closeModal, departmentId, action, setAction} = props

        const [code, setCode] = useState('')
        const [name, setName] = useState('')
        const [isSeller, setIsSeller] = useState(false)

        //create new department
        const [addDepartment] = useFetching(async () => {
            const department = await createDepartment({code, name, is_seller: isSeller})

            departmentStore.setDepartments(
                [...departmentStore.departments,
                    {id: department.id, code: department.code, name: department.name, is_seller: department.is_seller}
                ]
            )

            closeModalWindow()
        })


        // delete department
        const [removeDepartment] = useFetching(async (departmentId) => {
            await deleteDepartment(departmentId)
                .then(() => {
                    const otherDepartments = departmentStore.departments.filter(item => departmentId !== item.id)
                    departmentStore.setDepartments([...otherDepartments])
                })

            closeModalWindow()
        })


        // change department
        const [changeDepartment] = useFetching(async (departmentId) => {
            await updateDepartment(departmentId, {code, name, is_seller: isSeller})
                .then(() => {
                    // select all departments except the current updated one
                    const otherDepartments = departmentStore.departments.filter(item => departmentId !== item.id)

                    departmentStore.setDepartments(
                        [...otherDepartments,
                            {id: currentDepartment.id, code, name, is_seller: isSeller}
                        ]
                    )
                })

            closeModalWindow()
        })


        // current department for update or delete
        const currentDepartment = departmentStore.departments.find(item => departmentId === item.id)


        // filling input fields for update department
        useEffect(() => {
            if (action.update && currentDepartment) {
                setCode(currentDepartment.code)
                setName(currentDepartment.name)
                setIsSeller(currentDepartment.is_seller)
            }
        }, [action])


        const closeModalWindow = () => {
            setCode('')
            setName('')
            setIsSeller(true)
            setAction({})
            closeModal()
        }


        return (
            <Modal
                show={modalVisible}
                onHide={closeModalWindow}
                size="md"
                centered
            >
                <Modal.Header>
                    <Modal.Title className='text-center w-100'>
                        {action.create && 'Створити новий відділ'}
                        {action.update && 'Редагувати відділ'}
                        {action.delete && 'Видалити відділ'}
                    </Modal.Title>
                </Modal.Header>

                {(action.create || action.update) && (
                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label>Номер відділу</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder="Введіть номер відділу"
                                    value={code}
                                    onChange={e => setCode(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Назва відділу</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder="Введіть назву відділу"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                            </Form.Group>


                            <Form.Group>
                                <Card>
                                    <Form.Label>Поставте відмітку</Form.Label>
                                    <div>
                                        <Form.Check
                                            inline
                                            label="Торговий"
                                            name="is_seller"
                                            type='radio'
                                            id="is_seller1"
                                            checked={isSeller}
                                            onChange={() => setIsSeller(true)}
                                        />
                                        <Form.Check
                                            inline
                                            label="Не торговий"
                                            name="is_seller"
                                            type='radio'
                                            id="is_seller2"
                                            checked={!isSeller}
                                            onChange={() => setIsSeller(false)}
                                        />
                                    </div>
                                </Card>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                )}


                {
                    action.delete && (
                        <Modal.Body>
                            Ви дійсно бажаєте видалити відділ:<br/>
                            {currentDepartment && `${currentDepartment.code} ${currentDepartment.name}`}
                        </Modal.Body>
                    )
                }


                <Modal.Footer>
                    {action.create && <Button variant="success" onClick={addDepartment}>Додати</Button>}
                    {action.update && <Button variant="success" onClick={() => {
                        changeDepartment(departmentId)
                    }}>Застосувати</Button>}
                    {action.delete && <Button variant="danger" onClick={() => {
                        removeDepartment(departmentId)
                    }}>Видалити</Button>}
                    <Button onClick={closeModalWindow}>Закрити</Button>
                </Modal.Footer>
            </Modal>
        );
    }
    )
;

DepartmentModalAdmin.propTypes = {
    modalVisible: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    departmentId: PropTypes.number,
    action: PropTypes.exact({
        create: PropTypes.bool,
        update: PropTypes.bool,
        delete: PropTypes.bool,
    }).isRequired,
    setAction: PropTypes.func.isRequired,
}

export default DepartmentModalAdmin;