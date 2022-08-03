import {isNotEmpty} from "../input-rules/is-not-empty";

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
    return (userDecimalPlaces <= maxDecimalPlaces) && parseFloat(value) >= 0.0;
}

export const shouldUpdateTransferInput = (value: string, userBalance: number): boolean => {
    return shouldUpdateNumberInput(value) && hasEnoughMoney(userBalance, value);
}

const isPositiveValue = (value: string): boolean => {
    const numericValue = parseFloat(value);
    return numericValue > 0;
}

export const isValidAmount = (value: string): boolean => {
    return isNotEmpty(value) && isPositiveValue(value);
}

export const hasEnoughMoney = (userBalance: number, amountValue: string): boolean => {
    return amountValue.trim() === '' || userBalance - parseFloat(amountValue) >= 0; // first condition: if user input is empty, let it be changed
}