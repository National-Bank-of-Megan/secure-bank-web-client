import {Avatar, Box, Button, FormHelperText, Stack, Typography,} from "@mui/material";
import React, {useState} from "react";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CurrencyExchangeCard from "./CurrencyExchangeCard";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
// import CurrencyExchangeCard from "./CurrencyExchangeCard";


export default function CurrencyExchangeForm() {

    const conversionRate = 4
    const [bought, setBought] = useState('')
    const [sold, setSold] = useState('')
    const [isSold, setIsSold] = useState(true)


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // setSold(event.target.value)
        if (isSold) {
            setSold(event.target.value)
            let converted: number = parseFloat(sold) / conversionRate;
            setBought(converted.toString())
        }
    };

    const exchangeChange = () => {
        setIsSold(!isSold);
    }

    const returnArrow = () => {
        if (isSold) {
            return <ArrowDownwardIcon sx={{color: "primary.main"}}/>
        }
        return <ArrowUpwardIcon sx={{color: "primary.main"}}/>
    }


    return (
        <>
            <Box gap={2} sx={{display: 'flex', flexDirection: 'column'}}>
                <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}} gap={1}>
                    <TrendingUpIcon sx={{color: "primary.main"}}/>
                    <Typography variant="h5" color="primary.main">PLN = CHF 0.02244</Typography>
                </Box>
                <Box>
                    <Box sx={{width: '480px'}}>
                        <CurrencyExchangeCard values={sold} handleChange={handleChange}/>
                        <Avatar
                            onClick={exchangeChange}
                            sx={{
                                bgcolor: 'background.paper',
                                border: '1px solid primary',
                                zIndex: '111111',
                                position: 'relative',
                                marginTop: '-14px',
                                marginBottom: '-14px',
                                marginLeft: '47%'


                            }}>
                            {returnArrow()}
                        </Avatar>

                        <CurrencyExchangeCard values={sold} handleChange={handleChange}/>
                    </Box>
                </Box>

                <Stack spacing={0.1}>
                    <FormHelperText>
                        PLN balance after transfer: 15.253,51 PLN
                    </FormHelperText>
                    <FormHelperText>
                        CHF balance after transfer: 323,51 CHF
                    </FormHelperText>
                </Stack>
                <Button variant="contained" size="large" sx={{width: '480px'}}>
                    Exchange
                </Button>

            </Box>
        </>
    );
}
