import {Button, Grid, Paper, TextField, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import useInput from "../../hook/use-input";
import useFetch, {RequestConfig} from "../../hook/use-fetch";
import {Link, useNavigate} from "react-router-dom";
import AlertSnackBar, {AlertState} from "../notifications/AlertSnackBar";
import {isValidPassword} from "../../input-rules/is-valid-password";
import {isNotEmpty} from "../../input-rules/is-not-empty";
import {isEmail} from "../../input-rules/is-email";
import Spinner from "../common/Spinner";
import {SuccessfulRegistrationType} from "../../models/custom-types/SuccessfulRegistrationType";
import {REST_PATH_AUTH} from "../../constants/Constants";
import {ClientJS} from 'clientjs';

const RegistrationForm = () => {
    const {isLoading, error, sendRequest: registerRequest} = useFetch();
    const [isRegistering, setIsRegistering] = useState<boolean>(false);
    const [errorAlertState, setErrorAlertState] = useState<AlertState>({
        isOpen: false,
        message: ''
    });
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

    const handleRegistration = (response: SuccessfulRegistrationType) => {
        setIsRegistering(false);
        navigate('/signup/success', {
            replace: true, state: {
                clientId: response['clientId'], qr: response['qr']
            }
        });
    }

    const signUpHandler = (event: React.FormEvent) => {
        event.preventDefault();
        if (!allInputsValid()) {
            setAllInputsError();
            return;
        }

        const client = new ClientJS();

        const registerRequestContent: RequestConfig = {
            url: REST_PATH_AUTH + "/register",
            method: "POST",
            body: {
                'firstName': firstNameValue,
                'lastName': lastNameValue,
                'email': emailValue,
                'password': passwordValue,
                'deviceFingerprint': client.getFingerprint().toString()
            },
            headers: {
                'Content-Type': 'application/json'
            }
        };

        setErrorAlertState({
            isOpen: false,
            message: ''
        });
        setIsRegistering(true);
        registerRequest(registerRequestContent, handleRegistration);
    }

    useEffect(() => {
        if (!!error) {
            console.log(error.message);
            setErrorAlertState({
                isOpen: true,
                message: error.message
            });
            setIsRegistering(false);
        }
    }, [error])

    return (
        <>
            <Spinner isLoading={isRegistering || isLoading}/>
            <AlertSnackBar alertState={{"state": errorAlertState, "setState": setErrorAlertState}}
                           severity="error"/>

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
                <Typography mt="5px">Already have an account? Log in <Link to='/login'
                                                                           style={{color: '#007AFF'}}>here</Link>.</Typography>
            </form>
        </>

    )
}
export default RegistrationForm;