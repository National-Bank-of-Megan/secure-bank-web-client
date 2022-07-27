import CurrencyExchangeHistoryCard from "./CurrencyExchangeHistoryCard";
import React, {useEffect} from "react";
import {Stack} from "@mui/material";
import {CurrencyExchangeHistoryType} from "../../models/custom-types/CurrencyExchangeHistoryType";

const ExchangeList: React.FC<{ history: CurrencyExchangeHistoryType[] }> = ({history}) => {

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