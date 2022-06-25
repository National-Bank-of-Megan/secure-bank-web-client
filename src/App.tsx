import React from "react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Layout from "./components/layout/Layout";
import MainPage from "./pages/MainPage";
import LayoutAuthenticated from "./components/layout/LayoutAuthenticated";
import { darkTheme } from "./theme";
import { Route, Routes } from "react-router-dom";
import TransferPage from "./pages/TransfersPage";
import { CurrencyExchange } from "@mui/icons-material";
import CurrencyExchangePage from "./pages/CurrencyExchangePage";
import HistoryPage from "./pages/HistoryPage";
import AccountPage from "./pages/AccountPage";

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline>
        <LayoutAuthenticated>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/transfers" element={<TransferPage />} />
            <Route path="/exchange" element={<CurrencyExchangePage/>}/>
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/account" element={<AccountPage/>}/>
          </Routes>
        </LayoutAuthenticated>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
