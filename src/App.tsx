import React from 'react';
import logo from './logo.svg';
import './App.css';
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import Layout from "./components/layout/Layout";
import MainPage from "./pages/MainPage";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary :{
      main : "#007AFF"
    }



  },
});

function App() {
  return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline>
          <Layout>
            <MainPage/>
          </Layout>
        </CssBaseline>
      </ThemeProvider>
  );
}

export default App;

