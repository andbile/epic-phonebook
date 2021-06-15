import React, {useContext} from 'react';
import {Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {observe} from "mobx";
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";

const DeleteDepartmentsModal = observer(({show, onHide, id}) => {
    const {department} = useContext(Context)




    const currentDepartment = department.departments.filter((item) => {
        return id === item.id
    })


    const deleteDepartment = () => {
        const otherDepartments = department.departments.filter((item) => {
            return id !== item.id
        })

        department.setDepartments(
            [...otherDepartments])

        onHide()
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="md"
            centered
        >
            <Modal.Header>
                <Modal.Title className='text-center w-100'>
                    Видалення департаменту
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Ви дійсно бажаєте видалити департамент:
                {
                    // TODO если не делать проверку, при первом реденге получаем ошибку, как-то подправить
                    // можно текущее айд-ди передевать через состояние
                }
                { (id && currentDepartment[0]) ? `${currentDepartment[0].code} ${currentDepartment[0].name}` : ''}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={deleteDepartment}>Видалити</Button>
                <Button onClick={onHide}>Закрити</Button>
            </Modal.Footer>

        </Modal>
    );
});

export default DeleteDepartmentsModal;