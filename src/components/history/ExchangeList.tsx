import CurrencyExchangeHistoryCard from "./CurrencyExchangeHistoryCard";
import React, {useEffect, useState} from "react";
import {Pagination, Stack} from "@mui/material";
import {CurrencyExchangeHistoryType} from "../../models/custom-types/CurrencyExchangeHistoryType";
import {UseStateType} from "../../models/custom-types/UseStateType";
import PaginationController from "../common/PaginationController";
import {PaginationDataType} from "../../models/custom-types/PaginationDataType";

const ExchangeList: React.FC<{ history: CurrencyExchangeHistoryType[] }> = ({history}) => {
    const numberPerPage = 5;
    const length = history.length;
    const nPages: number = Math.ceil(length / numberPerPage);
    const [pagination, setPagination] = useState<PaginationDataType>({
        page: 1,
        startIndex: 0,
        endIndex: numberPerPage
    })

    return (<Stack spacing={2}>
            {
                history.slice(pagination.startIndex, pagination.endIndex).map(i => {
                    return <CurrencyExchangeHistoryCard item={i}/>
                })
            }
            <PaginationController
                page={{"state": pagination, "setState": setPagination}}
                numberOfPages={nPages}
                numberPerPage={numberPerPage}
                dataLength={length}
            />
        </Stack>
    )
}

export default ExchangeList;