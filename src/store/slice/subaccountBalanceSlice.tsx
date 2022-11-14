import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AccountCurrencyBalance} from "../../components/transfers/TotalBalanceContent";
import {Decimal} from "decimal.js";

export const subaccountBalanceSlice = createSlice({
    name: 'subaccountBalance',
    initialState: {
        subaccounts: [] as AccountCurrencyBalance[]
    },

    reducers: {
        setSubaccountsBalance: (state, action: PayloadAction<AccountCurrencyBalance[]>) => {
            state.subaccounts = action.payload;
        },
        setBalance: (state, action) => {
            let newBalanceList = state.subaccounts.map(a => {
                if (a.currency === action.payload.currency) {
                    a.balance = action.payload.amount
                }
                return a;
            })
            console.log(newBalanceList)
            state.subaccounts = newBalanceList;

        },
        addToBalance: (state, action) => {
            let newBalanceList = state.subaccounts.map(a => {
                if (a.currency === action.payload.currency) {
                    let x = Decimal.add(action.payload.amount, a.balance as Decimal)
                    a.balance = x
                }
                return a;
            })
            state.subaccounts = newBalanceList;
        },
        subtractFromBalance: (state, action) => {
            let newBalanceList = state.subaccounts.map(a => {
                if (a.currency === action.payload.currency) {
                    let x = Decimal.sub(a.balance as Decimal, action.payload.amount)
                    a.balance = x
                }
                return a;
            })
            state.subaccounts = newBalanceList;
        }
    }
})

export const subaccountBalanceActions = subaccountBalanceSlice.actions;
export default subaccountBalanceSlice.reducer;