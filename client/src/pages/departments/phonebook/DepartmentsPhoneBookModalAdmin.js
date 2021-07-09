import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {FormControl, InputGroup, Modal} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Context} from "../../../index";
import ButtonDelete from "../../../components/Buttons/ButtonDelete";
import PropTypes from "prop-types";

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
    const [telDect, setTelDect] = useState('')
    const [telLandline, setTelLandline] = useState([])
    const [email, setEmail] = useState([])


    // current phone book entry of the department for update or delete
    const currentPhoneBookEntry = departmentStore.departmentsContacts.find(item =>
        +phoneBookEntryId === item.id
    )

    /**
     * Modification state tel/emails (array to object) adding id to be able to manage the state and change it separately
     * if an array state
     * @param {object} state - mobx state
     * @param {string} keyName - new object key name
     * @return {[{keyName: string, keyName_id: number}]}
     */
    const getModifiedState = (state, keyName) => {
        const arr = []

        state.map((item, i) =>
            arr.push({
                [keyName]: item,
                [keyName + '_id']: i
            })
        )

        return arr
    }

    /**
     * Return the state (object to array) tel/emails by deleted id
     * @param {object} state - mobx state
     * @param {string} keyName - object key
     * @return {array}
     */
    const returnState = (state, keyName) => state.map(item => item[keyName])


    // filling input fields for update phone book entry
    useEffect(() => {
        if (action.update) {
            setPosition(() => {
                return currentPhoneBookEntry.position
            })

            setTelDect(() => {
                return currentPhoneBookEntry.tel_dect
            })

            setTelLandline(() => {
                return getModifiedState(currentPhoneBookEntry.tel_landline, 'tel')
            })

            setEmail(() => {
                return getModifiedState(currentPhoneBookEntry.email, 'email')
            })
        }
    }, [action])


    // create new phone book entry
    const createPhoneBookEntry = () => {

        const otherPhoneBookEntries = [...departmentStore.departmentsContacts]

        departmentStore.setDepartmentsContacts(
            [...otherPhoneBookEntries,
                {
                    id: Date.now(),
                    departmentId: +selectedDepartmentId,
                    email: returnState(email, 'email'),
                    position: position,
                    tel_dect: telDect,
                    tel_landline: returnState(email, 'tel')
                }
            ]
        )

        closeModalWindow()
    }

    // update phone book entry
    const updatePhoneBookEntry = () => {


        // select all phone book entries except the current updated one
        const otherPhoneBookEntries = departmentStore.departmentsContacts.filter(item => +phoneBookEntryId !== item.id)


        departmentStore.setDepartmentsContacts(
            [...otherPhoneBookEntries,
                {
                    id: currentPhoneBookEntry.id,
                    departmentId: currentPhoneBookEntry.departmentId,
                    email: returnState(email, 'email'),
                    position: position,
                    tel_dect: telDect,
                    tel_landline: returnState(telLandline, 'tel')
                }
            ]
        )

        closeModalWindow()

    }


    // delete phone book entry
    const deletePhoneBookEntry = () => {

        // select all phone book entry except the current deleted one
        const otherPhoneBookEntries = departmentStore.departmentsContacts.filter(item => +phoneBookEntryId !== item.id)

        departmentStore.setDepartmentsContacts([...otherPhoneBookEntries])

        closeModalWindow()
    }


    // add phone landline entry
    const addTelLandline = () => {
        setTelLandline([
            ...telLandline,
            {
                tel: '',
                tel_id: Date.now()
            }
        ])
    }


    // update state in current position in the state
    // will not change the position (tel/email) of entries in the table after render
    const updateStateWithSavingPositions = (evt, state, id, keyName) => {
        state[id] = {
            [keyName]: evt.target.value,
            [keyName + '_id']: id
        }

        return [...state]
    }

    // update phone landline entry
    const updateTelLandline = (evt, id) => {
        setTelLandline(updateStateWithSavingPositions(evt, telLandline, id, 'tel'))
    }

    const deleteTelLandline = (tel_id) => {
        const tels = telLandline.filter(item => tel_id !== item.tel_id)
        setTelLandline(tels)
    }


    // add email entry
    const addEmail = () => {
        setEmail([
            ...email,
            {
                email: '',
                email_id: Date.now()
            }
        ])
    }

    // update email entry
    const updateEmail = (evt, id) => {
        setEmail(updateStateWithSavingPositions(evt, email, id, 'email'))
    }

    // delete email entry
    const deleteEmail = (email_id) => {
        const emails = email.filter(item => {
            return email_id !== item.email_id
        })

        setEmail(emails)
    }


    const closeModalWindow = () => {
        setPosition('')
        setTelDect('')
        setTelLandline([])
        setEmail([])
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
                                        onClick={addTelLandline}
                                > + Додати</Button>
                            </div>

                            {
                                telLandline.map((item, id) =>
                                    <InputGroup
                                        key={currentPhoneBookEntry.id + item.tel}
                                        className="mb-3">
                                        <FormControl
                                            type='text'
                                            placeholder="Введіть номер телефону"
                                            value={item.tel}
                                            onChange={(evt) => {
                                                updateTelLandline(evt, id)
                                            }}
                                        />
                                        <InputGroup.Append>
                                            <ButtonDelete
                                                id='tooltip-dept-phonebook-delete-telLandline-entry'
                                                tooltipMessage='Видалити номер телефону'
                                                itemId={item.tel_id}
                                                eventHandler={deleteTelLandline}
                                            />
                                        </InputGroup.Append>
                                    </InputGroup>
                                )
                            }

                        </Form.Group>


                        <Form.Group>
                            <Form.Label>Телефон (трубка)</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder="Введіть номер телефону"
                                value={telDect}
                                onChange={e => setTelDect(e.target.value)}
                            />
                        </Form.Group>


                        <Form.Group>
                            <div className='d-flex align-items-center'>
                                <Form.Label className='mb-0'>Електронна пошта</Form.Label>
                                <Button variant="string" className='text-right mb-0' style={{color: "#007bff"}}
                                        onClick={addEmail}
                                > + Додати</Button>
                            </div>
                            {
                                email.map((item, id) =>
                                    <InputGroup
                                        key={currentPhoneBookEntry.id + item.email}
                                        className="mb-3">
                                        <FormControl
                                            type='text'
                                            placeholder="Введіть email"
                                            value={item.email}
                                            onChange={(evt) => {
                                                updateEmail(evt, id)
                                            }}
                                        />
                                        <InputGroup.Append>
                                            <ButtonDelete
                                                id='tooltip-dept-phonebook-delete-email-entry'
                                                tooltipMessage='Видалити email'
                                                itemId={item.email_id}
                                                eventHandler={deleteEmail}
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
                        {`${currentPhoneBookEntry.position}`} &ndash;&nbsp;
                        {currentPhoneBookEntry.tel_landline.length > 0 && (<>
                            {`${currentPhoneBookEntry.tel_landline}`} &ndash;&nbsp;
                        </>)}

                        {currentPhoneBookEntry.tel_dect.length > 0 && (<>
                            {`${currentPhoneBookEntry.tel_dect}`} &ndash;&nbsp;
                        </>)}

                        {currentPhoneBookEntry.email.length > 0 && (<>
                            {`${currentPhoneBookEntry.email}`} &nbsp;
                        </>)}
                    </Modal.Body>
                )
            }

            <Modal.Footer>
                {action.create && <Button variant="success" onClick={createPhoneBookEntry}>Додати</Button>}
                {action.update && <Button variant="success" onClick={updatePhoneBookEntry}>Застосувати</Button>}
                {action.delete && <Button variant="danger" onClick={deletePhoneBookEntry}>Видалити</Button>}
                <Button onClick={closeModalWindow}>Закрити</Button>
            </Modal.Footer>


        </Modal>
    );
});

// TODO phoneBookEntryId, selectedDepartmentId FIX type of variable
DepartmentsPhoneBookModalAdmin.propTypes = {
    modalVisible: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    phoneBookEntryId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    selectedDepartmentId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    action: PropTypes.exact({
        create: PropTypes.bool,
        update: PropTypes.bool,
        delete: PropTypes.bool,
    }).isRequired,
    setAction: PropTypes.func.isRequired
}

export default DepartmentsPhoneBookModalAdmin;