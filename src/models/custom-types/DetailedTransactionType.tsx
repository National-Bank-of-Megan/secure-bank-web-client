import Decimal from "decimal.js";

export type DetailedTransactionType = {
    date: Date;
    title :string;
    amount: Decimal;
    currency: string;
    status: string;
    receiver: string;
    balanceAfterTransfer: Decimal;

};