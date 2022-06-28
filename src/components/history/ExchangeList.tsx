import CurrencyExchangeHistoryCard from "./CurrencyExchangeHistoryCard";
import React from "react";
import {Stack} from "@mui/material";
import {ExchangeProps} from "./custom-props/ExchangeProps";

const ExchangeList : React.FC<{ history: ExchangeProps[] }> = ({history}) =>{

    return (<Stack spacing={2}>
            {
                history.map(i => {
                    return <CurrencyExchangeHistoryCard item={i} />
                })
            }

            </Stack>
    )


}

export default ExchangeList;