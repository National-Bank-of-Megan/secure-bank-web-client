import {Grid, Typography} from "@mui/material";
import CurrencyExchangeForm from "../components/currency-exchange/CurrencyExchangeForm";
import ExchangeRatesTable from "../components/currency-exchange/ExchangeRatesTable";
import React, {useState} from "react";

export interface IExchangeData {
    soldCurrency: string,
    sold: number,
    boughtCurrency: string,
    bought: number
}

const CurrencyExchangePage = () => {
    const [exchange, setExchange] = useState<IExchangeData>({
        soldCurrency: 'PLN',
        sold: 0.00,
        boughtCurrency: 'USD',
        bought: 0.00
    })
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
                <ExchangeRatesTable soldCurrency={exchange.soldCurrency}/>
            </Grid>

        </Grid>
    );
};

export default CurrencyExchangePage;
