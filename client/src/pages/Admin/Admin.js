import React from 'react';
import MainContainer from "../../components/MainContainer";
import RouteWithSubRoutes from "../../components/RouteWithSubRoutes";
import AdminMenu from "./AdminMenu";

const Admin =  ({routes}) => {
    return (
        <MainContainer>
            <h2 className="text-center">Адміністративна панель</h2>
            <div className="d-flex">
                <AdminMenu/>

                <div>
                    {routes.map((route, i) => (
                        <RouteWithSubRoutes key={i} {...route} />
                    ))}
                </div>
            </div>





        </MainContainer>
    );
};

export default Admin;