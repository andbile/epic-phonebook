import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Row} from "react-bootstrap";
import MainContainer from "../components/MainContainer";

const Home = () => {
    return (
        <MainContainer>
                <h2 className="text-center pl-5 pr-5 mb-5">Тут колись буде багато корисної інформації, а поки що
                    представлю
                    вам телефонний довідник</h2>

                <Row className="justify-content-center">
                    <Link to={'/phoneBook'}>
                        <Button variant="success">Довідник телефонних номерів та електронної пошти</Button>
                    </Link>
                </Row>
        </MainContainer>
    );
};

export default Home;