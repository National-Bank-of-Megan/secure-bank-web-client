import store from "../store";
import {useAppDispatch} from "../../hook/redux-hooks";
import jwt_decode from "jwt-decode";
import DecodedJWT from "../../models/decodedJWT";
import {userAuthenticationActions} from "../slice/userAuthenticationSlice";

const UserAuthenticationService = () => {

    const dispatch = useAppDispatch()

    const isTokenValid = (tokenName: string): boolean => {
        // @ts-ignore
        const token = store.getState().userAuthentication.authTokens[tokenName];
        console.log('Token found ' + token)
        if (token === undefined) return false
        const toMilliseconds = 1000;
        const authTokenExpiration = jwt_decode<DecodedJWT>(token).exp;
        return authTokenExpiration * toMilliseconds >= new Date().getTime()
    }

    const isUserLoggedIn = (): boolean => {
        const accessToken = store.getState().userAuthentication.authTokens.accessToken;
        const refreshToken = store.getState().userAuthentication.authTokens.refreshToken;
        console.log('IS USER LOGGED IN? ' + ((!!accessToken && isTokenValid('accessToken')) || (refreshToken && isTokenValid('refreshToken'))))
        const isLoggedIn = ((!!accessToken && isTokenValid('accessToken')) || (refreshToken && isTokenValid('refreshToken')));
        if (!isLoggedIn) dispatch(userAuthenticationActions.logout)
        return isLoggedIn === null ? false : isLoggedIn;
    };

}

export default UserAuthenticationService
