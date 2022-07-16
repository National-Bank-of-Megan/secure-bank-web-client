import {Box, SvgIconProps, Typography} from "@mui/material";

const AccountNotification: React.FC<{ icon: React.ReactElement<SvgIconProps> }> = (props) => {
    return (
        <Box sx={{
            display: 'flex',
            columnGap: '30px'
        }}>
            {props.icon}
            <Box sx={{
                display: 'flex',
                flexDirection: 'column'
            }}>
                <Typography>Your password has been changed. If it wasn't you, contact us immediately. Your password has been changed. If it wasn't you, contact us immediately.</Typography>
                <Typography color="text.secondary" sx={{
                    fontWeight: "500",
                    fontSize: "14px"
                }}>01.01.2000 14:59, 2 hours ago</Typography>
            </Box>
        </Box>
    );
}

export default AccountNotification;