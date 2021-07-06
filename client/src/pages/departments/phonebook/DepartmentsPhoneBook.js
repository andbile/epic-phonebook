import React, {useContext, useReducer} from 'react';
import MainContainer from "../../../components/MainContainer";
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import DepartmentPhoneBookItem from "./DepartmentPhoneBookItem";
import PersonalTable from "../../../components/PersonalTable";
import {Button} from "react-bootstrap";
import {DepartmentPhoneBookReducer, departmentActions} from "./reducer";

// Display the abbreviated phone book of all departments (code, name of department and phone book entries of the current department)
const DepartmentsPhoneBook = observer(() => {
    const {departmentStore} = useContext(Context)

    // Save state from mobx store and use it for toggle display seller/notSeller/all departments
    const [departmentState, dispatch] = useReducer(DepartmentPhoneBookReducer, departmentStore.departments)

    return (
        <MainContainer>
            <h2 className="pl-5 pr-5 mb-5">Довідник телефонних номерів та електронної пошти</h2>

            <div>Внутрішній код маркету - 047</div>

            <div className='d-flex justify-content-end mb-3'>
                <Button
                    onClick={() => dispatch({
                        type: departmentActions.seller,
                        playload: departmentStore.departments
                    })}
                >
                    Торгові
                </Button>
                <Button className="ml-3" variant='success'
                        onClick={() => dispatch({
                            type: departmentActions.notSeller,
                            playload: departmentStore.departments
                        })}
                >
                    Не торгові
                </Button>
                <Button className="ml-3" variant='secondary'
                        onClick={() => dispatch({
                            type: departmentActions.all,
                            playload: departmentStore.departments
                        })}
                >
                    Всі
                </Button>
            </div>

            <PersonalTable>
                <thead>
                <tr>
                    <th>Посада</th>
                    <th>Телефон (стаціонарний)</th>
                    <th>Телефон (трубка)</th>
                    <th>Email</th>
                </tr>
                </thead>
                <tbody>
                {
                    departmentState.map(departmentItem =>
                        <DepartmentPhoneBookItem
                            key={departmentItem.code}
                            departmentId={departmentItem.id}
                        />
                    )
                }
                </tbody>
            </PersonalTable>
        </MainContainer>
    );
});

export default DepartmentsPhoneBook;