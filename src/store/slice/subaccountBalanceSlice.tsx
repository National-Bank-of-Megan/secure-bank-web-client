import {createSlice, PayloadAction} from "@reduxjs/toolkit";
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
            state.subaccounts = action.payload;
        },
        logout : (state)=>{
            state.subaccounts = []
        }

        // addMoney : (state, action :PayloadAction<UpdateBalance>)=>{
        //     let newBalance = state.subaccounts.splice(0);
        //   newBalance.forEach(c=>{
        //       if(c.currency === action.payload.currency){
        //           c.balance = Decimal.add(c.balance,action.payload.amount)
        //       }
        //   })
        // },
        //
        // subtractMoney : (state, action :PayloadAction<UpdateBalance>)=>{
        //     state.subaccounts.forEach(c=>{
        //         if(c.currency === action.payload.currency){
        //             c.balance.sub(action.payload.amount)
        //         }
        //     })
        // }
    }
})


export const subaccountBalanceActions = subaccountBalanceSlice.actions;
export default subaccountBalanceSlice.reducer;