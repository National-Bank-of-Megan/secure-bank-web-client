import React, {useState} from 'react';
import jwt_decode from "jwt-decode";
import JWT from "../models/jwt";

type AuthContextObj = {
    authToken: string;
    refreshToken: string;
    isLoggedIn: () => boolean;
    login: (authToken: string, refreshToken: string) => void; // do not use at least for now
    logout: () => void;
    removeAuthTokenIfExpired: () => boolean; // if expired or not exist return true
    removeRefreshTokenIfExpired: () => boolean;
    addAuthToken: (authToken: string) => void;
}

const AuthContext = React.createContext<AuthContextObj>({
    authToken: '',
    refreshToken: '',
    isLoggedIn: () => false,
    login: (authToken, refreshToken) => {},
    logout: () => {},
    removeAuthTokenIfExpired: () => false,
    removeRefreshTokenIfExpired: () => false,
    addAuthToken: (authToken) => {}
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
            return true;
        } else if (!token) {
            return true;
        }
        return false;
    }

    const addAuthToken = (authToken: string) => {
        setAuthToken(authToken);
        localStorage.setItem(authTokenKey, authToken);
    }

    const isLoggedIn = () => {
        return !!authToken && isTokenExpired(authToken);
    }

    const removeAuthTokenIfExpired = () => {
        return handleToken(authToken, setAuthToken, authTokenKey);
    }

    const removeRefreshTokenIfExpired = () => {
        return handleToken(refreshToken, setRefreshToken, refreshTokenKey);
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
        setRefreshToken(null);
        localStorage.removeItem(authTokenKey);
        localStorage.removeItem(refreshTokenKey);
    }

    removeAuthTokenIfExpired();
    removeRefreshTokenIfExpired();
    const authTokenFullName = authToken ? authHeader + authToken : "";
    const refreshTokenFullName = refreshToken ? authHeader + refreshToken : "";

    const contextValue = {
        authToken: authTokenFullName,
        refreshToken: refreshTokenFullName,
        isLoggedIn: isLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
        removeAuthTokenIfExpired: removeAuthTokenIfExpired,
        removeRefreshTokenIfExpired: removeRefreshTokenIfExpired,
        addAuthToken: addAuthToken
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>);
    };

export default AuthContext;