import {Backdrop, Box, Button, CircularProgress, Paper, Snackbar, Stack, TextField, Typography,} from "@mui/material";
import useFetch, {RequestConfig} from "../../hook/use-fetch";
import useInput from "../../hook/use-input";
import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import MuiAlert from "@mui/material/Alert";
import AlertSnackBar from "../notofications/AlertSnackBar";
import {isNotEmpty} from "../../input-rules/is-not-empty";
import Spinner from "../common/Spinner";
import {PasswordCombinationType} from "../../models/custom-types/PasswordCombinationType";
import {UseStateType} from "../../models/custom-types/UseStateType";

const UsernameForm: React.FC<{ toggleForms: () => void, setLoginBasicData :Dispatch<SetStateAction<PasswordCombinationType | null>>, savedClientIdState :UseStateType<string>}> = (props) => {
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
    } = useInput(isNotEmpty, props.savedClientIdState.state);

    const handleGettingCombinationSuccess = (response: PasswordCombinationType) => {
        setIsGettingCombination(false);
        props.savedClientIdState.setState(clientIdValue)
        props.setLoginBasicData(response);
        props.toggleForms();
    }
    const handleNextClick = () => {
        if (!clientIdIsValid) {
            setIsClientIdTouched(true);
            return
        }
        const getPasswordRandomCharsRequestContent: RequestConfig = {
            url: "http://localhost:8080/api/web/login/combination?clientId=" + clientIdValue,
            method: "GET",
            body: {},
            headers: {
                'Content-Type': 'application/json'
            }
        };
        setIsErrorMessageOpen(false);
        setIsGettingCombination(true);
        getPasswordCombinationRequest(getPasswordRandomCharsRequestContent, handleGettingCombinationSuccess)
    };

    useEffect(() => {
        if (!!error) {
            setIsErrorMessageOpen(true);
            setIsGettingCombination(false);
        }
    }, [error])

    return (
        <Box
            sx={{
                width: "450px",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "100px",
            }}
        >
            <Spinner isLoading={isGettingCombination || isLoading}/>
            <AlertSnackBar message="Invalid client ID"
                           severity="error"
                           alertState={{"state": isErrorMessageOpen, "setState": setIsErrorMessageOpen}}/>
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
