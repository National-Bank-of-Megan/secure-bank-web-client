import {createStore, combineReducers,applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import {composeWithDevTools} from "redux-devtools-extension";
import {configureStore} from "@reduxjs/toolkit";
import {userAuthenticationReducer} from "../reducers/user-reducer";
import {PersistGate} from "redux-persist/integration/react";

//
// const reducers = combineReducers({
//     userAuth : userAuthenticationReducer
// })

const persistConfig = {
    key : 'persist-key',
    storage
}

persistReducer(persistConfig,userAuthenticationReducer)




const initialState={}

const authStore = configureStore({
    devTools: true,
    preloadedState: initialState,
    reducer: reducers

})


export default authStore;

export type RootState = ReturnType<typeof authStore.getState>