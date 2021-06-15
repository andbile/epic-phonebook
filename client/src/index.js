import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import UserStore from "./store/UserStore";
import {ThemeProvider} from "styled-components";
import {theme} from './theme'
import {Global} from "./GlobalStyle";
import DepartmentStore from "./store/DepartmentStore";

export const Context = createContext(null)


ReactDOM.render(
    <React.StrictMode>
        <Context.Provider value={{
            user: new UserStore(),
            department: new DepartmentStore()
        }}>
           <ThemeProvider theme={theme}>
               <Global/>
               <App/>
           </ThemeProvider>
        </Context.Provider>
    </React.StrictMode>,
    document.getElementById('root')
);


