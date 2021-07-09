import React from 'react';
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Button from "react-bootstrap/Button";
import {Trash} from "react-bootstrap-icons";

const ButtonDeleteInTable = (props) => {
    const {tooltipId, tooltipIdMessage, eventHandler, itemId} = props

    return (
        <OverlayTrigger
            overlay={<Tooltip id={tooltipId}>{tooltipIdMessage}</Tooltip>}>
            <td className='p-0'
                onClick={()=>{eventHandler(itemId)}}
            >
                <Button variant="outline-danger" style={{border: 'none'}}>
                    <Trash/>
                </Button>
            </td>
        </OverlayTrigger>
    );
};

// TODO propTypes
export default ButtonDeleteInTable;