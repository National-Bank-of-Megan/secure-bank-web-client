import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AccountCurrencyBalance} from "../../components/transfers/TotalBalanceContent";
import {Decimal} from "decimal.js";

export type AccountCurrencyBalanceOperation = {
    currency: string;
    amount: Decimal;
};

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
            state.subaccounts = state.subaccounts.map(a => {
                if (a.currency === action.payload.currency) {
                    a.balance = action.payload.amount
                }
                return a;
            });
        },

        addToBalance: (state, action: PayloadAction<AccountCurrencyBalanceOperation>) => {
            state.subaccounts = state.subaccounts.map(a => {
                if (a.currency === action.payload.currency) {
                    a.balance = Decimal.add(action.payload.amount, a.balance as Decimal)
                }
                return a;
            });
        },

        subtractFromBalance: (state, action: PayloadAction<AccountCurrencyBalanceOperation>) => {
            state.subaccounts = state.subaccounts.map(a => {
                if (a.currency === action.payload.currency) {
                    a.balance = Decimal.sub(a.balance as Decimal, action.payload.amount)
                }
                return a;
            });
        }

    }
})

export const subaccountBalanceActions = subaccountBalanceSlice.actions;
export default subaccountBalanceSlice.reducer;