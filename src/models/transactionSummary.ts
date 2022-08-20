import MoneyBalanceOperation from "./moneyBalanceOperation";
import Decimal from "decimal.js";

class TransactionSummary extends MoneyBalanceOperation {
    title: string;
    amount: Decimal;
    currency: string;

    constructor(title: string, requestDate: Date, amount: Decimal, currency: string) {
        super(requestDate);
        this.title = title;
        this.amount = amount;
        this.currency = currency;
    }
}

export default TransactionSummary;