import MuiAlert from "@mui/material/Alert";
import {Snackbar} from "@mui/material";
import React, {Dispatch, SetStateAction} from "react";

// useState datatype
interface IUseStateProps {
    state: boolean;
    setState?: Dispatch<SetStateAction<boolean>>;
}

const ErrorNotification: React.FC<{ errorState: IUseStateProps, errorMessage: string }> = ({
                                                                                               errorState,
                                                                                               errorMessage
                                                                                           }) => {

    const handlePopUpClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        errorState.setState!(false);
    };
    return (
        <Snackbar open={errorState.state} autoHideDuration={6000} onClose={handlePopUpClose}>
            <MuiAlert elevation={6} variant="filled" onClose={handlePopUpClose} severity="error"
                      sx={{width: '100%'}}>
                {errorMessage}
            </MuiAlert>
        </Snackbar>
    )
}

export default ErrorNotification;