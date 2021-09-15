import React, {useContext, useState} from 'react';
import {Row, Form, Card} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import {Link, useLocation, useHistory} from "react-router-dom";
import {Context} from "../index";
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import MainContainer from "../components/MainContainer";
import useFetching from "../hooks/useFetching";

const Auth = observer(() => {
    const {user} = useContext(Context)
    const history = useHistory()
    const fetching = useFetching(null)

    // depending on the route we render registration or authorization
    const location = useLocation()
    const isLoginRoute = location.pathname === LOGIN_ROUTE

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const userLogin = ()=>{
        fetching(async ()=>{
            const data = await login(email, password)
            user.login(data)
            history.push(HOME_ROUTE)
        })
    }

    const userRegistration = ()=>{
        fetching(async ()=>{
            const data = await registration(email, password)
            user.login(data)
            history.push(HOME_ROUTE)
        })
    }


    return (
        <MainContainer className={'d-flex flex-column justify-content-center align-items-center'}>
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">{isLoginRoute ? 'Авторизація' : "Реєстрація"}</h2>

                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Введіть ваш email..."
                        value={email}
                        onChange={evt => setEmail(evt.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введіть ваш пароль..."
                        type="password"
                        value={password}
                        onChange={evt => setPassword(evt.target.value)}
                    />

                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        <div>
                            {isLoginRoute ?
                                <div>Нет аккаунта? <Link to={REGISTRATION_ROUTE}>Зареєструйся!</Link></div>
                                :
                                <div>Есть аккаунт? <Link to={LOGIN_ROUTE}>Увійдіть!</Link></div>
                            }
                        </div>

                        <Button
                            variant={"outline-success"}
                            onClick={isLoginRoute ? userLogin : userRegistration}
                        >
                            {isLoginRoute ? 'Увійти' : 'Реєстрація'}
                        </Button>
                    </Row>
                </Form>
            </Card>
        </MainContainer>
    );
});

export default Auth;