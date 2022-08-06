import React, {useState} from 'react';
import {Decimal} from "decimal.js";

const useTransferInput = (validateValue: (value: string) => boolean, userBalance: Decimal, shouldUpdate: (amount: string, userBalance: Decimal) => boolean ) => {
    const [enteredValue, setEnteredValue] = useState<string>('');
    const [isTouched, setIsTouched] = useState<boolean>(false);

    const valueIsValid = validateValue(enteredValue);
    const hasError = !valueIsValid && isTouched;

    const valueChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        let valueToSet = (event.target as HTMLInputElement).value;
        if (shouldUpdate(valueToSet, userBalance)) {
            setEnteredValue(valueToSet);
        }
    };

    const inputBlurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
        if (event.target.value !== '') {
            setIsTouched(true);
        }
    };

    const clearInput = () => {
        setEnteredValue('');
        setIsTouched(false);
    };

    return {
        value: enteredValue,
        isValid: valueIsValid,
        hasError,
        setIsTouched,
        valueChangeHandler,
        inputBlurHandler,
        clearInput,
        setEnteredValue
    };
}

export default useTransferInput;

