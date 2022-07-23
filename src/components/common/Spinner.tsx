import {Backdrop, CircularProgress} from "@mui/material";
import React from "react";

const Spinner: React.FC<{ isLoading: boolean }> = ({isLoading}) => {

    return (
        <Backdrop
            sx={{color: 'primary.main', zIndex: (theme) => theme.zIndex.drawer + 1}}
            open={isLoading}
        >
            <CircularProgress color="inherit"/>
        </Backdrop>
    );
}
export default Spinner;