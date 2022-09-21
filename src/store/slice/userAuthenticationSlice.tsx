import {createAction, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {UserAuthenticationSliceType} from "../slice-types/UserAuthenticationSliceType";
import {unmountComponentAtNode} from "react-dom";
import {useNavigate} from "react-router-dom";
import {ClientJS} from "clientjs";
import {wait} from "@testing-library/user-event/dist/utils";

export const sendRequest = createAsyncThunk(
    'userAuthentication/sendRequest',
    async (request: { body: string, url: string, method: string }, dispatch) => {
        console.log('=== INSIDE SEND REQUEST ACTION ===');
        const client = new ClientJS();
        console.log(client.getFingerprint().toString())
        const response = await fetch(request.url, {
            method: request.method,
            headers: {
                'Content-Type': 'application/json',
                'Device-Fingerprint' : client.getFingerprint().toString()
            },
            body: request.body
        })
        console.log(response)

        const status = response.status;

        if (status === 206 || status === 200) {
            console.log('sendRequest: dispatch.fulfillWithValue');
            console.log('=== PARSING RESPONSE (EXTRACTING TOKENS) ===');
            let tokens  = status == 206 ? null : await response.json();
            return dispatch.fulfillWithValue({
                status: status,
                data: tokens
            });
        }
        else {
            console.log('sendRequest: dispatch.rejectWithValue');
            const errorBody = await response.json();
            const errorMessage = await errorBody.message;
            return dispatch.rejectWithValue({
                status: response.status,
                error:  errorMessage || 'Invalid credentials'
            })
        }

    }
)



export const userAuthenticationSlice = createSlice({
    name: "userAuthentication",
    initialState: {
        authTokens: {accessToken: null, refreshToken: null},
        status: -1,
        isLoading: false,
        error: null
    } as UserAuthenticationSliceType,

    extraReducers: (builder) => {

        builder
            .addCase(sendRequest.pending, (state) => {
                console.log('pending')
                state.isLoading = true;
            })
            .addCase(sendRequest.rejected, (state, {payload}
            ) => {
                console.log('rejected')
                state.isLoading = false;
                // @ts-ignore
                state.error = payload.error
                // @ts-ignore
                state.status = payload['status']
            })
            .addCase(sendRequest.fulfilled, (state, payload) => {

                console.log('fulfilled')
                state.isLoading = false;
                state.error = null;
                // @ts-ignore
                state.status = payload.payload.status
                // @ts-ignore
                state.authTokens = payload.payload.status === 200 ? {
                    // @ts-ignore
                    accessToken: payload.payload.data.access_token,
                    // @ts-ignore
                    refreshToken: payload.payload.data.refresh_token
                } : null;
            })
          

    },

    reducers: {
        setAccessToken : (state, payload)=>{
            console.log('USER AUTH SLICE SETTING ACCESS TOKEN')
            console.log(payload.payload)
            state.authTokens.accessToken = payload.payload
        },
        clearAuthentication: (state) => {
            state.isLoading = false;
            state.authTokens = { accessToken: null, refreshToken: null };
            state.status = -1;
            state.error = null;
          }
    }

})


export const userAuthenticationActions = userAuthenticationSlice.actions;
export default userAuthenticationSlice.reducer;