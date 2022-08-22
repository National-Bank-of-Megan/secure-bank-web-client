import React, {useContext} from 'react'
import {Navigate, useLocation} from 'react-router-dom'
import AuthContext from "../../store/auth-context";
import useRefreshToken from "../../hook/use-refresh";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";

import {UserAuthenticationSliceType} from "../../store/slice-types/UserAuthenticationSliceType";

type Props = {
    [x: string]: any;
}

const PrivateRoute: React.FC<Props> = ({children}) => {
    const location = useLocation();
    const userAuth = useSelector<RootState, UserAuthenticationSliceType>((state) => state.userAuthentication)
    const isAuthenticated  = false


    if (!isAuthenticated) {
        console.log('not authenticated')
        return <Navigate to="/login" state={{from: location}}/>;
    }

    return children;
}

export default PrivateRoute;