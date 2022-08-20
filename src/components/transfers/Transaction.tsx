import {Box, Card, CardContent, Typography} from "@mui/material";
import React from "react";
import Decimal from "decimal.js";
import TransactionSummary from "../../models/transactionSummary";

const Transaction: React.FC<{ item: TransactionSummary }> = ({item}) => {

    const getChar = () => {
        if (item.amount> new Decimal(0)) return '+'
        else return ''

    }
    return (
        <Card>
            <CardContent sx={{
                padding: '24px 28px',
                height: '100px',
            }}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    <Box>
                        <Typography variant="h5">{item.title}</Typography>
                        <Typography variant="body2" color="text.secondary">{new Date(item.requestDate).toLocaleDateString('en-us', {
                            year: "numeric",
                            day: "numeric",
                            month: "short",
                            hour: "numeric",
                            minute: "numeric"
                        })}</Typography>
                    </Box>
                    <Box sx={{
                        alignSelf: 'center'
                    }}>
                        <Typography variant="body1"
                                    color="text.primary">    {getChar() + item.amount.toFixed(2) + ' ' + item.currency}</Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default Transaction;
