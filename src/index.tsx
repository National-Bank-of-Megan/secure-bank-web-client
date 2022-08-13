import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
import {AuthContextProvider} from "./store/auth-context";
import {AccountContextProvider} from "./store/account-context";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import store, {persistor} from "./store/store";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
        <AccountContextProvider>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </AccountContextProvider>
        </PersistGate>
    </Provider>
);
