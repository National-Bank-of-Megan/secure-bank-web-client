import {isNotEmpty} from "../input-rules/is-not-empty";
import {Decimal} from "decimal.js";

export const shouldUpdateNumberInput = (value: string): boolean => {

    const countDecimals = (value: number) => {
        if ((value % 1) !== 0)
            return value.toString().split(".")[1].length;
        return 0;
    }

    if (value.trim() === '') {
        return true;
    }
    const maxDecimalPlaces = 2;
    const userDecimalPlaces = countDecimals(parseFloat(value));
    console.log((userDecimalPlaces <= maxDecimalPlaces) && new Decimal(value).greaterThan(0.0))
    return (userDecimalPlaces <= maxDecimalPlaces) && new Decimal(value).greaterThan(0.0);
}

export const shouldUpdateTransferInput = (value: string, userBalance: Decimal): boolean => {
    return shouldUpdateNumberInput(value) && hasEnoughMoney(userBalance, value);
}

const isPositiveValue = (value: string): boolean => {
    const numericValue = parseFloat(value);
    return numericValue > 0;
}

export const isValidAmount = (value: string): boolean => {
    return isNotEmpty(value) && isPositiveValue(value);
}

export const hasEnoughMoney = (userBalance: Decimal, amountValue: string): boolean => {
    return amountValue.trim() === '' || Decimal.sub(userBalance, amountValue).greaterThan(0.0); // first condition: if user input is empty, let it be changed
}