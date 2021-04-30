import React from 'react';
import styled from "styled-components";
import PropTypes from 'prop-types'
import {Container} from "react-bootstrap";
import CheckPermissions from "./CheckPermissions";

const StyleMainContainer = styled(Container)`
flex-grow: 1;
`
const MainContainer = (props) => {
    return (
        <StyleMainContainer className={props.className}>
            <main className="pt-4 pb-4">
                {props.children}
            </main>
        </StyleMainContainer>
    );
};

MainContainer.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node.isRequired
}

export default MainContainer;