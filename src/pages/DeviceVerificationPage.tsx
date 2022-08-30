import DeviceVerificationForm from "../components/auth/DeviceVerificationForm";
import {useLocation, useNavigate} from "react-router-dom";
import {SuccessfulRegistrationType} from "../models/custom-types/SuccessfulRegistrationType";
import {useEffect} from "react";
import {AccountCredentialsType} from "../models/custom-types/AccountCredentialsType";

const DeviceVerificationPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const accountCredentials = location.state as AccountCredentialsType;

    useEffect(() => {
        if (!accountCredentials) {
            console.log('gówno')
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