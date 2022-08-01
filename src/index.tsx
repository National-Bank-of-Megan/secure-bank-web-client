import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
import {Provider} from "react-redux";
import authStore from "./store/auth-store";


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={authStore}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);
