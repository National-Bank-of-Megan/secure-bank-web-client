import {Grid, Typography} from "@mui/material";
import CurrencyExchangeForm from "../components/currency-exchange/CurrencyExchangeForm";
import React, {useEffect, useState} from "react";
import {GridRowsProp} from "@mui/x-data-grid";
import useFetchCurrencyRates from "../hook/use-fetch-currency-rates";
import {CURRENCIES} from "../constants/Constants";
import ExchangeRatesTable from "../components/currency-exchange/ExchangeRatesTable";

export interface IExchangeData {
    upperCardCurrency: string,
    upperCardAmount: number,
    bottomCardCurrency: string,
    bottomCardAmount: number
}

const CurrencyExchangePage = () => {
    const [exchange, setExchange] = useState<IExchangeData>({
        upperCardCurrency: 'PLN',
        upperCardAmount: 0.00,
        bottomCardCurrency: 'USD',
        bottomCardAmount: 0.00
    })

    const {getCurrencyRates, error, isLoading, rates} = useFetchCurrencyRates(exchange.upperCardCurrency);

    useEffect(() => {
        getCurrencyRates(exchange.upperCardCurrency)

    }, [exchange.upperCardCurrency, getCurrencyRates])

    const getCurrencyRatesTable = ()=>{
        if(rates !== null) {
            return <ExchangeRatesTable  isLoading={isLoading} data={rates}
                                       currentCurrency={exchange.upperCardCurrency}/>
        }
    }

    console.log(rates)
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
                    Sell PLN
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <CurrencyExchangeForm exchange={{"state": exchange, "setState": setExchange}}/>
            </Grid>
            <Grid item xs={6} style={{justifyContent: 'end'}}>
                {getCurrencyRatesTable()}
            </Grid>

        </Grid>
    );
};

export default CurrencyExchangePage;
