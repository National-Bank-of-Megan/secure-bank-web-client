import Decimal from "decimal.js";

export type CurrencyExchangeHistoryType =
    {
        bought: Decimal;
        currencyBought: string;
        sold: Decimal;
        currencySold: string;
        date: Date;
    };
