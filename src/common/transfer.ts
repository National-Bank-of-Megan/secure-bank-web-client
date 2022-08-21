import {AccountCurrencyBalance} from "../components/transfers/TotalBalanceContent";
import DetailedTransaction from "../models/detailedTransaction";
import {TRANSFER_TYPE_RECEIVED} from "../constants/Constants";
import TransactionSummary from "../models/transactionSummary";

export const findCurrencyByName = (selectedCurrencyName: string, loadedCurrencyBalances: AccountCurrencyBalance[]): AccountCurrencyBalance | undefined => {
    return loadedCurrencyBalances.find((accountCurrencyBalance) => {
        return accountCurrencyBalance.currency === selectedCurrencyName;
    });
}

export const getAmountMathSymbol = (detailedTransaction: DetailedTransaction | TransactionSummary) => {
    return detailedTransaction.transferType === TRANSFER_TYPE_RECEIVED ? '+' : '-';
}