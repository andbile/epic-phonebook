import React from 'react';
import styled from "styled-components";
import Table from "react-bootstrap/Table";
import PropTypes from 'prop-types'

const StyleCustomTable = styled(Table)`
thead {
  tr{
  background-color:#bababa;
  padding-top: 0.75em;
  padding-bottom: 0.75em;
  text-align: center;
  }
}

th,td{
vertical-align: middle !important;
text-align: center;
}

td{
padding-top: 0.5em;
padding-bottom: 0.5em;
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










