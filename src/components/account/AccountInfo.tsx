import {Avatar, Grid, Stack} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import useFetch, {RequestConfig} from "../../hook/use-fetch";
import AccountContext from "../../store/account-context";
import {REST_PATH_ACCOUNT} from "../../constants/Constants";
import {AccountData} from "../../common/account";
import AccountInfoField from "./AccountInfoField";
import jwt_decode from "jwt-decode";
import DecodedJWT from "../../models/decodedJWT";
import store from "../../store/store";
import useCredentialsValidation from "../../hook/use-credentials-validation";

const AccountInfo = () => {
    const {isLoading, error, sendRequest: fetchAccountData} = useFetch();
    const { isUserLoggedIn } = useCredentialsValidation();
    const accountCtx = useContext(AccountContext);
    const [accountDataLoaded, setAccountDataLoaded] = useState(false);

    const accountData = accountCtx.accountData;

    const getUserInitials = () => {
        return isUserLoggedIn() ? jwt_decode<DecodedJWT>(store.getState().userAuthentication.authToken!).firstName.charAt(0) + jwt_decode<DecodedJWT>(store.getState().userAuthentication.authToken!).lastName.charAt(0) : "";
    }

    useEffect(() => {
        console.log('%%%%% ' + accountData?.firstName)
        const transformAccountData = (response: AccountData) => {
            console.log(response)
            accountCtx.setAccountData(response);
            setAccountDataLoaded(true);
        }

        if (accountCtx.accountData === null || accountCtx.accountData === undefined) {
            const fetchAccountDataRequest: RequestConfig = {
                url: REST_PATH_ACCOUNT + "/profile"
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
                    <AccountInfoField fieldName='Account number' fieldValue={accountData?.accountNumber}/>
                    <AccountInfoField fieldName='First name' fieldValue={accountData?.firstName}/>
                    <AccountInfoField fieldName='Last name' fieldValue={accountData?.lastName}/>
                    <AccountInfoField fieldName='Email' fieldValue={accountData?.email}/>
                    <AccountInfoField fieldName='Phone number' fieldValue={accountData?.phoneNumber}/>
                </Stack>
            </Grid>
        </Grid>
    );
}

export default AccountInfo;