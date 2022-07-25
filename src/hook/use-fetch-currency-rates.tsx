import {useCallback, useState} from "react";

const useFetchCurrencyRates = (base: string) => {
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const getCurrencyRates = useCallback((base :string) => {
        setIsLoading(true);
        let requestURL = 'https://api.exchangerate.host/latest?base=' + base;
        let request = new XMLHttpRequest();
        request.open('GET', requestURL);
        request.responseType = 'json';
        request.send();
        console.log('useCallback')
        request.onload = function () {
            setIsLoading(false);
            let response = request.response;
            if (!response.ok) {
               setError("Service currently not in use!")
            }
            console.log(response);
        }
    }, [setError, setIsLoading, base])

    return {
        getCurrencyRates,
        error,
        isLoading
    }

}

export default useFetchCurrencyRates;