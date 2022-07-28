import {Backdrop, CircularProgress} from "@mui/material";
import React from "react";

const Spinner: React.FC<{ isLoading: boolean, zIndex?: number }> = ({isLoading, zIndex}) => {

    return (
        <Backdrop
            sx={{color: 'primary.main', zIndex: (theme) => zIndex ? zIndex : theme.zIndex.drawer + 1}}
            open={isLoading}
        >
            <CircularProgress color="inherit"/>
        </Backdrop>
    );
}
export default Spinner;