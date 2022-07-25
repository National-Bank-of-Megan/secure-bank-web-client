import {Typography} from "@mui/material";
import NotificationsList from "../components/notofications/NotificationsList";

const NotificationsPage = () => {
    return (
        <>
            <Typography variant="h3" textAlign="center" color="primary">Notifications</Typography>
            <NotificationsList/>
        </>
    );
}

export default NotificationsPage;