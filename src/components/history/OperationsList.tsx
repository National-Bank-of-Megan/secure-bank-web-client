import {Box} from "@mui/material";
import TransactionDetailed from "../transfers/TransactionDetailed";
import React, {useState} from "react";
import {DetailedTransactionType} from "../../models/custom-types/DetailedTransactionType";
import {PaginationDataType} from "../../models/custom-types/PaginationDataType";
import PaginationController from "../common/PaginationController";
import ServerError from "../notifications/ServerError";

const OperationsList: React.FC<{ history: DetailedTransactionType[], serverError: boolean }> = ({
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
                        history.slice(pagination.startIndex, pagination.endIndex).map(item => {
                            return <TransactionDetailed item={item}/>
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
    );
};

export default OperationsList;
