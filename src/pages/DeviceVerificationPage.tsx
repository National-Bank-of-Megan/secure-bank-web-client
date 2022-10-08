import DeviceVerificationForm from "../components/auth/DeviceVerificationForm";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {AccountCredentialsType} from "../models/custom-types/AccountCredentialsType";

const DeviceVerificationPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const accountCredentials = location.state as AccountCredentialsType;
    console.log(accountCredentials)

    useEffect(() => {
        if (!accountCredentials) {
            navigate('/', {replace: true});
        }
    }, [accountCredentials, navigate])

    return (
        <>
            {accountCredentials && <DeviceVerificationForm accountCredentials={accountCredentials}/>}
        </>
    );

}
export default DeviceVerificationPage;