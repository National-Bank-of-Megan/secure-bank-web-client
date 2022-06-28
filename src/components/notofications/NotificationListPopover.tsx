import { CompareArrows, Security } from "@mui/icons-material";
import { Box, Container, Typography } from "@mui/material";
import AccountNotification from "./AccountNotification";

const NotificationsListPopover = () => {
    return (
        <Container sx ={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: '20px',
            paddingBottom: '20px',
            rowGap: '20px'
        }}>
            <AccountNotification icon={<CompareArrows />}/>
            <AccountNotification icon={<Security />}/>
            <AccountNotification icon={<CompareArrows />}/>
            <AccountNotification icon={<Security />}/>
            <AccountNotification icon={<CompareArrows />}/>
            <AccountNotification icon={<Security />}/>
            <AccountNotification icon={<CompareArrows />}/>
            <AccountNotification icon={<Security />}/>
        </Container>
    );
}

export default NotificationsListPopover;