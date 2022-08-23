import React from 'react'
import {Navigate, useLocation} from 'react-router-dom'
import {isUserLoggedIn} from "../../store/slice/userAuthenticationSlice";

type Props = {
    [x: string]: any;
}

const PrivateRoute: React.FC<Props> = ({children}) => {
    const location = useLocation();
    const isAuthenticated  = isUserLoggedIn().payload.isUserLoggedIn


    if (!isAuthenticated) {
        return <Navigate to="/login" state={{from: location}}/>;
    }

    return children;
}

export default PrivateRoute;