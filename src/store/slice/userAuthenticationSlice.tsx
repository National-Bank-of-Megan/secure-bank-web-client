import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import DecodedJWT from "../../models/decodedJWT";

export const authenticate = createAsyncThunk(
    'userAuthentication/authenticate',
    async (data: { body: string, url: string }, dispatch) => {
        console.log('authenticating...')

        const response = await fetch(data.url, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: data.body
        })

        const status = response.status
        if (status === 200) return dispatch.fulfillWithValue({status: status, data: await response.json()});
        if (status === 206) return dispatch.fulfillWithValue(await response.json());
        return dispatch.rejectWithValue({
            status: response.status,
            error: await response.text() || 'Invalid credentials'
        })
    }
)


export const userAuthenticationSlice = createSlice({
    name: "userAuthentication",
    initialState: {
        authTokens: {accessToken: null, refreshToken: null},
        status: -1,
        isLoading: false,
        error: null
    },

    extraReducers: (builder) => {
        builder
            .addCase(authenticate.pending, (state) => {
                state.isLoading = true;

            })
            .addCase(authenticate.rejected, (state, {payload}
            ) => {

                state.isLoading = false;
                // @ts-ignore
                state.error = payload['error']
                // @ts-ignore
                state.status = payload['status']
            })
            .addCase(authenticate.fulfilled, (state, payload) => {
                state.isLoading = false;
                state.error = null;
                // @ts-ignore
                state.status = payload.payload.status
                // @ts-ignore
                state.authTokens = payload.payload.status === 200 ? {
                    accessToken: payload.payload.data.access_token,
                    refreshToken: payload.payload.data.access_token
                } : null;
            })
    },

    reducers: {

        isUserLoggedIn: (state) => {
            const token = state.authTokens.accessToken;
            if(token === undefined) return false;
            // console.log(token)
            const toMilliseconds = 1000;
            const authTokenExpiration = jwt_decode<DecodedJWT>(token!).exp;
            return authTokenExpiration * toMilliseconds >= new Date().getTime()
        },

        logout: (state) => {
            state.status = -1;
            state.authTokens.accessToken = null;
            state.authTokens.refreshToken = null;
        }
    }

})


export const userAuthenticationActions = userAuthenticationSlice.actions;
export default userAuthenticationSlice.reducer;