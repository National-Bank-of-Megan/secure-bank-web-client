import React from 'react'
import {Navigate, useLocation, useNavigate} from 'react-router-dom'
import UserAuthenticationService from "../../store/service/UserAuthenticationService";
import useRefreshToken from "../../hook/use-refresh";
import storage from 'redux-persist/es/storage';
import { useAppDispatch } from '../../hook/redux-hooks';
import { subaccountBalanceActions } from '../../store/slice/subaccountBalanceSlice';
import { userAuthenticationActions } from '../../store/slice/userAuthenticationSlice';


type Props = {
    [x: string]: any;
}

const PrivateRoute: React.FC<Props> = ({children}) => {
    const location = useLocation();
    const {requestAuthTokenWithRefreshToken} = useRefreshToken();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    if (
        !UserAuthenticationService.isTokenValid("refreshToken") &&
        UserAuthenticationService.isTokenValid("accessToken")
      ) {
        dispatch(subaccountBalanceActions.setSubaccountsBalance([]));
        dispatch(userAuthenticationActions.clearAuthentication());
        storage.removeItem("persist: persist-key");
        navigate("/login");
      }
    if(!UserAuthenticationService.isUserLoggedIn() && UserAuthenticationService.isTokenValid('refreshToken')){
        try{
            requestAuthTokenWithRefreshToken();
        }catch(error :any){
            console.log("Something went wrong - " + error.msg);
        }
    }

    if (!UserAuthenticationService.isUserLoggedIn()) {
        return <Navigate to="/login" state={{from: location}}/>;
    }

    return children;
}

export default PrivateRoute;