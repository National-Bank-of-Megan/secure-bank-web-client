export type UserAuthenticationSliceType = {
    authToken: null | string,
    refreshToken: null | string,
    status: number,
    isLoading: boolean,
    error: string | null
}