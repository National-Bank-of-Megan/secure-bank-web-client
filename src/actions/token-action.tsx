import {ThunkAction, ThunkDispatch} from "redux-thunk";
import authStore, {RootState} from "../store/auth-store";
import {AnyAction} from "redux";
import jwt_decode from "jwt-decode";
import DecodedJWT from "../models/decodedJWT";
import {
    USER_AUTH_FAIL,
    USER_LOGOUT,
    TOKEN_REFRESH_REQUEST, REFRESH_TOKEN_EXPIRATION, TOKEN_REFRESH_SUCCESS
} from "../constants/AuthConstants";
import storage from "redux-persist/lib/storage";
import {REST_PATH_AUTH} from "../constants/Constants";
import {logout} from "./user-action";


export const isTokenValid = (tokenName: string): boolean => {
    const token = authStore.getState().userAuth['authTokens'][tokenName];
    const toMilliseconds = 1000;
    const authTokenExpiration = jwt_decode<DecodedJWT>(token).exp;
    return authTokenExpiration * toMilliseconds <= new Date().getTime()
}

export const requestAuthTokenWithRefreshToken = () :ThunkAction<Promise<void>, RootState, unknown, AnyAction> => async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>): Promise<void>=> {
    const url = REST_PATH_AUTH + "/web/token/refresh";
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': authStore.getState().userAuth['authTokens']['refreshToken']
        }
    });

    if (!response.ok) {
        dispatch({
            type: REFRESH_TOKEN_EXPIRATION
        });

        await storage.removeItem('persist: persist-key')
    }

    const data = await response.json();
    dispatch({
        type: TOKEN_REFRESH_SUCCESS,
        payload : data.refresh_token
    })

};





