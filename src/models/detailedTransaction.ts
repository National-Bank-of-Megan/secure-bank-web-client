import Decimal from "decimal.js";
import MoneyBalanceOperation from "./moneyBalanceOperation";

class DetailedTransaction extends MoneyBalanceOperation {
    transferType: string;
    title: string;
    amount: Decimal;
    currency: string;
    status: string;
    sender: string;
    receiver: string;
    balanceAfterTransfer: Decimal;

    constructor(id: number, transferType: string, requestDate: Date, title: string, amount: Decimal, currency: string,
                status: string, sender: string, receiver: string, balanceAfterTransfer: Decimal) {
        super(id, requestDate);
        this.transferType = transferType;
        this.title = title;
        this.amount = amount;
        this.currency = currency;
        this.status = status;
        this.sender = sender;
        this.receiver = receiver;
        this.balanceAfterTransfer = balanceAfterTransfer;
    }
}

export default DetailedTransaction;