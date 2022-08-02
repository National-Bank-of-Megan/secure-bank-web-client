import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    FormControl,
    Input,
    InputLabel,
    Paper, TextField,
    Typography, useTheme,
} from "@mui/material";
import useInput from "../../../hook/use-input";
import {isNotEmpty} from "../../../input-rules/is-not-empty";
import { isValidAccountNumber } from "../../../input-rules/is-valid-account-number";
import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import useFetch, {RequestConfig} from "../../../hook/use-fetch";
import {REST_PATH_AUTH} from "../../../constants/Constants";
import Spinner from "../../common/Spinner";
import {FavoriteReceiverResponse} from "../TotalBalanceContent";

const AddFriendDialog: React.FC<{
    openAddFriendDialog: boolean;
    setOpenAddFriendDialog: (isOpen: boolean) => void;
    setIsErrorMessageOpen: (isOpen: boolean) => void;
    setIsSuccessMessageOpen: (isOpen: boolean) => void;
    setFavoriteReceiversList: Dispatch<SetStateAction<FavoriteReceiverResponse[]>>;
}> = (props) => {
    const appTheme = useTheme();
    const {isLoading, error, sendRequest: addFavoriteReceiverRequest} = useFetch();
    const [isProcessingAddFavoriteReceiverRequest, setIsProcessingAddFavoriteReceiverRequest] = useState<boolean>(false);

    const {
        value: accountNumberValue,
        isValid: accountNumberValueIsValid,
        hasError: accountNumberHasError,
        setIsTouched: setIsAccountNumberTouched,
        valueChangeHandler: accountNumberChangeHandler,
        inputBlurHandler: accountNumberBlurHandler,
        clearInput: clearAccountNumberValue
    } = useInput(isValidAccountNumber);

    const {
        value: nameValue,
        isValid: nameValueIsValid,
        hasError: nameHasError,
        setIsTouched: setIsNameTouched,
        valueChangeHandler: nameChangeHandler,
        inputBlurHandler: nameBlurHandler,
        clearInput: clearNameValue
    } = useInput(isNotEmpty);

    useEffect(() => {
        if (!!error) {
            console.log(error.message);
            props.setIsErrorMessageOpen(true);
            setIsProcessingAddFavoriteReceiverRequest(false);
        }
    }, [error, props.setIsErrorMessageOpen])

    const removeErrorIfFieldEmpty = (value: string, setTouched: (isTouched: boolean) => void) => {
        if (value.trim() === '') {
            setTouched(false);
        }
    }

    const handleDialogClose = () => {
        props.setOpenAddFriendDialog(false);
        removeErrorIfFieldEmpty(accountNumberValue, setIsAccountNumberTouched);
        removeErrorIfFieldEmpty(nameValue, setIsNameTouched);
    }

    const handleAddFavoriteReceiverResponse = (response: FavoriteReceiverResponse) => {
        setIsProcessingAddFavoriteReceiverRequest(false);
        props.setFavoriteReceiversList((oldFavoriteReceiversList) => [...oldFavoriteReceiversList, {
            id: response.id,
            name: response.name,
            accountNumber: response.accountNumber
        }]);
        handleDialogClose();
        clearAccountNumberValue();
        clearNameValue();
        props.setIsSuccessMessageOpen(true);
    }

    const addFavoriteReceiverHandler = () => {
        if (!accountNumberValueIsValid || !nameValueIsValid) {
            setIsAccountNumberTouched(true);
            setIsNameTouched(true);
            return;
        }

        const addFavoriteReceiverRequestContent: RequestConfig = {
            url: REST_PATH_AUTH + "/account/receiver",
            method: "POST",
            body: {
                "name": nameValue,
                "accountNumber": accountNumberValue
            },
            headers: {
                'Content-Type': 'application/json'
            }
        };

        setIsProcessingAddFavoriteReceiverRequest(true);
        addFavoriteReceiverRequest(addFavoriteReceiverRequestContent, handleAddFavoriteReceiverResponse);
    }

    return (
        <>
            <Spinner isLoading={isProcessingAddFavoriteReceiverRequest || isLoading} zIndex={appTheme.zIndex.modal + 1}/>
            <Dialog
                open={props.openAddFriendDialog}
                onClose={handleDialogClose}
                fullWidth
                maxWidth="sm"
            >
                <Paper
                    sx={{
                        bgcolor: "background.paper",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            padding: "35px 0",
                            rowGap: "15px 40px",
                        }}
                    >
                        <Typography variant="h2" color="primary">
                            Add friend
                        </Typography>
                        <DialogContent
                            sx={{
                                width: "55%",
                                padding: "65px 0",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                rowGap: "15px",
                            }}
                        >
                            <FormControl fullWidth variant="standard">
                                <TextField
                                    variant="standard"
                                    label="Account number"
                                    type="text"
                                    onChange={accountNumberChangeHandler}
                                    onBlur={accountNumberBlurHandler}
                                    value={accountNumberValue}
                                    error={accountNumberHasError}
                                    helperText={accountNumberHasError ? "Provide valid account number." : ''}
                                    sx={{
                                        '& .MuiInput-input': {
                                            '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
                                                '-webkit-appearance': 'none',
                                            }
                                        },
                                        width: "100%",
                                    }}
                                />
                            </FormControl>
                            <FormControl fullWidth variant="standard">
                                <TextField
                                    variant="standard"
                                    label="Name"
                                    type="text"
                                    onChange={nameChangeHandler}
                                    onBlur={nameBlurHandler}
                                    value={nameValue}
                                    error={nameHasError}
                                    helperText={nameHasError ? "Field cannot be empty." : ''}
                                    sx={{
                                        '& .MuiInput-input': {
                                            '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
                                                '-webkit-appearance': 'none',
                                            }
                                        },

                                    }}
                                />
                            </FormControl>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                variant="contained"
                                size="large"
                                onClick={addFavoriteReceiverHandler}
                                sx={{
                                    margin: "0 0 30px",
                                    width: "250px",
                                }}
                            >
                                Add to contacts
                            </Button>
                        </DialogActions>
                    </Box>
                </Paper>
            </Dialog>
        </>
    );
};

export default AddFriendDialog;
