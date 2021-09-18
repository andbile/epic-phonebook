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
import {useFetching} from "./hooks/useFetching";


const App = observer(() => {
    const {user, fetchStore} = useContext(Context)


    // выводим прелоадер, пока проверяем и авторизуем пользователя
    const [loading, setLoading] = useState(true)
    const [checkingUser, setCheckingUser] = useState(true)

    const [fetchCheckUserAuthorization] = useFetching(async () => {
        const userData = await checkUserAuthorization()
        user.login(userData)
        setCheckingUser(false)
        setLoading(false)
    })


    useEffect(() => {
        fetchCheckUserAuthorization()
            .finally(()=>{
                setCheckingUser(false)
                setLoading(false)
            })
    }, [])


    if (loading) return <Preloader/>

    return (
        <BrowserRouter>
            {!checkingUser && (
                <>
                    <Header/>
                    <AppRouter/>
                    <Footer/>
                </>
            )}

            <ModalError/>
            {fetchStore.isLoading && <Preloader/>}
        </BrowserRouter>
    );
})

export default App;
