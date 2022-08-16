import {Avatar, Box, Button, FormHelperText, Stack, Typography,} from "@mui/material";
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
import {useAppSelector} from "../../hook/redux-hooks";
import {RootState} from "../../store/store";
import {findCurrencyByName} from "../../common/transfer";

export enum Action {
    sell,
    buy
}

const CurrencyExchangeForm: React.FC<{ top: UseStateType<IExchangeData>, bottom: UseStateType<IExchangeData>, rates: { [name: string]: number } }> = ({

                                                                                                                                                          top,
                                                                                                                                                          bottom,
                                                                                                                                                          rates
                                                                                                                                                      }) => {
    const {isLoading, error, sendRequest: sendExchangeCurrencyRequest} = useFetch();
    const [serviceDisabled, setServiceDisabled] = useState<boolean>(false);
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

    const selector = useAppSelector((state: RootState) => state.account);

    const getSubAccountBalance = (currency: string) => {
        let x = null;
        let subAccounts: [] = selector['subAccounts'];
        subAccounts.forEach((sub) => {
            console.log('Loop ' + (sub['currency'] === bottom.state.currency))
            if (sub['currency'] === bottom.state.currency) x = sub['balance']
        })
        //todo handle service diabled
        if (x === null) setServiceDisabled(true);

        return x;
    }

    const checkIfExchangePossible = (setError: Dispatch<SetStateAction<AlertState>>, state: UseStateType<IExchangeData>, newAmount: number, balance: number, convertedNewAmount: number, currency: string) => {
        if (Math.abs(newAmount) > balance && state.state.action === Action.sell) {
            state.setState({...state.state, canExchangeBeMade: false})
            setErrorAlertState({
                isOpen: true,
                message: 'You do not have enough ' + state.state.currency + ' to buy ' + Math.abs(convertedNewAmount).toFixed(2) + ' ' + currency
            })
        } else {
            setErrorAlertState({...errorAlertState, isOpen: false})
            state.setState({...state.state, canExchangeBeMade: true})
        }
    }

    const handleAmountChange = useCallback((newAmount: number, actionSettingNewAmount: Action) => {
        // alert(top.state.action === actionSettingNewAmount)

        if (top.state.action === actionSettingNewAmount) {
            let balance = null;
            if (top.state.action === Action.sell) {
                let convertedNewAmount = newAmount * conversionRate;
                bottom.setState({...bottom.state, "amount": convertedNewAmount})
                console.log('Setting bottom from selling top')
                //    calculate bottom
                balance = getSubAccountBalance(top.state.currency) || -666;
                checkIfExchangePossible(setErrorAlertState, top, newAmount, balance, convertedNewAmount, bottom.state.currency)
            } else {
                console.log('Setting bottom from buying top')
                let convertedNewAmount = newAmount /conversionRate;
                bottom.setState({...bottom.state, "amount": convertedNewAmount})
                //    calculate bottom
                balance = getSubAccountBalance(bottom.state.currency) || -666;
                checkIfExchangePossible(setErrorAlertState, bottom, convertedNewAmount, balance, newAmount, top.state.currency)
            }


        } else {
            // calculate top
            if (bottom.state.action === Action.sell) {
                let convertedNewAmount = newAmount * conversionRate;
                top.setState({...top.state, "amount": convertedNewAmount})
            }else{
                let convertedNewAmount = newAmount /conversionRate;
                top.setState({...top.state, "amount": convertedNewAmount})
            }

            // let balance = null;
            // if (bottom.state.action === Action.sell) {
            //     //    calculate top
            //     let convertedNewAmount = newAmount * conversionRate;
            //     top.setState({...top.state, "amount": convertedNewAmount})
            //     balance = getSubAccountBalance(bottom.state.currency) || -666;
            //     checkIfExchangePossible(setErrorAlertState, bottom, newAmount, balance, convertedNewAmount, top.state.currency)
            // } else {
            //     //    calculate top
            //     let convertedNewAmount = newAmount / conversionRate;
            //     top.setState({...top.state, "amount": convertedNewAmount})
            //     balance = getSubAccountBalance(top.state.currency) || -666;
            //     checkIfExchangePossible(setErrorAlertState, top, convertedNewAmount, balance, newAmount, bottom.state.currency)
            // }


        }
    },[top,bottom,setErrorAlertState,findCurrencyByName,checkIfExchangePossible, conversionRate])

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
                "sold": top.state.action === Action.sell ? top.state.amount : bottom.state.amount
            },
            headers: {
                'Content-Type': 'application/json'
            }
        }
        sendExchangeCurrencyRequest(exchangeCurrencyRequest, () => {
            top.setState({...top.state, "amount": 0.00})
            setSuccessAlertState({
                isOpen: true,
                message: 'Successfully exchanged currency.'
            });
        })

    }

    useEffect(() => {
        if (!!error) {
            setErrorAlertState({
                isOpen: true,
                message: "Could not exchange currency."
            })
        }
    }, [error, setErrorAlertState])

    return (
        <>
            <Spinner isLoading={isLoading}/>
            <AlertSnackBar alertState={{"state": errorAlertState, "setState": setErrorAlertState}}
                           severity="error"/>
            <AlertSnackBar alertState={{"state": successAlertState, "setState": setSuccessAlertState}}
                           severity="success"/>
            <Box gap={2} sx={{display: 'flex', flexDirection: 'column'}}>
                <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}} gap={1}>
                    <TrendingUpIcon sx={{color: "primary.main"}}/>
                    <Typography variant="h5"
                                color="primary.main">{'1' + bottom.state.currency + ' = ' + top.state.currency}</Typography>
                </Box>
                <Box>
                    <Box sx={{width: '480px'}}>
                        <CurrencyExchangeCard
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
                            exchange={bottom}
                            handleAmountChangeOtherCard={handleAmountChange}
                            currencies={
                                CURRENCIES.filter(v => v !== top.state.currency)
                            }
                        />
                    </Box>
                </Box>

                <Stack spacing={0.1}>
                    <FormHelperText>
                        PLN balance after transfer: 15.253,51 PLN
                    </FormHelperText>
                    <FormHelperText>
                        CHF balance after transfer: 323,51 CHF
                    </FormHelperText>
                </Stack>
                <Button variant="contained" size="large" sx={{width: '480px'}}
                        disabled={top.state.currency === bottom.state.currency || !bottom.state.canExchangeBeMade || !top.state.canExchangeBeMade}
                        onClick={exchangeCurrency}
                >
                    Exchange
                </Button>

            </Box>
        </>
    );
}

export default CurrencyExchangeForm;
