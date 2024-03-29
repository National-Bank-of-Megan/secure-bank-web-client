import {Add, ArrowForward, Cached, Favorite,} from "@mui/icons-material";
import {Box, Fab, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography,} from "@mui/material";
import React, {useEffect, useState} from "react";
import buttonStyles from "../../styles/ButtonStyles";
import TransferDialog from "./dialog/TransferDialog";
import AddMoneyDialog from "./dialog/AddMoneyDialog";
import AddFriendDialog from "./dialog/AddFriendDialog";
import useFetch, {RequestConfig} from "../../hook/use-fetch";
import {Link} from "react-router-dom";
import {Decimal} from "decimal.js";
import store from "../../store/store";
import {useAppDispatch, useAppSelector} from "../../hook/redux-hooks";
import AlertSnackBar, {AlertState} from "../notifications/AlertSnackBar";
import {REST_PATH_ACCOUNT} from "../../constants/Constants";
import {subaccountBalanceActions} from "../../store/slice/subaccountBalanceSlice";

export const availableCurrencies = {
    'EUR': "€",
    'USD': "$",
    'PLN': "zł",
    'CHF': "Fr",
    'GBP': "£"
};

export type AccountCurrencyBalance = {
    currency: string;
    symbol: string;
    balance: Decimal;
};

export type AccountCurrencyBalanceResponse = {
    currency: string;
    balance: Decimal;
};

export type FavoriteReceiverResponse = {
    id: number;
    name: string;
    accountNumber: string;
};

//todo handle error loading subaccounts

