import {
    Avatar,
    Box, Button,
    Card,
    CardContent, FormHelperText,
    InputAdornment,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import cardStyles from "../../styles/CardStyles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import React from "react";
import exchangeCurrencyCardStyles from "../../styles/exchangeCurrencyCardStyles";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import TrendingUpIcon from "@mui/icons-material/TrendingUp";


export default function CurrencyExchangeForm() {
    const [age, setAge] = React.useState("PLN");

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);
    };

    const exchangeCard = () => {
        return (
            <Card sx={exchangeCurrencyCardStyles}>

                <CardContent
                    sx={{
                        display: "flex",
                        justifyContent: "space-evenly",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <FormControl fullWidth variant="standard">
                            <Select
                                sx={{
                                    fontSize: "34px",
                                }}
                                size="medium"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                onChange={handleChange}
                            >
                                <MenuItem value={"PLN"}>PLN</MenuItem>
                                <MenuItem value={"CHF"}>CHF</MenuItem>
                                <MenuItem value={"USD"}>USD</MenuItem>
                            </Select>
                        </FormControl>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{marginTop: "20px"}}
                        >
                            May 21, 2022
                        </Typography>
                    </Box>
                    <Stack
                        sx={{
                            direction: "column",
                            justifyContent: "center"
                        }}
                    >
                        <TextField
                            id="standard-basic"
                            variant="standard"
                            type="number"
                            defaultValue="13.98"
                            size="small"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">+</InputAdornment>
                                ),
                                disableUnderline: true,
                                style: {fontSize: 40},
                            }}
                        />
                    </Stack>
                </CardContent>
            </Card>
        )
    }

    return (
        <>
            <Typography variant="h2" color="primary.main" sx={{marginBottom:'50px'}} >
                Sell PLN
            </Typography>
            <Box gap={2} sx={{display: 'flex', flexDirection: 'column'}}>
                <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}} gap={1}>
                    <TrendingUpIcon sx={{color: "primary.main"}}/>
                    <Typography variant="h5" color="primary.main">PLN = CHF 0.02244</Typography>
                </Box>
                {exchangeCard()}
                {/*<Avatar sx={{bgcolor: "background.paper"}}>*/}
                {/*    <ArrowDownwardIcon sx={{color: "primary.main"}}/>*/}
                {/*</Avatar>*/}
                {exchangeCard()}
                <Stack spacing={0.1}>
                    <FormHelperText>
                        PLN balance after transfer: 15.253,51 PLN
                    </FormHelperText>
                    <FormHelperText>
                        CHF balance after transfer: 323,51 CHF
                    </FormHelperText>
                </Stack>
                <Button variant="contained" size="large" sx={{width:'480px'}}>
                    Exchange
                </Button>

            </Box>
        </>
    );
}
