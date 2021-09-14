import PersonalTable from "./PersonalTable";
import React, {useContext} from "react";
import styled from "styled-components";
import {Context} from "../index";
import PropTypes from "prop-types";

const StyledChangeDepartmentTable = styled.div`
max-height: 50vh;
overflow-y: auto;

tbody tr{
 cursor: pointer;
 
 :hover{
 background-color: #007bff;
 color: white;
 }
}
`
/**
 * Select a department and call the event handler with one
 * Used when changing the user's department
 * @param props
 * @param {function} props.eventHandler - event handler
 * @return {JSX.Element}
 */
const ChangeDepartmentTable = props => {
    const {departmentStore} = useContext(Context)
    const {eventHandler} = props

    return (
        <StyledChangeDepartmentTable striped={false} className={props.className}>
            <PersonalTable>
                <thead>
                <tr>
                    <th>Відділ</th>
                    <th>Назва</th>
                </tr>
                </thead>
                <tbody>
                {
                    departmentStore.departments.map(department =>
                        <tr
                            key={department.id}
                            onClick={() => eventHandler(department.id)}
                        >
                            <td>{department.code}</td>
                            <td className='text-left'>{department.name}</td>
                        </tr>
                    )
                }
                </tbody>
            </PersonalTable>
        </StyledChangeDepartmentTable>
    );
}

ChangeDepartmentTable.propTypes = {
    eventHandler: PropTypes.func.isRequired
}

export default ChangeDepartmentTable;


