import React from "react";
import MuiAlert, {AlertColor} from "@mui/material/Alert";
import {Snackbar} from "@mui/material";
import {UseStateType} from "../../models/custom-types/UseStateType";

export type AlertState = {
    isOpen: boolean;
    message: string;
}

const AlertSnackBar: React.FC<{ alertState: UseStateType<AlertState>, severity: AlertColor }> =
                              ({alertState, severity}) => {

    const handlePopUpClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        alertState.setState!({
            isOpen: false,
            message: ''
        });
    };

    return (
        <Snackbar open={alertState.state.isOpen} autoHideDuration={6000} onClose={handlePopUpClose}>
            <MuiAlert elevation={6} variant="filled" onClose={handlePopUpClose} severity={severity}
                      sx={{width: '100%'}}>
                {alertState.state.message}
            </MuiAlert>
        </Snackbar>
    );
}

export default AlertSnackBar;