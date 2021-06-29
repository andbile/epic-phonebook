import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Row} from "react-bootstrap";
import MainContainer from "../components/MainContainer";
import {DEPARTMENTS_PHONE_BOOK_ROUTE} from "../utils/consts";

const Home = () => {
    return (
        <MainContainer>
                <h2 className="pl-5 pr-5 mb-5">Тут колись буде багато корисної інформації, а поки що
                    представлю
                    вам телефонний довідник</h2>

                <Row className="justify-content-center">
                    <Link to={DEPARTMENTS_PHONE_BOOK_ROUTE}>
                        <Button variant="success">Довідник телефонних номерів та електронної пошти</Button>
                    </Link>
                </Row>
        </MainContainer>
    );
};

export default Home;