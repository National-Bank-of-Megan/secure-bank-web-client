import {useCallback, useState} from 'react';
import FetchError from "../models/fetchError";
import {useNavigate} from "react-router-dom";
import {REST_PATH_AUTH} from "../constants/Constants";
import {useSelector} from "react-redux";
import store, {RootState} from "../store/store";
import {UserState} from "../reducers/user-reducer";
import {useAppDispatch} from "./redux-hooks";
import {isTokenValid, requestAuthTokenWithRefreshToken} from "../actions/token-action";
import {logout} from "../actions/user-action";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";

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
    const navigate = useNavigate();
    //redux
    const userAuth = useSelector<RootState, UserState>((state) => state.userAuth)
    const dispatch = useAppDispatch()
    const {isAuthenticated} = userAuth;

    const dispatchSynchronously = async (dispatch : ThunkDispatch<RootState, unknown, AnyAction>) =>  {
        await dispatch(requestAuthTokenWithRefreshToken())
    }

    const sendRequest = useCallback(async <T, >(requestConfig: RequestConfig, applyData: (data: T) => void) => {
        setIsLoading(true);
        setError(null);

        if (!requestConfig.headers) {
            requestConfig.headers = {};
        }

        const isAccessTokenValid = isTokenValid('accessToken');
        const isRefreshTokenValid = isTokenValid('refreshToken');
        console.log('Access token is :'+isAccessTokenValid)
        console.log('Refresh token is :'+isRefreshTokenValid)

        if(!isRefreshTokenValid){
            console.log('Logging out, refresh token is expired');
            await dispatch(logout());
        }

        try {
            if (isAccessTokenValid) {
                console.log('Sending request with valid access token')
                requestConfig.headers['Authorization'] = 'Bearer '+userAuth.authTokens.accessToken;
            }
            else if (isRefreshTokenValid) {
                console.log('getting access token form dispatch')

                await dispatchSynchronously(dispatch)
                   // @ts-ignore
                   requestConfig.headers['Authorization'] = 'Bearer '+store.getState().userAuth['authTokens']['accessToken'];
            }
            else if (!(requestConfig.url.startsWith(REST_PATH_AUTH + "/web/login") || requestConfig.url.startsWith(REST_PATH_AUTH + "/web/register")))
                navigate('/login');


            console.log('fetching request')
            const APIAddress = requestConfig.url;
            const response = await fetch(APIAddress, {
                method: requestConfig.method ? requestConfig.method : 'GET',
                headers: requestConfig.headers,
                body: requestConfig.method === 'GET' ? null : (requestConfig.body ? JSON.stringify(requestConfig.body) : null),
            });

            console.log(response)
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
    }, [navigate]);


    return {
        isLoading,
        error,
        sendRequest,
    };
};

export default useFetch;