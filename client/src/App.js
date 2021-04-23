import React, {createContext, useContext, useEffect, useState} from "react";
import {BrowserRouter} from "react-router-dom";
import {Container, Spinner} from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AppRouter from "./components/AppRouter";
import {Context} from "./index";
import {check} from "./http/userAPI";
import {observer} from "mobx-react-lite";




const App = observer( ()=>  {
    const {user} = useContext(Context)

    // проверяем идет загрузка или нет и логоном пользователя
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        check().then(data => {
            user.setUser(true)
            user.setIsAuth(true)
        })/*.finally(() => setLoading(false))*/
    }, [])

   /* if (loading) {
        return <Spinner animation={"grow"}/>
    }*/


    return (
        <BrowserRouter>
            <Header/>
            <Container className="main-content">
                <main className="pt-4 pb-4">
                    <AppRouter/>
                </main>
            </Container>
            <Footer/>
        </BrowserRouter>
    );
})

export default App;
