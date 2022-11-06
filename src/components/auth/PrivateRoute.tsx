import React from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import useCredentialsValidation from "../../hook/use-credentials-validation";
import {AlertState} from "../notifications/AlertSnackBar";
import {useAppSelector} from "../../hook/redux-hooks";


type Props = {
    [x: string]: any;
}

const PrivateRoute: React.FC<Props> = ({children}) => {
    const navigate = useNavigate();
    const { isUserLoggedIn } = useCredentialsValidation();
    const userAuth = useAppSelector((state) => state.userAuthentication);

    if (!isUserLoggedIn()) {
        const loginPageUrl = '/login';
        let sessionExpiredAlertState: AlertState | null = null;
        if (userAuth.refreshToken || userAuth.authToken) {
            sessionExpiredAlertState = {
                isOpen: true,
                message: 'Your session has expired, please log in again' // TODO: check if works and check if clearAuthentication to be invoked here?
            }
        }
        navigate(loginPageUrl, { state: sessionExpiredAlertState });
    }

    return children;
}

export default PrivateRoute;