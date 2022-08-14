import {Box, Card, CardContent, Typography} from "@mui/material";
import React from "react";
import {CurrencyExchangeHistoryType} from "../../models/custom-types/CurrencyExchangeHistoryType";


const CurrencyExchangeHistoryCard: React.FC<{ item: CurrencyExchangeHistoryType }> = ({item}) => {

    return (
        <Card>
            <CardContent>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    <Box>
                        <Typography variant="h5"
                                    color="success.main">{'+' + item.bought.toString() + ' ' + item.currencyBought}</Typography>
                        <Typography variant="body2" color="text.secondary">
                            {item.date.toLocaleDateString('en-us', {year: "numeric", day: "numeric", month: "short",hour : "numeric",minute :"numeric"})}
                        </Typography></Box>
                    <Box sx={{
                        alignSelf: 'center'
                    }}>
                        <Typography variant="h5" color="error">
                            {'-' + item.sold.toString() + ' ' + item.currencySold}
                        </Typography> </Box>
                </Box>
            </CardContent>
        </Card>
    )

}

export default CurrencyExchangeHistoryCard;