import React from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import useCredentialsValidation from "../../hook/use-credentials-validation";
import {AlertState} from "../notifications/AlertSnackBar";


type Props = {
    [x: string]: any;
}

const PrivateRoute: React.FC<Props> = ({children}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { isUserLoggedIn } = useCredentialsValidation();
    // const {requestAuthTokenWithRefreshToken} = useRefreshToken();
    // const dispatch = useAppDispatch();
    // const navigate = useNavigate();

    // if (
    //     !UserAuthenticationService.isTokenValid("refreshToken") &&
    //     UserAuthenticationService.isTokenValid("accessToken")
    // ) {
    //     dispatch(subaccountBalanceActions.setSubaccountsBalance([]));
    //     dispatch(userAuthenticationActions.clearAuthentication());
    //     storage.removeItem("persist: persist-key");
    //     navigate("/login");
    // }
    // if (!UserAuthenticationService.isUserLoggedIn() && UserAuthenticationService.isTokenValid('refreshToken')) {
    //     try {
    //         requestAuthTokenWithRefreshToken();
    //     } catch (error: any) {
    //         console.log("Something went wrong - " + error.msg);
    //     }
    // }

    if (!isUserLoggedIn()) {
        const loginPageUrl = '/login';
        const sessionExpiredAlertState: AlertState = {
            isOpen: true,
            message: 'Your session has expired, please log in again'
        }
        navigate(loginPageUrl, { state: sessionExpiredAlertState });
    }

    return children;
}

export default PrivateRoute;