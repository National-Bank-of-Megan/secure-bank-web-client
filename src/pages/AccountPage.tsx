import {Avatar, Box, Button, Divider, FormHelperText, Grid, Stack, Typography} from "@mui/material";
import ButtonStyles from "../styles/ButtonStyles";

//todo refactor
const AccountPage = () => {

    return (
        <Stack spacing={5}>
            <Grid container sx={{display: 'flex'}}>
                <Grid item xs={4}>
                    <Avatar
                        sx={{
                            bgcolor: 'primary.main',
                            color: 'white',
                            width: 320,
                            height: 320,
                            fontSize: 96
                        }}>OP</Avatar>
                </Grid>
                <Grid container item xs={8} sx={{
                    alignContent: 'center'
                }}>
                    <Stack sx={{width: '70%'}} spacing={6}>
                        <Box sx={{display: 'flex'}}>
                            <Typography sx={{width: '50%'}} variant="body1">Account number</Typography>
                            <Typography sx={{width: '50%'}} variant="body1">PL10 1050 0099 7603 1234 5678
                                9123</Typography>
                        </Box>
                        <Box sx={{display: 'flex'}}>
                            <Typography sx={{width: '50%'}} variant="body1">First name</Typography>
                            <Typography sx={{width: '50%'}} variant="body1">Jane</Typography>
                        </Box>
                        <Box sx={{display: 'flex'}}>
                            <Typography sx={{width: '50%'}} variant="body1">Last name</Typography>
                            <Typography sx={{width: '50%'}} variant="body1">Doe</Typography>
                        </Box>
                        <Box sx={{display: 'flex'}}>
                            <Typography sx={{width: '50%'}} variant="body1">Email</Typography>
                            <Typography sx={{width: '50%'}} variant="body1">janedoe@email.com</Typography>
                        </Box>
                        <Box sx={{display: 'flex'}}>
                            <Typography sx={{width: '50%'}} variant="body1">Phone number</Typography>
                            <Typography sx={{width: '50%'}} variant="body1">111 111 111</Typography>
                        </Box>
                    </Stack>
                </Grid>
            </Grid>
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