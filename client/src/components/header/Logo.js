import React from 'react';
import ImageWrapper from "../ImageWrapper";
import {Link} from "react-router-dom";
import {Image} from "react-bootstrap";
import logo from "../../assets/logo.svg";

const Logo = () => {
    return (
        <ImageWrapper style={{height:'100px'}}>
            <Link to={'/'}>
                <Image src={logo} alt='Лого' />
            </Link>
        </ImageWrapper>
    );
};

export default Logo;