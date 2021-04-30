import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import Logo from "./Logo";
import Login from "./Login";


const Header = () => {

    return (
        <Container>
            <header className="border">
                <Row className="align-items-center">
                    <Col xs={3} md={2}>
                      <Logo />
                    </Col>
                    <Col className="d-flex justify-content-center">
                        Тут буде якесь меню
                    </Col>
                    <Col xs={'auto'} className="text-center">
                        <Login />
                    </Col>
                </Row>
            </header>
        </Container>
    );
};

export default Header;