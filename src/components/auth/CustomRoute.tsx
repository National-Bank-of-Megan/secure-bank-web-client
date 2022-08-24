import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {UserAuthenticationSliceType} from "../../store/slice-types/UserAuthenticationSliceType";

import UserAuthenticationService from "../../store/service/UserAuthenticationService";


type Props = {
    [x: string]: any;
}

const CustomRoute: React.FC<Props> = ({children}) => {
    const userAuth = useSelector<RootState, UserAuthenticationSliceType>((state) => state.userAuthentication)
    const  isAuthenticated =UserAuthenticationService.isUserLoggedIn();



    return children;
}

export default CustomRoute;