import MoneyBalanceOperation from "./moneyBalanceOperation";
import Decimal from "decimal.js";

class TransactionSummary extends MoneyBalanceOperation {
    transferType: string;
    title: string;
    amount: Decimal;
    currency: string;

    constructor(transferType: string, title: string, requestDate: Date, amount: Decimal, currency: string) {
        super(requestDate);
        this.transferType = transferType;
        this.title = title;
        this.amount = amount;
        this.currency = currency;
    }
}

export default TransactionSummary;