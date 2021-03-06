import React, {useEffect, useMemo, useState} from "react";
import {AppBar, Avatar, Badge, Box, Paper, Popover, Tabs, Toolbar, Typography} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";
import Tab from '@mui/material/Tab';
import {useLocation, useNavigate} from "react-router-dom";
import NotificationsListPopover from "../notofications/NotificationListPopover";

export default function NavbarAuthenticated() {
    const {pathname} = useLocation();
    const [currentPath, setCurrentPath] = useState(0);
    const [notificationsPopover, setNotificationsPopover] = React.useState<HTMLButtonElement | null>(null);

    const navigate = useNavigate();
    const paths = useMemo(() => ["/transfers", "/history", "/exchange", "/devices", "/account"], []);

    useEffect(() => {
        const value = paths.indexOf(pathname);
        setCurrentPath(value !== -1 ? value : 0);
    }, [pathname, paths])

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setCurrentPath(newValue);
        navigate(paths[newValue]);
    };

    const handleNotificationsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setNotificationsPopover(event.currentTarget);
    };
    
    const handleNotificationsClose = () => {
        setNotificationsPopover(null);
    };
    
    const open = Boolean(notificationsPopover);

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        National Bank of Megan
                    </Typography>
                    <Box>
                        <IconButton
                            size="large"
                            aria-label="show 4 new mails"
                            color="inherit"
                            // component={Link} to="/notifications"
                            onClick={handleNotificationsClick}
                        >
                            <Badge badgeContent={4} color="error">
                                <NotificationsIcon 
                                    fontSize="inherit"
                                />
                            </Badge>
                        </IconButton>

                        <Popover
                            id='simple-popover'
                            open={open}
                            anchorEl={notificationsPopover}
                            onClose={handleNotificationsClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            PaperProps={{
                                style: { 
                                    width: '480px',
                                    height: '500px'
                                },
                            }}
                            sx={{
                                marginLeft: '50px',
                                '*::-webkit-scrollbar': {
                                    width: '0.4em'
                                    },
                                    '*::-webkit-scrollbar-track': {
                                    '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
                                    },
                                    '*::-webkit-scrollbar-thumb': {
                                        backgroundColor: 'rgba(0,0,0,.1)',
                                        outline: '1px solid #1E1E1E'
                                    }
                            }}

                        >
                            <NotificationsListPopover />
                        </Popover>

                        <IconButton
                            size="large"
                            aria-label="show 4 new mails"
                            color="inherit"
                        >
                            <Avatar sx={{bgcolor: "primary.main", width: 34, height: 34}}><Typography
                                color="secondary.light" sx={{fontSize: '15px'}}>MT</Typography></Avatar>
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


            <Paper sx={{bgcolor: 'background.paper'}}>
                <Tabs value={currentPath} onChange={handleChange} variant="fullWidth">
                    <Tab label="Transfers"/>
                    <Tab label="History"/>
                    <Tab label="Currency"/>
                    <Tab label="Devices"/>
                    <Tab label="Account"/>
                </Tabs>
            </Paper>
        </Box>

    );
}
