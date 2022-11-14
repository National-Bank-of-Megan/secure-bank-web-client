import Decimal from "decimal.js";
import MoneyBalanceOperation from "./moneyBalanceOperation";

class CurrencyExchangeHistory extends MoneyBalanceOperation {
    bought: Decimal;
    currencyBought: string;
    sold: Decimal;
    currencySold: string;

    constructor(id: number, requestDate: Date, bought: Decimal, currencyBought: string, sold: Decimal, currencySold: string) {
        super(id, requestDate);
        this.bought = bought;
        this.currencyBought = currencyBought;
        this.sold = sold;
        this.currencySold = currencySold;
    }
}

export default CurrencyExchangeHistory;
