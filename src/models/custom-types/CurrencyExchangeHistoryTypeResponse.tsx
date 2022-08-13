import Decimal from "decimal.js";

export type CurrencyExchangeHistoryTypeResponse =
    {
        amountBought: Decimal;
        currencyBought: string;
        amountSold: Decimal;
        currencySold: string;
        orderedOn: Date;
    }
