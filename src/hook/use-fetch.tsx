import {useCallback, useState} from 'react';
import FetchError from "../models/fetchError";
import {useNavigate} from "react-router-dom";
import {REST_PATH_AUTH} from "../constants/Constants";
import {useSelector} from "react-redux";
import store, {RootState} from "../store/store";
import {useAppDispatch} from "./redux-hooks";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {UserAuthenticationSliceType} from "../store/slice-types/UserAuthenticationSliceType";
import { userAuthenticationActions} from "../store/slice/userAuthenticationSlice";
import UserAuthenticationService from "../store/service/UserAuthenticationService";

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
    const [isLoadedSuccessfully, setIsLoadedSuccessfully] = useState(false);
    const [error, setError] = useState<FetchError | null>(null);
    const navigate = useNavigate();
    //redux
    const userAuth = useSelector<RootState, UserAuthenticationSliceType>((state) => state.userAuthentication)
    const dispatch = useAppDispatch()


    const dispatchSynchronously = async (dispatch : ThunkDispatch<RootState, unknown, AnyAction>) =>  {
    //   t
    }

    const sendRequest = useCallback(async <T, >(requestConfig: RequestConfig, applyData: (data: T) => void) => {
        setIsLoading(true);
        setError(null);

        if (!requestConfig.headers) {
            requestConfig.headers = {};
        }

        const isAccessTokenValid = UserAuthenticationService.isTokenValid('accessToken');
        const isRefreshTokenValid = UserAuthenticationService.isTokenValid('refreshToken');

        if(!isRefreshTokenValid){
            console.log('Logging out, refresh token is expired');
            // dispatch(userAuthenticationActions.logout);
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
                   requestConfig.headers['Authorization'] = 'Bearer '+store.getState().userAuth.authTokens.refreshToken;
            }
            else
            if (!(requestConfig.url.startsWith(REST_PATH_AUTH)))
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
                const errorBody = await response.json();
                const errorMessage = await errorBody.message;
                throw new FetchError(response.status, errorMessage);
            }

            const responseText = await response.text();
            console.log('Use fetch response: '+responseText)
            let data: T = responseText === "" ? {} : JSON.parse(responseText);
            applyData(data);
            setIsLoadedSuccessfully(true);
        } catch (error) {
            console.log(error);
            setError(error as FetchError || new FetchError(500, "Something went wrong."));
            setIsLoadedSuccessfully(false);
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