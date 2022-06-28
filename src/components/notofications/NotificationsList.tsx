import { CompareArrows, Security } from "@mui/icons-material";
import { Box, Container, Typography } from "@mui/material";
import AccountNotification from "./AccountNotification";

const NotificationsList = () => {
    return (
        <Container maxWidth="md" sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '50px',
            rowGap: '20px'
        }}>
            <AccountNotification icon={<CompareArrows />}/>
            <AccountNotification icon={<Security />}/>
            <AccountNotification icon={<CompareArrows />}/>
            <AccountNotification icon={<Security />}/>
        </Container>
    );
}

export default NotificationsList;