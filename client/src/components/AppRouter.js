import React from 'react';
import {Switch, Route, Redirect} from "react-router-dom";
import {useContext} from 'react'
import {authRoutes, publicRoutes} from "../utils/routes";
import {HOME_ROUTE} from "../utils/consts";
import {Context} from "../index";

const AppRouter = () => {

    const {user} = useContext(Context)
    console.log(user)


    return (
        <Switch>
           {user.isAuth && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} component={Component} exact/>
            )}}
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} component={Component} exact/>
            )}
            {/*<Route component={NotFound} />*/}
            // TODO обрабатывать ошибки, писать куда-то логи
            <Redirect to={HOME_ROUTE} />
        </Switch>
    );
};

export default AppRouter;