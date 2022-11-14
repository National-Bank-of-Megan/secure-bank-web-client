import Decimal from "decimal.js";
import MoneyBalanceOperation from "./moneyBalanceOperation";

class CurrencyExchangeHistoryResponse extends MoneyBalanceOperation {
    amountBought: Decimal;
    currencyBought: string;
    amountSold: Decimal;
    currencySold: string;

    constructor(id: number, requestDate: Date, amountBought: Decimal, currencyBought: string, amountSold: Decimal, currencySold: string) {
        super(id, requestDate);
        this.amountBought = amountBought;
        this.currencyBought = currencyBought;
        this.amountSold = amountSold;
        this.currencySold = currencySold;
    }
}

export default CurrencyExchangeHistoryResponse;