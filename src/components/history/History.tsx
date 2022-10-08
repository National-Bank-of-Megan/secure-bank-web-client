import useFetch, {RequestConfig} from "../../hook/use-fetch";
import React, {useEffect, useState} from "react";
import OperationsList from "./OperationsList";
import ExchangeList from "./ExchangeList";
import {REST_PATH_EXCHANGE, REST_PATH_TRANSFER} from "../../constants/Constants";
import Spinner from "../common/Spinner";
import HistoryNavigation from "./HistoryNavigation";
import {Box, Typography} from "@mui/material";
import {DetailedTransactionTypeResponse} from "../../models/custom-types/DetailedTransactionTypeResponse";
import CurrencyExchangeHistory from "../../models/currencyExchangeHistory";
import DetailedTransaction from "../../models/detailedTransaction";
import CurrencyExchangeHistoryResponse from "../../models/currencyExchangeHistoryResponse";

const History: React.FC<{ currentlyBrowsing: string, handleBrowsingChange: (event: React.SyntheticEvent, newCurrent: string) => void }> = (props) => {
    const {
        isLoading: isLoadingExchangeHistory,
        error: errorExchangeHistory,
        sendRequest: sendCurrencyExchangeHistoryRequest
    } = useFetch();
    const {
        isLoading: isLoadingDetailedTransaction,
        error: errorDetailedTransaction,
        sendRequest: sendDetailedTransactionHistoryRequest
    } = useFetch();
    const [currencyExchangeHistory, setCurrencyExchangeHistory] = useState<CurrencyExchangeHistory[]>([]);
    const [recentTransfers, setRecentTransfers] = useState<DetailedTransaction[]>([]);

    const [currentSortType, setCurrentSortType] = useState<string>('Newest to oldest')

    const sortAscending = (data: CurrencyExchangeHistory[] | DetailedTransaction[]) => {
        return data.slice().sort(function (first, second) {
            return Number(second.requestDate) - Number(first.requestDate);
        });
    }

    const sortDescending = (data: CurrencyExchangeHistory[] | DetailedTransaction[]) => {
        return data.slice().sort(function (first, second) {
            return Number(first.requestDate) - Number(second.requestDate);
        });
    }

    const getSortedData = (data: CurrencyExchangeHistory[] | DetailedTransaction[], sortType: string) => {
        switch (sortType) {
            case 'Oldest to newest':
                return sortDescending(data);
            case 'Newest to oldest':
                return sortAscending(data);
            default:
                return data;
        }
    }


    const returnHistory = () => {
        let data = []
        if (props.currentlyBrowsing === 'transfers') {
            data = getSortedData(recentTransfers, currentSortType);
            if (recentTransfers.length === 0 && !errorDetailedTransaction)
                return <Typography variant="h4" color="primary.main">You do not have any transfers</Typography>
            else { // @ts-ignore
                return <OperationsList history={data} serverError={errorDetailedTransaction ? true : false}/>
            }
        } else {
            data = getSortedData(currencyExchangeHistory, currentSortType);
            if (currencyExchangeHistory.length === 0 && !errorExchangeHistory)
                return <Typography variant="h4" color="primary.main">You do not have any currency exchanges</Typography>
            else { // @ts-ignore
                return <ExchangeList history={data} serverError={errorExchangeHistory ? true : false}/>
            }
        }
    }

    useEffect(() => {


        //  fetching currency exchange history
        const transformCurrencyExchangeHistory = (currencyExchangeHistoryObj: CurrencyExchangeHistoryResponse[]) => {
            const history: CurrencyExchangeHistory[] = [];
            for (const key in currencyExchangeHistoryObj) {
                history.push({
                    requestDate: new Date(currencyExchangeHistoryObj[key].requestDate),
                    bought: currencyExchangeHistoryObj[key].amountBought,
                    currencyBought: currencyExchangeHistoryObj[key].currencyBought,
                    sold: currencyExchangeHistoryObj[key].amountSold,
                    currencySold: currencyExchangeHistoryObj[key].currencySold

                })
            }
            setCurrencyExchangeHistory(history);
        }

        const currencyExchangeHistoryRequest: RequestConfig = {
            'url': REST_PATH_EXCHANGE + '/all'
        }

        sendCurrencyExchangeHistoryRequest(currencyExchangeHistoryRequest, transformCurrencyExchangeHistory)

        //    fetching transaction history
        const transformDetailedTransactionHistory = (detailedTransactionTypeObj: DetailedTransactionTypeResponse[]) => {
            const history: DetailedTransaction[] = [];
            for (const key in detailedTransactionTypeObj) {
                //todo co zorbic requested date
                history.push({
                    transferType: detailedTransactionTypeObj[key].transferType,
                    requestDate: new Date(detailedTransactionTypeObj[key].doneDate),
                    title: detailedTransactionTypeObj[key].title,
                    amount: detailedTransactionTypeObj[key].amount,
                    currency: detailedTransactionTypeObj[key].currency,
                    status: detailedTransactionTypeObj[key].status,
                    sender: detailedTransactionTypeObj[key].sender,
                    receiver: detailedTransactionTypeObj[key].receiver,
                    balanceAfterTransfer: detailedTransactionTypeObj[key].balanceAfter
                })
            }
            console.log("transformed")
            console.log(history)
            setRecentTransfers(history)
        }

        const transformDetailedTransactionHistoryRequest: RequestConfig = {
            'url': REST_PATH_TRANSFER
        }

        sendDetailedTransactionHistoryRequest(transformDetailedTransactionHistoryRequest, transformDetailedTransactionHistory);

    }, [sendCurrencyExchangeHistoryRequest, setCurrencyExchangeHistory, setRecentTransfers, sendDetailedTransactionHistoryRequest])
    return (
        <Box sx={{position: 'relative', padding: '70px 180px 20px', height: '100%', minHeight: '100vh'}}>
            <HistoryNavigation currentlyBrowsing={props.currentlyBrowsing}
                               handleBrowsingChange={props.handleBrowsingChange}
                               state={{"state": currentSortType, "setState": setCurrentSortType}}
            />
            <Spinner isLoading={isLoadingExchangeHistory || isLoadingDetailedTransaction} isPositionAbsolute={true}/>
            {returnHistory()}
        </Box>
    );

}

export default History;