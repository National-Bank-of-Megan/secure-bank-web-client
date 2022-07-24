import React, {useContext} from 'react'
import {Route, Navigate, useLocation} from 'react-router-dom'
import AuthContext from "../../store/auth-context";
import useRefreshToken from "../../hook/use-refresh";

type Props = {
    [x:string]: any;
}

const PrivateRoute: React.FC<Props> = ({ children }) => {
    const location = useLocation();
    const authCtx = useContext(AuthContext);
    const { requestAuthTokenWithRefreshToken } = useRefreshToken();

    console.log("W PrivateRoute!");

    const authTokenExpired = authCtx.removeAuthTokenIfExpired();
    const refreshTokenExpired = authCtx.removeRefreshTokenIfExpired();
    let isLoggedIn = !authTokenExpired;

    if (!isLoggedIn && !refreshTokenExpired) {
        try {
            requestAuthTokenWithRefreshToken();
            isLoggedIn = true;
        } catch (error: any) {
            console.log("Something went wrong - " + error.msg);
        }
    }

    if (!isLoggedIn) {
        return <Navigate to="/login" state={{from: location}}/>;
    }

    return children;
}

export default PrivateRoute;