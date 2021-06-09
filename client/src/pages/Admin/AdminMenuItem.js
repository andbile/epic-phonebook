import React from 'react';
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";
import styled from "styled-components";
import CheckPermissions from "../../components/CheckPermissions";

const StyledAdminMenuItem = styled.div`
  Button{
   width: 100%;
   margin-bottom: 5px;
   text-align: left;
   
  }
  
  
 

`

const AdminMenuItem = ({name, link: route, permissions}) => {
    return (
        <StyledAdminMenuItem>
            <CheckPermissions permissions={permissions}>
                    <Link to={route}>
                        <Button className="">{name}</Button>
                    </Link>
            </CheckPermissions>
        </StyledAdminMenuItem>
    );
};

export default AdminMenuItem;