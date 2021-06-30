import React, {useContext, useReducer} from 'react';
import MainContainer from "../../../components/MainContainer";
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import DepartmentPhoneBookItem from "./DepartmentPhoneBookItem";
import PersonalTable from "../../../components/PersonalTable";
import {Button} from "react-bootstrap";
import {DepartmentPhoneBookReducer, departmentActions} from "./reducer";

// Display the abbreviated phone book of all departments
const DepartmentsPhoneBook = observer(() => {
    const {departmentStore} = useContext(Context)

    // Save state from mobx store and use it for toggle display seller/notSeller/all departments
    // TODO Before switching the display of departments, set the initial state in the reducer. Need to fix !!!
    const [departmentState, dispatch] = useReducer(DepartmentPhoneBookReducer, departmentStore.departments)


    /**
     * Get the contacts of the department
     * @param departmentId - department id from BD
     * @return [{tel_dect: string, departmentId: number, id: number, position: string, tel_landline: [string], email: [string]}]
     */
    const getDepartmentPhoneBook = departmentId => {
        return departmentStore.departmentsContacts.filter(item =>
            item.departmentId === departmentId
        )
    }

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
                            key={departmentItem.id}
                            department={departmentItem}
                            departmentPhoneBook={getDepartmentPhoneBook(departmentItem.id)}
                        />
                    )
                }
                </tbody>
            </PersonalTable>
        </MainContainer>
    );
});

export default DepartmentsPhoneBook;