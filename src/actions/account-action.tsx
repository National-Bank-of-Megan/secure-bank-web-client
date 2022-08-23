import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {RootState} from "../store/store";

// const transformSubAccounts = (currenciesBalanceObj: AccountCurrencyBalanceResponse[]) => {
//     console.log(currenciesBalanceObj)
//     const loadedCurrencyBalances: AccountCurrencyBalance[] = [];
//     for (const key in currenciesBalanceObj) {
//         console.log(key)
//         loadedCurrencyBalances.push({
//             currency: currenciesBalanceObj[key].currency,
//             symbol: availableCurrencies[currenciesBalanceObj[key].currency as keyof typeof availableCurrencies],
//             balance: new Decimal(currenciesBalanceObj[key].balance)
//         });
//     }
//
//     return loadedCurrencyBalances;
// }

// export const fetchSubAccounts = (): ThunkAction<Promise<void>, RootState, unknown, AnyAction> => async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>): Promise<void> => {
//
//
//
//     const header :Headers = {};
//     header['Authorization'] = 'Bearer ' + store.getState().userAuth['authTokens']['accessToken']
//     const url = REST_PATH_AUTH + '/account/currency/all';
//     const response = await fetch(url, {
//         method: "GET",
//         headers: header,
//         body: null
//     })
//
//     if (!response.ok) {
//         const text = await response.text() || 'Invalid credentials';
//         dispatch({
//             type: SUB_ACCOUNTS_FETCH_FAILURE,
//             error: text,
//             status: response.status
//         })
//
//         return Promise.reject(text)
//     }
//
//
//     const responseText = await response.text();
//     let data = responseText === "" ? {} : JSON.parse(responseText);
//     const subAccounts = transformSubAccounts(data);
//
//     dispatch({
//         type: SUB_ACCOUNTS_FETCH_SUCCESS,
//         status: response.status,
//         payload: subAccounts
//     })
// }


export const updateSubAccounts = (): ThunkAction<Promise<void>, RootState, unknown, AnyAction> => async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>): Promise<void> => {


}