import {Stack, Typography} from "@mui/material";
import React from "react";

const ServerError = () => {
    return <Stack direction="row">
        <Typography variant="h2" color="danger">
            It seems like the server is not responding. Try again later.
        </Typography>
        <img
            src="pngaaa.com-1540188.png"
            width="200" height="200"
        />
    </Stack>
}

export default ServerError