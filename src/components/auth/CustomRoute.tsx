import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {UserAuthenticationSliceType} from "../../store/slice-types/UserAuthenticationSliceType";
import {isUserLoggedIn} from "../../store/slice/userAuthenticationSlice";


type Props = {
    [x: string]: any;
}

const CustomRoute: React.FC<Props> = ({children}) => {
    const userAuth = useSelector<RootState, UserAuthenticationSliceType>((state) => state.userAuthentication)
    const  isAuthenticated =isUserLoggedIn().payload.isUserLoggedIn;



    return children;
}

export default CustomRoute;