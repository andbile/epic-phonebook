import React, {useContext, useReducer} from 'react';
import MainContainer from "../../components/MainContainer";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import PhoneBookItem from "./PhoneBookItem";
import PersonalTable from "../../components/PersonalTable";
import {Button} from "react-bootstrap";
import {PhoneBookReducer} from "./reducer";


const PhoneBook = observer(() => {
    const {department} = useContext(Context)

    const [departmentState, dispatch] = useReducer(PhoneBookReducer, department.departments)



    /**
     *
     * @param departmentItem
     * @return {({tel_dect: string, departmentId: number, id: number, position: string, tel_landline: [], email: [string]}|{tel_dect: string, departmentId: number, id: number, position: string, tel_landline: [string, string], email: [string]}|{tel_dect: string, departmentId: number, id: number, position: string, tel_landline: [string], email: [string]}|{tel_dect: string, departmentId: number, id: number, position: string, tel_landline: [], email: [string]})[]}
     */
    const getDepartmentContacts = (departmentItem) => {
        return department.departmentsContacts.filter(item =>
            item.departmentId === departmentItem.id)
    }

    return (
        <MainContainer>
            <h2 className="text-center pl-5 pr-5 mb-5">Довідник телефонних номерів та електронної пошти</h2>

            <div className='d-flex justify-content-end mb-3'>
                <Button onClick={ ()=> dispatch({type: 'seller', playload: department.departments})}>Торгові</Button>
                <Button className="ml-3" variant='success'
                        onClick={ ()=> dispatch({type: 'notSeller', playload: department.departments})}
                >Не торгові</Button>
                <Button className="ml-3" variant='secondary'
                        onClick={ ()=> dispatch({type: 'all', playload: department.departments})}
                >Всі</Button>
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
                    departmentState.map(department =>
                        <PhoneBookItem
                            key={department.id}
                            department={department}
                            departmentContacts={getDepartmentContacts(department)}
                        />
                    )
                }
                </tbody>
            </PersonalTable>
        </MainContainer>
    );
});

export default PhoneBook;