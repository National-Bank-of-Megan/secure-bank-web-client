import {combineReducers} from "redux";

import {configureStore} from "@reduxjs/toolkit";
import {userAuthenticationReducer} from "../reducers/user-reducer";
import storage from 'redux-persist/lib/storage'
import {persistReducer, persistStore} from 'redux-persist'


const reducers = combineReducers({
    userAuth: userAuthenticationReducer
})

const persistConfig = {
    key: 'persist-key',
    storage
}

const persistedReducer = persistReducer(persistConfig, reducers)

const initialState = {}

const authStore = configureStore({
    devTools: true,
    preloadedState: initialState,
    reducer: persistedReducer

})

const persistor = persistStore(authStore)


export default authStore;
export {persistor}

export type RootState = ReturnType<typeof authStore.getState>