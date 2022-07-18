import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {Box, Button, Stack, Typography} from '@mui/material';
import {SuccessfulRegistration} from "./IdentificationForm";
import React from "react";
import {Link} from "react-router-dom";

const RegistrationSuccess: React.FC<{ registrationResponseData: SuccessfulRegistration }> = ({ registrationResponseData }) => {

    return (
        <Box marginTop="50px">
            <Stack spacing={2} textAlign="center" sx={{
                alignItems: 'center'
            }}>
                <CheckCircleOutlineIcon color="success" sx={{ fontSize: "64px" }} />
                <Typography variant="body1">
                    Successfully registered your account.
                </Typography>
                <Typography variant="body1">
                    Your client id is
                </Typography>
                <Typography variant="h2" letterSpacing="0.2em" color="primary.main">
                    {registrationResponseData.clientId}
                </Typography>
                <Button component={Link} to="/login" sx={{width: "350px"}} variant="contained" size="large">
                    Log in
                </Button>
            </Stack>
        </Box>
    );
}

export default RegistrationSuccess;