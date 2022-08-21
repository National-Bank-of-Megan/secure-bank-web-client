import {Accordion, AccordionDetails, AccordionSummary, Box, Divider, Typography,} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";
import Decimal from "decimal.js";
import DetailedTransaction from "../../models/detailedTransaction";
import {getAmountMathSymbol} from "../../common/transfer";
import {TRANSFER_TYPE_RECEIVED} from "../../constants/Constants";

const TransactionDetailed: React.FC<{ item: DetailedTransaction }> = ({item}) => {

    const receiverOrSender = item.transferType === TRANSFER_TYPE_RECEIVED ? "Sender" : "Receiver";
    const receiverOrSenderValue = item.transferType === TRANSFER_TYPE_RECEIVED ? item.sender : item.receiver;

    return (
        <Accordion
            disableGutters
            sx={{
                padding: "12px",
                borderRadius: "4px",
                "&:before": {
                    display: "none",
                }
            }}
        >
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                    }}
                >
                    <Box>
                        <Typography variant="h5">{item.title}</Typography>
                        <Typography variant="body2" color="text.secondary">
                            {item.requestDate.toLocaleDateString('en-us', {year: "numeric", day: "numeric", month: "short", hour : "numeric",minute :"numeric"})}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            alignSelf: "center",
                            marginRight: "15px",
                        }}
                    >
                        <Typography variant="body1" color="text.primary">
                            {getAmountMathSymbol(item) + ' ' + item.amount.toFixed(2) + ' ' + item.currency}
                        </Typography>
                    </Box>
                </Box>
            </AccordionSummary>
            <AccordionDetails>
                <Divider/>
                <Box
                    sx={{
                        marginTop: "20px",
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            rowGap: "20px"
                        }}
                    >
                        <Typography>
                            Status
                        </Typography>
                        <Typography>
                            Amount
                        </Typography>
                        <Typography>
                            {receiverOrSender}
                        </Typography>
                        <Typography>
                            Date
                        </Typography>
                    </Box>
                    <Box sx={{

                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                        rowGap: "20px"
                    }}>
                        <Typography>
                            {item.status}
                        </Typography>
                        <Typography>
                            {getAmountMathSymbol(item) + ' ' + item.amount.toFixed(2) + ' ' + item.currency}
                        </Typography>
                        <Typography>
                            {receiverOrSenderValue}
                        </Typography>
                        <Typography>{item.requestDate.toLocaleDateString('en-us', {
                            year: "numeric",
                            day: "numeric",
                            month: "short",
                            hour: "numeric",
                            minute: "numeric"
                        })}</Typography>
                    </Box>
                </Box>
            </AccordionDetails>
        </Accordion>
    );
};

export default TransactionDetailed;
