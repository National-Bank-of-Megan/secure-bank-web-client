import store from "../store";
import {useAppDispatch} from "../../hook/redux-hooks";
import jwt_decode from "jwt-decode";
import DecodedJWT from "../../models/decodedJWT";
import {subaccountBalanceActions} from "../slice/subaccountBalanceSlice";
import storage from "redux-persist/lib/storage";
import { useNavigate } from "react-router-dom";
import {userAuthenticationActions} from "../slice/userAuthenticationSlice";

const UserAuthenticationService = {

    isTokenValid: function (tokenName: string): boolean {
        try {
            // @ts-ignore
            const token = store.getState().userAuthentication.authTokens[tokenName];
            if(token === null) return false;
            console.log('=== is token valid ===')
            console.log(token)
            console.log(jwt_decode<DecodedJWT>(token).exp)
            const toMilliseconds = 1000;
            const authTokenExpiration = jwt_decode<DecodedJWT>(token).exp;
            console.log(authTokenExpiration * toMilliseconds >= new Date().getTime())
            return authTokenExpiration * toMilliseconds >= new Date().getTime()
        } catch (error) {
            return false;
        }
    },

    //todo use useCallback
    isUserLoggedIn: function (): boolean {
        try {
            const accessToken = store.getState().userAuthentication.authTokens.accessToken;
            const refreshToken = store.getState().userAuthentication.authTokens.refreshToken;
            console.log('IS USER LOGGED IN? ' + ((!!accessToken && this.isTokenValid('accessToken')) || (!!refreshToken && this.isTokenValid('refreshToken'))))
            const isLoggedIn = ((!!accessToken && this.isTokenValid('accessToken')) || (!!refreshToken && this.isTokenValid('refreshToken')));
            return isLoggedIn;
        } catch (error) {
            return false;
        }
    },

    // logout: function() :void {
    //     useAppDispatch()(subaccountBalanceActions.setSubaccountsBalance([]));
    //     useAppDispatch()(UserAuthenticationService.logout)
    //     storage.removeItem('persist: persist-key')
    //     useNavigate()("/login");
    // }

}

export default UserAuthenticationService


