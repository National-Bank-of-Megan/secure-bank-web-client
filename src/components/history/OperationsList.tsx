import { Box } from "@mui/material";
import TransactionDetailed from "../transfers/TransactionDetailed";
import React from "react";
import {DetailedTransactionProps} from "./custom-props/DetailedTransactionProps";

const OperationsList: React.FC<{ history: DetailedTransactionProps[] }> = ({history}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        rowGap: "18px",
      }}
    >
        {
            history.map(item=>{
                return <TransactionDetailed item={item}/>
            })
        }

    </Box>
  );
};

export default OperationsList;
