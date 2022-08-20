import Decimal from "decimal.js";
import MoneyBalanceOperation from "./moneyBalanceOperation";

class CurrencyExchangeHistory extends MoneyBalanceOperation {
    bought: Decimal;
    currencyBought: string;
    sold: Decimal;
    currencySold: string;

    constructor(requestDate: Date, bought: Decimal, currencyBought: string, sold: Decimal, currencySold: string) {
        super(requestDate);
        this.bought = bought;
        this.currencyBought = currencyBought;
        this.sold = sold;
        this.currencySold = currencySold;
    }
}

export default CurrencyExchangeHistory;
