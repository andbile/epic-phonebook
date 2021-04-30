import React, {useEffect} from 'react';
import {Switch, Route, Redirect} from "react-router-dom";
import {useContext} from 'react'
import {authRoutes, publicRoutes} from "../utils/routes";
import {HOME_ROUTE} from "../utils/consts";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import NotFound from "../pages/NotFound";

const AppRouter = observer(() => {

    const {user} = useContext(Context)


    return (
        <Switch>
            {user.isAuth && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} component={Component} exact/>
            )}}
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} component={Component} exact/>
            )}

            // TODO обрабатывать ошибки, писать куда-то логи
            <Route component={NotFound}/>
            {/*<Redirect to={HOME_ROUTE} />*/}
        </Switch>
    );
});

export default AppRouter;