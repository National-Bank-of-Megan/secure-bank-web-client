import React, {useContext} from "react";
import AuthContext from "../../store/auth-context";
import useRefreshToken from "../../hook/use-refresh";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {UserAuthenticationSliceType} from "../../store/slice-types/UserAuthenticationSliceType";


type Props = {
    [x: string]: any;
}

const CustomRoute: React.FC<Props> = ({children}) => {
    const userAuth = useSelector<RootState, UserAuthenticationSliceType>((state) => state.userAuthentication)
    const  isAuthenticated =true;



    return children;
}

export default CustomRoute;