import React, {SyntheticEvent, useEffect, useMemo, useState,} from "react";
import {AppBar, Avatar, Badge, Box, Button, Paper, Popover, Stack, Tabs, Toolbar, Typography,} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";
import Tab from "@mui/material/Tab";
import {useLocation, useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../hook/redux-hooks";
import NotificationsListPopover from "../notifications/NotificationListPopover";
import {userAuthenticationActions} from "../../store/slice/userAuthenticationSlice";
import UserAuthenticationService from "../../store/service/UserAuthenticationService";
import jwt_decode from "jwt-decode";
import DecodedJWT from "../../models/decodedJWT";
import store from "../../store/store";
import {subaccountBalanceActions} from "../../store/slice/subaccountBalanceSlice";
import buttonStyles from "../../styles/ButtonStyles";
import {REST_PATH_TRANSFER} from "../../constants/Constants";
import TransferNotificationClass from "../../models/TransferNotificationClass";
import Decimal from "decimal.js";
import storage from "redux-persist/es/storage";
import useRefreshToken from "../../hook/use-refresh";

export type notificationType = {
    wasViewed: boolean;
    contents: Object;
    notificationType: string;
};

export default function Navbar() {
    const isAuthenticated = UserAuthenticationService.isUserLoggedIn();
    const {pathname} = useLocation();
    const [currentPath, setCurrentPath] = useState<number>(0);
    const [notificationsPopover, setNotificationsPopover] =
        React.useState<HTMLButtonElement | null>(null);

    const navigate = useNavigate();
    const paths = useMemo(
        () => ["/transfers", "/history", "/exchange", "/devices", "/account"],
        []
    );

    const [notifications, setNotifications] = useState<notificationType[]>([]);
    const [newNotificationsCounter, setNewNotificationsCounter] =
        useState<number>(0);
    const dispatch = useAppDispatch();
    const {requestAuthTokenWithRefreshToken} = useRefreshToken();

    const subscribe =async () => {
        let req = ''
        let sse: EventSource | null = null;
        console.log("== SUBSCRIBING TO NOTIFICATIONS ==");
        let isAccessTokenValid =
            UserAuthenticationService.isTokenValid("accessToken");
        let isRefreshTokenValid =
            UserAuthenticationService.isTokenValid("refreshToken");

        if (isRefreshTokenValid && !isAccessTokenValid) {
            let jwt = await requestAuthTokenWithRefreshToken();
            req = REST_PATH_TRANSFER +
                "/notification/subscribe?jwt=" + store.getState().userAuthentication.authTokens.accessToken;
            sse = new EventSource(req);
        } else {
            req = REST_PATH_TRANSFER +
                "/notification/subscribe?jwt=" +
                store.getState().userAuthentication.authTokens.accessToken!
            sse = new EventSource(req);
        }

        sse!.addEventListener("TRANSFER_NOTIFICATION", (event) => {
            console.log("== NEW TRANSFER NOTIFICATION RECEIVED ==");
            console.log(event);

            let messageEvent = event as MessageEvent;
            let data = JSON.parse(messageEvent.data);
            notifications.push({
                wasViewed: false,
                notificationType: "TRANSFER",
                contents: new TransferNotificationClass(
                    data.title,
                    data.senderFirstname,
                    data.senderLastname,
                    data.amount,
                    data.currency,
                    new Date()
                ),
            });
            dispatch(subaccountBalanceActions.addToBalance({currency : data.currency, amount : data.amount}))
            setNewNotificationsCounter(newNotificationsCounter + 1);

        });

        sse!.addEventListener("open", (event) => {
            console.log("== CONNECTION OPENED ==");
        });

        sse!.onerror=function (event) {
            console.log("== ERROR ==")
            sse!.close()
            subscribe()
        };
    };

    useEffect(() => {
        const value = paths.indexOf(pathname);
        setCurrentPath(value);
        if (UserAuthenticationService.isUserLoggedIn()) subscribe();
    }, [pathname, paths, setCurrentPath, subscribe]);

    const decrementNotificationCounter = () => {
        setNewNotificationsCounter(newNotificationsCounter - 1);
    };

    const getUserInitials = () => {
        return UserAuthenticationService.isUserLoggedIn()
            ? jwt_decode<DecodedJWT>(
                store.getState().userAuthentication.authTokens.accessToken!
            ).firstName.charAt(0) +
            jwt_decode<DecodedJWT>(
                store.getState().userAuthentication.authTokens.accessToken!
            ).lastName.charAt(0)
            : "";
    };

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setCurrentPath(newValue);
        navigate(paths[newValue]);
    };

    const handleNotificationsClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        setNotificationsPopover(event.currentTarget);
    };

    const handleNotificationsClose = () => {
        setNotificationsPopover(null);
    };

    const handleLogout = (e: SyntheticEvent) => {
        dispatch(subaccountBalanceActions.setSubaccountsBalance([]));
        dispatch(userAuthenticationActions.clearAuthentication());
        storage.removeItem("persist: persist-key");
        navigate("/login", {replace: true});
    };

    const open = Boolean(notificationsPopover);

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        National Bank of Megan
                    </Typography>
                    {isAuthenticated && (
                        <Box>
                            <IconButton
                                size="large"
                                aria-label="show 4 new mails"
                                color="inherit"
                                // component={Link} to="/notifications"
                                onClick={handleNotificationsClick}
                            >
                                <Badge badgeContent={newNotificationsCounter} color="error">
                                    <NotificationsIcon fontSize="inherit"/>
                                </Badge>
                            </IconButton>

                            <Popover
                                id="simple-popover"
                                open={open}
                                anchorEl={notificationsPopover}
                                onClose={handleNotificationsClose}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "left",
                                }}
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                PaperProps={{
                                    style: {
                                        width: "480px",
                                        height: "500px",
                                    },
                                }}
                                sx={{
                                    marginLeft: "50px",
                                    "*::-webkit-scrollbar": {
                                        width: "0.4em",
                                    },
                                    "*::-webkit-scrollbar-track": {
                                        "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
                                    },
                                    "*::-webkit-scrollbar-thumb": {
                                        backgroundColor: "rgba(0,0,0,.1)",
                                        outline: "1px solid #1E1E1E",
                                    },
                                }}
                            >
                                <NotificationsListPopover
                                    notifications={notifications}
                                    decrementNotificationCounter={decrementNotificationCounter}
                                />
                            </Popover>

                            <IconButton
                                size="large"
                                aria-label="show 4 new mails"
                                color="inherit"
                            >
                                <Avatar sx={{bgcolor: "primary.main", width: 34, height: 34}}>
                                    <Typography color="secondary.light" sx={{fontSize: "15px"}}>
                                        {getUserInitials()}
                                    </Typography>
                                </Avatar>
                            </IconButton>

                            <IconButton size="large" color="inherit" onClick={handleLogout}>
                                <LogoutIcon fontSize="inherit"/>
                            </IconButton>
                        </Box>
                    )}
                    {!isAuthenticated && (
                        <Stack direction="row" spacing={2}>
                            <Button
                                variant="outlined"
                                color="success"
                                size="large"
                                onClick={() => navigate("/signup", {replace: true})}
                            >
                                Register
                            </Button>
                            <Button
                                sx={buttonStyles}
                                variant="outlined"
                                size="large"
                                onClick={() => navigate("/login", {replace: true})}
                            >
                                Login
                            </Button>
                        </Stack>
                    )}
                </Toolbar>
            </AppBar>

            {isAuthenticated && (
                <Paper sx={{bgcolor: "background.paper"}}>
                    <Tabs value={currentPath} onChange={handleChange} variant="fullWidth">
                        <Tab label="Transfers"/>
                        <Tab label="History"/>
                        <Tab label="Currency"/>
                        <Tab label="Devices"/>
                        <Tab label="Account"/>
                    </Tabs>
                </Paper>
            )}
        </Box>
    );
}
