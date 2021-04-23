import React, {useContext, useState} from 'react';
import {Row, Container, Form, Card} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import {Link, useLocation, useHistory} from "react-router-dom";
import {Context} from "../index";
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";


const Auth = observer( () => {

    const {user} = useContext(Context)

    // для надписи регистрация/авторизация в зависимости от маршрута

    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    // TODO - регистрация отключена
    // const isLogin = true

    const history = useHistory()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const click = async () => {
        try{
            let data
            if(isLogin){
                data = await login(email, password)
            }else{
                data = await registration(email, password)
            }

            user.setUser(user) // TODO непонятно для чего
            user.setIsAuth(true)
            history.push(HOME_ROUTE) //если залогинились, редиректимся на главную страницу
       }catch (e){
            alert(e.response.data.message)
        }
    }


    return (
        <Container className="d-flex justify-content-center align-content-center">

            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">{isLogin ? 'Авторизация' : "Регистрация"}</h2>

                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш email..."
                        value={email}
                        onChange={ evt => setEmail(evt.target.value)}

                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш пароль..."
                        type="password"
                        value={password}
                        onChange={ evt => setPassword(evt.target.value)}
                    />

                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        <div>
                            {isLogin ?
                                <div>Нет аккаунта? <Link to={REGISTRATION_ROUTE} onClick={ (evt) => evt.preventDefault()}>Зарегистрируйся!</Link></div>
                                :
                                <div>Есть аккаунт? <Link to={LOGIN_ROUTE}>Войдите!</Link></div>
                            }
                        </div>

                        <Button
                            variant={"outline-success"}
                            onClick={click}
                        >
                            {isLogin ? 'Войти' : 'Регистрация'}
                        </Button>
                    </Row>


                </Form>
            </Card>

        </Container>
    );
});

export default Auth;