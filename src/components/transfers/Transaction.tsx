import {Box, Card, CardContent, Typography} from "@mui/material";
import React from "react";
import TransactionSummary from "../../models/transactionSummary";
import {getAmountMathSymbol} from "../../common/transfer";

const Transaction: React.FC<{ item: TransactionSummary }> = ({item}) => {

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
                                    color="text.primary">
                            {getAmountMathSymbol(item) + ' ' + item.amount.toFixed(2) + ' ' + item.currency}
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default Transaction;
