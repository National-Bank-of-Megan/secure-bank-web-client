import {Avatar, Grid, Stack} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import useFetch, {RequestConfig} from "../../hook/use-fetch";
import AccountContext from "../../store/account-context";
import {REST_PATH_AUTH} from "../../constants/Constants";
import {AccountData} from "../../common/account";
import AccountInfoField from "./AccountInfoField";
import UserAuthenticationService from "../../store/service/UserAuthenticationService";
import jwt_decode from "jwt-decode";
import DecodedJWT from "../../models/decodedJWT";
import store from "../../store/store";

const AccountInfo = () => {
    const { isLoading, error, sendRequest: fetchAccountData } = useFetch();
    const accountCtx = useContext(AccountContext);
    const [accountDataLoaded, setAccountDataLoaded] = useState(false);

    const accountData = accountCtx.accountData;

    const getUserInitials = () => {
        return UserAuthenticationService.isUserLoggedIn() ? jwt_decode<DecodedJWT>(store.getState().userAuthentication.authTokens.accessToken!).firstName.charAt(0) + jwt_decode<DecodedJWT>(store.getState().userAuthentication.authTokens.accessToken!).lastName.charAt(0) : "";
    }

    useEffect(() => {
        console.log('%%%%% '+accountData?.firstName)
        const transformAccountData = (response: AccountData) => {
            console.log(response)
            accountCtx.setAccountData(response);
            setAccountDataLoaded(true);
        }

        if (accountCtx.accountData === null || accountCtx.accountData === undefined) {
            const fetchAccountDataRequest: RequestConfig = {
                url: REST_PATH_AUTH + "/account/profile"
            }

            fetchAccountData(fetchAccountDataRequest, transformAccountData);
        }
    }, [accountCtx, fetchAccountData])

    return (
        <Grid container sx={{display: 'flex'}}>
            <Grid item xs={4}>
                <Avatar
                    sx={{
                        bgcolor: 'primary.main',
                        color: 'white',
                        width: 320,
                        height: 320,
                        fontSize: 96
                    }}>{getUserInitials()}</Avatar>
            </Grid>
            <Grid container item xs={8} sx={{
                alignContent: 'center'
            }}>
                <Stack sx={{width: '70%'}} spacing={6}>
                    <AccountInfoField fieldName='Account number' fieldValue={accountData?.accountNumber} />
                    <AccountInfoField fieldName='First name' fieldValue={accountData?.firstName} />
                    <AccountInfoField fieldName='Last name' fieldValue={accountData?.lastName} />
                    <AccountInfoField fieldName='Email' fieldValue={accountData?.email} />
                    <AccountInfoField fieldName='Phone number' fieldValue={accountData?.phoneNumber} />
                </Stack>
            </Grid>
        </Grid>
    );
}

export default AccountInfo;