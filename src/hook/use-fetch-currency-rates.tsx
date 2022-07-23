const useFetchCurrencyRates = (base :string) => {

    let requestURL = 'https://api.exchangerate.host/latest?base='+base;
    let request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();

    request.onload = function() {
        var response = request.response;
        console.log(response);
    }




}

export default useFetchCurrencyRates;