import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Card,
    CardContent,
    Divider,
    Typography
} from "@mui/material";
import React from "react";
import {ExchangeProps} from "./custom-props/ExchangeProps";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";


const CurrencyExchangeHistoryCard: React.FC<{ item: ExchangeProps }> = ({item}) => {

    return (
        <Card>
            <CardContent>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    <Box>
                        <Typography variant="h5" color="success.main">{'+'+item.bought+' '+item.boughtCurrency}</Typography>
                        <Typography variant="body2" color="text.secondary">
                            { item.date.toLocaleDateString('en-us', { year:"numeric",day :"numeric", month:"short"})}
                        </Typography></Box>
                    <Box sx={{
                        alignSelf: 'center'
                    }}>
                        <Typography  variant="h5" color="error">
                            {'-'+item.sold+' '+item.soldCurrency}
                        </Typography> </Box>
                </Box>
            </CardContent>
        </Card>
    )

}

export default CurrencyExchangeHistoryCard;