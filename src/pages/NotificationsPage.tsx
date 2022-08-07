import {Typography} from "@mui/material";
import NotificationsList from "../components/notifications/NotificationsList";

const NotificationsPage = () => {
    return (
        <>
            <Typography variant="h3" textAlign="center" color="primary">Notifications</Typography>
            <NotificationsList/>
        </>
    );
}

export default NotificationsPage;