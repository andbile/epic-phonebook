import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import PropTypes from 'prop-types'
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";

const CreateDepartmentsModal = observer(({show, onHide, id}) => {
    const {department} = useContext(Context)

    const [code, setCode] = useState('')
    const [name, setName] = useState('')
    const [isSeller, setIsSeller] = useState(false)
    // TODO сделать состояние текущего отдела в модальном окне

    const isNewDepartment = (!id)

    useEffect(() => {
        if (!isNewDepartment) {
            // текущий отдел при изменнии
            const currentDepartment = department.departments.filter((item) => {
                return id === item.id
            })

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
    }, [id])


    useEffect(() => {
        if (isNewDepartment) {
            setCode('')
            setName('')
            setIsSeller(true)
        }
    }, [isNewDepartment])

    const addDepartment = () => {
        department.setDepartments(
            [...department.departments, {id: 10, code: code, name: name, is_seller: isSeller}])

        onHide()
    }

    const updateDepartment = () => {

        const currentDepartment = department.departments.filter((item) => {
            return id === item.id
        })

        const otherDepartments = department.departments.filter((item) => {
            return id !== item.id
        })

        department.setDepartments(
            [...otherDepartments, {id: currentDepartment[0].id, code: code, name: name, is_seller: isSeller}])

        onHide()
    }

    // TODO Зробити Видалення департаменту. Якщо в нього входять співробітники, спочатку зробити сповіщення
    //  об необхідності переведення в інший відділ, видаляти тільки після перенесення (кількість співробітників = 0)

    // TODO tooltips на кнопках

    // TODO  сделать тут удаление


    return (
        <Modal
            show={show}
            onHide={onHide}
            size="md"
            centered
        >
            <Modal.Header>
                <Modal.Title className='text-center w-100'>
                    {
                        isNewDepartment ? 'Додати відділ' : 'Редагувати відділ'
                    }
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>{id}</h4>
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
            <Modal.Footer>
                {
                    isNewDepartment ? <Button variant="success" onClick={addDepartment}>Додати</Button> :
                        <Button variant="success" onClick={updateDepartment}>Застосувати</Button>
                }
                <Button onClick={onHide}>Закрити</Button>
            </Modal.Footer>
        </Modal>
    );
});

CreateDepartmentsModal.propTypes = {
    show: PropTypes.bool.isRequired,
    id: PropTypes.number,
    onHide: PropTypes.func.isRequired
}

export default CreateDepartmentsModal;