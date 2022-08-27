import React from "react";

import UserAuthenticationService from "../../store/service/UserAuthenticationService";
import useRefreshToken from "../../hook/use-refresh";


type Props = {
    [x: string]: any;
}

const CustomRoute: React.FC<Props> = ({children}) => {
    const {requestAuthTokenWithRefreshToken} = useRefreshToken();

    if(!UserAuthenticationService.isUserLoggedIn() && UserAuthenticationService.isTokenValid('refreshToken')){
        try{
            requestAuthTokenWithRefreshToken();
        }catch(error :any){
            console.log("Something went wrong - " + error.msg);
        }
    }


    return children;
}

export default CustomRoute;