import {useCallback, useContext} from "react";
import {REST_PATH} from "../constants/Constants";
import FetchError from "../models/fetchError";
import AuthContext from "../store/auth-context";

const useRefreshToken = () => {
    const authCtx = useContext(AuthContext);

    const fetchAuthToken = useCallback(async (): Promise<string> => {
        const APIAddress = REST_PATH + "/web/token/refresh";
        const response = await fetch(APIAddress, {
            method: 'GET',
            headers: {
                'Authorization': authCtx.refreshToken
            }
        });

        if (!response.ok) {
            throw new FetchError(response.status, await response.text());
        }

        const responseBody = await response.json();
        return responseBody['access_token'];
    }, [authCtx.refreshToken]);

    const requestAuthTokenWithRefreshToken = useCallback(async (): Promise<string> => {
        const fetchedAuthToken = await fetchAuthToken();
        authCtx.addAuthToken(fetchedAuthToken);
        return fetchedAuthToken !== null ? fetchedAuthToken : "";
    }, [authCtx, fetchAuthToken])

    return {
        requestAuthTokenWithRefreshToken
    };
}

export default useRefreshToken;