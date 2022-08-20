import {Grid} from "@mui/material";
import RecentActivityContent from "../components/transfers/RecentActivityContent";
import TotalBalanceContent from "../components/transfers/TotalBalanceContent";
import Decimal from "decimal.js";
import MoneyBalanceOperation from "../models/moneyBalanceOperation";
import TransactionSummary from "../models/transactionSummary";

const TransferPage = () => {

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
                <TotalBalanceContent/>
            </Grid>
            <Grid item xs={6}>
                <RecentActivityContent />
            </Grid>
        </Grid>
    );
};

export default TransferPage;
