import {ThunkAction, ThunkDispatch} from "redux-thunk";
import store, {RootState} from "../store/store";
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
    try {
        // @ts-ignore
        const token = store.getState().userAuthentication['authTokens'][tokenName];
        if(token === undefined) return false;
        // console.log(token)
        const toMilliseconds = 1000;
        const authTokenExpiration = jwt_decode<DecodedJWT>(token).exp;
        // console.log(authTokenExpiration)
        // console.log(new Date().getTime())
        return authTokenExpiration * toMilliseconds >= new Date().getTime()
    }catch(error){
        return false;
    }
}

export const requestAuthTokenWithRefreshToken = () :ThunkAction<Promise<void>, RootState, unknown, AnyAction> => async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>): Promise<void>=> {

    const url = REST_PATH_AUTH + "/web/token/refresh";
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer '+store.getState().userAuthentication['authTokens']['refreshToken']
        }
    });

    console.log('Got access token with refresh')
    if (!response.ok) {
        dispatch({
            type: REFRESH_TOKEN_EXPIRATION
        });

        await storage.removeItem('persist: persist-key')
    }

    const status  = response.status;
    const data = await response.json();
    // console.log('received access token:\t'+data.access_token)
    const authTokens = {accessToken: data.access_token, refreshToken: store.getState().userAuthentication['authTokens']['refreshToken']}
    dispatch({
        type: TOKEN_REFRESH_SUCCESS,
        payload : authTokens,
        status : status
    })

};





