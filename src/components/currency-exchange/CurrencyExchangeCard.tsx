import {Box, Card, CardContent, SelectChangeEvent, TextField} from "@mui/material";
import exchangeCurrencyCardStyles from "../../styles/exchangeCurrencyCardStyles";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import React from "react";
import NumberFormat, {InputAttributes} from "react-number-format";
import {Action} from "./CurrencyExchangeForm";
import {UseStateType} from "../../models/custom-types/UseStateType";
import {IExchangeData} from "../../pages/CurrencyExchangePage";

interface CustomProps {
    onChange: (event: { target: { value: string } }) => void,
    action: Action


}

const NumberFormatCustom = React.forwardRef<NumberFormat<InputAttributes>,
    CustomProps>(function NumberFormatCustom(props, ref) {
    const {onChange, action, ...other} = props;


    return (
        <NumberFormat
            {...other}
            getInputRef={ref}
            onValueChange={(values) => {
                onChange({
                    target: {
                        value: values.value
                    }
                });
            }}
            fixedDecimalScale={true}
            decimalScale={2}
            thousandSeparator
            allowLeadingZeros={false}
            allowNegative={false}
            isNumericString
            prefix={action === Action.sell ? '-' : '+'}
        />
    );
});

const CurrencyExchangeCard: React.FC<{
    exchange : UseStateType<IExchangeData>, handleAmountChangeOtherCard(newAmount: number,actionSettingNewAmount :Action) :void,currencies :string[], isDisabled :boolean
}> = (props) => {

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
                            value={props.exchange.state.currency}
                            onChange={(e: SelectChangeEvent) => props.exchange.setState({...props.exchange.state, "currency" : e.target.value})}
                        >
                            {
                                props.currencies.map((currency) => {
                                    return <MenuItem key={currency} value={currency}>{currency}</MenuItem>
                                })
                            }
                        </Select>
                    </FormControl>
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
                    disabled={props.isDisabled}
                    value={props.exchange.state.amount}
                    placeholder="13.98"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        props.exchange.setState({...props.exchange.state, "amount" : parseFloat(e.target.value)})
                        props.handleAmountChangeOtherCard( parseFloat(e.target.value),props.exchange.state.action)
                    }}

                    size="medium"
                    InputProps={{
                        inputComponent: NumberFormatCustom as any,
                        inputProps: {action: props.exchange.state.action},
                        disableUnderline: true,
                        style: {fontSize: 40},
                    }}
                />

            </CardContent>
        </Card>
    )
}

export default CurrencyExchangeCard;