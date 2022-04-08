import logo from './logo.svg';
import './App.css';
import Layout from "./components/layout/Layout";
import {ThemeProvider} from "@emotion/react";
import {createTheme} from "@mui/material";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});


function App() {
  return (
      <ThemeProvider theme={darkTheme}>
      <Layout>
    <div className="App">
     <h1>National Bank of Megan</h1>
      <p>We have your money</p>
    </div>
      </Layout>
      </ThemeProvider>
  );
}

export default App;
