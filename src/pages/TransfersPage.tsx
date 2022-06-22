import {
  Box,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { color } from "@mui/system";

const TransferPage = () => {
  return (
    <Grid
      rowSpacing={2}
      container
      sx={{
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: "45px",
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
      <Grid item xs={6}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "380px",
          }}
        >
          <Typography variant="h2" fontWeight="200">
            15.750,89 PLN
          </Typography>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120, marginTop: "60px" }}>
            <InputLabel id="demo-simple-select-standard-label">
              Select subaccount
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value="age"
              label="Age"
            >
              <MenuItem value="$ 1200.99">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Grid>
      <Grid item xs={6}></Grid>
    </Grid>
  );
};

export default TransferPage;
