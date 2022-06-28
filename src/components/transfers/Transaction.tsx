import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";
import {TransactionProps} from "../history/custom-props/TransactionProps";
import React from "react";

const Transaction: React.FC<{item: TransactionProps}> = ({item}) => {

    const getChar=()=>{
        if(item.amount>0) return '+'
        else return ''

    }
  return (
    <Card>
      <CardContent>
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between'
        }}>
        <Box>
            <Typography variant="h5">{item.title}</Typography>
            <Typography variant="body2" color="text.secondary">{item.date.toLocaleDateString('en-us', { year:"numeric",day :"numeric", month:"short"})}</Typography>
        </Box>
        <Box sx={{
            alignSelf: 'center'
        }}>
            <Typography variant="body1" color="text.primary">    {getChar()+item.amount.toFixed(2)+' '+item.currency}</Typography>
        </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Transaction;
