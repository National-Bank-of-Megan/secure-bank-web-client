import {useCallback, useState} from "react";
import FetchError from "../models/fetchError";
import {useNavigate} from "react-router-dom";
import {BEARER_PREFIX, REST_PATH_AUTH} from "../constants/Constants";
import {useAppDispatch, useAppSelector} from "./redux-hooks";
import {userAuthenticationActions,} from "../store/slice/userAuthenticationSlice";
import useRefreshToken from "./use-refresh";
import {subaccountBalanceActions} from "../store/slice/subaccountBalanceSlice";
import storage from "redux-persist/es/storage";
import useCredentialsValidation from "./use-credentials-validation";
import {AlertState} from "../components/notifications/AlertSnackBar";
import {ClientJS} from "clientjs";

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
    const clientjs = new ClientJS();

    const {isAuthTokenValid, isRefreshTokenValid} = useCredentialsValidation();
    const {requestAuthTokenWithRefreshToken} = useRefreshToken();

    const userAuth = useAppSelector((state) => state.userAuthentication);
    const dispatch = useAppDispatch();

    async function logout() {
        dispatch(subaccountBalanceActions.setSubaccountsBalance([]));
        dispatch(userAuthenticationActions.clearAuthentication());
        await storage.removeItem("persist: persist-key");
    }

    const sendRequest = useCallback(
        async <T, >(requestConfig: RequestConfig, applyData: (data: T, responseStatus: number) => void) => {
            setIsLoading(true);
            setError(null);

            if (!requestConfig.headers) {
                requestConfig.headers = {};
            }

            const authTokenValid = isAuthTokenValid();
            const refreshTokenValid = isRefreshTokenValid();
            requestConfig.headers['Device-Fingerprint'] = clientjs.getFingerprint();


            try {
                if (authTokenValid) {
                    requestConfig.headers["Authorization"] = BEARER_PREFIX + userAuth.authToken;
                } else if (refreshTokenValid) {
                    const fetchedAuthToken = await requestAuthTokenWithRefreshToken();
                    requestConfig.headers["Authorization"] = BEARER_PREFIX + fetchedAuthToken;
                } else if (!requestConfig.url.startsWith(REST_PATH_AUTH)) {
                    let sessionExpiredAlertState: AlertState | null = null;

                    if (userAuth.refreshToken || userAuth.authToken) {
                        await logout()
                        sessionExpiredAlertState = {
                            isOpen: true,
                            message: 'Your session has expired, please log in again'
                        }
                    }

                    const loginPageUrl = '/login';
                    navigate(loginPageUrl, {state: sessionExpiredAlertState});
                }

                const APIAddress = requestConfig.url;
                const response = await fetch(APIAddress, {
                    method: requestConfig.method ? requestConfig.method : "GET",
                    headers: requestConfig.headers,
                    body: requestConfig.method === "GET" ? null : requestConfig.body ? JSON.stringify(requestConfig.body) : null,
                });

                if (!response.ok) {
                    if (response.status === 407) await logout()
                    const errorBody = await response.json();
                    const errorMessage = await errorBody.message;
                    throw new FetchError(response.status, errorMessage);
                }

                const responseText = await response.text();
                let data: T = responseText === "" ? {} : JSON.parse(responseText);
                applyData(data, response.status);
                setIsLoadedSuccessfully(true);
            } catch (error) {
                console.log(error);
                setError(error as FetchError || new FetchError(500, "Something went wrong."));
                setIsLoadedSuccessfully(false);
            }
            setIsLoading(false);
        },
        [dispatch, isAuthTokenValid, isRefreshTokenValid, navigate, requestAuthTokenWithRefreshToken, userAuth.authToken, userAuth.refreshToken]
    );

    return {
        isLoading,
        isLoadedSuccessfully,
        error,
        sendRequest,
    };
};

export default useFetch;
