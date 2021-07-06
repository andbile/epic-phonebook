import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {FormControl, InputGroup, Modal} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Context} from "../../../index";
import ButtonDelete from "../../../components/Buttons/ButtonDelete";


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

    // TODO из-за несоответствия типов (number/string), некоректно обновлялось состояние, внести изменения

    // временный затык, что бы отдельно управлять состоянием почты/телефоном добавил id
    // при сохранении нового состояния необходимо обратно подчищать масив (хранить только номера/почту в виде массива)
    const getEmailsState = (emails) => {
        const arr = []

        emails.map((item, i) => {
            arr.push({
                email: item,
                email_id: i
            })
        })

        return arr
    }

    const getTelLandlineState = (tels) => {
        const arr = []

        tels.map((item, i) => {
            arr.push({
                tel: item,
                tel_id: i
            })
        })

        return arr
    }


    // filling input fields for update phone book
    useEffect(() => {
        if (action.update) {
            setPosition(() => {
                return currentPhoneBookEntry.position
            })

            setTelDect(() => {
                return currentPhoneBookEntry.tel_dect
            })

            setTelLandline(() => {
                return getTelLandlineState(currentPhoneBookEntry.tel_landline)
            })

            setEmail(() => {
                return getEmailsState(currentPhoneBookEntry.email)
            })
        }
    }, [action])


    // create new phone book entry
    const createPhoneBookEntry = () => {
        const emailArray = email.map(item => item.email)
        const telLandlineArray = telLandline.map(item => item.tel)

        console.log(selectedDepartmentId)
        console.log([...departmentStore.departmentsContacts])

        const otherPhoneBookEntries = [...departmentStore.departmentsContacts]

        departmentStore.setDepartmentsContacts(
            [...otherPhoneBookEntries,
                {
                    id: otherPhoneBookEntries.length + 1,
                    departmentId: +selectedDepartmentId,
                    email: emailArray,
                    position: position,
                    tel_dect: telDect,
                    tel_landline: telLandlineArray
                }
            ]
        )

        console.log(departmentStore.departmentsContacts)
        closeModalWindow()
    }

    // update phone book entry
    const updatePhoneBookEntry = () => {

        // временный затык, что бы отдельно управлять состоянием почты/телефоном добавил id
        // при сохранении нового состояния необходимо обратно подчищать масив (хранить только номера/почту в виде массива)
        const emailArray = email.map(item => item.email)
        const telLandlineArray = telLandline.map(item => item.tel)


        // select all phone book entries except the current updated one
        const otherPhoneBookEntries = departmentStore.departmentsContacts.filter(item => +phoneBookEntryId !== item.id)

        departmentStore.setDepartmentsContacts(
            [...otherPhoneBookEntries,
                {
                    id: currentPhoneBookEntry.id,
                    departmentId: currentPhoneBookEntry.departmentId,
                    email: emailArray,
                    position: position,
                    tel_dect: telDect,
                    tel_landline: telLandlineArray
                }
            ]
        )

        closeModalWindow()
    }


    // delete phone book entry
    const deletePhoneBookEntry = () => {
        // select all phone book entry except the current deleted one

        const otherPhoneBookEntries = departmentStore.departmentsContacts.filter(item => +phoneBookEntryId !== item.id)

        departmentStore.setDepartmentsContacts(
            [...otherPhoneBookEntries]
        )

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

    // update phone landline entry
    const updateTelLandline = (evt, id) => {

        // сделал так чтобы пункты не прыгали по очередности спика
        // TODO тоже сае сделать в департаментах
        const updateTelState = () => {
            telLandline[id] = {
                tel: evt.target.value,
                tel_id: id
            }
            return [
                ...telLandline
            ]
        }


        setTelLandline(
            updateTelState()
        )
    }

    const deleteTelLandline = (tel_id) => {
        const tels = telLandline.filter(item => tel_id !== item.tel_id)
        console.log(tels)

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

        // сделал так чтобы пункты не прыгали по очередности спика
        // TODO тоже сае сделать в департаментах
        const updateEmailsState = () => {
            email[id] = {
                email: evt.target.value,
                email_id: id
            }
            return [
                ...email
            ]
        }


        setEmail(
            updateEmailsState()
        )
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
                                    <>
                                        <InputGroup className="mb-3">
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

                                    </>
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
                                    <>
                                        <InputGroup className="mb-3">
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

                                    </>
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

export default DepartmentsPhoneBookModalAdmin;