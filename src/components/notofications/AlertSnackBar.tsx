import React from "react";
import MuiAlert, {AlertColor} from "@mui/material/Alert";
import {Snackbar} from "@mui/material";

const AlertSnackBar: React.FC<{ isOpen: boolean, handleClose: () => void, severity: AlertColor, description: string }> = ({ isOpen, handleClose, severity, description }) => {
    return (
        <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
            <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                {description}
            </MuiAlert>
        </Snackbar>
    );
}

export default AlertSnackBar;