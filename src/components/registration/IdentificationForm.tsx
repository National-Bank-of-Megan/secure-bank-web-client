import {Button, Grid, Paper, TextField, Typography} from "@mui/material";
import React, {} from "react";
import useInput from "../../hook/use-input";
import useFetch, {RequestConfig} from "../../hook/use-fetch";

const minPassLength = 10;
const maxPassLength = 20;
const isNotEmpty = (value: string) => value.trim() !== '';
const isEmail = (email: string) => email.includes('@');
const isValidPassword = (password: string) => {
    return (/\d/.test(password) && /[A-Z]/.test(password) && /[a-z]/.test(password) && /[^A-Za-z0-9]/.test(password)
            && password.length >= minPassLength && password.length <= maxPassLength);
}

const IdentificationForm = () => {
    const {isLoading, error, sendRequest: registerRequest} = useFetch();

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
        const setIsTouchedList = [setIsFirstNameTouched, setIsLastNameTouched, setIsEmailTouched, setIsPasswordTouched, setIsConfirmPasswordTouched];
        setIsTouchedList.forEach(setIsTouched => {
            setIsTouched(true);
        })
    }

    const allInputsValid = () => {
        return firstNameValueIsValid && lastNameValueIsValid && emailValueIsValid &&
               passwordValueIsValid && confirmPasswordValueIsValid;
    }

    const handleRegistration = (response: string) => {
        console.log('registered account')
    }

    const signUpHandler = (event: React.FormEvent) => {
        event.preventDefault();
        if (!allInputsValid()) {
            setAllInputsError();
            return;
        }

        const registerRequestContent: RequestConfig = {
            url: "/web/registration",
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

        registerRequest(registerRequestContent, handleRegistration);
    }

    return (

        <Paper sx={{
            marginLeft: "auto",
            marginRight: "auto",
            width: '800px'
        }}>
            <Grid container spacing={4} sx={{justifyContent: 'center', paddingBottom: 5, paddingTop: 5}}>
                <form onSubmit={signUpHandler}>
                    <Grid item xs={12} sx={{textAlign: 'center'}}>
                        <Typography variant="h3" color="primary">Register new account</Typography>
                    </Grid>
                    <Grid item xs={12} sx={{marginRight: 5, marginLeft: 5}}>
                        <TextField
                            label="First name"
                            size="medium"
                            variant="standard"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sx={{marginRight: 5, marginLeft: 5}}>
                        <TextField
                            label="Last name"
                            size="medium"
                            variant="standard"
                            fullWidth
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
                    {/*<Grid item xs={12} sx={{marginRight: 5, marginLeft: 5}}>*/}
                    {/*    <MuiPhoneNumber defaultCountry={'us'} onChange={() => {*/}
                    {/*    }} fullWidth helperText="Make sure to provide correct phone number."/>*/}
                    {/*</Grid>*/}
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
                        <Button type="submit" sx={{width: "350px"}} variant="contained" size="large">
                            Sign up
                        </Button>
                    </Grid>
                </form>

            </Grid>
        </Paper>

    )
}
export default IdentificationForm;