import CurrencyExchangeHistoryCard from "./CurrencyExchangeHistoryCard";
import React, {useState} from "react";
import {Stack} from "@mui/material";
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

    return (<Stack spacing={2} sx={{marginTop: '50px'}}>

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
        </Stack>
    )
}

export default ExchangeList;