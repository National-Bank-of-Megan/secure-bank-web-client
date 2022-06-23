import { createTheme } from "@mui/material";

export const darkTheme = createTheme({
  typography: {
    fontFamily: ["Roboto", "sans-serif"].join(","),
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#007AFF",
    },
   
      
    // }
  },
});
