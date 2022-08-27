import {
    USER_AUTH_FAIL,
    USER_AUTH_REQUEST,
    USER_AUTH_SUCCESS,
    USER_LOGOUT,
    USER_PARTIAL_AUTH
} from "../constants/AuthConstants";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {RootState} from "../store/store";
import {AnyAction} from "redux";
import {REST_PATH_AUTH} from "../constants/Constants";
import storage from "redux-persist/lib/storage";

const reduxAuthFetch = async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>, url :string, body : string, deviceFingerprint: string) :Promise<void>=>{
    console.log(deviceFingerprint);
    const response = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Device-Fingerprint': deviceFingerprint
        },
        body: body
    })

    if (!response.ok) {
        const text = await response.text() || 'Invalid credentials';
        dispatch({
            type: USER_AUTH_FAIL,
            payload: text,
            status: response.status
        })
        return Promise.reject(text)
    }

    if (response.status === 206) {
        dispatch({
            type: USER_PARTIAL_AUTH,
            status: response.status
        })
        return;
    }
    const status  = response.status;
    const data = await response.json();
    const authTokens = {accessToken: data.access_token, refreshToken: data.refresh_token}

    dispatch({
        type: USER_AUTH_SUCCESS,
        payload: authTokens,
        status : status
    })

}

export const   login = (clientId: string, password: string, deviceFingerprint: string)   :ThunkAction<Promise<void>, RootState, unknown, AnyAction> => async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>): Promise<void> => {

    dispatch({
        type: USER_AUTH_REQUEST
    })

    const url = REST_PATH_AUTH + "/web/login";
    const body = JSON.stringify({
        clientId : clientId,
        password : password
    })

    await reduxAuthFetch(dispatch, url, body, deviceFingerprint)


}

export const logout = (): ThunkAction<Promise<void>, RootState, unknown, AnyAction> => async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>): Promise<void> => {

    dispatch({
        type: USER_LOGOUT
    });

    await storage.removeItem('persist: persist-key')
}

export const verifyOtp = (clientId :string, code :string, deviceFingerprint: string) :ThunkAction<Promise<void>, RootState, unknown, AnyAction> => async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>): Promise<void> =>{
    const body = JSON.stringify({
        clientId : clientId,
        code : code,
        deviceFingerprint: deviceFingerprint
    })

    const url = REST_PATH_AUTH + "/web/login/verify?clientId="+clientId
    await reduxAuthFetch(dispatch, url, body, deviceFingerprint);
}