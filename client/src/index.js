import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import UserStore from "./store/UserStore";
import {ThemeProvider} from "styled-components";
import {theme} from './theme'
import {Global} from "./GlobalStyle";
import DepartmentStore from "./store/DepartmentStore";
import EmployeesStore from "./store/EmployeesStore";

export const Context = createContext(null)


ReactDOM.render(
    <React.StrictMode>
        <Context.Provider value={{
            user: new UserStore(),
            departmentStore: new DepartmentStore(),
            employees: new EmployeesStore()
        }}>
           <ThemeProvider theme={theme}>
               <Global/>
               <App/>
           </ThemeProvider>
        </Context.Provider>
    </React.StrictMode>,
    document.getElementById('root')
);


