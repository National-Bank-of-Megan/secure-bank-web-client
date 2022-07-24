import React, {useContext, useEffect, useLayoutEffect} from "react";
import {CssBaseline, ThemeProvider} from "@mui/material";
import MainPage from "./pages/MainPage";
import Layout from "./components/layout/Layout";
import {darkTheme} from "./theme";
import {Route, Navigate, Routes, useLocation} from "react-router-dom";
import TransferPage from "./pages/TransfersPage";
import CurrencyExchangePage from "./pages/CurrencyExchangePage";
import HistoryPage from "./pages/HistoryPage";
import AccountPage from "./pages/AccountPage";
import DevicesPage from "./pages/DevicesPage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import AuthContext from "./store/auth-context";
import SuccessfulRegistrationPage from "./pages/SuccessfulRegistrationPage";
import DeviceVerificationPage from "./pages/DeviceVerificationPage";
import PrivateRoute from "./components/auth/PrivateRoute";
import useRefreshToken from "./hook/use-refresh";
import CustomRoute from "./components/auth/CustomRoute";

function App() {
  const authCtx = useContext(AuthContext);
  const { requestAuthTokenWithRefreshToken } = useRefreshToken();
  let location = useLocation();

  // useLayoutEffect(() => { // nie do końca poprawne, trzeba to robić przed renderem strony, a nie po...
  //   console.log("App useEffect!");
  //   const authTokenExpired = authCtx.removeAuthTokenIfExpired();
  //   const refreshTokenExpired = authCtx.removeRefreshTokenIfExpired();
  //   let isLoggedIn = !authTokenExpired;
  //
  //   if (!isLoggedIn && !refreshTokenExpired) {
  //     try {
  //       requestAuthTokenWithRefreshToken();
  //     } catch (error: any) {
  //       console.log("Something went wrong - " + error.msg);
  //     }
  //   }
  // }, [authCtx, location, requestAuthTokenWithRefreshToken]);

  return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline>
          <Layout>
            <Routes>
              <Route path="/" element={<CustomRoute><MainPage /></CustomRoute>} />
              <Route path="/signup" element={<CustomRoute><RegistrationPage/></CustomRoute>}/>
              <Route path="/signup/success" element={<CustomRoute><SuccessfulRegistrationPage /></CustomRoute>}/>
              {!authCtx.isLoggedIn() &&
                <>
                  <Route path="/login" element={<LoginPage/>}/>
                  <Route path="/login/verify" element={<DeviceVerificationPage/>}/>
                </>
              }
              <Route path="/transfers" element={<PrivateRoute><TransferPage /></PrivateRoute>}/>
              <Route path="/exchange" element={<PrivateRoute><CurrencyExchangePage/></PrivateRoute>}/>
              <Route path="/history" element={<PrivateRoute><HistoryPage /></PrivateRoute>} />
              <Route path="/account" element={<PrivateRoute><AccountPage/></PrivateRoute>}/>
              <Route path="/devices" element={<PrivateRoute><DevicesPage/></PrivateRoute>}/>
              <Route path='*' element={<Navigate to="/"/>} />
            </Routes>
          </Layout>
        </CssBaseline>
      </ThemeProvider>
  );
}

export default App;
