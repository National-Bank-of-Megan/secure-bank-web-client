import {Box, Typography} from "@mui/material";
import Transaction from "./Transaction";
import {TransactionType} from "../../models/custom-types/TransactionType";
import React from "react";

const RecentActivityContent: React.FC<{ recent: TransactionType[] }> = ({recent}) => {

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
                    recent.map(r => {
                        return <Transaction item={r} key={recent.indexOf(r)}/>
                    })
                }
            </Box>
        </>
    );
};

export default RecentActivityContent;
