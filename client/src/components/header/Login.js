import React, {useContext} from 'react';
import {Button, Col, Nav, Row} from "react-bootstrap";
import {ADMIN_ROUTE, LOGIN_ROUTE} from "../../utils/consts";
import {Context} from "../../index";
import {useHistory} from "react-router-dom";
import {observer} from "mobx-react-lite";
import CheckPermissions from "../CheckPermissions";


const Login = observer(() => {

    const {user} = useContext(Context)
    const history = useHistory()


    const logOut = () => {
        user.setIsAuth(false)
        user.setEmail('')
        user.setUser({})
        user.setRole([])
        localStorage.removeItem('token')
    }


    return (
        <>
            <Row>
                <Col>
                    {
                        user.isAuth ?
                            <div>
                                <CheckPermissions permissions={['PERSONAL']} >
                                    <Button
                                        onClick={() => history.push(ADMIN_ROUTE)}>
                                        Админка
                                    </Button>
                                </CheckPermissions>
                                <Button
                                    className="ml-3"
                                    onClick={() => {
                                        logOut()
                                    }}>
                                    Выйти
                                </Button>
                            </div>
                            :
                            <div>
                                <Button onClick={() => history.push(LOGIN_ROUTE)}>Авторизация</Button>
                            </div>
                    }
                </Col>

            </Row>
            <Row>
                <Col className="d-flex justify-content-end pt-2">
                    {
                        user.isAuth ? user.Email : null
                    }
                </Col>
            </Row>
        </>

    );
});

export default Login;