import React from 'react';
import {Col, Container, Row} from "react-bootstrap";

const Footer = () => {
    return (
        <Container>
            <footer className="main-footer border">
                <Row style={{minHeight: '100px'}} className="align-items-center">
                    <Col md={12} className="text-center">
                        Тут буде якесь меню
                    </Col>
                </Row>
            </footer>
        </Container>
    );
};

export default Footer;