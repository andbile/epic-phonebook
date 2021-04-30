import React, {useContext, useEffect, useState} from "react";
import {BrowserRouter} from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import AppRouter from "./components/AppRouter";
import {Context} from "./index";
import {check} from "./http/userAPI";
import {observer} from "mobx-react-lite";
import Preloader from "./components/Preloader";


const App = observer(() => {
    const {user} = useContext(Context)

    // выводим прелоадер, пока проверяем и авторизуем пользователя
    const [loading, setLoading] = useState(true)
    const [checkingUser, setCheckingUser] = useState(true)

    useEffect(() => {
        check().then(data => {
            user.setUser(true)
            user.setIsAuth(true)
            user.setRole(data.role)
            user.setEmail(data.email)
        }).finally(() => {
            setTimeout( () => {
                setLoading(false)
                setCheckingUser(false)
            }, 1500)
        })
    }, [])

     if (loading) {
         return <Preloader/>
     }

    return (
        <BrowserRouter>
            <Header/>
            { !checkingUser &&  <AppRouter/> }
            <Footer/>
        </BrowserRouter>
    );
})

export default App;
