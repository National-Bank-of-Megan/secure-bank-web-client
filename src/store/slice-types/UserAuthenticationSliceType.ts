export type UserAuthenticationSliceType = {
    authTokens: {accessToken: null | string, refreshToken: null | string},
    status: number,
    isLoading: boolean,
    error: string | null
}