import { ArrowDropDown, Search } from "@mui/icons-material";
import {
    Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  Tab,
  Tabs,
} from "@mui/material";
import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import TransactionDetailed from "../components/transfers/TransactionDetailed";

const HistoryPage = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Paper sx={{ bgcolor: "background.paper" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          indicatorColor="secondary"
          textColor="inherit"
        >
          <Tab label="Transfers" />
          <Tab label="Exchanges" />
        </Tabs>
      </Paper>

      <Box
        sx={{
          display: "flex",
          margin: "50px 0 35px 0",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <FormControl
          variant="outlined"
          sx={{
            width: "50%",
          }}
        >
          <OutlinedInput placeholder="Search..." />
        </FormControl>
        <Button variant="contained" endIcon={<ArrowDropDown sx={{ transform: 'scale(1.5)' }}/>} sx={{
            width: "130px",
            height: "40px"
        }}>
            Date
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          rowGap: "18px"
        }}
      >
        <TransactionDetailed />
        <TransactionDetailed />
        <TransactionDetailed />
        <TransactionDetailed />
        <TransactionDetailed />
      </Box>
    </>
  );
};

export default HistoryPage;
