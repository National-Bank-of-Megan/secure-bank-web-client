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
import HistoryNavigation from "../components/history/HistoryNavigation";
import OperationsList from "../components/history/OperationsList";
import TransactionDetailed from "../components/transfers/TransactionDetailed";

const HistoryPage = () => {
  return (
    <>
      <HistoryNavigation />
      <OperationsList />
    </>
  );
};

export default HistoryPage;
