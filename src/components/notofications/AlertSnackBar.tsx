import React, {Dispatch, SetStateAction} from "react";
import MuiAlert, {AlertColor} from "@mui/material/Alert";
import {Snackbar} from "@mui/material";

// useState datatype
interface IUseStateProps {
    state: boolean;
    setState?: Dispatch<SetStateAction<boolean>>;
}

const AlertSnackBar: React.FC<{ alertState: IUseStateProps, message: string, severity: AlertColor }> = ({
                                                                                                            alertState,
                                                                                                            message,
                                                                                                            severity
                                                                                                        }) => {

    const handlePopUpClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        alertState.setState!(false);
    };

    return (
        <Snackbar open={alertState.state} autoHideDuration={6000} onClose={handlePopUpClose}>
            <MuiAlert elevation={6} variant="filled" onClose={handlePopUpClose} severity={severity}
                      sx={{width: '100%'}}>
                {message}
            </MuiAlert>
        </Snackbar>
    );
}

export default AlertSnackBar;