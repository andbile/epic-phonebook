import React, {useContext, useEffect, useState} from "react";
import {BrowserRouter} from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import AppRouter from "./AppRouter";
import {Context} from "./index";
import {check} from "./http/userAPI";
import {observer} from "mobx-react-lite";
import Preloader from "./components/Preloader";
import ModalError from "./components/modal/ModalError";


const App = observer(() => {
    const {user} = useContext(Context)
    const {fetchErrorStore} = useContext(Context)

    // выводим прелоадер, пока проверяем и авторизуем пользователя
    const [loading, setLoading] = useState(true)
    const [checkingUser, setCheckingUser] = useState(true)

    useEffect(() => {
        check().then(data => {
            user.login(data)
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
            <ModalError/>
        </BrowserRouter>
    );
})

export default App;
