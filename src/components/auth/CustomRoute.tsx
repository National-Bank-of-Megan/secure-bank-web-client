import React, {useContext} from "react";
import AuthContext from "../../store/auth-context";
import useRefreshToken from "../../hook/use-refresh";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {UserState} from "../../reducers/user-reducer";

type Props = {
    [x: string]: any;
}

const CustomRoute: React.FC<Props> = ({children}) => {
    const userAuth = useSelector<RootState, UserState>((state) => state.userAuth)
    const { isAuthenticated } = userAuth;



    return children;
}

export default CustomRoute;