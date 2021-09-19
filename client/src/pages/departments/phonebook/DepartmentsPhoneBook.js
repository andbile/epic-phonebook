import React, {useCallback, useContext, useEffect, useReducer, useState} from 'react';
import MainContainer from "../../../components/MainContainer";
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";
import DepartmentPhoneBookItem from "./DepartmentPhoneBookItem";
import PersonalTable from "../../../components/PersonalTable";
import {Button, FormControl, InputGroup} from "react-bootstrap";
import {DepartmentPhoneBookReducer, departmentActions} from "./reducer";
import {fetchDepartments, fetchDepartmentsPhoneBook, fetchSearchDepartmentsByName} from '../../../http/departmentAPI'
import {useFetching} from "../../../hooks/useFetching";
import {useDebounce} from "../../../hooks/useDebounce";

// Display the abbreviated phone book of all departments
const DepartmentsPhoneBook = observer(() => {
    const {departmentStore} = useContext(Context)

    const [searchValue, setSearchValue] = useState('')

    const [fetchAllDepartments] = useFetching(async () => {
        const departments = await fetchDepartments()
        const departmentsPhoneBook = await fetchDepartmentsPhoneBook()

        departmentStore.setDepartments(departments)
        departmentStore.setDepartmentsContacts(departmentsPhoneBook)
    })


    // Toggle display seller/notSeller/all departments
    const initialState = departmentStore.departments
    function init(initialState) {
        return initialState;
    }
    const [departments, dispatch] = useReducer(DepartmentPhoneBookReducer, initialState, init)

    useEffect(() => {
        fetchAllDepartments()
            .then(() => {
                dispatch({
                    type: departmentActions.all,
                    playload: init(departmentStore.departments)
                })
            })

    }, [])


    // search department by department name
    const [fetchSearchDepartment] = useFetching(async (value) => {
        const departments = await fetchSearchDepartmentsByName({name: value})

        // if found
        if (departments.length > 0) {
            dispatch({
                type: departmentActions.all,
                playload: init(departments)
            })

            departmentStore.setDepartments(departments)
        }
    })

    // added fetch delay
    const debouncedSearch = useDebounce(fetchSearchDepartment, 700)

    const onSearch = evt => {
        setSearchValue(evt.target.value)

        // start searching after entering more than 2 characters
        if (evt.target.value.length > 2) debouncedSearch(evt.target.value.trim().toLowerCase())

        // clearing the search result (display all departments)
        if (evt.target.value.length === 0) {
            fetchAllDepartments()
                .then(() => {
                    dispatch({
                        type: departmentActions.all,
                        playload: init(departmentStore.departments)
                    })
                })
        }
    }

    return (
        <MainContainer>
            <h2 className="pl-5 pr-5 mb-5">Довідник телефонних номерів та електронної пошти</h2>

            <div>Внутрішній код маркету - 047</div>

            <div>

                <InputGroup className='mb-3 justify-content-end'>
                    <FormControl
                        className='w-25 flex-grow-0'
                        aria-label="Пошук"
                        aria-describedby="search-department"
                        value={searchValue}
                        onChange={onSearch}

                    />
                    <InputGroup.Text id="search-department">Пошук...</InputGroup.Text>
                </InputGroup>
            </div>

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
                    departments && departments.map(departmentItem =>
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