import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
import {Provider} from "react-redux";
import authStore, {persistor} from "./store/auth-store";
import {PersistGate} from "redux-persist/integration/react";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={authStore}>
        <PersistGate persistor={persistor}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
        </PersistGate>
     </Provider>
);
