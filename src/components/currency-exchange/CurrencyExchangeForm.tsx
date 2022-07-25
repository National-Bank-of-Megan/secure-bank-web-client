import {Avatar, Box, Button, FormHelperText, Stack, Typography,} from "@mui/material";
import React, {useState} from "react";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CurrencyExchangeCard from "./CurrencyExchangeCard";
import ArrowDownwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowDownward';
import {IExchangeData} from "../../pages/CurrencyExchangePage";
import {UseStateType} from "../../models/custom-types/UseStateType";

// import CurrencyExchangeCard from "./CurrencyExchangeCard";

export enum Action {
    sell,
    buy
}

const CurrencyExchangeForm: React.FC<{ exchange: UseStateType<IExchangeData> }> = ({exchange}) => {
    const [isArrowUp, setIsArrowUp] = useState<boolean>(false);
    const [actions, setActions] = useState({
        "upCard": Action.sell,
        "downCard": Action.buy
    })

    const handleAmountChange = (action: Action, amount: number) => {
        if (action === Action.buy) exchange.setState({...exchange.state, "bought": amount})
        else exchange.setState({...exchange.state, "sold": amount})

    };

    const handleCurrencyChange = (action: Action, currency: string) => {
        if (action === Action.buy) exchange.setState({...exchange.state, "boughtCurrency": currency})
        else exchange.setState({...exchange.state, "soldCurrency": currency})
    }

    const returnArrow = () => {
        if (isArrowUp) return <ArrowUpwardIcon sx={{color: "primary.main"}}/>
        else return <ArrowDownwardIcon sx={{color: "primary.main"}}/>
    }

    const arrowChangeHandler = () => {
       setActions({
           "upCard" : actions.upCard === Action.buy? Action.sell : Action.buy,
           "downCard": actions.upCard !== Action.buy? Action.sell : Action.buy
       })


        // exchange.setState({
        //     ...exchange.state,
        //     sold: exchange.state.bought,
        //     bought: exchange.state.sold
        // })
        setIsArrowUp(!isArrowUp);

    }


    return (
        <>
            <Box gap={2} sx={{display: 'flex', flexDirection: 'column'}}>
                <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}} gap={1}>
                    <TrendingUpIcon sx={{color: "primary.main"}}/>
                    <Typography variant="h5" color="primary.main">PLN = CHF 0.02244</Typography>
                </Box>
                <Box>
                    <Box sx={{width: '480px'}}>
                        <CurrencyExchangeCard
                            action={actions.upCard}
                            currency={exchange.state.soldCurrency}
                            amount={exchange.state.sold}
                            handleCurrencyChange={handleCurrencyChange}
                            handleAmountChange={handleAmountChange}
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
                            action={actions.downCard}
                            currency={exchange.state.boughtCurrency}
                            amount={exchange.state.bought}
                            handleCurrencyChange={handleCurrencyChange}
                            handleAmountChange={handleAmountChange}
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
                <Button variant="contained" size="large" sx={{width: '480px'}}>
                    Exchange
                </Button>

            </Box>
        </>
    );
}

export default CurrencyExchangeForm;
