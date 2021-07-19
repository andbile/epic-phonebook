import React from 'react';
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";

/**
 *  Get id of the selected department and update state
 * @param props
 * @return {JSX.Element}
 * @param {array} props.departments - departments list from mobx state
 * @param {function} props.onChangeDepartment - set state
 */
const SelectDepartment = props => {

    const {departments, onChangeDepartment} = props

    return (
        <Form.Group>
            <Form.Label>Виберіть відділ:</Form.Label>
            <Form.Control as='select' onChange={evt => {
                onChangeDepartment(evt)
            }}>
                <option/>
                {
                    departments.map(departmentItem =>
                        <option
                            key={departmentItem.id}
                            value={departmentItem.id}
                        >
                            {departmentItem.code} &ndash; {departmentItem.name}
                        </option>
                    )
                }
            </Form.Control>
        </Form.Group>
    );
};

SelectDepartment.propTypes = {
    departments: PropTypes.array.isRequired,
    onChangeDepartment: PropTypes.func.isRequired
}

export default SelectDepartment;