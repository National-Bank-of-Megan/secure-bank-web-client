const UserAuthenticationService = {

    // isTokenValid: function (tokenName: string): boolean {
    //     try {
    //         // @ts-ignore
    //         const token = store.getState().userAuthentication.authTokens[tokenName];
    //         if (token === null) {
    //             return false;
    //         }
    //         const toMilliseconds = 1000;
    //         const authTokenExpiration = jwt_decode<DecodedJWT>(token).exp;
    //         return authTokenExpiration * toMilliseconds > new Date().getTime()
    //     } catch (error) {
    //         return false;
    //     }
    // },
    //
    // //todo use useCallback
    // isUserLoggedIn: function (): boolean {
    //     try {
    //         const accessToken = store.getState().userAuthentication.authTokens.accessToken;
    //         const refreshToken = store.getState().userAuthentication.authTokens.refreshToken;
    //         console.log('IS USER LOGGED IN? ' + ((!!accessToken && this.isTokenValid('accessToken')) || (!!refreshToken && this.isTokenValid('refreshToken'))))
    //         const isLoggedIn = ((!!accessToken && this.isTokenValid('accessToken')) || (!!refreshToken && this.isTokenValid('refreshToken')));
    //         return isLoggedIn;
    //     } catch (error) {
    //         return false;
    //     }
    // }
}

export default UserAuthenticationService;


