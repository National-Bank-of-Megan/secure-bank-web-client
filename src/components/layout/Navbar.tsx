import React, {SyntheticEvent, useCallback, useEffect, useMemo, useState,} from "react";
import {AppBar, Avatar, Badge, Box, Button, Paper, Popover, Stack, Tabs, Toolbar, Typography,} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";
import Tab from "@mui/material/Tab";
import {useAppDispatch} from "../../hook/redux-hooks";
import {Link, useLocation, useNavigate} from "react-router-dom";
import NotificationsListPopover from "../notifications/NotificationListPopover";
import {userAuthenticationActions} from "../../store/slice/userAuthenticationSlice";
import jwt_decode from "jwt-decode";
import DecodedJWT from "../../models/decodedJWT";
import store from "../../store/store";
import {subaccountBalanceActions} from "../../store/slice/subaccountBalanceSlice";
import buttonStyles from "../../styles/ButtonStyles";
import storage from "redux-persist/es/storage";
import useCredentialsValidation from "../../hook/use-credentials-validation";
import {NOTIFICATION_EVENT_NAME, REST_PATH_TRANSFER} from "../../constants/Constants";
import TransferNotificationClass from "../../models/TransferNotificationClass";
import useRefresh from "../../hook/use-refresh";
import {AlertState} from "../notifications/AlertSnackBar";

export type NotificationType = {
    wasViewed: boolean;
    contents: Object;
    notificationType: string;
};

export default function Navbar() {

    const { isUserLoggedIn, isTokenValid, isAuthTokenValid, isRefreshTokenValid } = useCredentialsValidation();
    const { requestAuthTokenWithRefreshToken } = useRefresh();
    const {pathname} = useLocation();
    const [currentPath, setCurrentPath] = useState<number>(0);
    const [notificationsPopover, setNotificationsPopover] =
        React.useState<HTMLButtonElement | null>(null);

    const navigate = useNavigate();
    const paths = useMemo(
        () => ["/transfers", "/history", "/exchange", "/devices", "/account"],
        []
    );

    const [notifications, setNotifications] = useState<NotificationType[]>([]);
    const [newNotificationsCounter, setNewNotificationsCounter] = useState<number>(0);
    const dispatch = useAppDispatch();

    const subscribeToNotifications = useCallback(async () => {
        console.log("== SUBSCRIBING TO NOTIFICATIONS ==");
        
        let authToken = store.getState().userAuthentication.authToken;
        if (!isTokenValid(authToken) && isRefreshTokenValid()) {
            authToken = await requestAuthTokenWithRefreshToken();
        }

        console.log("Auth token sent with subscribe request is " + authToken);
        
        const eventSource = new EventSource(REST_PATH_TRANSFER + "/notification/subscribe?jwt=" + authToken);

        eventSource.addEventListener(NOTIFICATION_EVENT_NAME, (event: MessageEvent) => {
            console.log("Notification received");

            const data = JSON.parse(event.data);

            const receivedTransferNotification = new TransferNotificationClass(data.title, data.senderFirstName,
                data.senderLastName, data.amount, data.currency, new Date(data.arrivalDate));

            setNotifications(previousNotifications => {
                return [{
                    wasViewed: false,
                    notificationType: "TRANSFER",
                    contents: receivedTransferNotification
                }, ...previousNotifications];
            });

            dispatch(subaccountBalanceActions.addToBalance({currency: data.currency, amount: data.amount}));
            setNewNotificationsCounter((previousCounterValue) => previousCounterValue + 1);
        });

        eventSource.onopen = (event) => {
            console.log("Connection to API notifications is open");
            if (!isUserLoggedIn()) {
                const loginPageUrl = '/login';
                const sessionExpiredAlertState: AlertState = {
                    isOpen: true,
                    message: 'Your session has expired, please log in again'
                }
                navigate(loginPageUrl, { state: sessionExpiredAlertState });
            }
        }

        eventSource.onerror = (event: Event) => {
            console.log("Error occurred while connecting to " + REST_PATH_TRANSFER + "/notification/subscribe. Closing connection");
            eventSource.close();
            // TODO: consider trying to reconnect (idk if retrying to connect a is built-in functionality or not)
        }
    }, [dispatch, isRefreshTokenValid, isTokenValid, isUserLoggedIn, navigate, requestAuthTokenWithRefreshToken]);

    useEffect(() => {
        const value = paths.indexOf(pathname);
        setCurrentPath(value);
    }, [pathname, paths, setCurrentPath]);

    useEffect(() => {
        if (isUserLoggedIn()) {
            subscribeToNotifications();
        }
    }, [isUserLoggedIn, subscribeToNotifications]);

    const decrementNotificationCounter = () => {
        setNewNotificationsCounter(newNotificationsCounter - 1);
    };

    const getUserInitials = () => {
        return isUserLoggedIn()
            ? jwt_decode<DecodedJWT>(
                store.getState().userAuthentication.authToken!
            ).firstName.charAt(0) +
            jwt_decode<DecodedJWT>(
                store.getState().userAuthentication.authToken!
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
        storage.removeItem("persist: persist-key").then(r => navigate("/login", {replace: true}));
    };

    const open = Boolean(notificationsPopover);

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        National Bank of Megan
                    </Typography>
                    {isUserLoggedIn() && (
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


                            <Link to="/account" style={{textDecoration: 'none'}}>
                                <IconButton
                                    size="large"
                                    color="inherit"
                                >
                                    <Avatar sx={{bgcolor: "primary.main", width: 34, height: 34}}>
                                        <Typography color="secondary.light" sx={{fontSize: "15px"}}>
                                            {getUserInitials()}
                                        </Typography>
                                    </Avatar>
                                </IconButton>
                            </Link>

                            <IconButton size="large" color="inherit" onClick={handleLogout}>
                                <LogoutIcon fontSize="inherit"/>
                            </IconButton>
                        </Box>
                    )}
                    {!isUserLoggedIn() && (
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

            {isUserLoggedIn() && (
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
