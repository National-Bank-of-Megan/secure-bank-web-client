import Decimal from "decimal.js";

export type UpdateBalance = {
    currency: string;
    amount: Decimal
}