import {Avatar, Grid, Stack} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import useFetch, {RequestConfig} from "../../hook/use-fetch";
import AccountContext from "../../store/account-context";
import {REST_PATH_AUTH} from "../../constants/Constants";
import {AccountData} from "../../common/account";
import AccountInfoField from "./AccountInfoField";
import AuthContext from "../../store/auth-context";

const AccountInfo = () => {
    const { isLoading, error, sendRequest: fetchAccountData } = useFetch();
    const accountCtx = useContext(AccountContext);
    const authCtx = useContext(AuthContext);
    const [accountDataLoaded, setAccountDataLoaded] = useState(false);

    const accountData = accountCtx.accountData;

    const getUserInitials = () => {
        return authCtx.isLoggedIn() ? authCtx.firstName.charAt(0) + authCtx.lastName.charAt(0) : "";
    }

    useEffect(() => {
        const transformAccountData = (response: AccountData) => {
            accountCtx.setAccountData(response);
            setAccountDataLoaded(true);
        }

        if (accountCtx.accountData == null) {
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
                    <AccountInfoField fieldName='Phone number' fieldValue={accountData?.phone} />
                </Stack>
            </Grid>
        </Grid>
    );
}

export default AccountInfo;