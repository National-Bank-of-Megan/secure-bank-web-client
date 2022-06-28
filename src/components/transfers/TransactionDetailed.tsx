import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {DetailedTransactionProps} from "../history/custom-props/DetailedTransactionProps";
import React from "react";

const TransactionDetailed: React.FC<{ item: DetailedTransactionProps }> = ({item}) => {

    const getChar=()=>{
        if(item.amount>0) return '+'
        else return ''

    }
  return (
    <Accordion
      disableGutters
      sx={{
        padding: "12px",
        borderRadius: "4px",

        "&:before": {
          display: "none",
        },
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Box>
            <Typography variant="h5">Spotify subscription</Typography>
            <Typography variant="body2" color="text.secondary">
                { item.date.toLocaleDateString('en-us', { year:"numeric",day :"numeric", month:"short"})}
            </Typography>
          </Box>
          <Box
            sx={{
              alignSelf: "center",
              marginRight: "15px",
            }}
          >
            <Typography variant="body1" color="text.primary">
                {getChar()+item.amount.toFixed(2)}
            </Typography>
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Divider />
        <Box
          sx={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              rowGap: "20px"
            }}
          >
            <Typography>
              Status
            </Typography>
            <Typography>
              Amount
            </Typography>
            <Typography>
              Receiver
            </Typography>
            <Typography>
              Date
            </Typography>
            <Typography>
              Balance after transfer
            </Typography>
          </Box>
          <Box sx={{
         
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              rowGap: "20px"
            }}>
            <Typography>
                {item.status}
            </Typography>
            <Typography>
                {getChar()+item.amount.toFixed(2)+' '+item.currency}
            </Typography>
            <Typography>
                {item.receiver}
            </Typography>
            <Typography>
                { item.date.toLocaleDateString('en-us', { year:"numeric",day :"numeric", month:"short"})}
            </Typography>
            <Typography>
                {item.accountCurrency +' '+item.balanceAfterTransfer.toFixed(2)}
            </Typography>
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default TransactionDetailed;
