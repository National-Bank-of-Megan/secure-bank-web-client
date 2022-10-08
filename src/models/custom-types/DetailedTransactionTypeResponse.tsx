import Decimal from "decimal.js";

export type DetailedTransactionTypeResponse = {
    transferType: string;
    amount: Decimal;
    balanceAfter: Decimal;
    currency: string;
    doneDate: Date;
    sender: string;
    receiver: string;
    requestDate: Date;
    status: string;
    title: string;
}
