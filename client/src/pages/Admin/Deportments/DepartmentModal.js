import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import PropTypes from 'prop-types'
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import Card from "react-bootstrap/Card";

// TODO Доробити видалення відділу. Якщо в нього входять якість співробітники, спочатку зробити сповіщення
//  об необхідності переведення в інший відділ, видаляти тільки після перенесення (кількість співробітників = 0)

/**
 * @type {React.FunctionComponent<object>}
 * param {Object} -
 * param {boolean} props.modalVisible - show modal state
 * param {function} props.closeModal - set show modal state
 * param {string} props.id - department id from DB
 * param {Object} props.action - state to identify the pressed button (create/delete/update)
 * param {function} props.setAction - set action state
 */
const DepartmentModal = observer((props) => {
    const {department} = useContext(Context)

    const {modalVisible, closeModal, id, action, setAction} = props

    const [code, setCode] = useState('')
    const [name, setName] = useState('')
    const [isSeller, setIsSeller] = useState(false)

    // current department for update or delete
    const currentDepartment = department.departments.filter((item) => {
           return id === item.id
       })

    // filling input fields for update department
    useEffect( ()=> {
        if(action.update){
            setCode(() => {
                return currentDepartment[0].code
            })

            setName(() => {
                return currentDepartment[0].name
            })

            setIsSeller(() => {
                return currentDepartment[0].is_seller
            })
        }
    }, [action])


    // create new department
    const createDepartment = () => {
        department.setDepartments(
            [...department.departments,
                {id: 10, code: code, name: name, is_seller: isSeller}
                ]
        )

        closeModalWindow()
    }

    // update department
    const updateDepartment = () => {
        // select all departments except the current updated one
        const otherDepartments = department.departments.filter((item) => {
            return id !== item.id
        })

        department.setDepartments(
            [...otherDepartments,
                {id: currentDepartment[0].id, code: code, name: name, is_seller: isSeller}
                ]
        )

        closeModalWindow()
    }


    // delete department
    const deleteDepartment = () => {
        // select all departments except the current deleted one
        const otherDepartments = department.departments.filter((item) => {
            return id !== item.id
        })

        department.setDepartments(
            [...otherDepartments])

        closeModalWindow()
    }


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
                        Ви дійсно бажаєте видалити департамент:<br/>
                        {`${currentDepartment[0].code} ${currentDepartment[0].name}`}
                    </Modal.Body>
                )
            }


            <Modal.Footer>
                {action.create && <Button variant="success" onClick={createDepartment}>Додати</Button>}
                {action.update && <Button variant="success" onClick={updateDepartment}>Застосувати</Button>}
                {action.delete && <Button variant="danger" onClick={deleteDepartment}>Видалити</Button>}
                <Button onClick={closeModalWindow}>Закрити</Button>
            </Modal.Footer>
        </Modal>
    );
});

DepartmentModal.propTypes = {
    modalVisible: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    action: PropTypes.exact({
        create: PropTypes.bool,
        update: PropTypes.bool,
        delete: PropTypes.bool,
    }).isRequired,
    setAction: PropTypes.func.isRequired
}

export default DepartmentModal;