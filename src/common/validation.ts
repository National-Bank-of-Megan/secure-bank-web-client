export const shouldUpdateInput = (value: string): boolean => {

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