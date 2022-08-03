import {useCallback, useState} from 'react';
import FetchError from "../models/fetchError";
import {useNavigate} from "react-router-dom";
import {REST_PATH_AUTH} from "../constants/Constants";
import {useSelector} from "react-redux";
import {RootState} from "../store/auth-store";
import {UserState} from "../reducers/user-reducer";

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
    const userAuth = useSelector<RootState, UserState>((state) => state.userAuth)

    const {isAuthenticated} = userAuth;

    const sendRequest = useCallback(async <T, >(requestConfig: RequestConfig, applyData: (data: T) => void) => {
        setIsLoading(true);
        setError(null);

        if (!requestConfig.headers) {
            requestConfig.headers = {};
        }

        // if we want to set session max idle time, we should retrieve old authToken before we remove it and
        // send it together with refreshToken to Backend API



        try {
            if (isAuthenticated) {
                //get access token from redux state
                requestConfig.headers['Authorization'] = 'Bearer ' +userAuth.authTokens.accessToken;

            }


            // if(!(requestConfig.url.startsWith(REST_PATH_AUTH + "/web/login") || requestConfig.url.startsWith(REST_PATH_AUTH + "/web/register")))
            // {
            //     navigate('/login');
            // }

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