const TotalBalanceContent = () => {
    const [openTransferDialog, setOpenTransferDialog] = useState(false);
    const [openAddMoneyDialog, setOpenAddMoneyDialog] = useState(false);
    const [openAddFriendDialog, setOpenAddFriendDialog] = useState(false);

    const [selectedCurrencyName, setSelectedCurrencyName] = useState<string>("");

    const subaccountsState = useAppSelector((state) => state.subaccountBalance);
    const dispatch = useAppDispatch();

    const [subAccountsLoaded, setSubAccountsLoaded] = useState(false);
    const [successAlertState, setSuccessAlertState] = useState<AlertState>({
        isOpen: false,
        message: ''
    });
    const [errorAlertState, setErrorAlertState] = useState<AlertState>({
        isOpen: false,
        message: ''
    });
    const [favoriteReceiversList, setFavoriteReceiversList] = useState<FavoriteReceiverResponse[]>([]);

    const {
        isLoading: isSubAccountsLoading,
        error: subAccountsError,
        sendRequest: sendSubAccountsRequest
    } = useFetch();

    const {
        isLoading: isFavoriteTransferReceiversLoading,
        error: favoriteTransferReceiversError,
        sendRequest: sendFavoriteTransferReceiversRequest
    } = useFetch();

    const handleTransferDialogOpen = () => {
        setOpenTransferDialog(true);
    };

    const handleAddMoneyDialogOpen = () => {
        setOpenAddMoneyDialog(true);
    };

    const handleAddFriendDialogOpen = () => {
        setOpenAddFriendDialog(true);
    };

    const addCurrencyBalance = (currencyName: string, amountToAdd: string) => {
        dispatch(subaccountBalanceActions.addToBalance({
            currency: currencyName,
            amount: new Decimal(amountToAdd)
        }));
    }

    const chargeCurrencyBalance = (currencyName: string, amountToCharge: Decimal) => {
        dispatch(subaccountBalanceActions.subtractFromBalance({
            currency: currencyName,
            amount: new Decimal(amountToCharge)
        }));
    }

    const handleCurrencyChange = (e: SelectChangeEvent) => {
        const selectedCurrencyName = e.target.value;
        setSelectedCurrencyName(selectedCurrencyName);
    }

    const mapSelectedCurrencyToString = (accountCurrencyBalance: AccountCurrencyBalance) => {
        return `${accountCurrencyBalance.currency} - ${accountCurrencyBalance.balance} ${accountCurrencyBalance.symbol}`;
    }


    useEffect(() => {
        //  get subaccounts
        const transformSubAccounts = (currenciesBalanceObj: AccountCurrencyBalanceResponse[]) => {
            const loadedCurrencyBalances: AccountCurrencyBalance[] = [];
            for (const key in currenciesBalanceObj) {
                loadedCurrencyBalances.push({
                    currency: currenciesBalanceObj[key].currency,
                    symbol: availableCurrencies[currenciesBalanceObj[key].currency as keyof typeof availableCurrencies],
                    balance: currenciesBalanceObj[key].balance
                });
            }
            dispatch(subaccountBalanceActions.setSubaccountsBalance(loadedCurrencyBalances))
            setSubAccountsLoaded(true);
            setSelectedCurrencyName("PLN");
        }

        const fetchSubAccountsRequest: RequestConfig = {
            url: REST_PATH_ACCOUNT + '/currency/all'
        };

        sendSubAccountsRequest(fetchSubAccountsRequest, transformSubAccounts);

        //    get favorite transfer receivers
        const transformFavorites = (favoriteReceiversObj: FavoriteReceiverResponse[]) => {
            setFavoriteReceiversList(favoriteReceiversObj);
        }

        const fetchFavoriteReceiversRequest = {
            url: REST_PATH_ACCOUNT + '/receiver/all'
        }

        sendFavoriteTransferReceiversRequest(fetchFavoriteReceiversRequest, transformFavorites)
    }, [sendSubAccountsRequest, sendFavoriteTransferReceiversRequest, dispatch])


    return (
        <>
            <AlertSnackBar alertState={{"state": errorAlertState, "setState": setErrorAlertState}}
                           severity="error"/>
            <AlertSnackBar alertState={{"state": successAlertState, "setState": setSuccessAlertState}}
                           severity="success"/>

            <Box sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%"
            }}>
                <Box>
                    <Typography variant="h2" color="primary.main" letterSpacing="0.045em">
                        Total balance
                    </Typography>
                    <Typography variant="h2" fontWeight="200" sx={{mt: "10px"}}>
                        15.750,89 PLN
                    </Typography>
                </Box>
                <Box>
                    <FormControl
                        variant="standard"
                        sx={{
                            m: 1,
                            minWidth: "370px"
                        }}
                    >
                        <InputLabel sx={{
                            color: "primary.main",
                            fontSize: "18px"
                        }}>Currency balance</InputLabel>
                        <Select value={selectedCurrencyName} onChange={handleCurrencyChange}>
                            {subaccountsState.subaccounts.map((accountCurrencyBalance) => (
                                <MenuItem key={accountCurrencyBalance.currency}
                                    value={accountCurrencyBalance.currency}>{mapSelectedCurrencyToString(accountCurrencyBalance)}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            rowGap: "40px",
                            width: "385px"
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <Fab
                                color="primary"
                                variant="extended"
                                aria-label="transfer"
                                size="large"
                                sx={buttonStyles}
                                onClick={handleAddMoneyDialogOpen}
                            >
                                <Add sx={{mr: 1}}/>
                                Add money
                            </Fab>
                            <Fab
                                color="error"
                                variant="extended"
                                aria-label="transfer"
                                size="large"
                                sx={buttonStyles}
                                onClick={handleTransferDialogOpen}
                            >
                                <ArrowForward sx={{mr: 1}}/>
                                Transfer
                            </Fab>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <Fab
                                component={Link}
                                to="/exchange"
                                color="primary"
                                variant="extended"
                                aria-label="transfer"
                                size="large"
                                sx={buttonStyles}
                            >
                                <Cached sx={{mr: 1}}/>
                                Exchange
                            </Fab>
                            <Fab
                                color="success"
                                variant="extended"
                                aria-label="transfer"
                                size="large"
                                sx={buttonStyles}
                                onClick={handleAddFriendDialogOpen}
                            >
                                <Favorite sx={{mr: 1}}/>
                                Add Friend
                            </Fab>
                        </Box>
                    </Box>
                </Box>
            </Box>

            {subAccountsLoaded &&
                <>
                    <TransferDialog
                        openTransferDialog={openTransferDialog}
                        setOpenTransferDialog={setOpenTransferDialog}
                        selectedCurrencyName={selectedCurrencyName}
                        setSelectedCurrencyName={setSelectedCurrencyName}
                        favoriteReceivers={favoriteReceiversList}
                        setErrorAlertState={setErrorAlertState}
                        setSuccessAlertState={setSuccessAlertState}
                        updateCurrencyBalance={chargeCurrencyBalance}
                    />
                    <AddMoneyDialog
                        openAddMoneyDialog={openAddMoneyDialog}
                        setOpenAddMoneyDialog={setOpenAddMoneyDialog}
                        selectedCurrencyName={selectedCurrencyName}
                        setSelectedCurrencyName={setSelectedCurrencyName}
                        setErrorAlertState={setErrorAlertState}
                        setSuccessAlertState={setSuccessAlertState}
                        updateCurrencyBalance={addCurrencyBalance}
                    />
                </>
            }
            <AddFriendDialog
                openAddFriendDialog={openAddFriendDialog}
                setOpenAddFriendDialog={setOpenAddFriendDialog}
                setErrorAlertState={setErrorAlertState}
                setSuccessAlertState={setSuccessAlertState}
                setFavoriteReceiversList={setFavoriteReceiversList}
            />
        </>
    );
};

export default TotalBalanceContent;
