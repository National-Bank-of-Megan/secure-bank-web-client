import React, { useState } from 'react';

const useInput = (validateValue: (value: string) => boolean) => {
    const [enteredValue, setEnteredValue] = useState<string>('');
    const [isTouched, setIsTouched] = useState<boolean>(false);

    const valueIsValid = validateValue(enteredValue);
    const hasError = !valueIsValid && isTouched;

    const valueChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEnteredValue((event.target as HTMLInputElement).value);
    };

    const inputBlurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
        if (event.target.value !== '') {
            setIsTouched(true);
        }
    };

    return {
        value: enteredValue,
        isValid: valueIsValid,
        hasError,
        setIsTouched,
        valueChangeHandler,
        inputBlurHandler
    };
};

export default useInput;