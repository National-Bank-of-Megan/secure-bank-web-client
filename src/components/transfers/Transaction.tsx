import {Box, Card, CardContent, Typography} from "@mui/material";
import {TransactionType} from "../../models/custom-types/TransactionType";
import React from "react";

const Transaction: React.FC<{item: TransactionType}> = ({item}) => {

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
