import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type Tokens = {
    authToken: string | null;
    refreshToken: string | null;
};

export const userAuthenticationSlice = createSlice({
    name: "userAuthentication",
    initialState: {
        authToken: null,
        refreshToken: null
    } as Tokens,

    reducers: {
        loginHandler: (state, action: PayloadAction<Tokens>) => {
            state.authToken = action.payload.authToken;
            state.refreshToken = action.payload.refreshToken;
        },
        setAuthToken: (state, action) => {
            state.authToken = action.payload;
        },
        clearAuthentication: (state) => {
            state.authToken = null;
            state.refreshToken = null;
        }
    }
})


export const userAuthenticationActions = userAuthenticationSlice.actions;
export default userAuthenticationSlice.reducer;