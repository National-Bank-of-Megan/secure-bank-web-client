import {useCallback, useState} from "react";

const useFetchCurrencyRates = (base: string) => {
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useCallback(() => {
        let requestURL = 'https://api.exchangerate.host/latest?base=' + base;
        let request = new XMLHttpRequest();
        request.open('GET', requestURL);
        request.responseType = 'json';
        request.send();

        request.onload = function () {
            var response = request.response;
            if (!response.ok) {
                alert("Not ok response")
            }
            console.log(response);
        }
    }, [setError, isLoading])

}

export default useFetchCurrencyRates;