import React, {useContext} from "react";
import AuthContext from "../../store/auth-context";
import useRefreshToken from "../../hook/use-refresh";

type Props = {
    [x: string]: any;
}

const CustomRoute: React.FC<Props> = ({children}) => {
    const authCtx = useContext(AuthContext);
    const {requestAuthTokenWithRefreshToken} = useRefreshToken();

    const authTokenExpired = authCtx.removeAuthTokenIfExpired();
    const refreshTokenExpired = authCtx.removeRefreshTokenIfExpired();
    let isLoggedIn = !authTokenExpired;

    if (!isLoggedIn && !refreshTokenExpired) {
        try {
            requestAuthTokenWithRefreshToken();
        } catch (error: any) {
            console.log("Something went wrong - " + error.msg);
        }
    }

    return children;
}

export default CustomRoute;