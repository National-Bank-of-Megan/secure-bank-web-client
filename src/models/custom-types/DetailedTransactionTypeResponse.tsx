import Decimal from "decimal.js";

export type DetailedTransactionTypeResponse = {
    id: number;
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
