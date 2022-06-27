import React from "react";
import { AppBar, Box, Button, Paper, Tabs, Toolbar, Typography } from "@mui/material";
import { Avatar } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";
import { MenuItem } from "@mui/material";
import { Badge } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import Tab from '@mui/material/Tab';
import {useNavigate , Link} from "react-router-dom";

export default function NavbarAuthenticated() {
    const [value, setValue] = React.useState(0);
    // const navigate = useNavigate();

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            National Bank of Megan
          </Typography>
          <Box>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={4} color="error">
                <NotificationsIcon fontSize="inherit"/>
              </Badge>
            </IconButton>

            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Avatar  sx={{ bgcolor: "primary.main", width: 34, height: 34 }}><Typography color="secondary.light" sx={{ fontSize: '15px' }}>MT</Typography></Avatar>
            </IconButton>

            <IconButton
              size="large"
              color="inherit"
            >
              <LogoutIcon fontSize="inherit"/>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    
        
        <Paper  sx={{bgcolor: 'background.paper' }}>
      <Tabs value={value} onChange={handleChange} variant="fullWidth" >
    //   todo stworzyc slownik z nazwa i linkiem do strony zamiast recznie
        <Tab label="Transfers" component={Link} to={`/transfers`} />
        <Tab label="History" component={Link} to={`/history`}  />
        <Tab label="Currency" component={Link} to={`/exchange`}  />
        <Tab label="Devices" component={Link} to={`/devices`}  />
        <Tab label="Account" component={Link} to={`/account`}  />
      </Tabs>
      </Paper>
    </Box>
   
  );
}
