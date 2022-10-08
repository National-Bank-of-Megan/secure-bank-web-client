import {Box, Button, Divider, FormHelperText, Stack, Typography} from "@mui/material";
import ButtonStyles from "../styles/ButtonStyles";
import AccountInfo from "../components/account/AccountInfo";
import {Link, useLocation} from "react-router-dom";
import AlertSnackBar, {AlertState} from "../components/notifications/AlertSnackBar";
import React, {useState} from "react";


//todo refactor
const AccountPage = () => {
    const location = useLocation();

    const [passwordChangedAlertState, setPasswordChangedAlertState] = useState<AlertState>({
        isOpen: true,
        message: "Password successfully changed"
    });

    const changedPasswordInfo = location.state as boolean;
    // const [errorAlertState, setErrorAlertState] = useState<AlertState>({
    //     isOpen: false,
    //     message: ''
    // });
    //
    // useEffect(() => {
    //     const changedPasswordInfo = location.state as AlertState;
    //     if (!!changedPasswordInfo) {
    //         setErrorAlertState({
    //             isOpen: changedPasswordInfo.isOpen,
    //             message: changedPasswordInfo.message
    //         });
    //     }
    // }, [location.state]);

    return (
        <>
            {changedPasswordInfo && <AlertSnackBar
                alertState={{"state": passwordChangedAlertState, "setState": setPasswordChangedAlertState}}
                severity="success"/>}
            <Stack spacing={5}>

                <AccountInfo/>

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
                        <Button component={Link} to="changePassword" variant="outlined" color="error">
                            Change password
                        </Button>
                    </Box>

                </Stack>
            </Stack>
        </>
    )

}

export default AccountPage;