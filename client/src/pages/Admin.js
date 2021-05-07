import React from 'react';
import {Link} from "react-router-dom";
import {ADMIN_PERSONAL_ROUTE, ADMIN_WORK_SCHEDULE_ROUTE, ROLE_PERSONAL, ROLE_TEST_ADMIN} from "../utils/consts";
import {Button} from "react-bootstrap";
import MainContainer from "../components/MainContainer";
import RouteWithSubRoutes from "../components/RouteWithSubRoutes";
import CheckPermissions from "../components/CheckPermissions";

const Admin =  ({routes}) => {
    return (
        <MainContainer>

            <h2 className="text-center">Адміністративна панель</h2>

            <div>
                <CheckPermissions permissions={[ROLE_PERSONAL]}>
                    <Link to={ADMIN_PERSONAL_ROUTE}>
                        <Button className="m-2">Персонал</Button>
                    </Link>
                </CheckPermissions>
                <CheckPermissions permissions={[ROLE_TEST_ADMIN]}>
                    <Link to={ADMIN_WORK_SCHEDULE_ROUTE}>
                        <Button>Расписание</Button>
                    </Link>
                </CheckPermissions>
            </div>


            {routes.map((route, i) => (
                <RouteWithSubRoutes key={i} {...route} />
                ))}

        </MainContainer>
    );
};

export default Admin;