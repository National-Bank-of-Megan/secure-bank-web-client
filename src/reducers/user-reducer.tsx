import {
    USER_AUTH_FAIL,
    USER_AUTH_REQUEST,
    USER_AUTH_SUCCESS,
    USER_LOGOUT,
    USER_PARTIAL_AUTH
} from "../constants/AuthConstants";


export interface UserState {
    loading: boolean,
    status: number,
    isAuthenticated: boolean,
    error?: string,
    authTokens: { accessToken?: string, refreshToken?: string }
}

interface Action {
    type: string,
    payload?: string,
    status: number
}

export const userAuthenticationReducer = (state: UserState = {
    status: -1,
    error: '',
    isAuthenticated: false,
    loading: false,
    authTokens: {}
}, action: Action) => {
    switch (action.type) {
        case USER_AUTH_REQUEST:
            return {loading: true, isAuthenticated: false}
        case USER_AUTH_SUCCESS:
            return {loading: false, authTokens: action.payload, isAuthenticated: true, status: action.status}
        case USER_AUTH_FAIL:
            return {loading: false, error: action.payload, isAuthenticated: false, status: action.status}
        case USER_LOGOUT:
            return {loading: false, error: '', isAuthenticated: false, authTokens: {}, status : -1}
        case USER_PARTIAL_AUTH:
            return {loading: false, error:'', isAuthenticated: false, authTokens: {}, status: action.status}
        default:
            return state;


    }
}