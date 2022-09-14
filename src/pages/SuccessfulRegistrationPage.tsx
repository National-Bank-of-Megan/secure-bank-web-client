import {useLocation, useNavigate} from "react-router-dom";
import RegistrationSuccess from "../components/registration/RegistrationSuccess";
import {useEffect} from "react";
import {SuccessfulRegistrationType} from "../models/custom-types/SuccessfulRegistrationType";


const SuccessfulRegistrationPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const registrationData = location.state as SuccessfulRegistrationType;

    useEffect(() => {
        if (!registrationData) {
            navigate('/', {replace: true});
        }
    }, [navigate, registrationData])

    return (
        <>
            {registrationData && <RegistrationSuccess registrationResponseData={registrationData}/>}
        </>
    );
}

export default SuccessfulRegistrationPage;