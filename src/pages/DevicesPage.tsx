import DevicesPageInformation from "../components/devices/DevicesPageInformation";
import {Grid} from "@mui/material";
import DevicesTable from "../components/devices/DevicesTable";
import React, {useState} from "react";
import AlertSnackBar, {AlertState} from "../components/notifications/AlertSnackBar";

const DevicesPage = () => {
    const [successAlertState, setSuccessAlertState] = useState<AlertState>({
        isOpen: false,
        message: ''
    });
    const [errorAlertState, setErrorAlertState] = useState<AlertState>({
        isOpen: false,
        message: ''
    });

    return (
        <>
            <AlertSnackBar alertState={{"state": errorAlertState, "setState": setErrorAlertState}}
                               severity="error"/>
            <AlertSnackBar alertState={{"state": successAlertState, "setState": setSuccessAlertState}}
                           severity="success"/>
            <Grid container gap={5}>
                <DevicesPageInformation/>
                <DevicesTable setErrorAlertState={setErrorAlertState} setSuccessAlertState={setSuccessAlertState}/>
            </Grid>
        </>
    )
}

export default DevicesPage;