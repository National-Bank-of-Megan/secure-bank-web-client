
import {Add, ArrowForward, Cached, Favorite,} from "@mui/icons-material";
import {Box, Fab, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography,} from "@mui/material";
import React, {useCallback, useEffect, useState} from "react";
import buttonStyles from "../../styles/ButtonStyles";
import TransferDialog from "./dialog/TransferDialog";
import AddMoneyDialog from "./dialog/AddMoneyDialog";
import AddFriendDialog from "./dialog/AddFriendDialog";
import useFetch, {RequestConfig} from "../../hook/use-fetch";
import {DEFAULT_SELECTED_CURRENCY, REST_PATH_AUTH} from "../../constants/Constants";
import AlertSnackBar, {AlertState} from "../notifications/AlertSnackBar";
import {Link} from "react-router-dom";
import {Decimal} from "decimal.js";
import {findCurrencyByName} from "../../common/transfer";
import Spinner from "../common/Spinner";
import AlertSnackBar from "../notofications/AlertSnackBar";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {UserState} from "../../reducers/user-reducer";
import {useAppDispatch, useAppSelector} from "../../hook/redux-hooks";
import {fetchSubAccounts} from "../../actions/account-action";

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
    const [subAccountsLoaded, setSubAccountsLoaded] = useState(false);
    const [successAlertState, setSuccessAlertState] = useState<AlertState>({
        isOpen: false,
        message: ''
    });
    const [errorAlertState, setErrorAlertState] = useState<AlertState>({
        isOpen: false,
        message: ''
    });

    const [accountCurrencyBalanceList, setAccountCurrencyBalanceList] = useState<AccountCurrencyBalance[]>(selector['subAccounts']);
    const [favoriteReceiversList, setFavoriteReceiversList] = useState<FavoriteReceiverResponse[]>([]);

    const [selectedCurrencyName, setSelectedCurrencyName] = useState<string>("PLN");

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

    const [isAddMoneyErrorMessageOpen, setIsAddMoneyErrorMessageOpen] = useState(false);
    const [isAddMoneySuccessMessageOpen, setIsAddMoneySuccessMessageOpen] = useState(false);
    const [isAddFriendErrorMessageOpen, setIsAddFriendErrorMessageOpen] = useState(false);
    const [isAddFriendSuccessMessageOpen, setIsAddFriendSuccessMessageOpen] = useState(false);



    const selector= useAppSelector((state :RootState)=>state.account);
    const dispatch = useAppDispatch()

    const [accountCurrencyBalanceList, setAccountCurrencyBalanceList] = useState<AccountCurrencyBalance[]>(selector['subAccounts']);
    const [selectedCurrency, setSelectedCurrency] = useState<AccountCurrencyBalance>({
        currency: accountCurrencyBalanceList[0].currency,
        symbol: accountCurrencyBalanceList[0].symbol,
        balance: accountCurrencyBalanceList[0].balance
    });
    //default currency for transfer
    const [dialogCurrency, setDialogCurrency] = useState(selectedCurrency.currency);

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
        setAccountCurrencyBalanceList(accountCurrencyBalanceList.map(currency => currency.currency === currencyName
                                                ? {...currency, balance: Decimal.add(currency.balance, amountToAdd)} : currency))
    }

    const chargeCurrencyBalance = (currencyName: string, amountToCharge: Decimal) => {
        setAccountCurrencyBalanceList(accountCurrencyBalanceList.map(currency => currency.currency === currencyName
            ? {...currency, balance: Decimal.sub(currency.balance, amountToCharge)} : currency))
    }

    const findCurrencyByName = useCallback((selectedCurrencyName: string, loadedCurrencyBalances: AccountCurrencyBalance[]): AccountCurrencyBalance | undefined => {
        return loadedCurrencyBalances.find((accountCurrencyBalance) => {
            return accountCurrencyBalance.currency === selectedCurrencyName;
        });
    }, []);

    const handleCurrencyChange = (e: SelectChangeEvent) => {
        const selectedCurrencyName = e.target.value;
        setSelectedCurrencyName(selectedCurrencyName);
    }

    const mapSelectedCurrencyToString = (accountCurrencyBalance: AccountCurrencyBalance) => {
        return `${accountCurrencyBalance.currency} - ${accountCurrencyBalance.balance} ${accountCurrencyBalance.symbol}`;
    }


    useEffect(()=>{
        dispatch(fetchSubAccounts()).then(r => console.log('SubAccounts loaded ...'))
    },[setAccountCurrencyBalanceList,dispatch])

        const fetchSubAccountsRequest: RequestConfig = {
            url: REST_PATH_AUTH + '/account/currency/all'
        };

        sendSubAccountsRequest(fetchSubAccountsRequest, transformSubAccounts);
    }, [findCurrencyByName, sendSubAccountsRequest]);

    return (
        <>

            <AlertSnackBar alertState={{"state": errorAlertState, "setState": setErrorAlertState}}
                           severity="error" />
            <AlertSnackBar alertState={{"state": successAlertState, "setState": setSuccessAlertState}}
                           severity="success" />


            <Typography variant="h2" color="primary.main">
                Total balance
            </Typography>
            <Typography variant="h2" fontWeight="200" sx={{mt: "10px"}}>
                15.750,89 PLN
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "380px",
                }}
            >
                <FormControl
                    variant="standard"
                    sx={{
                        m: 1,
                        minWidth: 120,
                        marginTop: "88px",
                        marginBottom: "88px",
                    }}
                >
                    <InputLabel sx={{
                        color: "primary.main",
                        fontSize: "18px"
                    }}>Currency balance</InputLabel>
                    <Select value={selectedCurrencyName} onChange={handleCurrencyChange}>
                        {accountCurrencyBalanceList.map((accountCurrencyBalance) => (
                            <MenuItem value={accountCurrencyBalance.currency}>{mapSelectedCurrencyToString(accountCurrencyBalance)}</MenuItem>
                        ))}
                    </Select>
                    {/*<List*/}
                    {/*    sx={{*/}
                    {/*        width: '100%',*/}
                    {/*        bgcolor: 'background.paper',*/}

                    {/*    }}*/}
                    {/*>*/}
                    {/*    {accountCurrencyBalanceList.map((accountCurrencyBalance) => {*/}
                    {/*        return (*/}
                    {/*            <>*/}
                    {/*                <ListItem sx={{*/}
                    {/*                    paddingTop: '10px',*/}
                    {/*                    paddingBottom: '10px'*/}
                    {/*                }}>*/}
                    {/*                    <ListItemAvatar>*/}
                    {/*                        <Avatar>*/}
                    {/*                            <ImageIcon/>*/}
                    {/*                        </Avatar>*/}
                    {/*                    </ListItemAvatar>*/}
                    {/*                    <ListItemText primary="Photos" secondary="Jan 9, 2014"/>*/}
                    {/*                </ListItem>*/}
                    {/*                <Divider component="li"/>*/}
                    {/*            </>*/}
                    {/*        );*/}
                    {/*    })}*/}
                    {/*</List>*/}

                </FormControl>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        rowGap: "40px",
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

            {subAccountsLoaded &&
                <>
                    <TransferDialog
                        openTransferDialog={openTransferDialog}
                        setOpenTransferDialog={setOpenTransferDialog}
                        selectedCurrencyName={selectedCurrencyName}
                        setSelectedCurrencyName={setSelectedCurrencyName}
                        currencies={accountCurrencyBalanceList}
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
                        currencies={accountCurrencyBalanceList}
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
