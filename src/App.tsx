import React from 'react';
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import Layout from "./components/layout/Layout";
import MainPage from "./pages/MainPage";
import LayoutAuthenticated from './components/layout/LayoutAuthenticated';
import {darkTheme} from "./theme";


function App() {
  return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline>
          <LayoutAuthenticated>
            <MainPage/>
          </LayoutAuthenticated>
        </CssBaseline>
      </ThemeProvider>
  );
}

export default App;

