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
import NumberFormat, {InputAttributes} from "react-number-format";

interface CustomProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}

const NumberFormatCustom = React.forwardRef<NumberFormat<InputAttributes>,
    CustomProps>(function NumberFormatCustom(props, ref) {
    const {onChange, ...other} = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={ref}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value
                    }
                });
            }}
            thousandSeparator
            isNumericString
            prefix="+$"
        />
    );
});

export default function CurrencyExchangeForm() {
    const [values, setValues] = React.useState('');


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues(event.target.value);
    };

    const exchangeCard = () => {
        return (
            <Card sx={exchangeCurrencyCardStyles}>

                <CardContent
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: 'center'
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column"
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
                                value="PLN"
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

                    <TextField
                        sx={{
                            "& .MuiInputBase-root": {
                                "& input": {
                                    textAlign: "right"
                                }
                            }
                        }}
                        id="standard-basic"
                        variant="standard"
                        value={values}
                        placeholder="13.98"
                        onChange={handleChange}
                        size="medium"
                        InputProps={{
                            inputComponent: NumberFormatCustom as any,
                            disableUnderline: true,
                            style: {fontSize: 40},
                        }}
                    />

                </CardContent>
            </Card>
        )
    }

    return (
        <>
            <Box gap={2} sx={{display: 'flex', flexDirection: 'column'}}>
                <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}} gap={1}>
                    <TrendingUpIcon sx={{color: "primary.main"}}/>
                    <Typography variant="h5" color="primary.main">PLN = CHF 0.02244</Typography>
                </Box>
                <Box>
                    <Avatar sx={{
                        backgroundColor: 'grey',justifyContent:'center'
                    }}>
                        <ArrowDownwardIcon sx={{color: "primary.main"}}/>
                    </Avatar>
                <Stack spacing={2} sx={{backgroundColor:'pink'}}>
                    {exchangeCard()}

                    {exchangeCard()}
                </Stack>
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
