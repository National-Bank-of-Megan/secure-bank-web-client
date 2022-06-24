import { Box } from "@mui/material";
import TransactionDetailed from "../transfers/TransactionDetailed";

const OperationsList = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        rowGap: "18px",
      }}
    >
      <TransactionDetailed />
      <TransactionDetailed />
      <TransactionDetailed />
      <TransactionDetailed />
      <TransactionDetailed />
    </Box>
  );
};

export default OperationsList;
