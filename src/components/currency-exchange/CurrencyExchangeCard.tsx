import {Box, Card, CardContent, TextField, Typography} from "@mui/material";
import exchangeCurrencyCardStyles from "../../styles/exchangeCurrencyCardStyles";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import React, {ChangeEventHandler} from "react";
import NumberFormat, {InputAttributes} from "react-number-format";

interface CustomProps {
    onChange: (event: { target: { value: string } }) => void;


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
                        value: values.value,
                        // prefix :values.prefix
                    }
                });
            }}
            thousandSeparator
            isNumericString
            // prefix={prefix}
        />
    );
});

const CurrencyExchangeCard: React.FC<{values :string, handleChange :ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>}> = ({values, handleChange}) => {
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
                    prefix='USD+'
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

export default CurrencyExchangeCard;