import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    FormControl,
    Input,
    InputLabel,
    MenuItem,
    Paper,
    TextField,
    Typography, useTheme,
} from "@mui/material";
import {AccountCurrencyBalance} from "../TotalBalanceContent";
import useInput from "../../../hook/use-input";
import useFetch, {RequestConfig} from "../../../hook/use-fetch";
import {REST_PATH_AUTH} from "../../../constants/Constants";
import React, {useEffect, useState} from "react";
import Spinner from "../../common/Spinner";

const isNotEmpty = (value: string) => value.trim() !== '';

const AddMoneyDialog: React.FC<{
    openAddMoneyDialog: boolean;
    setOpenAddMoneyDialog: (isOpen: boolean) => void;
    currency: AccountCurrencyBalance;
    setCurrency: (currency: AccountCurrencyBalance) => void;
    currencies: AccountCurrencyBalance[]
    setIsErrorMessageOpen: (isOpen: boolean) => void;
    setIsSuccessMessageOpen: (isOpen: boolean) => void;
    updateCurrencyBalance: (currencyName: string, amountToAdd: number) => void;
}> = (props) => {
    const appTheme = useTheme();

    const {isLoading, error, sendRequest: addBalanceRequest} = useFetch();
    const [isProcessingAddingMoneyRequest, setIsProcessingAddingMoneyRequest] = useState<boolean>(false);

    const countDecimals = (value: number) => {
        if ((value % 1) !== 0)
            return value.toString().split(".")[1].length;
        return 0;
    }

    const shouldUpdateInput = (value: string): boolean => {
        if (value.trim() === '') {
            return true;
        }
        const maxDecimalPlaces = 2;
        const userDecimalPlaces = countDecimals(parseFloat(value));
        return (userDecimalPlaces <= maxDecimalPlaces) && parseFloat(value) >= 0.0;
    }

    useEffect(() => {
        if (!!error) {
            console.log(error.message);
            props.setIsErrorMessageOpen(true);
            setIsProcessingAddingMoneyRequest(false);
        }
    }, [error, props.setIsErrorMessageOpen])

    const {
        value: addBalanceValue,
        isValid: addBalanceValueIsValid,
        hasError: addBalanceHasError,
        setIsTouched: setIsAddBalanceTouched,
        valueChangeHandler: addBalanceChangeHandler,
        inputBlurHandler: addBalanceBlurHandler
    } = useInput(isNotEmpty, '', shouldUpdateInput);

    const handleAddToBalance = (response: any) => {
        setIsProcessingAddingMoneyRequest(false);
        props.updateCurrencyBalance(props.currency.currency, parseFloat(addBalanceValue));
        handleDialogClose();
        props.setIsSuccessMessageOpen(true);
    }

    const addBalanceHandler = () => {
        if (!addBalanceValueIsValid) {
            setIsAddBalanceTouched(true);
            return;
        }

        const registerRequestContent: RequestConfig = {
            url: REST_PATH_AUTH + "/account/currency",
            method: "PUT",
            body: {
                'currency': props.currency.currency,
                'amount': addBalanceValue
            },
            headers: {
                'Content-Type': 'application/json'
            }
        };

        setIsProcessingAddingMoneyRequest(true);
        addBalanceRequest(registerRequestContent, handleAddToBalance);
    };

    const handlePrefix = (value: string): string => {
        if (value.trim().startsWith(",")) {
            return "0" + value;
        }
        return value;
    }

    const handleDialogClose = () => {
        props.setOpenAddMoneyDialog(false);
        setIsAddBalanceTouched(false);
    }

    const handleCurrencyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const accountCurrencyBalance = props.currencies.find((nextCurrency) => (nextCurrency.currency === event.target.value))!;
        props.setCurrency(accountCurrencyBalance);
    };

    return (
        <>
            <Spinner isLoading={isProcessingAddingMoneyRequest || isLoading} zIndex={appTheme.zIndex.modal + 1}/>
            <Dialog
                open={props.openAddMoneyDialog}
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
                            Add Money
                        </Typography>
                        <DialogContent
                            sx={{
                                width: "55%",
                                padding: "65px 5px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                rowGap: "15px",
                            }}
                        >
                            <FormControl fullWidth variant="standard">
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "flex-end",
                                        position: "relative",
                                    }}
                                >

                                    <TextField
                                        variant="standard"
                                        label="Amount"
                                        type="number"
                                        onChange={addBalanceChangeHandler}
                                        onBlur={addBalanceBlurHandler}
                                        value={addBalanceValue}
                                        error={addBalanceHasError}
                                        helperText={addBalanceHasError ? "Provide correct amount of money." : ''}
                                        sx={{
                                            '& .MuiInput-input': {
                                                '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
                                                    '-webkit-appearance': 'none',
                                                }
                                            },
                                            width: "100%",
                                        }}
                                    />
                                    <TextField
                                        select
                                        value={props.currency.currency}
                                        onChange={handleCurrencyChange}
                                        variant="standard"
                                        InputProps={{disableUnderline: true}}
                                        sx={{
                                            position: "absolute",
                                            width: "11.5%",
                                            right: "0%",
                                            bottom: addBalanceHasError ? "32%" : "0%",
                                            "& .MuiSelect-select:focus": {
                                                background: "none",
                                            },
                                        }}
                                    >
                                        {props.currencies.map((currencyBalance) => (
                                            <MenuItem key={currencyBalance.currency} value={currencyBalance.currency}>
                                                {currencyBalance.symbol}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Box>
                                <Typography
                                    color="text.secondary"
                                    sx={{
                                        fontSize: "12px",
                                        marginTop: "10px",
                                    }}
                                >
                                    Currency balance after money load: {props.currency.balance + Number(addBalanceValue)} {props.currency.symbol}
                                </Typography>
                                <Typography
                                    color="text.secondary"
                                    sx={{
                                        fontSize: "12px",
                                    }}
                                >
                                    Total balance after money load: 15.253,51 PLN
                                </Typography>
                            </FormControl>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                variant="contained"
                                size="large"
                                onClick={addBalanceHandler}
                                sx={{
                                    margin: "0 0 30px",
                                    width: "250px",
                                }}
                            >
                                Add money
                            </Button>
                        </DialogActions>
                    </Box>
                </Paper>
            </Dialog>
        </>
    );
};

export default AddMoneyDialog;
