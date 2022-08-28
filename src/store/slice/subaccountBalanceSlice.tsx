import {createAction, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AccountCurrencyBalance} from "../../components/transfers/TotalBalanceContent";
import {logout, userAuthenticationSlice} from "./userAuthenticationSlice";
import {UpdateBalance} from "../action-types/UpdateBalance";
import {Decimal} from "decimal.js";

export const subaccountBalanceSlice = createSlice({
    name: 'subaccountBalance',
    initialState : {
        subaccounts: [] as AccountCurrencyBalance[]
    },

    reducers: {
        setSubaccountsBalance: (state, action :PayloadAction<AccountCurrencyBalance[]>) => {
            console.log('setting subaccounts balance -> '+ action.payload)
            state.subaccounts = action.payload;
        }
    }
})


export const subaccountBalanceActions = subaccountBalanceSlice.actions;
export default subaccountBalanceSlice.reducer;