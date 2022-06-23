import { Add, ArrowForward, Cached, Favorite } from "@mui/icons-material";
import {
  Box,
  Fab,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import buttonStyles from "../../styles/ButtonStyles";

const TotalBalanceContent = () => {
  return (
    <>
      <Typography variant="h2" color="primary.main">
        Total balance
      </Typography>
      <Typography variant="h2" fontWeight="200" sx={{ mt: '10px' }}>
          15.750,89 PLN
        </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "380px",
        }}
      >
        <FormControl
          variant="standard"
          sx={{
            m: 1,
            minWidth: 120,
            marginTop: "88px",
            marginBottom: "88px",
          }}
        >
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            rowGap: "40px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Fab
              color="primary"
              variant="extended"
              aria-label="transfer"
              size="large"
              sx={buttonStyles}
            >
              <Add sx={{ mr: 1 }} />
              Add money
            </Fab>
            <Fab
              color="error"
              variant="extended"
              aria-label="transfer"
              size="large"
              sx={buttonStyles}
            >
              <ArrowForward sx={{ mr: 1 }} />
              Transfer
            </Fab>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Fab
              color="primary"
              variant="extended"
              aria-label="transfer"
              size="large"
              sx={buttonStyles}
            >
              <Cached sx={{ mr: 1 }} />
              Exchange
            </Fab>
            <Fab
              color="success"
              variant="extended"
              aria-label="transfer"
              size="large"
              sx={buttonStyles}
            >
              <Favorite sx={{ mr: 1 }} />
              Add Friend
            </Fab>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default TotalBalanceContent;
