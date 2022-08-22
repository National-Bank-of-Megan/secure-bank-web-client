import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {Button, Grid, IconButton, Stack, Typography} from '@mui/material';
import React, {useState} from "react";
import {Link} from "react-router-dom";
import {ContentCopy} from "@mui/icons-material";
import AlertSnackBar, {AlertState} from "../notifications/AlertSnackBar";
import {SuccessfulRegistrationType} from "../../models/custom-types/SuccessfulRegistrationType";

const RegistrationSuccess: React.FC<{ registrationResponseData: SuccessfulRegistrationType }> = ({registrationResponseData}) => {
    const [successAlertState, setSuccessAlertState] = useState<AlertState>({
        isOpen: false,
        message: ''
    });

    const handleCopyClicked = () => {
        navigator.clipboard.writeText(registrationResponseData.clientId);
        setSuccessAlertState({
            isOpen: true,
            message: "ID copied!"
        });
    }

    return (
        <>
            <AlertSnackBar alertState={{"state": successAlertState, "setState": setSuccessAlertState}} severity="success" />
            <Grid container marginTop="50px" gap={-2}>
                <Grid item xs={6} pl="50px">
                    <Stack textAlign="center" height='100%' sx={{
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <CheckCircleOutlineIcon color="success" sx={{fontSize: "64px"}}/>
                        <Typography variant="body1">
                            Successfully registered your account.
                        </Typography>
                        <Typography variant="body1">
                            Your client id is
                        </Typography>
                        <Stack direction="row" alignItems="center">
                            <Typography variant="h2" letterSpacing="0.1em" color="primary.main">
                                {registrationResponseData.clientId}
                            </Typography>
                            <IconButton sx={{
                                marginLeft: '-8px'
                            }}>
                                <ContentCopy color="primary" sx={{fontSize: "25px"}} onClick={handleCopyClicked}/>
                            </IconButton>
                        </Stack>
                        <Button component={Link} to="/login" sx={{width: "350px"}} variant="contained" size="large">
                            Log in
                        </Button>
                    </Stack>
                </Grid>
                <Grid item xs={6} pr="50px">
                    <Stack spacing={2} textAlign="center" sx={{
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <img src={registrationResponseData.qr} width="300px" height="300px" style={{
                            borderRadius: '24px'
                        }}/>
                        <Typography variant="body1">
                            Scan the above QR code in your Google Authenticator app.
                        </Typography>
                    </Stack>
                </Grid>
            </Grid>
        </>
    );
}

export default RegistrationSuccess;