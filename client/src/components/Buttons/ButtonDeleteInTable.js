import React from 'react';
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Button from "react-bootstrap/Button";
import {Trash} from "react-bootstrap-icons";
import PropTypes from "prop-types";

/**
 * Button to delete an entry such as an employee/department phone book
 * Component is used only in tables
 * @param {object} props
 * @param {string} props.id - html attribute id
 * @param {string} props.tooltipMessage - tooltip message
 * @param {number} props.itemId - entry id in a state
 * @param {function} props.eventHandler - event handler
 * @return {JSX.Element}
 */
const ButtonDeleteInTable = props => {
    const {tooltipId, tooltipIdMessage, eventHandler, itemId} = props

    return (
        <OverlayTrigger
            overlay={<Tooltip id={tooltipId}>{tooltipIdMessage}</Tooltip>}>
            <td className='p-0'
                onClick={() => eventHandler( itemId )}
            >
                <Button variant="outline-danger" style={{border: 'none'}}>
                    <Trash/>
                </Button>
            </td>
        </OverlayTrigger>
    );
};

ButtonDeleteInTable.propTypes = {
    id: PropTypes.string,
    tooltipMessage: PropTypes.string,
    itemId: PropTypes.number.isRequired,
    eventHandler: PropTypes.func.isRequired
}

export default ButtonDeleteInTable;