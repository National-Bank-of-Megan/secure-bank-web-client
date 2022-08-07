import {Box, Typography} from "@mui/material";
import React from "react";

const AccountInfoField: React.FC<{ fieldName: string, fieldValue?: string }> = ({fieldName, fieldValue}) => {
    return (
        <Box sx={{display: 'flex'}}>
            <Typography sx={{width: '50%'}} variant="body1">{fieldName}</Typography>
            <Typography sx={{width: '50%'}} variant="body1">{fieldValue ? fieldValue : ''}</Typography>
        </Box>
    );
}

export default AccountInfoField;