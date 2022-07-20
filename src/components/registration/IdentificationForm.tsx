import {
    Alert,
    Backdrop,
    Button,
    CircularProgress,
    FormHelperText,
    Grid,
    Paper,
    Snackbar,
    TextField,
    Typography
} from "@mui/material";
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import React, {useEffect, useState} from "react";
import useInput from "../../hook/use-input";
import useFetch, {RequestConfig} from "../../hook/use-fetch";
import {Link, useNavigate} from "react-router-dom";
import AlertSnackBar from "../notofications/AlertSnackBar";

const minPassLength = 10;
const maxPassLength = 20;
const isNotEmpty = (value: string) => value.trim() !== '';
const isEmail = (email: string) => email.includes('@');
const isValidPassword = (password: string) => {
    return (/\d/.test(password) && /[A-Z]/.test(password) && /[a-z]/.test(password) && /[^A-Za-z0-9]/.test(password)
        && password.length >= minPassLength && password.length <= maxPassLength);
}

export type SuccessfulRegistration = {
    clientId: string;
    qr: string;
}

const IdentificationForm = () => {
    const {isLoading, error, sendRequest: registerRequest} = useFetch();
    const [isRegistering, setIsRegistering] = useState<boolean>(false);
    const [isErrorMessageOpen, setIsErrorMessageOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    const {
        value: firstNameValue,
        isValid: firstNameValueIsValid,
        hasError: firstNameHasError,
        setIsTouched: setIsFirstNameTouched,
        valueChangeHandler: firstNameChangeHandler,
        inputBlurHandler: firstNameBlurHandler
    } = useInput(isNotEmpty);
    const {
        value: lastNameValue,
        isValid: lastNameValueIsValid,
        hasError: lastNameHasError,
        setIsTouched: setIsLastNameTouched,
        valueChangeHandler: lastNameChangeHandler,
        inputBlurHandler: lastNameBlurHandler
    } = useInput(isNotEmpty);
    const {
        value: emailValue,
        isValid: emailValueIsValid,
        hasError: emailHasError,
        setIsTouched: setIsEmailTouched,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler
    } = useInput(isEmail);
    const {
        value: passwordValue,
        isValid: passwordValueIsValid,
        hasError: passwordHasError,
        setIsTouched: setIsPasswordTouched,
        valueChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler
    } = useInput(isValidPassword);

    const isSameAsPassword = (confirmPassword: string) => {
        return confirmPassword === passwordValue;
    }
    const {
        value: confirmPasswordValue,
        isValid: confirmPasswordValueIsValid,
        hasError: confirmPasswordHasError,
        setIsTouched: setIsConfirmPasswordTouched,
        valueChangeHandler: confirmPasswordChangeHandler,
        inputBlurHandler: confirmPasswordBlurHandler
    } = useInput(isSameAsPassword);


    const setAllInputsError = () => {
        const setIsTouchedList = [setIsFirstNameTouched, setIsLastNameTouched, setIsEmailTouched,
            setIsPasswordTouched, setIsConfirmPasswordTouched];

        setIsTouchedList.forEach(setIsTouched => {
            setIsTouched(true);
        })
    }

    const allInputsValid = () => {
        return firstNameValueIsValid && lastNameValueIsValid && emailValueIsValid &&
            passwordValueIsValid && confirmPasswordValueIsValid;
    }

    const handlePopUpClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setIsErrorMessageOpen(false);
    };

    const handleRegistration = (response: SuccessfulRegistration) => {
        setIsRegistering(false);
        navigate('success', { replace: true, state: {
            clientId: response['clientId'], qr: response['qr'] }
        });
    }

    const signUpHandler = (event: React.FormEvent) => {
        event.preventDefault();
        if (!allInputsValid()) {
            setAllInputsError();
            return;
        }
        const registerRequestContent: RequestConfig = {
            url: "/web/register",
            method: "POST",
            body: {
                'firstName': firstNameValue,
                'lastName': lastNameValue,
                'email': emailValue,
                'password': passwordValue
            },
            headers: {
                'Content-Type': 'application/json'
            }
        };

        setIsErrorMessageOpen(false);
        setIsRegistering(true);
        registerRequest(registerRequestContent, handleRegistration);
    }

    useEffect(() => {
        if (!!error) {
            console.log(error.message);
            setIsErrorMessageOpen(true);
            setIsRegistering(false);
        }
    }, [error])

    return (
        <>
            <Backdrop
                sx={{color: 'primary.main', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={isRegistering}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>

            <AlertSnackBar isOpen={isErrorMessageOpen}
                           handleClose={handlePopUpClose}
                           severity="error"
                           description="This email has already been taken."/>

            <form onSubmit={signUpHandler} style={{
                marginLeft: "auto",
                marginRight: "auto",
                width: '800px'
            }}>
                <Paper>
                    <Grid container spacing={4} sx={{justifyContent: 'center', paddingBottom: 5, paddingTop: 5}}>
                        <Grid item xs={12} sx={{textAlign: 'center'}}>
                            <Typography variant="h3" color="primary">Register new account</Typography>
                        </Grid>
                        <Grid item xs={12} sx={{marginRight: 5, marginLeft: 5}}>
                            <TextField
                                error={firstNameHasError}
                                onChange={firstNameChangeHandler}
                                onBlur={firstNameBlurHandler}
                                value={firstNameValue}
                                label="First name"
                                size="medium"
                                variant="standard"
                                helperText={firstNameHasError ? "Field cannot be empty." : ''}
                                fullWidth
                            />

                        </Grid>
                        <Grid item xs={12} sx={{marginRight: 5, marginLeft: 5}}>
                            <TextField
                                error={lastNameHasError}
                                onChange={lastNameChangeHandler}
                                onBlur={lastNameBlurHandler}
                                value={lastNameValue}
                                label="Last name"
                                size="medium"
                                variant="standard"
                                helperText={lastNameHasError ? "Field cannot be empty." : ''}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sx={{marginRight: 5, marginLeft: 5}}>
                            <TextField
                                error={emailHasError}
                                onChange={emailChangeHandler}
                                onBlur={emailBlurHandler}
                                value={emailValue}
                                label="Email address"
                                size="medium"
                                variant="standard"
                                helperText={emailHasError ? "Provide valid email." : ''}
                                fullWidth
                                type="email"
                            />
                        </Grid>
                        {/*<Grid item xs={12} sx={{marginRight: 5, marginLeft: 5}}>*/}
                        {/*    <MuiPhoneNumber defaultCountry={'us'} onChange={() => {*/}
                        {/*    }} fullWidth helperText="Make sure to provide correct phone number."/>*/}
                        {/*</Grid>*/}
                        <Grid item xs={12} sx={{marginRight: 5, marginLeft: 5}}>
                            <TextField
                                error={passwordHasError}
                                onChange={passwordChangeHandler}
                                onBlur={passwordBlurHandler}
                                value={passwordValue}
                                label="Password"
                                size="medium"
                                variant="standard"
                                fullWidth
                                helperText={passwordHasError ? "Too weak password." : ''}
                                type="password"
                            />
                        </Grid>
                        <Grid item xs={12} sx={{marginRight: 5, marginLeft: 5}}>
                            <TextField
                                error={confirmPasswordHasError}
                                onChange={confirmPasswordChangeHandler}
                                onBlur={confirmPasswordBlurHandler}
                                value={confirmPasswordValue}
                                label="Confirm password"
                                size="medium"
                                variant="standard"
                                fullWidth
                                helperText={confirmPasswordHasError ? "Passwords do not match." : ''}
                                type="password"
                            />
                        </Grid>
                        <Grid item xs={12} sx={{marginRight: 5, marginLeft: 5}}>
                            <Button type="submit" sx={{width: "350px"}} variant="contained" size="large">
                                Sign up
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
                <Typography mt="5px">Already have an account? Log in <Link to='/login' style={{ color: '#007AFF'}}>here</Link>.</Typography>
            </form>
        </>

    )
}
export default IdentificationForm;