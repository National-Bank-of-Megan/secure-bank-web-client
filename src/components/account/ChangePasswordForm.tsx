import {Box, Button, Grid, Paper, TextField, Typography} from "@mui/material";
import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import useInput from "../../hook/use-input";
import {isValidPassword} from "../../input-rules/is-valid-password";
import {isCodeValid} from "../../input-rules/is-code-valid";
import {shouldUpdateCode} from "../../common/validation";
import useFetch, {RequestConfig} from "../../hook/use-fetch";
import {REST_PATH_AUTH} from "../../constants/Constants";
import {AlertState} from "../notifications/AlertSnackBar";
import {isNotEmpty} from "../../input-rules/is-not-empty";

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
                message: error.message
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
    } = useInput(isNotEmpty);

    const isSameAsOldPassword = (comparedPassword: string) => {
        return comparedPassword === oldPasswordValue;
    }

    const isNewPasswordValid = (newPassword: string) => {
        return isValidPassword(newPassword) && !isSameAsOldPassword(newPassword);
    }

    const {
        value: newPasswordValue,
        isValid: newPasswordValueIsValid,
        hasError: newPasswordHasError,
        setIsTouched: setIsNewPasswordTouched,
        valueChangeHandler: newPasswordChangeHandler,
        inputBlurHandler: newPasswordBlurHandler
    } = useInput(isNewPasswordValid);

    const isSameAsNewPassword = (comparedPassword: string) => {
        return comparedPassword === newPasswordValue;
    }

    const {
        value: confirmNewPasswordValue,
        isValid: confirmNewPasswordValueIsValid,
        hasError: confirmNewPasswordHasError,
        setIsTouched: setIsConfirmNewPasswordTouched,
        valueChangeHandler: confirmNewPasswordChangeHandler,
        inputBlurHandler: confirmNewPasswordBlurHandler
    } = useInput(isSameAsNewPassword);

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

    let newPasswordErrorMessage;
    if (newPasswordHasError) {
        if (!isValidPassword(newPasswordValue)) {
            newPasswordErrorMessage = 'Too weak password.';
        } else if (isSameAsOldPassword(oldPasswordValue)) {
            newPasswordErrorMessage = 'New password cannot be the same as the old one.';
        }
    }

    return (
        <>
            <Paper style={{
                marginLeft: "auto",
                marginRight: "auto",
                width: '700px'
            }}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        padding: "35px 0",
                        gap: "30px",
                        width: "500px",
                        marginLeft: "auto",
                        marginRight: "auto",
                    }}
                >

                    <Typography variant="h3" color="primary">Change your password</Typography>
                    <TextField
                        error={oldPasswordHasError}
                        onChange={oldPasswordChangeHandler}
                        onBlur={oldPasswordBlurHandler}
                        value={oldPasswordValue}
                        label="Old password"
                        size="medium"
                        variant="standard"
                        helperText={oldPasswordHasError ? "Incorrect password format." : ''}
                        fullWidth
                        type="password"
                    />



                    <TextField
                        error={newPasswordHasError}
                        onChange={newPasswordChangeHandler}
                        onBlur={newPasswordBlurHandler}
                        value={newPasswordValue}
                        label="New password"
                        size="medium"
                        variant="standard"
                        helperText={newPasswordHasError ? newPasswordErrorMessage : ''}
                        fullWidth
                        type="password"
                    />


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


                    <TextField
                        InputProps={{
                            inputProps: { min: 0 }
                        }}
                        error={oneTimePasswordHasError}
                        onChange={oneTimePasswordChangeHandler}
                        onBlur={oneTimePasswordBlurHandler}
                        value={oneTimePasswordValue}
                        label="One time password"
                        size="medium"
                        variant="standard"
                        helperText={oneTimePasswordHasError ? "Incorrect one time password format." : ''}
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
                    <Button onClick={changePasswordHandler} sx={{width: "350px", marginTop: '15px'}} variant="contained" size="large">
                        Change password
                    </Button>
                </Box>
            </Paper>
        </>
    );
}

export default ChangePasswordForm;