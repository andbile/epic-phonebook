import React from 'react';
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Button from "react-bootstrap/Button";
import {BoxArrowUpRight, PencilSquare} from "react-bootstrap-icons";
import PropTypes from "prop-types";


/**
 * Button to change of affiliation, for example: change employee department
 * Component is used only in tables
 * @param {object} props
 * @param {string} props.id - html attribute id
 * @param {string} props.tooltipMessage - tooltip message
 * @param {number} props.itemId - entry id in a state
 * @param {function} props.eventHandler - event handler
 * @return {JSX.Element}
 */
const ButtonUpdateInTable = props => {
    const {tooltipId, tooltipIdMessage, eventHandler, itemId} = props

    return (
        <OverlayTrigger
            overlay={<Tooltip id={tooltipId}>{tooltipIdMessage}</Tooltip>}>
            <td className='p-0'
                onClick={() => eventHandler( itemId )}
            >
                <Button variant="outline-dark" style={{border: 'none'}}>
                    <BoxArrowUpRight/>
                </Button>
            </td>
        </OverlayTrigger>
    );
};

ButtonUpdateInTable.propTypes = {
    id: PropTypes.string,
    tooltipMessage: PropTypes.string,
    itemId: PropTypes.number.isRequired,
    eventHandler: PropTypes.func.isRequired
}

export default ButtonUpdateInTable;