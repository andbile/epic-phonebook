import React from 'react';
import MainContainer from "../../components/MainContainer";
import RouteWithSubRoutes from "../../components/RouteWithSubRoutes";
import AdminSidebar from "./AdminSidebar";
import {Row, Col} from "react-bootstrap";
import PropTypes from "prop-types";

/**
 * Admin panel
 * @param {array.<object>} routes - nested routes
 *      routes.path {string} - URL path
 *      routes.components {object} - react component
 *      routes.permission {array.<string>} - rendering conditions
 * @return {JSX.Element}
 * @constructor
 */
const Admin =  ({routes}) => {
    console.log(routes)

    return (
        <MainContainer>
            <h2 className="text-center">Адміністративна панель</h2>
            <hr/>
            <Row>
                <Col md={3} className='pr-2'>
                    <AdminSidebar/>
                </Col>
                <Col md={9}>
                    {routes.map((route, i) => (
                        <RouteWithSubRoutes key={i} {...route} />
                    ))}
                </Col>
            </Row>
        </MainContainer>
    );
};


Admin.propTypes = {
    path: PropTypes.string,
    permissions: PropTypes.arrayOf(PropTypes.string),
    component: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.object
    ])
}

export default Admin;