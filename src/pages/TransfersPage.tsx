import { Grid } from "@mui/material";
import RecentActivityContent from "../components/transfers/RecentActivityContent";
import TotalBalanceContent from "../components/transfers/TotalBalanceContent";
import {TransactionProps} from "../components/history/custom-props/TransactionProps";

const TransferPage = () => {
  const recentTransfers :TransactionProps[] =[
    {title : 'Spotify', date :new Date(2022,0O5,12), amount : -20.00, currency :'PLN' },
    {title : 'Spotify', date :new Date(2022,0O5,12), amount : 20.00, currency :'PLN' },
    {title : 'Spotify', date :new Date(2022,0O5,12), amount : 20.00, currency :'PLN'},
    {title : 'Spotify', date :new Date(2022,0O5,12), amount : 20.00, currency :'PLN'}
  ]
  return (
    <Grid
      rowSpacing={2}
      columnSpacing={3}
      container
      sx={{
        justifyContent: "space-between",
      }}
    >
      <Grid item xs={6}>
        <TotalBalanceContent />
      </Grid>
      <Grid item xs={6}>
        <RecentActivityContent recent={recentTransfers} />
      </Grid>
    </Grid>
  );
};

export default TransferPage;
