import Decimal from "decimal.js";

export type DetailedTransactionTypeResponse = {
    amount: Decimal;
    balanceAfter: Decimal;
    currency: string;
    doneDate: Date;
    receiver: string;
    requestDate :Date;
    status: string;
    title :string;
}
