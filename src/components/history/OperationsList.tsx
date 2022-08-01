import {Box} from "@mui/material";
import TransactionDetailed from "../transfers/TransactionDetailed";
import React, {useState} from "react";
import {DetailedTransactionType} from "../../models/custom-types/DetailedTransactionType";
import {PaginationDataType} from "../../models/custom-types/PaginationDataType";
import PaginationController from "../common/PaginationController";

const OperationsList: React.FC<{ history: DetailedTransactionType[] }> = ({history}) => {
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
            }}
        >
            {
                history.slice(pagination.startIndex,pagination.endIndex).map(item => {
                    return <TransactionDetailed item={item}/>
                })
            }
            <PaginationController
                page={{"state": pagination, "setState": setPagination}}
                numberOfPages={nPages}
                numberPerPage={numberPerPage}
                dataLength={length}
            />

        </Box>
    );
};

export default OperationsList;
