import {AppBar, Box, Button, Toolbar, Typography,} from "@mui/material";
import buttonStyles from "../../styles/ButtonStyles";


export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            National Bank of Megan
          </Typography>
          <Button sx={buttonStyles} variant="outlined">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
