import React, {useContext} from 'react';
import MainContainer from "../../components/MainContainer";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import PhoneBookItem from "./PhoneBookItem";
import PersonalTable from "../../components/PersonalTable";


const PhoneBook = observer(() => {
    const {department} = useContext(Context)

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
                    department.departments.map(department =>
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