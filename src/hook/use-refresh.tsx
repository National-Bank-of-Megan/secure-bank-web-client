import {useCallback} from "react";
import FetchError from "../models/fetchError";
import {REST_PATH_AUTH} from "../constants/Constants";
import {useAppDispatch, useAppSelector} from "./redux-hooks";
import {userAuthenticationActions} from "../store/slice/userAuthenticationSlice";
import {subaccountBalanceActions} from "../store/slice/subaccountBalanceSlice";
import storage from "redux-persist/es/storage";

const useRefreshToken = () => {
    const dispatch = useAppDispatch()
    const userAuth = useAppSelector((state) => state.userAuthentication);

    const fetchAuthToken = useCallback(async (): Promise<string> => {
        const refreshToken = userAuth.refreshToken || '';
        const APIAddress = REST_PATH_AUTH + "/token/refresh";
        const response = await fetch(APIAddress, {
            method: 'GET',
            headers: {
                'Authorization': refreshToken ? 'Bearer ' + refreshToken : ''
            }
        });

        if (!response.ok) {
            if (response.status === 407) {
                dispatch(subaccountBalanceActions.setSubaccountsBalance([]));
                dispatch(userAuthenticationActions.clearAuthentication());
                await storage.removeItem("persist: persist-key");
            }


            const errorBody = await response.json();
            const errorMessage = await errorBody.message;
            throw new FetchError(response.status, errorMessage);
        }

        const responseBody = await response.json();
        return responseBody['access_token'];
    }, [userAuth.refreshToken]);

    const requestAuthTokenWithRefreshToken = useCallback(async (): Promise<string> => {
        const fetchedAuthToken = await fetchAuthToken();
        dispatch(userAuthenticationActions.setAuthToken(fetchedAuthToken))
        return fetchedAuthToken !== null ? fetchedAuthToken : "";
    }, [dispatch, fetchAuthToken])

    return {
        requestAuthTokenWithRefreshToken
    };
}

export default useRefreshToken;