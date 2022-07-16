import React, {useState} from 'react';
import jwt_decode from "jwt-decode";
import JWT from "../models/jwt";

type AuthContextObj = {
    authToken: string;
    refreshToken: string;
    isLoggedIn: boolean;
    login: (authToken: string, refreshToken: string) => void;
    logout: () => void;
}

const AuthContext = React.createContext<AuthContextObj>({
    authToken: '',
    refreshToken: '',
    isLoggedIn: false,
    login: (authToken) => {},
    logout: () => {}
});

interface Props {
    children: React.ReactNode;
}

export const AuthContextProvider: React.FC<Props> = ({ children }) => {
    const authHeader = "Bearer ";
    const authTokenKey = "authToken";
    const refreshTokenKey = "refreshToken";

    const initialAuthToken = localStorage.getItem(authTokenKey);
    const initialRefreshToken = localStorage.getItem(refreshTokenKey);
    const [authToken, setAuthToken] = useState<string | null>(initialAuthToken);
    const [refreshToken, setRefreshToken] = useState<string | null>(initialRefreshToken);

    const handleToken = (token: string | null,
                         setToken: { (value: React.SetStateAction<string | null>): void; (value: React.SetStateAction<string | null>): void; (arg0: null): void; },
                         storageKey: string) => {

        if (!!token && isTokenExpired(token)) {
            localStorage.removeItem(storageKey);
            setToken(null);
        }
    }

    const isTokenExpired = (token: string) => {
        const toMilliseconds = 1000;
        const authTokenExpiration = jwt_decode<JWT>(token).exp;
        return authTokenExpiration * toMilliseconds <= new Date().getTime()
    }

    const loginHandler = (authToken: string, refreshToken: string) => {
        setAuthToken(authToken);
        setRefreshToken(refreshToken)
        localStorage.setItem(authTokenKey, authToken);
        localStorage.setItem(refreshTokenKey, refreshToken);
    }

    const logoutHandler = () => {
        setAuthToken(null);
        setRefreshToken(null)
        localStorage.removeItem(authTokenKey);
        localStorage.removeItem(refreshTokenKey);
    }


    handleToken(authToken, setAuthToken, authTokenKey);
    handleToken(refreshToken, setRefreshToken, refreshTokenKey);
    const userIsLoggedIn = !!authToken;

    const contextValue = {
        authToken: authHeader + authToken,
        refreshToken: authHeader + refreshToken,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>);
    };

export default AuthContext;