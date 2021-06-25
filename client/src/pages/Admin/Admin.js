import React from 'react';
import MainContainer from "../../components/MainContainer";
import RouteWithSubRoutes from "../../components/RouteWithSubRoutes";
import AdminBar from "./AdminBar";
import {Row, Col} from "react-bootstrap";

const Admin =  ({routes}) => {
    return (
        <MainContainer>
            <h2 className="text-center">Адміністративна панель</h2>
            <hr/>
            <Row>
                <Col md={3} className='pr-2'>
                    <AdminBar/>
                </Col>
                <Col md={9}>
                    {routes.map((route, i) => (
                        <RouteWithSubRoutes key={i} {...route} />
                        // TODO маршрут по умолчанию, доделать
                    ))}
                </Col>
            </Row>
        </MainContainer>
    );
};

// TODO proptypes
export default Admin;