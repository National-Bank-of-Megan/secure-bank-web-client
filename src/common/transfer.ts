import {AccountCurrencyBalance} from "../components/transfers/TotalBalanceContent";

export const findCurrencyByName = (selectedCurrencyName: string, loadedCurrencyBalances: AccountCurrencyBalance[]): AccountCurrencyBalance | undefined => {
    return loadedCurrencyBalances.find((accountCurrencyBalance) => {
        return accountCurrencyBalance.currency === selectedCurrencyName;
    });
}