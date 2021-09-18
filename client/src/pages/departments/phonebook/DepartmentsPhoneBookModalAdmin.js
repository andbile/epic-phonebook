import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {FormControl, InputGroup, Modal} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Context} from "../../../index";
import ButtonDelete from "../../../components/Buttons/ButtonDelete";
import PropTypes from "prop-types";
import useModifyStore from "../../../hooks/useModifyStore";
import {useFetching} from "../../../hooks/useFetching";
import {
    createDepartmentsPhoneBook,
    deleteDepartmentsPhoneBook,
    updateDepartmentsPhoneBook
} from "../../../http/departmentAPI";

/**
 * Modal window for create/update/delete the phone book entry
 * @type {React.FunctionComponent<object>}
 * @param {object} props
 * @param {boolean} props.modalVisible - show modal state
 * @param {function} props.closeModal - set show modal state
 * @param {string} props.phoneBookEntryId - phone book entry id from DB
 * @param {string} props.selectedDepartmentId - department id from DB
 * @param {Object} props.action - state to identify the pressed button (create/delete/update)
 * @param {function} props.setAction - set action state
 */

const DepartmentsPhoneBookModalAdmin = observer((props) => {
        const {departmentStore} = useContext(Context)
        const {modalVisible, closeModal, phoneBookEntryId, selectedDepartmentId, action, setAction} = props

        const [position, setPosition] = useState('')
        const telLandline = useModifyStore([], 'tel')

        const telDect = useModifyStore([], 'dect')
        const email = useModifyStore([], 'email')

        // create new phone book entry
        const [addPhoneBookEntry] = useFetching(async () => {
            const phoneBookEntry = await createDepartmentsPhoneBook({
                position,
                tel_dect: telDect.returnStructureState(),
                tel_landline: telLandline.returnStructureState(),
                email: email.returnStructureState(),
                departmentId: selectedDepartmentId
            })

            departmentStore.setDepartmentsContacts(
                [...departmentStore.departmentsContacts,
                    {
                        id: phoneBookEntry.id,
                        position: phoneBookEntry.position,
                        tel_dect: phoneBookEntry.tel_dect,
                        tel_landline: phoneBookEntry.tel_landline,
                        email: phoneBookEntry.email,
                        departmentId: phoneBookEntry.departmentId,
                    }
                ]
            )

            closeModalWindow()
        })

        // delete phone book entry
        const [removePhoneBookEntry] = useFetching(async (phoneBookEntryId) => {
            await deleteDepartmentsPhoneBook(phoneBookEntryId)
                .then(() => {
                    // select all phone book entry except the current deleted one
                    const otherPhoneBookEntries = departmentStore.departmentsContacts.filter(item => phoneBookEntryId !== item.id)

                    departmentStore.setDepartmentsContacts([...otherPhoneBookEntries])
                })

            closeModalWindow()

        })

    // update phone book entry
        const [changePhoneBookEntry] = useFetching(async (phoneBookEntryId) => {
            await updateDepartmentsPhoneBook(phoneBookEntryId, {
                position,
                tel_dect: telDect.returnStructureState(),
                tel_landline: telLandline.returnStructureState(),
                email: email.returnStructureState(),
                departmentId: selectedDepartmentId
            })
                .then(() => {
                    const otherDepartmentsContacts = departmentStore.departmentsContacts.filter(item =>
                        phoneBookEntryId !== item.id
                    )

                    departmentStore.setDepartmentsContacts(
                        [...otherDepartmentsContacts,
                            {
                                id: phoneBookEntryId,
                                position,
                                tel_dect: telDect.returnStructureState(),
                                tel_landline: telLandline.returnStructureState(),
                                email: email.returnStructureState(),
                                departmentId: selectedDepartmentId
                            }
                        ]
                    )
                })

            closeModalWindow()
        })


        // current phone book entry of the department for update or delete
        const currentPhoneBookEntry = departmentStore.departmentsContacts.find(item => phoneBookEntryId === item.id)

        // filling input fields for update phone book entry
        useEffect(() => {
            if (action.update && currentPhoneBookEntry) {
                setPosition(currentPhoneBookEntry.position)
                telDect.getModifiedState(currentPhoneBookEntry.tel_dect)
                telLandline.getModifiedState(currentPhoneBookEntry.tel_landline)
                email.getModifiedState(currentPhoneBookEntry.email)
            }
        }, [action])


        const closeModalWindow = () => {
            setPosition('')
            telDect.setInitialState()
            telLandline.setInitialState()
            email.setInitialState()
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
                                <Form.Label>Назва посади</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder="Введіть назву посади"
                                    value={position}
                                    onChange={e => setPosition(e.target.value)}
                                />
                            </Form.Group>


                            <Form.Group>
                                <div className='d-flex align-items-center'>
                                    <Form.Label className="mb-0">Телефон (стаціонарний)</Form.Label>
                                    <Button variant="string" className='text-right mb-0' style={{color: "#007bff"}}
                                            onClick={telLandline.add}
                                    > + Додати</Button>
                                </div>

                                {
                                    telLandline.value.map((item, i) =>
                                        <InputGroup
                                            key={i + item.tel_id}
                                            className="mb-3">
                                            <FormControl
                                                type='text'
                                                placeholder="Введіть номер телефону"
                                                value={item.tel}
                                                onChange={evt => telLandline.update(evt.target.value, item.tel_id)}
                                            />
                                            <InputGroup.Append>
                                                <ButtonDelete
                                                    id='tooltip-dept-phonebook-delete-telLandline-entry'
                                                    tooltipMessage='Видалити номер телефону'
                                                    itemId={item.tel_id}
                                                    eventHandler={telLandline.del}
                                                />
                                            </InputGroup.Append>
                                        </InputGroup>
                                    )
                                }
                            </Form.Group>


                            <Form.Group>
                                <div className='d-flex align-items-center'>
                                    <Form.Label className="mb-0">Телефон (трубка)</Form.Label>
                                    <Button variant="string" className='text-right mb-0' style={{color: "#007bff"}}
                                            onClick={telDect.add}
                                    > + Додати</Button>
                                </div>

                                {
                                    telDect.value.map((item, i) =>
                                        <InputGroup
                                            key={i + item.dect_id}
                                            className="mb-3">
                                            <FormControl
                                                type='text'
                                                placeholder="Введіть номер телефону"
                                                value={item.dect}
                                                onChange={evt => telDect.update(evt.target.value, item.dect_id)}
                                            />
                                            <InputGroup.Append>
                                                <ButtonDelete
                                                    id='tooltip-dept-phonebook-delete-telLandline-entry'
                                                    tooltipMessage='Видалити номер телефону'
                                                    itemId={item.dect_id}
                                                    eventHandler={telDect.del}
                                                />
                                            </InputGroup.Append>
                                        </InputGroup>
                                    )
                                }
                            </Form.Group>


                            <Form.Group>
                                <div className='d-flex align-items-center'>
                                    <Form.Label className='mb-0'>Електронна пошта</Form.Label>
                                    <Button variant="string" className='text-right mb-0' style={{color: "#007bff"}}
                                            onClick={email.add}
                                    > + Додати</Button>
                                </div>
                                {
                                    email.value.map((item, i) =>
                                        <InputGroup
                                            key={i + item.email_id}
                                            className="mb-3">
                                            <FormControl
                                                type='text'
                                                placeholder="Введіть email"
                                                value={item.email}
                                                onChange={evt => email.update(evt.target.value, item.email_id)}
                                            />
                                            <InputGroup.Append>
                                                <ButtonDelete
                                                    id='tooltip-dept-phonebook-delete-email-entry'
                                                    tooltipMessage='Видалити email'
                                                    itemId={item.email_id}
                                                    eventHandler={email.del}
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
                            {currentPhoneBookEntry &&
                            (
                                <>
                                    {`${currentPhoneBookEntry.position}`}

                                    {currentPhoneBookEntry.tel_landline.length > 0 &&
                                    (<>&nbsp;&ndash;&nbsp;{`${currentPhoneBookEntry.tel_landline}`}</>)}

                                    {currentPhoneBookEntry.tel_dect.length > 0 &&
                                    (<>&nbsp;&ndash;&nbsp;{`${currentPhoneBookEntry.tel_dect}`}</>)}

                                    {currentPhoneBookEntry.email.length > 0 &&
                                    (<>&nbsp;&ndash;&nbsp;{`${currentPhoneBookEntry.email}`}</>)}
                                </>
                            )}
                        </Modal.Body>
                    )
                }

                <Modal.Footer>
                    {action.create && <Button variant="success" onClick={addPhoneBookEntry}>Додати</Button>}
                    {action.update && <Button variant="success" onClick={() => {
                        changePhoneBookEntry(phoneBookEntryId)
                    }}>Застосувати</Button>}
                    {action.delete && <Button variant="danger" onClick={() => {
                        removePhoneBookEntry(phoneBookEntryId)
                    }}>Видалити</Button>}
                    <Button onClick={closeModalWindow}>Закрити</Button>
                </Modal.Footer>
            </Modal>
        );
    })
;

DepartmentsPhoneBookModalAdmin.propTypes = {
    modalVisible: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    phoneBookEntryId: PropTypes.number,
    selectedDepartmentId: PropTypes.number.isRequired,
    action: PropTypes.exact({
        create: PropTypes.bool,
        update: PropTypes.bool,
        delete: PropTypes.bool,
    }).isRequired,
    setAction: PropTypes.func.isRequired
}

export default DepartmentsPhoneBookModalAdmin;