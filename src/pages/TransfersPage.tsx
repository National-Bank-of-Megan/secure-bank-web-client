import {
  Box,
  Container,
  Fab,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import TotalBalanceContent from "../components/transfers/TotalBalanceContent";
import Transaction from "../components/transfers/Transaction";

const TransferPage = () => {
  return (
    <Grid
      rowSpacing={2}
      container
      sx={{
        justifyContent: "space-between"
      }}
    >
      <Grid item xs={6}>
        <Typography variant="h2" color="primary.main">
          Total balance
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Box
          sx={{
            width: "400px",
            marginLeft: "205px",
          }}
        >
          <Typography
            variant="h3"
            color="primary.main"
            sx={{
              borderBottom: 1,
              borderColor: "primary.main",
              padding: "8px 0",
            }}
          >
            Recent activity
          </Typography>
        </Box>
      </Grid>
      <TotalBalanceContent />
      <Grid item xs={6}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: '18px',
            width: "400px",
            marginLeft: "205px",
            marginTop: "5px"
          }}
        >
          <Transaction />
          <Transaction />
          <Transaction />
          <Transaction />
        </Box>
      </Grid>
    </Grid>
  );
};

export default TransferPage;
