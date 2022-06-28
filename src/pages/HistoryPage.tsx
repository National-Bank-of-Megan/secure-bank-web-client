import {ArrowDropDown, Search} from "@mui/icons-material";
import {
    Button,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput, Pagination,
    Paper,
    Tab,
    Tabs,
} from "@mui/material";
import {Box, Typography} from "@mui/material";
import React, {useState} from "react";
import HistoryNavigation from "../components/history/HistoryNavigation";
import OperationsList from "../components/history/OperationsList";
import TransactionDetailed from "../components/transfers/TransactionDetailed";
import ExchangeList from "../components/history/ExchangeList";
import {ExchangeProps} from "../components/history/custom-props/ExchangeProps";
import {TransactionProps} from "../components/history/custom-props/TransactionProps";
import {DetailedTransactionProps} from "../components/history/custom-props/DetailedTransactionProps";

const HistoryPage = () => {

    const exchangeHistory :ExchangeProps[] = [
        { bought : 400, boughtCurrency :'USD', sold : 400, soldCurrency : 'PLN', date : new Date(2022,0O5,12)},
        { bought : 400, boughtCurrency :'USD', sold : 400, soldCurrency : 'PLN', date : new Date(2022,0O5,12)},
    ]

    const recentTransfers :DetailedTransactionProps[] =[
        {title : 'Spotify', date :new Date(2022,0O5,12), amount : 20.00, currency :'PLN',  status : 'completed',receiver: 'Mike',balanceAfterTransfer :1234.67,accountCurrency :'USD'},
        {title : 'Dziwki', date :new Date(2022,0O5,12), amount : -120.00, currency :'CHF',  status : 'completed',receiver: 'Mike',balanceAfterTransfer :1234.67,accountCurrency :'USD'},
        {title : 'Spotify', date :new Date(2022,0O5,12), amount : 20.00, currency :'PLN',  status : 'completed',receiver: 'Mike',balanceAfterTransfer :1234.67,accountCurrency :'USD'},

    ]


    const [currentlyBrowsing, setCurrentlyBrowsing] = useState('transfers');

    const handleBrowsingChange = (event: React.SyntheticEvent, newCurrent: string) => {
        setCurrentlyBrowsing(newCurrent);
    };

    const returnHistory = () => {
        if (currentlyBrowsing === 'transfers') {
            return <OperationsList  history={recentTransfers}/>
        }else{
            return <ExchangeList history={exchangeHistory}/>
        }
    }

    return (
        <>
            <HistoryNavigation currentlyBrowsing={currentlyBrowsing} handleBrowsingChange={handleBrowsingChange}/>
            {returnHistory()}

        </>
    );
};

export default HistoryPage;
