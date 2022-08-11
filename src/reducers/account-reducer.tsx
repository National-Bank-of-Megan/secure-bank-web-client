import {Action} from "./user-reducer";
import {
    SUB_ACCOUNTS_FETCH_FAILURE,
    SUB_ACCOUNTS_FETCH_REQUEST,
    SUB_ACCOUNTS_FETCH_SUCCESS, SUB_ACCOUNTS_UPDATE
} from "../constants/AccountConstants";


export interface AccountState {
    loading: boolean,
    status: number,
    error?: string,
    subAccounts: {}
}

export const accountReducer = (state: AccountState = {
    status: -1,
    error: '',
    loading: false,
    subAccounts: {}
}, action: Action) => {
    switch (action.type) {
        case SUB_ACCOUNTS_FETCH_REQUEST:
            return {loading: true};
        case SUB_ACCOUNTS_FETCH_SUCCESS:
            return {loading: false, error: '', status: action.status, subAccounts: action.payload};
        case SUB_ACCOUNTS_FETCH_FAILURE:
            return {loading: false, error: action.payload, status: action.status};
        case SUB_ACCOUNTS_UPDATE:
            return {loading: false, subAccounts: action.payload};
    }

}