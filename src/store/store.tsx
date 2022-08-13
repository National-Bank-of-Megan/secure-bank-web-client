import {combineReducers} from "redux";

import {configureStore} from "@reduxjs/toolkit";
import {userAuthenticationReducer} from "../reducers/user-reducer";
import storage from 'redux-persist/lib/storage'
import {persistReducer, persistStore} from 'redux-persist'
import {accountReducer} from "../reducers/account-reducer";


const reducers = combineReducers({
    userAuth: userAuthenticationReducer,
    account : accountReducer
})

const persistConfig = {
    key: 'persist-key',
    storage
}

const persistedReducer = persistReducer(persistConfig, reducers)

const initialState = {

}

const store = configureStore({
    devTools: true,
    preloadedState: initialState,
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        })

})

const persistor = persistStore(store)

export default store;
export {persistor}

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch