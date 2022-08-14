import useFetch, {RequestConfig} from "../../hook/use-fetch";
import React, {useEffect, useState} from "react";
import {CurrencyExchangeHistoryType} from "../../models/custom-types/CurrencyExchangeHistoryType";
import {DetailedTransactionType} from "../../models/custom-types/DetailedTransactionType";
import OperationsList from "./OperationsList";
import ExchangeList from "./ExchangeList";
import {CurrencyExchangeHistoryTypeResponse} from "../../models/custom-types/CurrencyExchangeHistoryTypeResponse";
import {REST_PATH_EXCHANGE, REST_PATH_TRANSFER} from "../../constants/Constants";
import Spinner from "../common/Spinner";
import HistoryNavigation from "./HistoryNavigation";
import {Typography} from "@mui/material";
import {DetailedTransactionTypeResponse} from "../../models/custom-types/DetailedTransactionTypeResponse";
import {wait} from "@testing-library/user-event/dist/utils";
import exchangeList from "./ExchangeList";

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
    const [currencyExchangeHistory, setCurrencyExchangeHistory] = useState<CurrencyExchangeHistoryType[]>([]);
    const [recentTransfers, setRecentTransfers] = useState<DetailedTransactionType[]>([]);

    const [currentSortType, setCurrentSortType] = useState<string>( 'None')

    const sortAscending = (data :CurrencyExchangeHistoryType[] | DetailedTransactionType[]) =>{
        return data.slice().sort(function(first, second) {
            return Number(first.date) - Number(second.date);
        });
    }

    const sortDescending = (data :CurrencyExchangeHistoryType[] | DetailedTransactionType[]) =>{
        return data.slice().sort(function(first, second) {
            return Number(second.date) - Number(first.date);
        });
    }

    const getSortedData = (data :CurrencyExchangeHistoryType[] | DetailedTransactionType[], sortType : string)=>{
        switch(sortType) {
            case 'Oldest to newest':
                return sortDescending(data);
            case 'Newest to oldest':
                return sortAscending(data);
            default:
                return data;
        }
    }


    const returnHistory = () => {
        let data =[]
        if (props.currentlyBrowsing === 'transfers') {
            data = getSortedData(recentTransfers,currentSortType);
            if (recentTransfers.length === 0)
                return <Typography variant="h4" color="primary.main">You do not have any transfers</Typography>
            else
                { // @ts-ignore
                    return <OperationsList history={data}/>
                }
        } else {
            data = getSortedData(currencyExchangeHistory,currentSortType);
            if (currencyExchangeHistory.length === 0)
                return <Typography variant="h4" color="primary.main">You do not have any currency exchanges</Typography>
            else
                { // @ts-ignore
                    return <ExchangeList history={data}/>
                }
        }
    }

    useEffect(() => {


        //  fetching currency exchange history
        const transformCurrencyExchangeHistory = (currencyExchangeHistoryObj: CurrencyExchangeHistoryTypeResponse[]) => {
            const history: CurrencyExchangeHistoryType[] = [];
            for (const key in currencyExchangeHistoryObj) {
                history.push({
                    date: new Date(currencyExchangeHistoryObj[key].orderedOn),
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
            const history: DetailedTransactionType[] = [];
            for (const key in detailedTransactionTypeObj) {
                //todo co zorbic requested date
                history.push({
                    date: new Date(detailedTransactionTypeObj[key].doneDate),
                    title: detailedTransactionTypeObj[key].title,
                    amount: detailedTransactionTypeObj[key].amount,
                    currency: detailedTransactionTypeObj[key].currency,
                    status: detailedTransactionTypeObj[key].status,
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
        <>

            {/*add error handler*/}
            <HistoryNavigation currentlyBrowsing={props.currentlyBrowsing}
                               handleBrowsingChange={props.handleBrowsingChange}
                               state = {{"state" : currentSortType, "setState" : setCurrentSortType}}
            />
            <Spinner isLoading={isLoadingExchangeHistory || isLoadingDetailedTransaction}/>
            {returnHistory()}
        </>
    );

}

export default History;