import React from 'react';
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Button from "react-bootstrap/Button";
import {Trash} from "react-bootstrap-icons";
import PropTypes from 'prop-types'

/**
 * Button to delete an entry such as an tel/email in modal window
 * @param {object} props
 * @param {string} props.id - html attribute id
 * @param {string} props.tooltipMessage - tooltip message
 * @param {number} props.itemId - entry id in a state
 * @param {function} props.eventHandler - event handler
 * @return {JSX.Element}
 */
const ButtonDelete = props => {
    const {id, tooltipMessage, itemId, eventHandler} = props

    return (
        <OverlayTrigger overlay={<Tooltip id={id}>{tooltipMessage}</Tooltip>}>
            <Button
                variant="outline-danger"
                onClick={() => eventHandler( itemId )}
            >
                <Trash/>
            </Button>
        </OverlayTrigger>
    );
};

ButtonDelete.propTypes = {
    id: PropTypes.string,
    tooltipMessage: PropTypes.string,
    itemId: PropTypes.number.isRequired,
    eventHandler: PropTypes.func.isRequired
}

export default ButtonDelete;