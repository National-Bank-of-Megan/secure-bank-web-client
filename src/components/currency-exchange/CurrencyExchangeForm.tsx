import {Avatar, Box, Button, Stack, Typography,} from "@mui/material";
import React, {Dispatch, SetStateAction, useCallback, useEffect, useState} from "react";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CurrencyExchangeCard from "./CurrencyExchangeCard";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {IExchangeData} from "../../pages/CurrencyExchangePage";
import {UseStateType} from "../../models/custom-types/UseStateType";
import {CURRENCIES, REST_PATH_EXCHANGE} from "../../constants/Constants";
import useFetch, {RequestConfig} from "../../hook/use-fetch";
import Spinner from "../common/Spinner";
import AlertSnackBar, {AlertState} from "../notifications/AlertSnackBar";
import store from "../../store/store";
import {findCurrencyByName} from "../../common/transfer";
import {AccountCurrencyBalance} from "../transfers/TotalBalanceContent";
import ServerError from "../notifications/ServerError";
import {useAppDispatch, useAppSelector} from "../../hook/redux-hooks";
import {subaccountBalanceActions} from "../../store/slice/subaccountBalanceSlice";
import {Decimal} from "decimal.js";


export enum Action {
    sell,
    buy
}

const CurrencyExchangeForm: React.FC<{ top: UseStateType<IExchangeData>, bottom: UseStateType<IExchangeData>, rates: { [name: string]: number } }> = ({

                                                                                                                                                          top,
                                                                                                                                                          bottom,
                                                                                                                                                          rates
                                                                                                                                                      }) => {
    const subaccountsState = useAppSelector((state) => state.subaccountBalance);
    const dispatch = useAppDispatch();
    const {isLoading, error, sendRequest: sendExchangeCurrencyRequest} = useFetch();
    const [serverError, setServerError] = useState<boolean>(false);
    const [successAlertState, setSuccessAlertState] = useState<AlertState>({
        isOpen: false,
        message: ''
    });
    const [errorAlertState, setErrorAlertState] = useState<AlertState>({
        isOpen: false,
        message: ''
    });
    const conversionRate = rates[bottom.state.currency];
    const [isArrowUp, setIsArrowUp] = useState<boolean>(false);
    const [currentTopAmount, setCurrentTopAmount] = useState<number>(0.00);
    const [currentBottomAmount, setCurrentBottomAmount] = useState<number>(0.00);

    const getSubAccountBalance = (currency: string) => {
        let x = null;
        let subAccounts: AccountCurrencyBalance[] = subaccountsState.subaccounts;
        subAccounts.forEach((sub) => {
            if (sub['currency'] === currency) x = sub['balance']
        })
        if (x === null) setServerError(true);
        return x;
    }

    const checkIfExchangePossible = (setError: Dispatch<SetStateAction<AlertState>>, state: UseStateType<IExchangeData>, newAmount: number, balance: number, convertedNewAmount: number, currency: string) => {
        if (Math.abs(newAmount) > balance && state.state.action === Action.sell) {
            setErrorAlertState({
                isOpen: true,
                message: 'You do not have enough ' + state.state.currency + ' to buy ' + Math.abs(convertedNewAmount).toFixed(2) + ' ' + currency
            })
        } else {
            setErrorAlertState({...errorAlertState, isOpen: false})
        }
    }

    const handleAmountChange = useCallback((newAmount: number, actionSettingNewAmount: Action) => {

        if (top.state.action === actionSettingNewAmount) {
            setCurrentTopAmount(newAmount);
            const convertedNewAmount = Decimal.mul(newAmount, conversionRate).toDecimalPlaces(2).toNumber();
            setCurrentBottomAmount(convertedNewAmount);
            let balance = null;
            if (top.state.action === Action.sell) {
                bottom.setState({...bottom.state, "amount": convertedNewAmount})
                //    calculate bottom
                balance = getSubAccountBalance(top.state.currency) || -666;
                checkIfExchangePossible(setErrorAlertState, top, newAmount, balance, convertedNewAmount, bottom.state.currency)
            } else {
                bottom.setState({...bottom.state, "amount": convertedNewAmount})
                //    calculate bottom
                balance = getSubAccountBalance(bottom.state.currency) || -666;
                checkIfExchangePossible(setErrorAlertState, bottom, convertedNewAmount, balance, newAmount, top.state.currency)
            }
        }
    }, [top, bottom, setErrorAlertState, checkIfExchangePossible, conversionRate])

    const returnArrow = () => {
        if (isArrowUp) return <ArrowUpwardIcon sx={{color: "primary.main"}}/>
        else return <ArrowDownwardIcon sx={{color: "primary.main"}}/>
    }

    const arrowChangeHandler = () => {
        top.setState({...top.state, action: top.state.action === Action.sell ? Action.buy : Action.sell})
        bottom.setState({...bottom.state, action: bottom.state.action === Action.sell ? Action.buy : Action.sell})
        setIsArrowUp(!isArrowUp);
    }

    const exchangeCurrency = () => {
        const exchangeCurrencyRequest: RequestConfig = {
            url: REST_PATH_EXCHANGE + '/',
            method: 'POST',
            body: {
                "currencyBought": top.state.action === Action.buy ? top.state.currency : bottom.state.currency,
                "currencySold": top.state.action === Action.sell ? top.state.currency : bottom.state.currency,
                "exchangeTime": new Date(),
                "sold": top.state.action === Action.sell ? Math.abs(currentTopAmount) : Math.abs(currentBottomAmount)
            },
            headers: {
                'Content-Type': 'application/json'
            }
        }

        sendExchangeCurrencyRequest(exchangeCurrencyRequest, () => {
            top.setState({...top.state, "amount": 0.00})
            // dispatch(subaccountBalanceActions.setBalance({currency : top.state.currency, amount : getSubAccountBalance(top.state.currency)!+currentTopAmount}))
            // dispatch(subaccountBalanceActions.setBalance({currency : bottom.state.currency, amount : getSubAccountBalance(bottom.state.currency)!-currentBottomAmount}))
            dispatch(subaccountBalanceActions.addToBalance({currency: top.state.currency, amount: new Decimal(currentTopAmount)}))
            dispatch(subaccountBalanceActions.subtractFromBalance({
                currency: bottom.state.currency,
                amount: new Decimal(currentBottomAmount)
            }))
            setCurrentBottomAmount(0.00)
            setCurrentTopAmount(0.00)
            setSuccessAlertState({
                isOpen: true,
                message: 'Successfully exchanged currency.'
            });
        })

    }

    useEffect(() => {
        console.log(error)
        if (!!error) {
            setErrorAlertState({
                isOpen: true,
                message: error.message
            })
        }
    }, [error, setErrorAlertState])

    return (
        <>
            {serverError && <ServerError/>}
            {!serverError &&
                <>
                    <Spinner isLoading={isLoading}/>
                    <AlertSnackBar alertState={{"state": errorAlertState, "setState": setErrorAlertState}}
                                   severity="error"/>
                    <AlertSnackBar alertState={{"state": successAlertState, "setState": setSuccessAlertState}}
                                   severity="success"/>
                    <Box gap={2} sx={{display: 'flex', flexDirection: 'column'}}>
                        <Typography variant="h2" color="primary.main" sx={{marginBottom: '50px'}}>
                            Sell {top.state.action === Action.sell ? top.state.currency : bottom.state.currency}
                        </Typography>
                        <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}} gap={1}>
                            <TrendingUpIcon sx={{color: "primary.main"}}/>
                            <Typography variant="h5"
                                        color="primary.main">{'1' + bottom.state.currency + ' = ' + (1 / rates[bottom.state.currency]).toFixed(2) + top.state.currency}</Typography>
                        </Box>
                        <Box>
                            <Box sx={{width: '480px'}}>
                                <CurrencyExchangeCard
                                    isDisabled={false}
                                    exchange={top}
                                    handleAmountChangeOtherCard={handleAmountChange}
                                    currencies={
                                        CURRENCIES.filter(v => v !== bottom.state.currency)
                                    }
                                />
                                <Avatar
                                    onClick={arrowChangeHandler}
                                    sx={{
                                        bgcolor: 'background.paper',
                                        border: '1px solid primary',
                                        zIndex: '111111',
                                        position: 'relative',
                                        marginTop: '-14px',
                                        marginBottom: '-14px',
                                        marginLeft: '47%'
                                    }}>
                                    {returnArrow()}
                                </Avatar>

                                <CurrencyExchangeCard
                                    isDisabled={true}
                                    exchange={bottom}
                                    handleAmountChangeOtherCard={handleAmountChange}
                                    currencies={
                                        CURRENCIES.filter(v => v !== top.state.currency)
                                    }
                                />
                            </Box>
                        </Box>

                        <Stack spacing={0.1}>
                            {/*<FormHelperText error={(getSubAccountBalance(top.state.currency)! + currentTopAmount) < 0}>*/}
                            {/*    {top.state.currency + ' balance after transfer: ' + ((getSubAccountBalance(top.state.currency) || 0.00) + (currentTopAmount || 0.00)).toFixed(2)}*/}
                            {/*</FormHelperText>*/}
                            {/*<FormHelperText*/}
                            {/*    error={getSubAccountBalance(bottom.state.currency)! - currentBottomAmount < 0}>*/}
                            {/*    {bottom.state.currency + ' balance after transfer: ' + ((getSubAccountBalance(bottom.state.currency) || 0.00) - (currentBottomAmount || 0.00)).toFixed(2)}*/}
                            {/*</FormHelperText>*/}
                        </Stack>
                        <Button variant="contained" size="large" sx={{width: '480px'}}
                                disabled={errorAlertState.isOpen || currentTopAmount === 0.00}
                                onClick={exchangeCurrency}
                        >
                            Exchange
                        </Button>

                    </Box>
                </>
            }
        </>

    )
        ;
}

export default CurrencyExchangeForm;
