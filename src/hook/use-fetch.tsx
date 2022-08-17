import {useCallback, useContext, useState} from 'react';
import AuthContext from "../store/auth-context";
import FetchError from "../models/fetchError";
import {useNavigate} from "react-router-dom";
import useRefreshToken from "./use-refresh";
import {REST_PATH_AUTH} from "../constants/Constants";

export type Headers = {
    [key: string]: any;
};

export type RequestConfig = {
    url: string;
    method?: string;
    headers?: Headers;
    body?: {};
};

const useFetch = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<FetchError | null>(null);
    const authCtx = useContext(AuthContext);
    const {requestAuthTokenWithRefreshToken} = useRefreshToken();
    const navigate = useNavigate();

    const sendRequest = useCallback(async <T, >(requestConfig: RequestConfig, applyData: (data: T) => void) => {
        setIsLoading(true);
        setError(null);

        if (!requestConfig.headers) {
            requestConfig.headers = {};
        }

        // if we want to set session max idle time, we should retrieve old authToken before we remove it and
        // send it together with refreshToken to Backend API
        const authTokenExpired = authCtx.removeAuthTokenIfExpired();
        const refreshTokenExpired = authCtx.removeRefreshTokenIfExpired();
        console.log("is auth token expired? " + !authTokenExpired)

        try {
            if (!authTokenExpired) {
                requestConfig.headers['Authorization'] = authCtx.authToken;
            } else if (!refreshTokenExpired) {
                requestConfig.headers['Authorization'] = await requestAuthTokenWithRefreshToken();
            } else if (!(requestConfig.url.startsWith(REST_PATH_AUTH + "/web/login") || requestConfig.url.startsWith(REST_PATH_AUTH + "/web/register"))) {
                authCtx.logout();
                navigate('/login');
            }

            const APIAddress = requestConfig.url;
            const response = await fetch(APIAddress, {
                method: requestConfig.method ? requestConfig.method : 'GET',
                headers: requestConfig.headers,
                body: requestConfig.method === 'GET' ? null : (requestConfig.body ? JSON.stringify(requestConfig.body) : null),
            });

            if (!response.ok) {
                throw new FetchError(response.status, await response.text());
            }

            const responseText = await response.text();
            let data: T = responseText === "" ? {} : JSON.parse(responseText);
            applyData(data);
        } catch (error) {
            setError(error as FetchError || new FetchError(500, "Something went wrong."));
        }
        setIsLoading(false);
    }, [authCtx, navigate, requestAuthTokenWithRefreshToken]);


    return {
        isLoading,
        error,
        sendRequest,
    };
};

export default useFetch;