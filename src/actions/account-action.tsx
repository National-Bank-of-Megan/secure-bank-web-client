import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {RootState} from "../store/auth-store";
import {AnyAction} from "redux";
import {USER_LOGOUT} from "../constants/AuthConstants";
import storage from "redux-persist/lib/storage";


export const fetchSubAccounts = (): ThunkAction<Promise<void>, RootState, unknown, AnyAction> => async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>): Promise<void> => {


}

export const updateSubAccounts = (): ThunkAction<Promise<void>, RootState, unknown, AnyAction> => async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>): Promise<void> => {


}