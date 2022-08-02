export const removeErrorIfFieldEmpty = (value: string, setTouched: (isTouched: boolean) => void) => {
    if (value.trim() === '') {
        setTouched(false);
    }
}