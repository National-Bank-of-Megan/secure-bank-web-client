import {useCallback, useState} from "react";
import {CURRENCIES} from "../constants/Constants";
import {GridRowsProp} from "@mui/x-data-grid";

const useFetchCurrencyRates = (base: string) => {
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [rates, setRates] = useState<GridRowsProp | null>(null)

    const getCurrencyRates = useCallback((base :string) => {
        setIsLoading(true);
        let currencyList = CURRENCIES.filter(c => c !== base)
        let requestURL = 'https://api.exchangerate.host/latest?base=' + base+'&symbols='+currencyList.toString();
        let request = new XMLHttpRequest();
        request.open('GET', requestURL);
        request.responseType = 'json';
        request.send();
        console.log('useCallback')
        request.onload = function () {
            setIsLoading(false);
            let response =  request.response;
            if (!response.ok) {
               setError("Service currently not in use!")
            }
            setRates(
                currencyList.map((currency) => {
                    return {id: currency, col1: currency, col2: response.rates[currency]}
                })
            )
        }
    }, [setError, setIsLoading,setRates])

    return {
        getCurrencyRates,
        error,
        isLoading,
        rates
    }

}

export default useFetchCurrencyRates;