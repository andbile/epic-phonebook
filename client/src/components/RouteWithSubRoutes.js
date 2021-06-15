import React, {useContext} from 'react';
import {Route} from "react-router-dom";
import {Context} from "../index";
import PropTypes from 'prop-types'
import checkUserPermissions from "../utils/checkUserPermissions";

const RouteWithSubRoutes = (route) => {
    const {user} = useContext(Context)
    
    if( checkUserPermissions(route.permissions , user.Role)){
        return (
            <Route
                path={route.path}
                strict
                render={ props =>
                {
                    return (
                        // pass the sub-routes down to keep nesting
                        <route.component {...props} routes={route.routes} exact />
                    )}
                }
            />
        )
    } else return null

};

RouteWithSubRoutes.propTypes = {
    path: PropTypes.string.isRequired,
    permissions: PropTypes.arrayOf(PropTypes.string),
    // TODO получаем Warning: Failed prop type: Invalid prop `component` of type `object` supplied to `RouteWithSubRoutes`, expected `function`.
    //component: PropTypes.func
}

export default RouteWithSubRoutes;


