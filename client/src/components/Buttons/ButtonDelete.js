import React from 'react';
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Button from "react-bootstrap/Button";
import {Trash} from "react-bootstrap-icons";

const ButtonDelete = (props) => {
    const {id, tooltipMessage, itemId, eventHandler} = props

    return (
        <OverlayTrigger overlay={<Tooltip id={id}>{tooltipMessage}</Tooltip>}>
            <Button
                variant="outline-danger"
                onClick={()=>{eventHandler(itemId)}}
            >
                <Trash/>
            </Button>
        </OverlayTrigger>
    );
};

// TODO propTypes
export default ButtonDelete;