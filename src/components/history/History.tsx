import useFetch, {RequestConfig} from "../../hook/use-fetch";
import React, {useEffect, useState} from "react";
import {CurrencyExchangeHistoryType} from "../../models/custom-types/CurrencyExchangeHistoryType";
import {DetailedTransactionType} from "../../models/custom-types/DetailedTransactionType";
import OperationsList from "./OperationsList";
import ExchangeList from "./ExchangeList";
import {CurrencyExchangeHistoryTypeResponse} from "../../models/custom-types/CurrencyExchangeHistoryTypeResponse";
import {REST_PATH_EXCHANGE} from "../../constants/Constants";
import Spinner from "../common/Spinner";
import HistoryNavigation from "./HistoryNavigation";

const History :React.FC<{currentlyBrowsing: string, handleBrowsingChange : (event: React.SyntheticEvent, newCurrent: string)=> void }> =(props) => {
    const {isLoading, error, sendRequest: sendCurrencyExchangeHistoryRequest} = useFetch();
    const [currencyExchangeHistory, setCurrencyExchangeHistory] = useState<CurrencyExchangeHistoryType[]>([]);
    const recentTransfers: DetailedTransactionType[] = [
        {
            title: 'Spotify',
            date: new Date(2022, 0O5, 12),
            amount: 20.00,
            currency: 'PLN',
            status: 'completed',
            receiver: 'Mike',
            balanceAfterTransfer: 1234.67,
            accountCurrency: 'USD'
        },
        {
            title: 'Dziwki',
            date: new Date(2022, 0O5, 12),
            amount: -120.00,
            currency: 'CHF',
            status: 'completed',
            receiver: 'Mike',
            balanceAfterTransfer: 1234.67,
            accountCurrency: 'USD'
        },
        {
            title: 'Spotify',
            date: new Date(2022, 0O5, 12),
            amount: 20.00,
            currency: 'PLN',
            status: 'completed',
            receiver: 'Mike',
            balanceAfterTransfer: 1234.67,
            accountCurrency: 'USD'
        },

    ]

    const returnHistory = () => {
        if (props.currentlyBrowsing === 'transfers') {
            return <OperationsList history={recentTransfers}/>
        } else {
            return <ExchangeList history={currencyExchangeHistory}/>
        }
    }

    useEffect(() => {

        console.log('Fetching currency exchange history from HistoryPage')
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
    }, [sendCurrencyExchangeHistoryRequest, setCurrencyExchangeHistory])
    return (
        <>
            <Spinner isLoading={isLoading}/>
            <HistoryNavigation currentlyBrowsing={props.currentlyBrowsing} handleBrowsingChange={props.handleBrowsingChange}/>
            {returnHistory()}
        </>
    );

}

export default History;