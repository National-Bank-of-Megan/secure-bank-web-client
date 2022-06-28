import {Box, Card, CardContent, Typography} from "@mui/material";
import React from "react";
import {ExchangeProps} from "./custom-props/ExchangeProps";


const CurrencyExchangeHistoryCard: React.FC<{ item: ExchangeProps }> = ({item}) => {
    return (
        <Card>
            <CardContent>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    <Box>
                        <Typography variant="h5"
                                    color="success.main">{'+' + item.boughtCurrency + ' ' + item.bought.toFixed(2)}</Typography>
                        <Typography variant="body2" color="text.secondary">  { item.date.toLocaleDateString('en-us', { year:"numeric",day :"numeric", month:"short"})}</Typography>
                    </Box>
                    <Box sx={{
                        alignSelf: 'center'
                    }}>
                        <Typography variant="h5" color="error">{'-' + item.soldCurrency + ' ' + item.sold.toFixed(2)}</Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    )
}

export default CurrencyExchangeHistoryCard;