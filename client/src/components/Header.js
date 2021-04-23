import React, {useContext, useState} from 'react';
import {Col, Container, Row, Button, Nav} from "react-bootstrap";
import logo from '../assets/logo.svg'
import {Link, useHistory} from "react-router-dom";
import {Context} from "../index";
import {ADMIN_ROUTE, LOGIN_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";


const Header = observer(() => {

    const {user} = useContext(Context)
    const history = useHistory()

    const logOut = () => {
        user.setIsAuth(false)
        user.setUser({})
        localStorage.removeItem('token')

    }


    return (
        <Container>
            <header className="main-header border">
                <Row className="align-items-center">
                    <Col xs={3} md={2} className="">
                        <div style={{height: '100px'}} className='img-wrapper'>
                            <Link to={'/'}>
                                <img src={logo} alt="Лого"/>
                            </Link>
                        </div>
                    </Col>
                    <Col className="d-flex justify-content-center">
                        Тут буде якесь меню
                    </Col>
                    <Col xs={'auto'} className="text-center d-flex justify-content-end align-items-center">
                        {
                            user.isAuth ?
                                <Nav>
                                    <Button
                                        onClick={() => history.push(ADMIN_ROUTE)}>
                                        Админка
                                    </Button>
                                    <Button
                                        className="ml-3"
                                        onClick={() => {
                                            logOut()
                                        }}>
                                        Выйти
                                    </Button>
                                </Nav>
                                :
                                <Nav>
                                    <Button onClick={() => history.push(LOGIN_ROUTE)}>Авторизация</Button>
                                </Nav>
                        }
                    </Col>
                </Row>
            </header>
        </Container>
    );
});

export default Header;