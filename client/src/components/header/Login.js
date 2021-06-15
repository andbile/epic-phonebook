import React, {useContext} from 'react';
import {Button, Col, Row} from "react-bootstrap";
import {ROLES_ADMIN_PANEL_PERMISSION, ADMIN_ROUTE, LOGIN_ROUTE, HOME_ROUTE} from "../../utils/consts";
import {Context} from "../../index";
import {useHistory} from "react-router-dom";
import {observer} from "mobx-react-lite";
import CheckPermissions from "../CheckPermissions";


const Login = observer(() => {

    const {user} = useContext(Context)
    const history = useHistory()

    const logOut = () => {
        user.loginOut()
        history.push(HOME_ROUTE)
    }

    return (
        <>
            <Row>
                <Col>
                    {
                        user.isAuth ?
                            <div>
                                <CheckPermissions permissions={ROLES_ADMIN_PANEL_PERMISSION} >
                                    <Button
                                        onClick={() => history.push(ADMIN_ROUTE)}>
                                        Адмінка
                                    </Button>
                                </CheckPermissions>
                                <Button
                                    className="ml-3"
                                    onClick={() => {
                                        logOut()
                                    }}>
                                    Вийти
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