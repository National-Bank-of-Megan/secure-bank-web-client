import {CompareArrows, Security} from "@mui/icons-material";
import {Box, Container} from "@mui/material";
import TransferNotificationClass from "../../models/TransferNotificationClass";
import { notificationType } from "../layout/Navbar";
import AccountNotification from "./AccountNotification";
import TransferNotification from "./transfer/TransferNotification";

const NotificationsListPopover: React.FC<{notifications: notificationType[]}> = ({notifications}) => {
    return (
        <Container sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: '20px',
            paddingBottom: '20px',
            rowGap: '20px'
        }}>
            {
                notifications.map((n)=>{
                switch(n.notificationType){
                    case "TRANSFER": {
                        console.log("elo")
                       return <TransferNotification
                       transferData = {n.contents as TransferNotificationClass}
                       wasViewed = {n.wasViewed}
                       />
                    }

                    default: {
                       return null;
                    }
                }
                })
            }
        </Container>
    );
}

export default NotificationsListPopover;