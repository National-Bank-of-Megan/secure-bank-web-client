import {Box, CircularProgress, Typography} from "@mui/material";
import Transaction from "./Transaction";
import React, {useEffect, useState} from "react";
import MoneyBalanceOperation from "../../models/moneyBalanceOperation";
import TransactionSummary from "../../models/transactionSummary";
import useFetch, {RequestConfig} from "../../hook/use-fetch";
import {REST_PATH_TRANSFER} from "../../constants/Constants";
import CurrencyExchangeHistory from "../../models/currencyExchangeHistory";
import CurrencyExchangeHistoryCard from "../history/CurrencyExchangeHistoryCard";
import CurrencyExchangeHistoryResponse from "../../models/currencyExchangeHistoryResponse";

const RecentActivityContent = () => {

    const {isLoading: isLoadingRecentActivity, error: errorRecentActivity, sendRequest: sendGetRecentActivityRequest} = useFetch();
    const [recentActivityLoaded, setRecentActivityLoaded] = useState(false);
    const [recentActivityList, setRecentActivityList] = useState<MoneyBalanceOperation[]>([]);

    useEffect(() => {
        const handleFetchRecentActivitySuccess = (moneyBalanceOperationObjects: MoneyBalanceOperation[]) => {
            const loadedMoneyBalanceOperationList: MoneyBalanceOperation[] = [];
            for (const key in moneyBalanceOperationObjects) {
                if (moneyBalanceOperationObjects[key].hasOwnProperty('receiver')) {
                    const fetchedTransaction = moneyBalanceOperationObjects[key] as TransactionSummary;
                    loadedMoneyBalanceOperationList.push(new TransactionSummary(
                        fetchedTransaction.transferType,
                        fetchedTransaction.title,
                        fetchedTransaction.requestDate,
                        fetchedTransaction.amount,
                        fetchedTransaction.currency
                    ));
                } else {
                    const fetchedCurrencyExchange = moneyBalanceOperationObjects[key] as CurrencyExchangeHistoryResponse;
                    loadedMoneyBalanceOperationList.push(new CurrencyExchangeHistory(
                        fetchedCurrencyExchange.requestDate,
                        fetchedCurrencyExchange.amountBought,
                        fetchedCurrencyExchange.currencyBought,
                        fetchedCurrencyExchange.amountSold,
                        fetchedCurrencyExchange.currencySold
                    ));
                }
            }
            setRecentActivityList(loadedMoneyBalanceOperationList);
            setRecentActivityLoaded(true);
        }

        const sendGetRecentActivityRequestConfig: RequestConfig = {
            url: REST_PATH_TRANSFER + '/recentActivity'
        };

        sendGetRecentActivityRequest(sendGetRecentActivityRequestConfig, handleFetchRecentActivitySuccess);
    }, [sendGetRecentActivityRequest]);

    return (
        <Box height="547px" sx={{
            display: "flex",
            flexDirection: "column"
        }}>
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
            {!recentActivityLoaded && !errorRecentActivity &&
                <CircularProgress color="primary" sx={{
                    alignSelf: "center",
                    marginTop: "auto",
                    marginBottom: "auto"
                }}/>
            }
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
                    recentActivityLoaded && recentActivityList.map(recentActivity => {
                        if (recentActivity instanceof TransactionSummary) {
                            return <Transaction item={recentActivity as TransactionSummary} key={recentActivityList.indexOf(recentActivity)}/>
                        } else {
                            return <CurrencyExchangeHistoryCard item={recentActivity as CurrencyExchangeHistory} key={recentActivityList.indexOf(recentActivity)}/>;
                        }
                    })
                }
            </Box>
        </Box>
    );
};

export default RecentActivityContent;
