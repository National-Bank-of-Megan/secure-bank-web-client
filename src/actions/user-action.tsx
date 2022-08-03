import {USER_AUTH_FAIL, USER_AUTH_SUCCESS, USER_LOGOUT} from "../constants/AuthConstants";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {RootState} from "../store/auth-store";
import {AnyAction} from "redux";
import {REST_PATH_AUTH} from "../constants/Constants";
import storage from "redux-persist/lib/storage";
import FetchError from "../models/fetchError";


export const login = (clientId: string, password: string): ThunkAction<Promise<void>, RootState, unknown, AnyAction> => async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>): Promise<void> => {
    try {
        dispatch
        ({
            type: USER_AUTH_SUCCESS
        })

        const response = await fetch(REST_PATH_AUTH + "/web/login", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                clientId,
                password
            })
        })

        if(!response.ok) throw new FetchError(response.status, await response.text())

        const data = await response.json();
        const authTokens = {accessToken: data.access_token, refreshToken: data.refresh_token}

        dispatch({
            type: USER_AUTH_SUCCESS,
            payload: authTokens
        })

    } catch (error: any) {
        dispatch({
            type: USER_AUTH_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
        return Promise.reject();
    }
}

export const logout = () :ThunkAction<Promise<void>, RootState, unknown, AnyAction>  => async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>): Promise<void>=> {

    dispatch({
        type: USER_LOGOUT,
        // payload: {}
    });

    await storage.removeItem('persist: persist-key')





}

