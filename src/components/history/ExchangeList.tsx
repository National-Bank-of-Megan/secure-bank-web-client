import CurrencyExchangeHistoryCard from "./CurrencyExchangeHistoryCard";
import React from "react";
import {Stack} from "@mui/material";
import {ExchangeType} from "../../models/custom-types/ExchangeType";

const ExchangeList: React.FC<{ history: ExchangeType[] }> = ({history}) => {

    return (<Stack spacing={2}>
            {
                history.map(i => {
                    return <CurrencyExchangeHistoryCard item={i}/>
                })
            }

        </Stack>
    )


}

export default ExchangeList;