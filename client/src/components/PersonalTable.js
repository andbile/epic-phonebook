import React from 'react';
import styled from "styled-components";
import Table from "react-bootstrap/Table";
import PropTypes from 'prop-types'

const StyleCustomTable = styled(Table)`
thead {
  tr{
  text-align: center;
  background-color:#bababa;
  }
}

th,td{
vertical-align: middle;
text-align: center;
}
`

const PersonalTable = (props) => {
    return (
        <StyleCustomTable striped bordered hover className={props.className}>
            {props.children}
        </StyleCustomTable>
    );
};


PersonalTable.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired
}

export default PersonalTable;










