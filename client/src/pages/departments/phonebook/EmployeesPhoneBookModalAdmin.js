import React, {useContext, useEffect, useState} from 'react';
import {FormControl, InputGroup, Modal} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ButtonDelete from "../../../components/Buttons/ButtonDelete";
import PropTypes from "prop-types";
import useModifyStore from "../../../hooks/useModifyStore";
import useFetching from "../../../hooks/useFetching";
import {createEmployee, deleteEmployee, updateEmployee} from "../../../http/employeeAPI";
import InputMask from 'react-input-mask';

/**
 * Modal window for create/update/delete theEmployee phone book entry
 * @param {object} props
 * @param {boolean} props.modalVisible - show modal state
 * @param {function} props.closeModal - set show modal state
 * @param {number} props.employeesEntryId -  employee phone book entry id from DB
 * @param {number} props.selectedDepartmentId - department id from DB
 * @param {Object} props.action - state to identify the pressed button (create/delete/update)
 * @param {function} props.setAction - set action state
 * @return {React.FunctionComponent<object>}
 */

// TODO смена департамента
const EmployeesPhoneBookModalAdmin = observer(props => {
    const {employeesStore} = useContext(Context)
    const {modalVisible, closeModal, employeesEntryId, selectedDepartmentId, action, setAction} = props

    const [lastName, setLastName] = useState('')
    const [firstName, setFirstName] = useState('')
    const [patronymicName, setPatronymicName] = useState('')
    const [position, setPosition] = useState('')
    const telMobile = useModifyStore([], 'tel')
    const fetching = useFetching(null)

    // current employee phone book entry for update/delete
    const currentEmployeePhoneBookEntry = employeesStore.employees.find(item => employeesEntryId === item.id)

    // filling input fields for update employee phone book entry
    useEffect(() => {
        if (action.update && currentEmployeePhoneBookEntry) {
            setLastName(currentEmployeePhoneBookEntry.last_name)
            setFirstName(currentEmployeePhoneBookEntry.first_name)
            setPatronymicName(currentEmployeePhoneBookEntry.patronymic_name)
            setPosition(currentEmployeePhoneBookEntry.position)
            telMobile.getModifiedState(currentEmployeePhoneBookEntry.tel_mobile)
        }
    }, [action])


    // create new employee phone book entry
    const addEmployeePhoneBookEntry = () => {
        fetching(async () => {
            await createEmployee({
                last_name: lastName,
                first_name: firstName,
                patronymic_name: patronymicName,
                position,
                tel_mobile: telMobile.returnStructureState(),
                departmentId: selectedDepartmentId
            })
                .then(data => {
                    employeesStore.setEmployees(
                        [...employeesStore.employees,
                            {
                                id: data.id,
                                last_name: data.last_name,
                                first_name: data.first_name,
                                patronymic_name: data.patronymic_name,
                                position: data.position,
                                tel_mobile: data.tel_mobile,
                                departmentId: data.departmentId
                            }
                        ])
                })
                .then(closeModalWindow)
        })
    }

    // update new employee phone book entry
    const changeEmployeePhoneBookEntry = () => {
        fetching(async () => {
            await updateEmployee(employeesEntryId, {
                last_name: lastName,
                first_name: firstName,
                patronymic_name: patronymicName,
                position,
                tel_mobile: telMobile.returnStructureState(),
                departmentId: selectedDepartmentId
            })
                .then(() => {
                    const otherEmployeePhoneBookEntries = employeesStore.employees.filter(item =>
                        employeesEntryId !== item.id
                    )

                    employeesStore.setEmployees([
                        ...otherEmployeePhoneBookEntries,
                        {
                            id: employeesEntryId,
                            last_name: lastName,
                            first_name: firstName,
                            patronymic_name: patronymicName,
                            position,
                            tel_mobile: telMobile.returnStructureState(),
                            departmentId: selectedDepartmentId
                        }

                    ])
                })
                .then(closeModalWindow)
        })
    }


    // delete phone book entry
    const removeEmployeePhoneBookEntry = () => {
        fetching(async () => {
            await deleteEmployee(employeesEntryId)
                .then(() => {
                    // select all phone book entry except the current deleted one
                    const otherEmployeePhoneBookEntries = employeesStore.employees.filter(item => employeesEntryId !== item.id)

                    employeesStore.setEmployees([...otherEmployeePhoneBookEntries])
                })
                .then(closeModalWindow)
        })
    }


    const closeModalWindow = () => {
        setLastName('')
        setFirstName('')
        setPatronymicName('')
        setPosition('')
        telMobile.setInitialState()
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
                                        onClick={telMobile.add}
                                > + Додати</Button>
                            </div>

                            {
                                telMobile.value.map((item, i) =>
                                    <InputGroup
                                        key={i + item.tel_id}
                                        className="mb-3">
                                        <InputMask mask="+\38(099) 999 99 99"
                                                   type='text'
                                                   placeholder="Введіть номер телефону"
                                                   value={item.tel}
                                                   onChange={evt => {
                                                       const value = evt.target.value.replace(/[()_\s]/g, '')
                                                       telMobile.update(value, item.tel_id)
                                                   }
                                                   }
                                                   autoComplete='nope'
                                        >
                                            {(inputProps) => <FormControl {...inputProps}/>}
                                        </InputMask>

                                        <InputGroup.Append>
                                            <ButtonDelete
                                                id='tooltip-dept-employee-phonebook-delete-tel-entry'
                                                tooltipMessage='Видалити номер телефону'
                                                itemId={item.tel_id}
                                                eventHandler={telMobile.del}
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
                        {currentEmployeePhoneBookEntry && (
                            <>
                                {`${currentEmployeePhoneBookEntry.last_name}`} &nbsp;
                                {`${currentEmployeePhoneBookEntry.first_name}`} &nbsp;
                                {`${currentEmployeePhoneBookEntry.patronymic_name}`} &ndash;&nbsp;
                                {`${currentEmployeePhoneBookEntry.position}`}
                            </>
                        )}
                    </Modal.Body>
                )}

            <Modal.Footer>
                {action.create && <Button variant="success" onClick={addEmployeePhoneBookEntry}>Додати</Button>}
                {action.update && <Button variant="success" onClick={changeEmployeePhoneBookEntry}>Застосувати</Button>}
                {action.delete && <Button variant="danger" onClick={removeEmployeePhoneBookEntry}>Видалити</Button>}
                <Button onClick={closeModalWindow}>Закрити</Button>
            </Modal.Footer>
        </Modal>
    );
});

EmployeesPhoneBookModalAdmin.propTypes = {
    modalVisible: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    employeesEntryId: PropTypes.number.isRequired,
    selectedDepartmentId: PropTypes.number,
    action: PropTypes.exact({
        create: PropTypes.bool,
        update: PropTypes.bool,
        delete: PropTypes.bool,
    }).isRequired,
    setAction: PropTypes.func.isRequired
}


export default EmployeesPhoneBookModalAdmin;