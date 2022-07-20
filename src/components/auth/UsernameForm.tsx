import {Backdrop, Box, Button, CircularProgress, Paper, Snackbar, Stack, TextField, Typography,} from "@mui/material";
import useFetch, {RequestConfig} from "../../hook/use-fetch";
import useInput from "../../hook/use-input";
import React, {useEffect, useState} from "react";
import MuiAlert from "@mui/material/Alert";

export interface PasswordCombination {
    clientId: string,
    combination: string
}

const UsernameForm: React.FC<{ toggleForms: (data :PasswordCombination) => void }> = (props) => {
    const isNotEmpty = (value: string) => value.trim() !== '';
    const {isLoading, error, sendRequest: getPasswordCombinationRequest} = useFetch();
    const [isGettingCombination, setIsGettingCombination] = useState<boolean>(false);
    const [isErrorMessageOpen, setIsErrorMessageOpen] = useState<boolean>(false);
    const {
        value: clientIdValue,
        isValid: clientIdIsValid,
        hasError: clientIdHasError,
        setIsTouched: setIsClientIdTouched,
        valueChangeHandler: clientIdChangeHandler,
        inputBlurHandler: clientIdBlurHandler
    } = useInput(isNotEmpty);

    const handleGettingCombination = (response: PasswordCombination) => {
        setIsGettingCombination(false);
        props.toggleForms(response);
    }

    const handleNextClick = () => {
        if(!clientIdIsValid){
            setIsClientIdTouched(true);
            return
        }
        const getPasswordRandomCharsRequestContent: RequestConfig = {
            url: "/web/login/combination?clientId=" + clientIdValue,
            method: "GET",
            body : {},
            headers: {
                // 'Content-Type': 'application/json'
            }
        };
        setIsErrorMessageOpen(false);
        setIsGettingCombination(true);
        getPasswordCombinationRequest(getPasswordRandomCharsRequestContent,handleGettingCombination)
    };

    useEffect(() => {
        if (!!error) {
            setIsErrorMessageOpen(true);
            console.log(error)
            setIsGettingCombination(false);
        }
    }, [error])

    const handlePopUpClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setIsErrorMessageOpen(false);
    };

    return (
        <Box
            sx={{
                width: "450px",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "100px",
            }}
        >
            <Backdrop
                sx={{color: 'primary.main', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={isGettingCombination}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>

            <Snackbar open={isErrorMessageOpen} autoHideDuration={6000} onClose={handlePopUpClose}>
                <MuiAlert elevation={6} variant="filled" onClose={handlePopUpClose} severity="error" sx={{ width: '100%' }}>
                    Invalid client ID
                </MuiAlert>
            </Snackbar>
            <Paper
                sx={{
                    bgcolor: "background.paper",
                }}
            >
                <Stack
                    alignItems="center"
                    sx={{
                        padding: "30px",
                        boxShadow: 3,
                    }}
                >
                    <Typography
                        variant="h3"
                        textAlign="center"
                        color="primary"
                        marginBottom="10px"
                    >
                        Log in
                    </Typography>
                    <TextField
                        label="Client ID"
                        size="small"
                        variant="standard"
                        fullWidth
                        error={clientIdHasError}
                        onChange={clientIdChangeHandler}
                        onBlur={clientIdBlurHandler}
                        value={clientIdValue}
                        helperText={clientIdHasError ? "Field cannot be empty." : ''}
                    />

                    <Button
                        variant="contained"
                        size="large"
                        sx={{
                            width: "200px",
                            marginTop: "40px",
                        }}
                        onClick={handleNextClick}
                    >
                        Next
                    </Button>
                </Stack>
            </Paper>
        </Box>
    );
};

export default UsernameForm;
