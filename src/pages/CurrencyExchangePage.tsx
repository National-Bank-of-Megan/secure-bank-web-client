import {Grid, Typography} from "@mui/material";
import CurrencyExchangeForm, {Action} from "../components/currency-exchange/CurrencyExchangeForm";
import React, {useEffect, useState} from "react";
import useFetchCurrencyRates from "../hook/use-fetch-currency-rates";
import ExchangeRatesTable from "../components/currency-exchange/ExchangeRatesTable";
import {CURRENCIES} from "../constants/Constants";

export interface IExchangeData {
    canExchangeBeMade: boolean
    currency: string,
    amount: number,
    action: Action
}

const CurrencyExchangePage = () => {
    const [top, setTop] = useState<IExchangeData>({currency: 'PLN', amount: 0.00, action: Action.sell, canExchangeBeMade: true})
    const [bottom, setBottom] = useState<IExchangeData>({currency: 'USD', amount: 0.00, action: Action.buy, canExchangeBeMade :true})
    const [isCurrencyServiceDisabled, setIsCurrencyServiceDisabled] = useState<boolean>(false);

    const {getCurrencyRates, error, isLoading, rates} = useFetchCurrencyRates(top.currency);

    useEffect(() => {
        console.log('currency page rendering ...')
        getCurrencyRates(top.currency)
        if(!!error) setIsCurrencyServiceDisabled(true)

    }, [top.currency, getCurrencyRates])


    const getCurrencyRatesTable = () => {
        if (rates !== null) {
            return <ExchangeRatesTable isLoading={isLoading}
                                       currentCurrency={top.currency}
            data={ CURRENCIES.map((currency) => {
                        if (currency !== top.currency) {
                            return {id: currency, col1: currency, col2: rates[currency]}
                        }
                    }
                ).filter((anyValue) => typeof anyValue !== 'undefined')}
            />
        }
    }

    const getExchangeForm=()=>{
        if (rates !== null) {
            return <CurrencyExchangeForm
                top={{"state": top, "setState": setTop}}
                bottom={{"state": bottom, "setState": setBottom}}
                rates={rates}/>
        }
    }

    return (
        <Grid
            rowSpacing={2}
            container
            sx={{
                justifyContent: "space-between",
                alignItems: 'center',

            }}
        >
            <Grid item xs={12}>
                <Typography variant="h2" color="primary.main" sx={{marginBottom: '50px'}}>
                    Sell {top.action === Action.sell ? top.currency : bottom.currency}
                </Typography>
            </Grid>
            <Grid item xs={6}>
                {getExchangeForm()}
            </Grid>
            <Grid item xs={6} style={{justifyContent: 'end'}}>
                {getCurrencyRatesTable()}
            </Grid>

        </Grid>
    );
};

export default CurrencyExchangePage;
