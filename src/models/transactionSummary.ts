import MoneyBalanceOperation from "./moneyBalanceOperation";
import Decimal from "decimal.js";

class TransactionSummary extends MoneyBalanceOperation {
    transferType: string;
    title: string;
    amount: Decimal;
    currency: string;

    constructor(id: number, transferType: string, title: string, requestDate: Date, amount: Decimal, currency: string) {
        super(id, requestDate);
        this.transferType = transferType;
        this.title = title;
        this.amount = amount;
        this.currency = currency;
    }
}

export default TransactionSummary;