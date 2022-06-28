import {Box, Typography} from "@mui/material";
import Transaction from "./Transaction";
import {TransactionProps} from "../history/custom-props/TransactionProps";
import React from "react";
import {ExchangeProps} from "../history/custom-props/ExchangeProps";

const RecentActivityContent : React.FC<{ recent: TransactionProps[] }> = ({recent}) => {

    return (
        <>
            <Box>
                <Typography
                    variant="h3"
                    color="primary.main"
                    sx={{
                        borderBottom: 1,
                        borderColor: "primary.main",
                        padding: "8px 0",
                    }}
                >
                    Recent activity
                </Typography>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "18px",
                    // marginLeft: "205px",
                    marginTop: "20px",
                }}
            >
                {
                    recent.map(r=>{
                        return <Transaction item={r}/>
                    })
                }
            </Box>
        </>
    );
};

export default RecentActivityContent;
