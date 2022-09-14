import React from "react";

import UserAuthenticationService from "../../store/service/UserAuthenticationService";
import useRefreshToken from "../../hook/use-refresh";
import { useAppDispatch } from "../../hook/redux-hooks";
import { subaccountBalanceActions } from "../../store/slice/subaccountBalanceSlice";
import { useNavigate } from "react-router-dom";
import storage from "redux-persist/es/storage";
import { userAuthenticationActions } from "../../store/slice/userAuthenticationSlice";

type Props = {
  [x: string]: any;
};

const CustomRoute: React.FC<Props> = ({ children }) => {
  const { requestAuthTokenWithRefreshToken } = useRefreshToken();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (
    !UserAuthenticationService.isTokenValid("refreshToken") &&
    UserAuthenticationService.isTokenValid("accessToken")
  ) {
    dispatch(subaccountBalanceActions.setSubaccountsBalance([]));
    dispatch(userAuthenticationActions.clearAuthentication());
    storage.removeItem("persist: persist-key");
    navigate("/login");
  }
  if (
    !UserAuthenticationService.isUserLoggedIn() &&
    UserAuthenticationService.isTokenValid("refreshToken")
  ) {
    try {
      requestAuthTokenWithRefreshToken();
    } catch (error: any) {
      console.log("Something went wrong - " + error.msg);
    }
  }

  return children;
};

export default CustomRoute;
