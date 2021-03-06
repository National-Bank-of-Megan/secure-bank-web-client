import React from "react";
import {CssBaseline, ThemeProvider} from "@mui/material";
import MainPage from "./pages/MainPage";
import LayoutAuthenticated from "./components/layout/LayoutAuthenticated";
import {darkTheme} from "./theme";
import {Route, Routes} from "react-router-dom";
import TransferPage from "./pages/TransfersPage";
import CurrencyExchangePage from "./pages/CurrencyExchangePage";
import HistoryPage from "./pages/HistoryPage";
import AccountPage from "./pages/AccountPage";
import DevicesPage from "./pages/DevicesPage";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import {AuthContextProvider} from "./store/auth-context";
import SuccessfulRegistrationPage from "./pages/SuccessfulRegistrationPage";
import DeviceVerificationPage from "./pages/DeviceVerificationPage";

function App() {
  return (
    <AuthContextProvider>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline>
          <LayoutAuthenticated>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/login" element={<LoginPage/>}/>
              <Route path="/login/verify" element={<DeviceVerificationPage/>}/>
              <Route path="/signup" element={<RegistrationPage/>}/>
              <Route path="/signup/success" element={<SuccessfulRegistrationPage />}/>
              <Route path="/transfers" element={<TransferPage />} />
              <Route path="/exchange" element={<CurrencyExchangePage/>}/>
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/account" element={<AccountPage/>}/>
              <Route path="/devices" element={<DevicesPage/>}/>
            </Routes>
          </LayoutAuthenticated>
        </CssBaseline>
      </ThemeProvider>
    </AuthContextProvider>
  );
}

export default App;
