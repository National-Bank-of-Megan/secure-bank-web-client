import {Button, Grid, Paper, TextField, Typography} from "@mui/material";
import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import useInput from "../../hook/use-input";
import {isValidPassword} from "../../input-rules/is-valid-password";
import {isCodeValid} from "../../input-rules/is-code-valid";
import {shouldUpdateCode} from "../../common/validation";
import useFetch, {RequestConfig} from "../../hook/use-fetch";
import {REST_PATH_AUTH} from "../../constants/Constants";
import {AlertState} from "../notifications/AlertSnackBar";

const ChangePasswordForm: React.FC<{
    setIsChangingPassword: Dispatch<SetStateAction<boolean>>;
    setErrorAlertState: Dispatch<SetStateAction<AlertState>>;
}> = (props) => {
    const navigate = useNavigate();
    const {isLoading, error, sendRequest: changePasswordRequest} = useFetch();


    useEffect(() => {
        if (!!error) {
            console.log(error.message);
            props.setErrorAlertState({
                isOpen: true,
                message: "Something went wrong"
            });
            props.setIsChangingPassword(false);
        }
    }, [error, props.setErrorAlertState, props.setIsChangingPassword])

    const {
        value: oldPasswordValue,
        isValid: oldPasswordValueIsValid,
        hasError: oldPasswordHasError,
        setIsTouched: setIsOldPasswordTouched,
        valueChangeHandler: oldPasswordChangeHandler,
        inputBlurHandler: oldPasswordBlurHandler
    } = useInput(isValidPassword);
    const {
        value: newPasswordValue,
        isValid: newPasswordValueIsValid,
        hasError: newPasswordHasError,
        setIsTouched: setIsNewPasswordTouched,
        valueChangeHandler: newPasswordChangeHandler,
        inputBlurHandler: newPasswordBlurHandler
    } = useInput(isValidPassword);

    const isSameAsPassword = (confirmPassword: string) => {
        return confirmPassword === newPasswordValue;
    }

    const {
        value: confirmNewPasswordValue,
        isValid: confirmNewPasswordValueIsValid,
        hasError: confirmNewPasswordHasError,
        setIsTouched: setIsConfirmNewPasswordTouched,
        valueChangeHandler: confirmNewPasswordChangeHandler,
        inputBlurHandler: confirmNewPasswordBlurHandler
    } = useInput(isSameAsPassword);

    const {
        value: oneTimePasswordValue,
        isValid: oneTimePasswordValueIsValid,
        hasError: oneTimePasswordHasError,
        setIsTouched: setIsOneTimePasswordTouched,
        valueChangeHandler: oneTimePasswordChangeHandler,
        inputBlurHandler: oneTimePasswordBlurHandler
    } = useInput(isCodeValid, '', shouldUpdateCode);

    const setAllInputsError = () => {
        const setIsTouchedList = [setIsOldPasswordTouched, setIsNewPasswordTouched, setIsConfirmNewPasswordTouched,
                                  setIsOneTimePasswordTouched];

        setIsTouchedList.forEach(setIsTouched => {
            setIsTouched(true);
        })
    }

    const allInputsValid = () => {
        return oldPasswordValueIsValid && newPasswordValueIsValid && confirmNewPasswordValueIsValid &&
            oneTimePasswordValueIsValid;
    }

    const handleSuccessfulChangePassword = (response: any) => {
        props.setIsChangingPassword(false);
        navigate('/account', {
            replace: true, state: true
        });
    }

    const changePasswordHandler = () => {
        if (!allInputsValid()) {
            setAllInputsError();
            return;
        }

        const changePasswordRequestContent: RequestConfig = {
            url: REST_PATH_AUTH + "/account/changePassword",
            method: "PUT",
            body: {
                'oldPassword': oldPasswordValue,
                'newPassword': newPasswordValue,
                'otpCode': oneTimePasswordValue
            },
            headers: {
                'Content-Type': 'application/json'
            }
        };

        props.setErrorAlertState({
            isOpen: false,
            message: ''
        });
        props.setIsChangingPassword(true);
        changePasswordRequest(changePasswordRequestContent, handleSuccessfulChangePassword);
    }

    return (
        <>
            <Paper style={{
                marginLeft: "auto",
                marginRight: "auto",
                width: '800px'
            }}>
                <Grid container spacing={4} sx={{justifyContent: 'center', paddingBottom: 5, paddingTop: 5}}>
                    <Grid item xs={12} sx={{textAlign: 'center'}}>
                        <Typography variant="h3" color="primary">Change your password</Typography>
                    </Grid>
                    <Grid item xs={12} sx={{marginRight: 5, marginLeft: 5}}>
                        <TextField
                            error={oldPasswordHasError}
                            onChange={oldPasswordChangeHandler}
                            onBlur={oldPasswordBlurHandler}
                            value={oldPasswordValue}
                            label="Old password"
                            size="medium"
                            variant="standard"
                            helperText={oldPasswordHasError ? "Invalid password." : ''}
                            fullWidth
                            type="password"
                        />

                    </Grid>
                    <Grid item xs={12} sx={{marginRight: 5, marginLeft: 5}}>
                        <TextField
                            error={newPasswordHasError}
                            onChange={newPasswordChangeHandler}
                            onBlur={newPasswordBlurHandler}
                            value={newPasswordValue}
                            label="New password"
                            size="medium"
                            variant="standard"
                            helperText={newPasswordHasError ? "Too weak password." : ''}
                            fullWidth
                            type="password"
                        />
                    </Grid>
                    <Grid item xs={12} sx={{marginRight: 5, marginLeft: 5}}>
                        <TextField
                            error={confirmNewPasswordHasError}
                            onChange={confirmNewPasswordChangeHandler}
                            onBlur={confirmNewPasswordBlurHandler}
                            value={confirmNewPasswordValue}
                            label="Confirm new password"
                            size="medium"
                            variant="standard"
                            helperText={confirmNewPasswordHasError ? "Passwords do not match." : ''}
                            fullWidth
                            type="password"
                        />
                    </Grid>
                    <Grid item xs={12} sx={{marginRight: 5, marginLeft: 5}}>
                        <TextField
                            InputProps={{
                                inputProps: { min: 0 }
                            }}
                            error={oneTimePasswordHasError}
                            onChange={oneTimePasswordChangeHandler}
                            onBlur={oneTimePasswordBlurHandler}
                            value={oneTimePasswordValue}
                            label="Password"
                            size="medium"
                            variant="standard"
                            helperText={oneTimePasswordHasError ? "Too weak password." : ''}
                            fullWidth
                            type="number"
                            sx={{
                                '& .MuiInput-input': {
                                    '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
                                        '-webkit-appearance': 'none',
                                    }
                                }
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{marginRight: 5, marginLeft: 5}}>
                        <Button onClick={changePasswordHandler} sx={{width: "350px"}} variant="contained" size="large">
                            Change password
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
}

export default ChangePasswordForm;