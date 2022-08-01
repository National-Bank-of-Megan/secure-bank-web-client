import {USER_AUTH_FAIL, USER_AUTH_REQUEST, USER_AUTH_SUCCESS, USER_LOGOUT} from "../constants/AuthConstants";

export interface UserState {
    loading?: boolean,
    error?: string,
    authTokens: { accessToken?: string, refreshToken?: string }
}

interface Action {
    type: string,
    payload?: string
}

export const userAuthenticationReducer = (state: UserState = { authTokens: {} }, action: Action) => {
    switch (action.type) {
        case USER_AUTH_REQUEST:
            return {loading: true}
        case USER_AUTH_SUCCESS:
            return {loading: false, authTokens: action.payload}
        case USER_AUTH_FAIL:
            return {loading: false, error: action.payload}
        case USER_LOGOUT:
            return {}
        default:
            return state;


    }
}