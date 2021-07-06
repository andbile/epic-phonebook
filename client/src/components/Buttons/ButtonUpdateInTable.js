import React from 'react';
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Button from "react-bootstrap/Button";
import {PencilSquare} from "react-bootstrap-icons";

const ButtonUpdateInTable = (props) => {
    const {tooltipId, tooltipIdMessage, eventHandler, phoneBookItemId} = props

    return (
        <OverlayTrigger
            overlay={<Tooltip id={tooltipId}>{tooltipIdMessage}</Tooltip>}>
            <td className='p-0'
                onClick={()=>{eventHandler(phoneBookItemId)}}
            >
                <Button variant="outline-dark" style={{border: 'none'}}>
                    <PencilSquare/>
                </Button>
            </td>
        </OverlayTrigger>
    );
};

export default ButtonUpdateInTable;