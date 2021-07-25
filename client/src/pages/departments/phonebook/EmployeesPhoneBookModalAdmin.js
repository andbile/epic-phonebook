import React, {useContext, useEffect, useState} from 'react';
import {FormControl, InputGroup, Modal} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ButtonDelete from "../../../components/Buttons/ButtonDelete";
import PropTypes from "prop-types";
import useModifyStore from "../../../hooks/useModifyStore";

/**
 * Modal window for create/update/delete theEmployee phone book entry
 * @param {object} props
 * @param {boolean} props.modalVisible - show modal state
 * @param {function} props.closeModal - set show modal state
 * @param {string} props.employeesEntryId -  employee phone book entry id from DB
 * @param {string} props.selectedDepartmentId - department id from DB
 * @param {Object} props.action - state to identify the pressed button (create/delete/update)
 * @param {function} props.setAction - set action state
 * @return {React.FunctionComponent<object>}
 */
const EmployeesPhoneBookModalAdmin = observer(props => {
    const {employeesStore} = useContext(Context)
    const {modalVisible, closeModal, employeesEntryId, selectedDepartmentId, action, setAction} = props

    const [lastName, setLastName] = useState('')
    const [firstName, setFirstName] = useState('')
    const [patronymicName, setPatronymicName] = useState('')
    const [position, setPosition] = useState('')
    const tel = useModifyStore([], 'tel')


    // current employee phone book entry for update/delete
    const currentEmployeePhoneBookEntry = employeesStore.employees.find(item =>
        +employeesEntryId === item.id
    )

    // filling input fields for update employee phone book entry
    useEffect(() => {
        if (action.update) {
            setLastName(() => {
                return currentEmployeePhoneBookEntry.last_name
            })

            setFirstName(() => {
                return currentEmployeePhoneBookEntry.first_name
            })

            setPatronymicName(() => {
                return currentEmployeePhoneBookEntry.patronymic_name
            })

            setPosition(() => {
                return currentEmployeePhoneBookEntry.position
            })

            tel.getModifiedState(currentEmployeePhoneBookEntry.tel_mobile)
        }
    }, [action])


    // create new employee phone book entry
    const createEmployeePhoneBookEntry = () => {

        const otherEmployeesPhoneBookEntries = [...employeesStore.employees]

        employeesStore.setEmployees(
            [...otherEmployeesPhoneBookEntries,
                {
                    id: Date.now(),
                    departmentId: +selectedDepartmentId,
                    last_name: lastName,
                    first_name: firstName,
                    patronymic_name: patronymicName,
                    position: position,
                    tel_mobile: tel.returnStructureState()
                }
            ]
        )

        closeModalWindow()
    }

    // update employee phone book entry
    const updateEmployeePhoneBookEntry = () => {

        // select all employee phone book entries except the current updated one
        const otherEmployeePhoneBookEntries = employeesStore.employees.filter(item => +employeesEntryId !== item.id)

        employeesStore.setEmployees(
            [...otherEmployeePhoneBookEntries,
                {
                    id: currentEmployeePhoneBookEntry.id,
                    departmentId: currentEmployeePhoneBookEntry.departmentId,
                    last_name: lastName,
                    first_name: firstName,
                    patronymic_name: patronymicName,
                    position: position,
                    tel_mobile: tel.returnStructureState()

                }
            ]
        )

        closeModalWindow()
    }


    // delete employee phone book entry
    const deleteEmployeePhoneBookEntry = () => {

        // select all employee phone book entry except the current deleted one
        const otherEmployeesPhoneBookEntries = employeesStore.employees.filter(item => +employeesEntryId !== item.id)

        employeesStore.setEmployees([...otherEmployeesPhoneBookEntries])

        closeModalWindow()
    }

    const closeModalWindow = () => {
        setLastName('')
        setFirstName('')
        setPatronymicName('')
        setPosition('')
        tel.setInitialState()
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
                    {action.create && 'Створити новий запис'}
                    {action.update && 'Редагувати запис'}
                    {action.delete && 'Видалити запис'}
                </Modal.Title>
            </Modal.Header>


            {(action.create || action.update) && (
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Прізвище</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder="Введіть прізвище співробітника"
                                value={lastName}
                                onChange={e => setLastName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Ім'я</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder="Введіть ім'я співробітника"
                                value={firstName}
                                onChange={e => setFirstName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>По батькові</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder="Введіть по батькові співробітника"
                                value={patronymicName}
                                onChange={e => setPatronymicName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Посада</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder="Введіть посаду співробітника"
                                value={position}
                                onChange={e => setPosition(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group>
                            <div className='d-flex align-items-center'>
                                <Form.Label className="mb-0">Мобільний телефон</Form.Label>
                                <Button variant="string" className='text-right mb-0' style={{color: "#007bff"}}
                                        onClick={tel.add}
                                > + Додати</Button>
                            </div>

                            {
                                tel.value.map((item, i) =>
                                    <InputGroup
                                        key={i + item.tel_id}
                                        className="mb-3">
                                        <FormControl
                                            type='text'
                                            placeholder="Введіть номер телефону"
                                            value={item.tel}
                                            onChange={evt => tel.update(evt, item.tel_id)}
                                            autoComplete='nope'
                                        />
                                        <InputGroup.Append>
                                            <ButtonDelete
                                                id='tooltip-dept-employee-phonebook-delete-tel-entry'
                                                tooltipMessage='Видалити номер телефону'
                                                itemId={item.tel_id}
                                                eventHandler={tel.del}
                                            />
                                        </InputGroup.Append>
                                    </InputGroup>
                                )
                            }

                        </Form.Group>
                    </Form>
                </Modal.Body>
            )}

            {
                action.delete && (
                    <Modal.Body>
                        Ви дійсно бажаєте видалити запис:<br/>
                        {`${currentEmployeePhoneBookEntry.last_name}`} &nbsp;
                        {`${currentEmployeePhoneBookEntry.first_name}`} &nbsp;
                        {`${currentEmployeePhoneBookEntry.patronymic_name}`} &ndash;&nbsp;
                        {`${currentEmployeePhoneBookEntry.position}`}
                    </Modal.Body>
                )}

            <Modal.Footer>
                {action.create && <Button variant="success" onClick={createEmployeePhoneBookEntry}>Додати</Button>}
                {action.update && <Button variant="success" onClick={updateEmployeePhoneBookEntry}>Застосувати</Button>}
                {action.delete && <Button variant="danger" onClick={deleteEmployeePhoneBookEntry}>Видалити</Button>}
                <Button onClick={closeModalWindow}>Закрити</Button>
            </Modal.Footer>
        </Modal>
    );
});

EmployeesPhoneBookModalAdmin.propTypes = {
    modalVisible: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    employeesEntryId: PropTypes.number.isRequired,
    selectedDepartmentId: PropTypes.number.isRequired,
    action: PropTypes.exact({
        create: PropTypes.bool,
        update: PropTypes.bool,
        delete: PropTypes.bool,
    }).isRequired,
    setAction: PropTypes.func.isRequired
}


export default EmployeesPhoneBookModalAdmin;