import store from "../store";
import {useAppDispatch} from "../../hook/redux-hooks";
import jwt_decode from "jwt-decode";
import DecodedJWT from "../../models/decodedJWT";
import {subaccountBalanceActions} from "../slice/subaccountBalanceSlice";
import {logout} from "../slice/userAuthenticationSlice";
import storage from "redux-persist/lib/storage";

// function logout() {
//     useAppDispatch()(subaccountBalanceActions.setSubaccountsBalance([]));
//     useAppDispatch()(logout())
// }

const UserAuthenticationService = {

    isTokenValid: function (tokenName: string): boolean {
        try {
            // @ts-ignore
            const token = store.getState().userAuthentication.authTokens[tokenName];
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
            if (accessToken === null || refreshToken === null) {
                // this.logout()
                // storage.removeItem('persist: persist-key')
                return false;
            }
            console.log('IS USER LOGGED IN? ' + ((!!accessToken && this.isTokenValid('accessToken')) || (!!refreshToken && this.isTokenValid('refreshToken'))))
            const isLoggedIn = ((!!accessToken && this.isTokenValid('accessToken')) || (!!refreshToken && this.isTokenValid('refreshToken')));
            // if (!isLoggedIn) {
            //     // this.logout()
            //     storage.removeItem('persist: persist-key')
            // }
            return isLoggedIn === null ? false : isLoggedIn;
        } catch (error) {
            return false;
        }
    },

    logout: function() :void {
        storage.removeItem('persist: persist-key')
    }

}

export default UserAuthenticationService


