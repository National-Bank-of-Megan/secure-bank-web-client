import {People} from "@mui/icons-material";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    FormControl,
    IconButton,
    MenuItem,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import React, {useState} from "react";
import MyContactsDrawer from "../MyContactsDrawer";
import {AccountCurrencyBalance, FavoriteReceiverResponse} from "../TotalBalanceContent";
import useInput from "../../../hook/use-input";
import {isValidAccountNumber} from "../../../input-rules/is-valid-account-number";
import {isNotEmpty} from "../../../input-rules/is-not-empty";
import {
    isValidAmount,
    shouldUpdateTransferInput
} from "../../../common/validation";
import {removeErrorIfFieldEmpty} from "../../../common/input";
import useTransferInput from "../../../hook/use-transfer-input";
import useFetch, {RequestConfig} from "../../../hook/use-fetch";
import {REST_PATH_AUTH, REST_PATH_TRANSFER} from "../../../constants/Constants";

const TransferDialog: React.FC<{
    openTransferDialog: boolean;
    setOpenTransferDialog: (isOpen: boolean) => void;
    currency: AccountCurrencyBalance;
    setCurrency: (currency: AccountCurrencyBalance) => void;
    currencies: AccountCurrencyBalance[]
    favoriteReceivers: FavoriteReceiverResponse[];
    setIsErrorMessageOpen: (isOpen: boolean) => void;
    setIsSuccessMessageOpen: (isOpen: boolean) => void;
    updateCurrencyBalance: (currencyName: string, amountToAdd: number) => void;
}> = (props) => {
    const {isLoading, error, sendRequest: makeTransferRequest} = useFetch();

    const [friendsDrawerOpen, setFriendsDrawerOpen] = useState(false);
    const {
        value: accountNumberValue,
        isValid: accountNumberValueIsValid,
        hasError: accountNumberHasError,
        setIsTouched: setIsAccountNumberTouched,
        valueChangeHandler: accountNumberChangeHandler,
        inputBlurHandler: accountNumberBlurHandler,
        clearInput: clearAccountNumber,
        setEnteredValue: setAccountNumberValue
    } = useInput(isValidAccountNumber);
    const {
        value: titleValue,
        isValid: titleValueIsValid,
        hasError: titleHasError,
        setIsTouched: setIsTitleTouched,
        valueChangeHandler: titleChangeHandler,
        inputBlurHandler: titleBlurHandler,
        clearInput: clearTitleValue
    } = useInput(isNotEmpty);
    const {
        value: amountValue,
        isValid: amountValueIsValid,
        hasError: amountHasError,
        setIsTouched: setIsAmountTouched,
        valueChangeHandler: amountChangeHandler,
        inputBlurHandler: amountBlurHandler,
        clearInput: clearAmountValue
    } = useTransferInput(isValidAmount, props.currency.balance, shouldUpdateTransferInput);

    const handleCurrencyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const accountCurrencyBalance = props.currencies.find((nextCurrency) => (nextCurrency.currency === event.target.value))!;
        props.setCurrency(accountCurrencyBalance);
    };

    const handleDialogClose = () => {
        props.setOpenTransferDialog(false);
        setFriendsDrawerOpen(false);
        removeErrorIfFieldEmpty(accountNumberValue, setIsAccountNumberTouched);
        removeErrorIfFieldEmpty(titleValue, setIsTitleTouched);
        removeErrorIfFieldEmpty(amountValue, setIsAmountTouched);
    };

    const allInputsValid = () => {
        return accountNumberValueIsValid && titleValueIsValid && amountValueIsValid;
    }

    const setAllInputsError = () => {
        const setIsTouchedList = [setIsAccountNumberTouched, setIsTitleTouched, setIsAmountTouched];

        setIsTouchedList.forEach(setIsTouched => {
            setIsTouched(true);
        })
    }

    const makeTransferHandler = () => {
        if (!allInputsValid()) {
            setAllInputsError();
            return;
        }

        const makeTransferRequestContent: RequestConfig = {
            url: REST_PATH_TRANSFER,
            method: "POST",
            body: {

            },
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }

    const toggleDrawer = () => {
        setFriendsDrawerOpen(!friendsDrawerOpen);
    };

    return (
        // TODO: currency input component
        // TODO: balance info component
        <Dialog
            open={props.openTransferDialog}
            onClose={handleDialogClose}
            fullWidth
            maxWidth="md"
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
                        New transfer
                    </Typography>
                    <DialogContent
                        sx={{
                            width: "55%",
                            padding: "65px 24px",
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
                                    fullWidth
                                    variant="standard"
                                    label="Receiver"
                                    type="text"
                                    onChange={accountNumberChangeHandler}
                                    onBlur={accountNumberBlurHandler}
                                    value={accountNumberValue}
                                    error={accountNumberHasError}
                                    helperText={accountNumberHasError ? "Invalid account number." : ''}
                                    sx={{
                                        '& .MuiInput-input': {
                                            '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
                                                '-webkit-appearance': 'none',
                                            }
                                        }
                                    }}
                                />
                                <IconButton id="drawerButton" onClick={toggleDrawer} sx={{
                                    position: "absolute",
                                    right: "0%",
                                    bottom: accountNumberHasError ? "27%" : "-5%",
                                }}>
                                    <People/>
                                </IconButton>
                            </Box>


                        </FormControl>
                        <FormControl fullWidth variant="standard">
                            <TextField
                                variant="standard"
                                label="Title"
                                type="text"
                                onChange={titleChangeHandler}
                                onBlur={titleBlurHandler}
                                value={titleValue}
                                error={titleHasError}
                                helperText={titleHasError ? "Field cannot be empty." : ''}
                                sx={{
                                    '& .MuiInput-input': {
                                        '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
                                            '-webkit-appearance': 'none',
                                        }
                                    }
                                }}
                            />
                        </FormControl>
                        <FormControl fullWidth variant="standard">
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "flex-end",
                                    position: "relative",
                                }}
                            >
                                <TextField
                                    fullWidth
                                    variant="standard"
                                    label="Amount"
                                    type="number"
                                    onChange={amountChangeHandler}
                                    onBlur={amountBlurHandler}
                                    value={amountValue}
                                    error={amountHasError}
                                    helperText={amountHasError ? "Provide correct amount of money." : ''}
                                    sx={{
                                        '& .MuiInput-input': {
                                            '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
                                                '-webkit-appearance': 'none',
                                            }
                                        }
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
                                        width: "8%",
                                        right: "0%",
                                        bottom: amountHasError ? "32%" : "0%",
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
                                Currency balance after money load: {props.currency.balance - Number(amountValue)} {props.currency.symbol}
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
                            onClick={makeTransferHandler}
                            sx={{
                                margin: "0 0 30px",
                                width: "250px",
                            }}
                        >
                            Transfer money
                        </Button>
                    </DialogActions>
                </Box>
                <MyContactsDrawer
                    friendsDrawerOpen={friendsDrawerOpen}
                    setFriendsDrawerOpen={setFriendsDrawerOpen}
                    favoriteReceivers={props.favoriteReceivers}
                    writeAccountNumber={setAccountNumberValue}
                />
            </Paper>
        </Dialog>
    );
};

export default TransferDialog;
