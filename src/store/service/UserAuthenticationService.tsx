import store from "../store";
import {useAppDispatch} from "../../hook/redux-hooks";
import jwt_decode from "jwt-decode";
import DecodedJWT from "../../models/decodedJWT";
import {logout} from "../slice/userAuthenticationSlice";

const UserAuthenticationService = {

    isTokenValid: function (tokenName: string): boolean {
        try {
            // @ts-ignore
            const token = store.getState().userAuthentication.authTokens[tokenName];
            console.log('Token found ' + token)
            const toMilliseconds = 1000;
            const authTokenExpiration = jwt_decode<DecodedJWT>(token).exp;
            return authTokenExpiration * toMilliseconds >= new Date().getTime()
        } catch (error) {
            return false;
        }
    },

    isUserLoggedIn: function (): boolean {
        try {
            const accessToken = store.getState().userAuthentication.authTokens.accessToken;
            const refreshToken = store.getState().userAuthentication.authTokens.refreshToken;
            if (accessToken === null || refreshToken === null) {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                useAppDispatch()(logout());
                return false;
            }
            console.log('IS USER LOGGED IN? ' + ((!!accessToken && this.isTokenValid('accessToken')) || (refreshToken && this.isTokenValid('refreshToken'))))
            const isLoggedIn = ((!!accessToken && this.isTokenValid('accessToken')) || (refreshToken && this.isTokenValid('refreshToken')));
            // eslint-disable-next-line react-hooks/rules-of-hooks
            if (!isLoggedIn) useAppDispatch()(logout())
            return isLoggedIn === null ? false : isLoggedIn;
        } catch (error) {
            return false;
        }
    }
}

export default UserAuthenticationService
