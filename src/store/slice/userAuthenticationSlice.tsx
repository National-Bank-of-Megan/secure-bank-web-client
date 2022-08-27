import {createAction, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {UserAuthenticationSliceType} from "../slice-types/UserAuthenticationSliceType";

export const sendRequest = createAsyncThunk(
    'userAuthentication/sendRequest',
    async (request: { body: string, url: string, method: string }, dispatch) => {
        console.log('=== INSIDE SEND REQUEST ACTION ===');
        const response = await fetch(request.url, {
            method: request.method,
            headers: {'Content-Type': 'application/json'},
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
            return dispatch.rejectWithValue({
                status: response.status,
                error: await response.text() || 'Invalid credentials'
            })
        }

    }
)

export const logout = createAction(
    'userAuthentication/logout', function prepare() {
        console.log('action logout')
        dispatchSynchronously().then(r => console.log('Store cleared'))
        return {
            payload: {
                isLoading: false,
                authTokens: {accessToken: null, refreshToken: null},
                error: null,
                status: -1
            },
        }
    })

const dispatchSynchronously = async () => {
    await storage.removeItem('persist: persist-key')
}


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
                state.error = payload['error']
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
            .addCase(logout,(state)=>{
                console.log('extra reducers logout')
                state.isLoading = false;
                state.authTokens = {accessToken: null, refreshToken: null};
                state.status = -1;
                state.error = null;
                dispatchSynchronously()
            })

    },

    reducers: {
        setAccessToken : (state, payload)=>{
            state.authTokens.accessToken = payload.payload
        }
    }

})


export const userAuthenticationActions = userAuthenticationSlice.actions;
export default userAuthenticationSlice.reducer;