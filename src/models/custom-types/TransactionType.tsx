import Decimal from "decimal.js";

export  type TransactionType =
    {
        title: string;
        date: Date;
        amount: Decimal;
        currency: string;
    };