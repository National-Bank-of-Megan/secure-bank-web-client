import React from 'react'
import {Navigate, useLocation} from 'react-router-dom'
import UserAuthenticationService from "../../store/service/UserAuthenticationService";
import useRefreshToken from "../../hook/use-refresh";


type Props = {
    [x: string]: any;
}

const PrivateRoute: React.FC<Props> = ({children}) => {
    const location = useLocation();
    const {requestAuthTokenWithRefreshToken} = useRefreshToken();

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