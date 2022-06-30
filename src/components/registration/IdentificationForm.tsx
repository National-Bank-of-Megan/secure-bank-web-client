import {Box, Button, FormHelperText, Grid, Input, InputLabel, Paper, TextField, Typography} from "@mui/material";
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import MuiPhoneNumber from 'material-ui-phone-number';
import React from "react";
import ButtonStyles from "../../styles/ButtonStyles";

const IdentificationForm = () => {
    const [value, setValue] = React.useState<Date | null>(null);
    return (

        <Paper sx={{
            marginLeft: "auto",
            marginRight: "auto",
            width: '600px'
        }}>
            <Grid container spacing={4} sx={{justifyContent: 'center', paddingBottom: 5, paddingTop: 5}}>
                <Grid item xs={12} sx={{textAlign: 'center'}}>
                    <Typography variant="h3">Register new account</Typography>
                </Grid>
                <Grid item xs={12} sx={{marginRight: 5, marginLeft: 5}}>
                    <TextField
                        label="Firstname"
                        size="medium"
                        variant="standard"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sx={{marginRight: 5, marginLeft: 5}}>
                    <TextField
                        label="Lastname"
                        size="medium"
                        variant="standard"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sx={{marginRight: 5, marginLeft: 5}}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Date of birth"
                            value={value}
                            onChange={(newValue) => {
                                setValue(newValue);
                            }}
                            renderInput={(params) => <TextField fullWidth helperText="mm/dd/yyyy"{...params} />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sx={{marginRight: 5, marginLeft: 5}}>
                    <TextField
                        label="Social security number"
                        size="medium"
                        variant="standard"
                        fullWidth
                        type="number"
                    />
                </Grid>
                <Grid item xs={12} sx={{marginRight: 5, marginLeft: 5}}>
                    <TextField
                        label="Email address"
                        size="medium"
                        variant="standard"
                        fullWidth
                        type="email"
                    />
                </Grid>
                <Grid item xs={12} sx={{marginRight: 5, marginLeft: 5}}>
                    <MuiPhoneNumber defaultCountry={'us'} onChange={() => {
                    }} fullWidth helperText="Make sure to provide correct phone number."/>
                </Grid>
                <Grid item xs={12} sx={{marginRight: 5, marginLeft: 5}}>
                    <TextField
                        label="Password"
                        helperText="Provide strong password."
                        size="medium"
                        variant="standard"
                        fullWidth
                        type="password"
                    />
                </Grid>
                <Grid item xs={12} sx={{marginRight: 5, marginLeft: 5}}>
                    <TextField
                        label="Confirm password"
                        size="medium"
                        variant="standard"
                        fullWidth
                        type="password"
                    />
                </Grid>
                <Grid item xs={12} sx={{marginRight: 5, marginLeft: 5}}>
                    <Button sx={ButtonStyles} variant="outlined" size="large" fullWidth>
                        Sign up
                    </Button>
                </Grid>


            </Grid>
        </Paper>

    )
}
export default IdentificationForm;