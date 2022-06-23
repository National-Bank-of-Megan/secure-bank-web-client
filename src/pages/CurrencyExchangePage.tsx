import { Grid, Typography } from "@mui/material";
import CurrencyExchangeForm from "../components/currency-exchange/CurrencyExchangeForm";
import ExchangeRatesTable from "../components/currency-exchange/ExchangeRatesTable";

const CurrencyExchnagePage = () => {
  return (
    <Grid
      rowSpacing={2}
      container
      sx={{
        justifyContent: "space-between"
      }}
    >
      <Grid item xs={6} gap={5} style={{ backgroundColor: "red" }}>
        <Typography variant="h2" color="primary.main">
          Sell PLN
        </Typography>
       <CurrencyExchangeForm/>
      </Grid>
      <Grid item xs={6} style={{ backgroundColor: "pink", justifyContent:'end' }}>
        <ExchangeRatesTable/>
      </Grid>
    </Grid>
  );
};

export default CurrencyExchnagePage;
