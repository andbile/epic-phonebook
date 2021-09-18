import React, {useContext} from 'react';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import styled from "styled-components";
import {ExclamationTriangle} from "react-bootstrap-icons";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const StyledModalError = styled(Modal)`
.modal-content{
//margin: 10px;
border-color: #FF0000;
box-shadow: rgba(0, 0, 0, 0.35) 0px 10px 15px;
}

.modal-header{
color: #FFFFFF;
justify-content: center;
align-items: center;
background-color: #FF0000;
font-size: 1.6rem;
}

`

const StyledExclamationTriangleFill = styled(ExclamationTriangle)`
margin-right: 10px;

`

const ModalError = observer(() => {
    const {fetchStore} = useContext(Context)

    const closeModalWindow = () => {
        fetchStore.setErrorMessage('')
        fetchStore.setIsError(false)
    }

    return (
        <StyledModalError
            show={fetchStore.isError}
            onHide={closeModalWindow}
            size="sx"
            centered
        >
            <Modal.Header>
                <StyledExclamationTriangleFill/>Помилка
            </Modal.Header>

            <Modal.Body>
                {fetchStore.errorMessage}
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={closeModalWindow}>Закрити</Button>
            </Modal.Footer>
        </StyledModalError>
    );
});

export default ModalError;