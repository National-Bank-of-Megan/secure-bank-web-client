import {Box, Typography} from "@mui/material";
import React from "react";

const ServiceDisabledError :React.FC<{message: string}> = ({message}) => {

    return <Box>
        <Typography variant="h1" color="error">{message}</Typography>
    </Box>

}

export default ServiceDisabledError;