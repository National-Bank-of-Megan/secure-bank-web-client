
import {Add, ArrowForward, Cached, Favorite,} from "@mui/icons-material";
import {Box, Fab, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography,} from "@mui/material";
import React, {useCallback, useEffect, useState} from "react";
import buttonStyles from "../../styles/ButtonStyles";
import TransferDialog from "./dialog/TransferDialog";
import AddMoneyDialog from "./dialog/AddMoneyDialog";
import AddFriendDialog from "./dialog/AddFriendDialog";
import useFetch, {Headers, RequestConfig} from "../../hook/use-fetch";
import {DEFAULT_SELECTED_CURRENCY, REST_PATH_AUTH} from "../../constants/Constants";
import Spinner from "../common/Spinner";
import AlertSnackBar from "../notofications/AlertSnackBar";

export const currencies = [
    {
        value: "USD",
        label: "$",
    },
    {
        value: "EUR",
        label: "€",
    },
    {
        value: "BTC",
        label: "฿",
    },
    {
        value: "JPY",
        label: "¥",
    },
];

const availableCurrencies = {
    'EUR': "€",
    'USD': "$",
    'PLN': "zł",
    'CHF': "Fr",
    'GBP': "£"
};

export type AccountCurrencyBalance = {
    currency: string;
    symbol: string;
    balance: number;
};

type AccountCurrencyBalanceResponse = {
    currency: string;
    balance: number;
};

const TotalBalanceContent = () => {
    const [openTransferDialog, setOpenTransferDialog] = useState(false);
    const [openAddMoneyDialog, setOpenAddMoneyDialog] = useState(false);
    const [openAddFriendDialog, setOpenAddFriendDialog] = useState(false);
    const [isAddMoneyErrorMessageOpen, setIsAddMoneyErrorMessageOpen] = useState(false);
    const [isAddMoneySuccessMessageOpen, setIsAddMoneySuccessMessageOpen] = useState(false);
    const [isAddFriendErrorMessageOpen, setIsAddFriendErrorMessageOpen] = useState(false);
    const [isAddFriendSuccessMessageOpen, setIsAddFriendSuccessMessageOpen] = useState(false);


    const [accountCurrencyBalanceList, setAccountCurrencyBalanceList] = useState<AccountCurrencyBalance[]>([]);
    const [dialogCurrency, setDialogCurrency] = useState("EUR");
    const [selectedCurrency, setSelectedCurrency] = useState<AccountCurrencyBalance>({
        currency: "",
        symbol: "",
        balance: 0.0
    });

    const { isLoading, error, sendRequest: sendSubAccountsRequest } = useFetch();

    const handleTransferDialogOpen = () => {
        setOpenTransferDialog(true);
    };

    const handleAddMoneyDialogOpen = () => {
        setOpenAddMoneyDialog(true);
    };

    const handleAddFriendDialogOpen = () => {
        setOpenAddFriendDialog(true);
    };

    const updateCurrencyBalance = (currencyName: string, amountToAdd: number) => {
        setAccountCurrencyBalanceList(accountCurrencyBalanceList.map(currency => currency.currency === currencyName
                                                ? {...currency, balance: currency.balance + amountToAdd} : currency))
    }

    const findCurrencyByName = useCallback((selectedCurrencyName: string, loadedCurrencyBalances: AccountCurrencyBalance[]): AccountCurrencyBalance | undefined => {
        return loadedCurrencyBalances.find((accountCurrencyBalance) => {
            return accountCurrencyBalance.currency === selectedCurrencyName;
        });
    }, []);

    const handleCurrencyChange = (e: SelectChangeEvent) => {
        const selectedCurrencyName = e.target.value;
        const userSelectedCurrency = findCurrencyByName(selectedCurrencyName, accountCurrencyBalanceList)!;
        setSelectedCurrency(userSelectedCurrency);
    }

    const mapSelectedCurrencyToString = (accountCurrencyBalance: AccountCurrencyBalance) => {
        return `${accountCurrencyBalance.currency} - ${accountCurrencyBalance.balance} ${accountCurrencyBalance.symbol}`;
    }

    useEffect(() => {
        const transformSubAccounts = (currenciesBalanceObj: AccountCurrencyBalanceResponse[]) => {
            const loadedCurrencyBalances: AccountCurrencyBalance[] = [];
            for (const key in currenciesBalanceObj) {
                loadedCurrencyBalances.push({
                    currency: currenciesBalanceObj[key].currency,
                    symbol: availableCurrencies[currenciesBalanceObj[key].currency as keyof typeof availableCurrencies],
                    balance: currenciesBalanceObj[key].balance
                });
            }

            setAccountCurrencyBalanceList(loadedCurrencyBalances);
            setSelectedCurrency(findCurrencyByName(DEFAULT_SELECTED_CURRENCY, loadedCurrencyBalances)!);
        }

        const fetchSubAccountsRequest: RequestConfig = {
            url: REST_PATH_AUTH + '/account/currency/all'
        };

        sendSubAccountsRequest(fetchSubAccountsRequest, transformSubAccounts);
    }, [findCurrencyByName, sendSubAccountsRequest]);

    return (
        <>
            <Spinner isLoading={isLoading} />
            <AlertSnackBar alertState={{"state": isAddMoneyErrorMessageOpen, "setState": setIsAddMoneyErrorMessageOpen}}
                           severity="error"
                           message="Could not add money to your balance."/>
            <AlertSnackBar alertState={{"state": isAddMoneySuccessMessageOpen, "setState": setIsAddMoneySuccessMessageOpen}}
                           severity="success"
                           message="Successfully added funds to your acccount."/>

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
                    <Select value={selectedCurrency.currency} onChange={handleCurrencyChange}>
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

            <TransferDialog
                openTransferDialog={openTransferDialog}
                setOpenTransferDialog={setOpenTransferDialog}
                currency={dialogCurrency}
                setCurrency={setDialogCurrency}
            />
            <AddMoneyDialog
                openAddMoneyDialog={openAddMoneyDialog}
                setOpenAddMoneyDialog={setOpenAddMoneyDialog}
                currency={selectedCurrency}
                setCurrency={setSelectedCurrency}
                currencies={accountCurrencyBalanceList}
                setIsErrorMessageOpen={setIsAddMoneyErrorMessageOpen}
                setIsSuccessMessageOpen={setIsAddMoneySuccessMessageOpen}
                updateCurrencyBalance={updateCurrencyBalance}
            />
            <AddFriendDialog
                openAddFriendDialog={openAddFriendDialog}
                setOpenAddFriendDialog={setOpenAddFriendDialog}
                setIsErrorMessageOpen={setIsAddFriendErrorMessageOpen}
                setIsSuccessMessageOpen={setIsAddFriendSuccessMessageOpen}
            />
        </>
    );
};

export default TotalBalanceContent;
