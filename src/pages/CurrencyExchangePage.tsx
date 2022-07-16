import {Grid, Typography} from "@mui/material";
import CurrencyExchangeForm from "../components/currency-exchange/CurrencyExchangeForm";
import ExchangeRatesTable from "../components/currency-exchange/ExchangeRatesTable";
import React from "react";

const CurrencyExchangePage = () => {
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
                <Typography variant="h2" color="primary.main" sx={{marginBottom:'50px'}} >
                    Sell PLN
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <CurrencyExchangeForm/>
            </Grid>
            <Grid item xs={6} style={{justifyContent: 'end'}}>
                <ExchangeRatesTable />
            </Grid>

        </Grid>
    );
};

export default CurrencyExchangePage;
