import {createStore, combineReducers,applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import {composeWithDevTools} from "redux-devtools-extension";
import {configureStore} from "@reduxjs/toolkit";
import {userAuthenticationReducer} from "../reducers/user-reducer";


const reducers = combineReducers({
    userAuth : userAuthenticationReducer
})


const initialState={

}

const authStore = configureStore({
    devTools: true,
    preloadedState: initialState,
    reducer: reducers

})

export default authStore;

export type RootState = ReturnType<typeof authStore.getState>