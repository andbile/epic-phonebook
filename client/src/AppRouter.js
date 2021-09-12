import React from 'react';
import {Switch, Route} from "react-router-dom";
import {useContext} from 'react'
import {publicRoutes} from "./utils/publicRoutes";
import {authRoutes} from "./utils/authRoutes";
import {ROLES_ADMIN_PANEL_PERMISSION} from "./utils/consts";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import NotFound from "./pages/NotFound";
import checkUserPermissions from "./utils/checkUserPermissions";
import RouteWithSubRoutes from "./components/RouteWithSubRoutes";


const AppRouter = observer(() => {

    const {user} = useContext(Context)

    return (
        <Switch>
            {publicRoutes.map(( routeItem) =>
                <Route key={routeItem.path} {...routeItem} />
            )}

            {checkUserPermissions(ROLES_ADMIN_PANEL_PERMISSION, user.Role) && authRoutes.map( (route, i) =>
                <RouteWithSubRoutes key={i} {...route}/>
            )}

            <Route component={NotFound}/>
            {/*<Redirect to={HOME_ROUTE} />*/}
        </Switch>
    );
});

export default AppRouter;