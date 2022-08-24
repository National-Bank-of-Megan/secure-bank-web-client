import {createAction, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

export const sendRequest = createAsyncThunk(
    'userAuthentication/sendRequest',
    async (request: { body: string, url: string, method: string }, dispatch) => {
        console.log(request.url)
        console.log('=== INSIDE SEND REQUEST ACTION ===');
        const response = await fetch(request.url, {
            method: request.method,
            headers: {'Content-Type': 'application/json'},
            body: request.body
        })

        const status = response.status
        console.log('status :' + status)
        console.log(status === 206)
        if (status === 200 || status === 206) return dispatch.fulfillWithValue({
            status: status,
            data: await response.json() || null
        });
        else return dispatch.rejectWithValue({
            status: response.status,
            error: await response.text() || 'Invalid credentials'
        })
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
//


//     state.status = -1;
// state.authTokens.accessToken = null;
// state.authTokens.refreshToken = null;
// state.isLoading = false;
// dispatchSynchronously


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
        console.log('status :' + status)
        if (status === 200) return dispatch.fulfillWithValue({status: status, data: await response.json()});
        if (status === 206) return dispatch.fulfillWithValue(await response.json());
        return dispatch.rejectWithValue({
            status: response.status,
            error: await response.text() || 'Invalid credentials'
        })
    }
)

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
    },

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
                    refreshToken: payload.payload.data.access_token
                } : null;
            })
            .addCase(logout,(state)=>{
                console.log('extra reducers logout')
                state.isLoading = false;
                state.authTokens = {accessToken: null, refreshToken: null};
                state.status = -1;
                state.error = null;
            })

    },

    reducers: {

    }

})


export const userAuthenticationActions = userAuthenticationSlice.actions;
export default userAuthenticationSlice.reducer;