import React, {useContext, useEffect, useState} from "react";
import {BrowserRouter} from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import AppRouter from "./AppRouter";
import {Context} from "./index";
import {checkUserAuthorization} from "./http/userAPI";
import {observer} from "mobx-react-lite";
import Preloader from "./components/Preloader";
import ModalError from "./components/modal/ModalError";
import useFetching from "./hooks/useFetching";


const App = observer(() => {
    const {user} = useContext(Context)
    const fetching = useFetching(null)

    // выводим прелоадер, пока проверяем и авторизуем пользователя
    const [loading, setLoading] = useState(true)
    const [checkingUser, setCheckingUser] = useState(true)

    useEffect(() => {
        fetching(async () => {
            await checkUserAuthorization()
                .then(data => {
                    user.login(data)
                })
                .finally(() => {
                    // TODO убрать setTimeout
                    setTimeout(() => {
                        setLoading(false)
                        setCheckingUser(false)
                    }, 100)
                })
        })
    }, [])

    if (loading) {
        return <Preloader/>
    }

    return (
        <BrowserRouter>
            <Header/>
            {!checkingUser && <AppRouter/>}
            <Footer/>
            <ModalError/>
        </BrowserRouter>
    );
})

export default App;
