import {Grid, Typography} from "@mui/material";
import CurrencyExchangeForm from "../components/currency-exchange/CurrencyExchangeForm";
import React, {useEffect, useState} from "react";
import useFetchCurrencyRates from "../hook/use-fetch-currency-rates";
import ExchangeRatesTable from "../components/currency-exchange/ExchangeRatesTable";

export interface IExchangeData {
    currency: string,
    amount: number
    // upperCardCurrency: string,
    // upperCardAmount: number,
    // bottomCardCurrency: string,
    // bottomCardAmount: number
}

const CurrencyExchangePage = () => {
    const [sold, setSold] = useState<IExchangeData>({currency: 'PLN', amount: 0.00})
    const [bought, setBought] = useState<IExchangeData>({currency: 'USD', amount: 0.00})

    const {getCurrencyRates, error, isLoading, rates} = useFetchCurrencyRates(sold.currency);

    useEffect(() => {
        getCurrencyRates(sold.currency)

    }, [sold.currency, getCurrencyRates])

    const getCurrencyRatesTable = () => {
        if (rates !== null) {
            return <ExchangeRatesTable isLoading={isLoading} data={rates}
                                       currentCurrency={sold.currency}/>
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
                <CurrencyExchangeForm sold={{"state" :sold, "setState" : setSold}} bought={{"state" :bought, "setState" : setBought}}/>
            </Grid>
            <Grid item xs={6} style={{justifyContent: 'end'}}>
                {getCurrencyRatesTable()}
            </Grid>

        </Grid>
    );
};

export default CurrencyExchangePage;
