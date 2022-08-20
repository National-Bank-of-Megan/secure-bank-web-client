import {Box, Card, CardContent, Typography} from "@mui/material";
import React from "react";
import CurrencyExchangeHistory from "../../models/currencyExchangeHistory";


const CurrencyExchangeHistoryCard: React.FC<{ item: CurrencyExchangeHistory }> = ({item}) => {

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
                        <Typography variant="h5"
                                    color="success.main">{'+' + item.bought.toString() + ' ' + item.currencyBought}</Typography>
                        <Typography variant="body2" color="text.secondary">
                            {new Date(item.requestDate).toLocaleDateString('en-us', {year: "numeric", day: "numeric", month: "short",hour : "numeric",minute :"numeric"})}
                        </Typography></Box>
                    <Box sx={{
                        alignSelf: 'center'
                    }}>
                        <Typography variant="body1" color="error">
                            {'-' + item.sold.toString() + ' ' + item.currencySold}
                        </Typography> </Box>
                </Box>
            </CardContent>
        </Card>
    )

}

export default CurrencyExchangeHistoryCard;