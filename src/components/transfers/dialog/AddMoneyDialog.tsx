import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    FormControl,
    MenuItem,
    Paper,
    TextField,
    Typography,
    useTheme,
} from "@mui/material";
import {AccountCurrencyBalance} from "../TotalBalanceContent";
import useInput from "../../../hook/use-input";
import useFetch, {RequestConfig} from "../../../hook/use-fetch";
import {REST_PATH_AUTH} from "../../../constants/Constants";
import React, {useEffect, useState} from "react";
import Spinner from "../../common/Spinner";
import {isValidAmount} from "../../../common/validation";
import {AlertState} from "../../notifications/AlertSnackBar";
import {findCurrencyByName} from "../../../common/transfer";
import {Decimal} from 'decimal.js';

const AddMoneyDialog: React.FC<{
    openAddMoneyDialog: boolean;
    setOpenAddMoneyDialog: (isOpen: boolean) => void;
    selectedCurrencyName: string;
    setSelectedCurrencyName: (currencyName: string) => void;
    currencies: AccountCurrencyBalance[]
    setErrorAlertState: (alertState: AlertState) => void;
    setSuccessAlertState: (alertState: AlertState) => void;
    updateCurrencyBalance: (currencyName: string, amountToAdd: string) => void;
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
            props.setErrorAlertState({
                isOpen: true,
                message: error.message
            });
            setIsProcessingAddingMoneyRequest(false);
        }
    }, [error, props.setErrorAlertState])

    const {
        value: addBalanceValue,
        isValid: addBalanceValueIsValid,
        hasError: addBalanceHasError,
        setIsTouched: setIsAddBalanceTouched,
        valueChangeHandler: addBalanceChangeHandler,
        inputBlurHandler: addBalanceBlurHandler,
        clearInput: clearAddBalanceValue
    } = useInput(isValidAmount, '', shouldUpdateInput);

    const handleAddToBalance = (response: any) => {
        setIsProcessingAddingMoneyRequest(false);
        console.log(addBalanceValue)
        props.updateCurrencyBalance(props.selectedCurrencyName, addBalanceValue);
        handleDialogClose();
        clearAddBalanceValue();
        props.setSuccessAlertState({
            isOpen: true,
            message: "Successfully added funds to your acccount."
        });
    }

    const addBalanceHandler = () => {
        if (!addBalanceValueIsValid) {
            setIsAddBalanceTouched(true);
            return;
        }

        const addToBalanceRequestContent: RequestConfig = {
            url: REST_PATH_AUTH + "/account/currency",
            method: "PUT",
            body: {
                'currency': props.selectedCurrencyName,
                'amount': addBalanceValue
            },
            headers: {
                'Content-Type': 'application/json'
            }
        };

        setIsProcessingAddingMoneyRequest(true);
        addBalanceRequest(addToBalanceRequestContent, handleAddToBalance);
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
        props.setSelectedCurrencyName(event.target.value);
    };

    const foundCurrency = findCurrencyByName(props.selectedCurrencyName, props.currencies)!;

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
                                        value={props.selectedCurrencyName}
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
                                    <>Currency balance after money load: {addBalanceValue.trim() !== '' ? Decimal.add(foundCurrency.balance, addBalanceValue).toString() : foundCurrency.balance.toString()} {foundCurrency.symbol}</>
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
