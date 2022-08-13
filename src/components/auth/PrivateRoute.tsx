import React, {useContext} from 'react'
import {Navigate, useLocation} from 'react-router-dom'
import AuthContext from "../../store/auth-context";
import useRefreshToken from "../../hook/use-refresh";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {UserState} from "../../reducers/user-reducer";

type Props = {
    [x: string]: any;
}

const PrivateRoute: React.FC<Props> = ({children}) => {
    const location = useLocation();
    const userAuth = useSelector<RootState, UserState>((state) => state.userAuth)
    const { isAuthenticated } = userAuth;


    if (!isAuthenticated) {
        console.log('not authenticated')
        return <Navigate to="/login" state={{from: location}}/>;
    }

    return children;
}

export default PrivateRoute;