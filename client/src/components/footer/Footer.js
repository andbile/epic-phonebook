import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import Logo from "../header/Logo";

const Footer = () => {
    return (
        <Container>
            <footer className="border">
                <Row className="align-items-center">
                    <Col xs={3} md={2}>
                        <Logo />
                    </Col>
                    <Col className="d-flex justify-content-center">
                        Тут буде якесь меню
                    </Col>
                </Row>
            </footer>
        </Container>
    );
};

export default Footer;