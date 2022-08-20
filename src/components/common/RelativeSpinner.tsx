// covers only component

import {Backdrop, Box, CircularProgress} from "@mui/material";
import React from "react";

const RelativeSpinner: React.FC<{ isLoading: boolean, zIndex?: number }> = ({isLoading, zIndex}) => {
    return (

            <Backdrop
                sx={{
                    position: 'absolute',

                    color: 'primary.main',
                    zIndex: (theme) => zIndex ? zIndex : theme.zIndex.drawer + 1
                }}
                open={isLoading}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>


    )
}

export default RelativeSpinner