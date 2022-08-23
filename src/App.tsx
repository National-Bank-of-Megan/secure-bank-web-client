import React from "react";
import {CssBaseline, ThemeProvider} from "@mui/material";
import MainPage from "./pages/MainPage";
import Layout from "./components/layout/Layout";
import {darkTheme} from "./theme";
import {Navigate, Route, Routes} from "react-router-dom";
import TransferPage from "./pages/TransfersPage";
import CurrencyExchangePage from "./pages/CurrencyExchangePage";
import HistoryPage from "./pages/HistoryPage";
import AccountPage from "./pages/AccountPage";
import DevicesPage from "./pages/DevicesPage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import SuccessfulRegistrationPage from "./pages/SuccessfulRegistrationPage";
import DeviceVerificationPage from "./pages/DeviceVerificationPage";
import PrivateRoute from "./components/auth/PrivateRoute";
import CustomRoute from "./components/auth/CustomRoute";

import ChangePasswordPage from "./pages/ChangePasswordPage";
import UserAuthenticationService from "./store/service/UserAuthenticationService";


function App() {

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline>
                <Layout>
                    <Routes>
                        <Route path="/" element={<CustomRoute><MainPage/></CustomRoute>}/>
                        <Route path="/signup" element={<CustomRoute><RegistrationPage/></CustomRoute>}/>
                        <Route path="/signup/success"
                               element={<CustomRoute><SuccessfulRegistrationPage/></CustomRoute>}/>
                        {!UserAuthenticationService. &&
                            <>
                                <Route path="/login" element={<LoginPage/>}/>
                                <Route path="/login/verify" element={<DeviceVerificationPage/>}/>
                            </>
                        }
                        <Route path="/transfers" element={<PrivateRoute><TransferPage/></PrivateRoute>}/>
                        <Route path="/exchange" element={<PrivateRoute><CurrencyExchangePage/></PrivateRoute>}/>
                        <Route path="/history" element={<PrivateRoute><HistoryPage/></PrivateRoute>}/>
                        <Route path="/account" element={<PrivateRoute><AccountPage/></PrivateRoute>}/>
                        <Route path="/devices" element={<PrivateRoute><DevicesPage/></PrivateRoute>}/>
                        <Route path="/account/changePassword" element={<PrivateRoute><ChangePasswordPage/></PrivateRoute>}/>
                        <Route path='*' element={<Navigate to="/"/>}/>
                    </Routes>
                </Layout>
            </CssBaseline>
        </ThemeProvider>
    );
}

export default App;
