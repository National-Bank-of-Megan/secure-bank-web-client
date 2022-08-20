import CurrencyExchangeHistoryCard from "./CurrencyExchangeHistoryCard";
import React, {useState} from "react";
import {Box, Stack} from "@mui/material";
import PaginationController from "../common/PaginationController";
import {PaginationDataType} from "../../models/custom-types/PaginationDataType";
import ServerError from "../notifications/ServerError";
import CurrencyExchangeHistory from "../../models/currencyExchangeHistory";

const ExchangeList: React.FC<{ history: CurrencyExchangeHistory[], serverError: boolean }> = ({
                                                                                                      history,
                                                                                                      serverError
                                                                                                  }) => {
    const numberPerPage = 5;
    const length = history.length;
    const nPages: number = Math.ceil(length / numberPerPage);
    const [pagination, setPagination] = useState<PaginationDataType>({
        page: 1,
        startIndex: 0,
        endIndex: numberPerPage
    })

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                rowGap: "18px",
                marginTop: '80px'
            }}
        >

            {
                serverError && <ServerError/>
            }

            {
                !serverError && <>
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
                </>
            }
        </Box>
    )
}

export default ExchangeList;