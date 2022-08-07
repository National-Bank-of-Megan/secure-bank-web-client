import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
import {AuthContextProvider} from "./store/auth-context";
import {AccountContextProvider} from "./store/account-context";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <AuthContextProvider>
        <AccountContextProvider>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </AccountContextProvider>
    </AuthContextProvider>
);
