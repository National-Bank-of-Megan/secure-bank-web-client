import {Backdrop, CircularProgress} from "@mui/material";
import React from "react";

const Spinner: React.FC<{ isLoading: boolean, zIndex?: number , isPositionAbsolute? :boolean}> = ({isLoading, zIndex,isPositionAbsolute}) => {

    return (
        <Backdrop
            sx={{color: 'primary.main', zIndex: (theme) => zIndex ? zIndex : theme.zIndex.drawer + 1,
            position : isPositionAbsolute ? 'absolute' : 'fixed'}}
            open={isLoading}
        >
            <CircularProgress color="inherit"/>
        </Backdrop>
    );
}
export default Spinner;