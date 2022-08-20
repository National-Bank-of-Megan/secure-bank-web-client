import Decimal from "decimal.js";
import MoneyBalanceOperation from "./moneyBalanceOperation";

class DetailedTransaction extends MoneyBalanceOperation {
    title :string;
    amount: Decimal;
    currency: string;
    status: string;
    receiver: string;
    balanceAfterTransfer: Decimal;

    constructor(requestDate: Date, title: string, amount: Decimal, currency: string, status: string,
                receiver: string, balanceAfterTransfer: Decimal) {
        super(requestDate);
        this.title = title;
        this.amount = amount;
        this.currency = currency;
        this.status = status;
        this.receiver = receiver;
        this.balanceAfterTransfer = balanceAfterTransfer;
    }
}

export default DetailedTransaction;