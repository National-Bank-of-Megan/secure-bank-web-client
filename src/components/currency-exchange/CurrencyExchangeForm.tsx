import {Avatar, Box, Button, FormHelperText, Stack, Typography,} from "@mui/material";
import React, {useCallback, useEffect, useState} from "react";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CurrencyExchangeCard from "./CurrencyExchangeCard";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {IExchangeData} from "../../pages/CurrencyExchangePage";
import {UseStateType} from "../../models/custom-types/UseStateType";
import {CURRENCIES, REST_PATH_EXCHANGE} from "../../constants/Constants";
import useFetch, {RequestConfig} from "../../hook/use-fetch";
import Spinner from "../common/Spinner";
import AlertSnackBar from "../notofications/AlertSnackBar";

export enum Action {
    sell,
    buy
}

const CurrencyExchangeForm: React.FC<{ top: UseStateType<IExchangeData>, bottom: UseStateType<IExchangeData>, rates: { [name: string]: number } }> = ({
                                                                                                                                                          top,
                                                                                                                                                          bottom,rates
}) => {
    const { isLoading, error, sendRequest: sendExchangeCurrencyRequest } = useFetch();
    const [isExchangeCurrencyErrorMessageOpen, setIsExchangeCurrencyErrorMessageOpen] = useState(false);
    const [isExchangeCurrencySuccessMessageOpen, setIsExchangeCurrencySuccessMessageOpen] = useState(false);
    const conversionRate = rates[bottom.state.currency];
    const [isArrowUp, setIsArrowUp] = useState<boolean>(false);

    const handleAmountChange = useCallback((newAmount: number, actionSettingNewAmount: Action) => {
        if (top.state.action === actionSettingNewAmount) {
            //    calculate bottom
            let convertedNewAmount = newAmount * conversionRate;
            bottom.setState({...bottom.state, "amount": convertedNewAmount})
        } else {
            //  calculate top
            let convertedNewAmount = newAmount / conversionRate;
            top.setState({...top.state, "amount": convertedNewAmount})
        }
    },[]);

    const returnArrow = () => {
        if (isArrowUp) return <ArrowUpwardIcon sx={{color: "primary.main"}}/>
        else return <ArrowDownwardIcon sx={{color: "primary.main"}}/>
    }

    const arrowChangeHandler = () => {
        top.setState({...top.state, action: top.state.action === Action.sell ? Action.buy : Action.sell})
        bottom.setState({...bottom.state, action: bottom.state.action === Action.sell ? Action.buy : Action.sell})
        setIsArrowUp(!isArrowUp);
    }

    const exchangeCurrency=()=>{
        const exchangeCurrencyRequest :RequestConfig={
            url : REST_PATH_EXCHANGE + '/',
            method :'POST',
            body : {
                "currencyBought" : top.state.action === Action.buy ? top.state.currency : bottom.state.currency,
                "currencySold" : top.state.action === Action.sell ? top.state.currency : bottom.state.currency,
                "exchangeTime" : new Date(),
                "sold" :  top.state.action === Action.sell ? top.state.amount : bottom.state.amount
            },
            headers: {
                'Content-Type': 'application/json'
            }
        }
        sendExchangeCurrencyRequest(exchangeCurrencyRequest, ()=>{
            top.setState({...top.state, "amount" : 0.00})
            setIsExchangeCurrencySuccessMessageOpen(true);
        })

    }

    useEffect(()=>{
        if (!!error) {
            setIsExchangeCurrencyErrorMessageOpen(true);
        }
    },[error, setIsExchangeCurrencyErrorMessageOpen])

    return (
        <>
            <Spinner isLoading={isLoading} />
            <AlertSnackBar alertState={{"state": isExchangeCurrencyErrorMessageOpen, "setState": setIsExchangeCurrencyErrorMessageOpen}}
                           severity="error"
                           message="Could not exchange currency."/>
            <AlertSnackBar alertState={{"state": isExchangeCurrencySuccessMessageOpen, "setState": setIsExchangeCurrencySuccessMessageOpen}}
                           severity="success"
                           message="Successfully exchanged currency."/>
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
                        disabled={top.state.currency === bottom.state.currency}
                        onClick={exchangeCurrency}
                >
                    Exchange
                </Button>

            </Box>
        </>
    );
}

export default CurrencyExchangeForm;
