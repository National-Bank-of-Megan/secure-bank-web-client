import {Avatar, Box, Button, Divider, FormHelperText, Grid, Stack, Typography} from "@mui/material";
import ButtonStyles from "../styles/ButtonStyles";
import AccountInfo from "../components/account/AccountInfo";

//todo refactor
const AccountPage = () => {

    return (
        <Stack spacing={5}>

            <AccountInfo />

            <Divider sx={{backgroundColor: 'primary.main'}}/>
            <Stack spacing={3}>
                <Typography
                    variant="h2"
                    color="primary.main"
                >
                    Account options
                </Typography>
                <Box>
                    <Button sx={ButtonStyles} variant="outlined" size="large">
                        Change email
                    </Button>
                    <FormHelperText>We’ll send you a link to your current email address.</FormHelperText>
                </Box>
                <Box>
                    <Button variant="outlined" color="error">
                        change password
                    </Button>
                    <FormHelperText>You can change your password only once every 24 hours.</FormHelperText>
                </Box>

            </Stack>
        </Stack>
    )

}

export default AccountPage;