import React, {useState} from 'react';

const useInput = (validateValue: (value: string) => boolean, initialValue?: string, shouldUpdate?: (value: string) => boolean) => {
    if (!initialValue) {
        initialValue = '';
    }

    const [enteredValue, setEnteredValue] = useState<string>(initialValue);
    const [isTouched, setIsTouched] = useState<boolean>(false);

    const valueIsValid = validateValue(enteredValue);
    const hasError = !valueIsValid && isTouched;

    const valueChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        let valueToSet = (event.target as HTMLInputElement).value;
        if (!shouldUpdate || shouldUpdate(valueToSet)) {
            setEnteredValue(valueToSet);
        }
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