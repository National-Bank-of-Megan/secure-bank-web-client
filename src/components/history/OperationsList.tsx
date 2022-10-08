import {Box} from "@mui/material";
import TransactionDetailed from "../transfers/TransactionDetailed";
import React, {useState} from "react";
import {PaginationDataType} from "../../models/custom-types/PaginationDataType";
import PaginationController from "../common/PaginationController";
import ServerError from "../notifications/ServerError";
import DetailedTransaction from "../../models/detailedTransaction";

const OperationsList: React.FC<{ history: DetailedTransaction[], serverError: boolean }> = ({
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
                position: 'relative',
                display: "flex",
                flexDirection: "column",
                rowGap: "18px",
                marginTop: '50px'
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
