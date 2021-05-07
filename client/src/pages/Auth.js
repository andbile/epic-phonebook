import React, {useContext, useState} from 'react';
import {Row, Form, Card} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import {Link, useLocation, useHistory} from "react-router-dom";
import {Context} from "../index";
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import MainContainer from "../components/MainContainer";

// TODO валидация формы на клиенте

const Auth = observer(() => {

    const {user} = useContext(Context)

    // для надписи регистрация/авторизация в зависимости от маршрута
    const location = useLocation()
    const isLoginRoute = location.pathname === LOGIN_ROUTE
    // TODO - регистрация отключена
    // const isLogin = true

    const history = useHistory()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const click = async () => {
        try {
            let data
            if (isLoginRoute) {
                data = await login(email, password)
            } else {
                data = await registration(email, password)
            }

            user.login(data)
            history.push(HOME_ROUTE) //если залогинились, редиректимся на главную страницу

        } catch (e) {
            console.log(e)
            // TODO Вывод ошибок в окне авторизации/регистрации
            alert(e.response.data.message)
        }
    }


    return (
        <MainContainer className={'d-flex flex-column justify-content-center align-items-center'}>
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">{isLoginRoute ? 'Авторизация' : "Регистрация"}</h2>

                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш email..."
                        value={email}
                        onChange={evt => setEmail(evt.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш пароль..."
                        type="password"
                        value={password}
                        onChange={evt => setPassword(evt.target.value)}
                    />

                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        <div>
                            {isLoginRoute ?
                                <div>Нет аккаунта? <Link to={REGISTRATION_ROUTE}>Зарегистрируйся!</Link></div>
                                :
                                <div>Есть аккаунт? <Link to={LOGIN_ROUTE}>Войдите!</Link></div>
                            }
                        </div>

                        <Button
                            variant={"outline-success"}
                            onClick={click}
                        >
                            {isLoginRoute ? 'Войти' : 'Регистрация'}
                        </Button>
                    </Row>
                </Form>
            </Card>
        </MainContainer>
    );
});

export default Auth;