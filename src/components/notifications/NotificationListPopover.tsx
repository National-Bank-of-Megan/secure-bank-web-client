import {Container} from "@mui/material";
import {NotificationType} from "../layout/Navbar";
import TransferNotification from "./transfer/TransferNotification";

const NotificationsListPopover: React.FC<{ notifications: NotificationType[], decrementNotificationCounter: () => void }> = ({
                                                                                                                                 decrementNotificationCounter,
                                                                                                                                 notifications
                                                                                                                             }) => {
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
                notifications.map((n) => {
                    switch (n.notificationType) {
                        case "TRANSFER": {
                            return <TransferNotification
                                transferData={n}
                                decrementNotificationCounter={decrementNotificationCounter}
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